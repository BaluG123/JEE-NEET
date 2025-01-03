import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import JEEScreen from './src/screens/JEEScreen';
import NEETScreen from './src/screens/NEETScreen';
import SplashScreen from './src/screens/SplashScreen';
import JeelevelsScreen from './src/screens/JeelevelsScreen';
import NeetLevelsScreen from './src/screens/NeetlevelsScreen';
import JeeLevelsScreen from './src/screens/JeelevelsScreen';
import questionsData from './src/util/JEE.json';
import QuestionScreen from './src/screens/QuestionScreen';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import JEEAdvancedSyllabus from './src/screens/JEEAdvancedSyllabus';
import JEEAdvancedPractice from './src/screens/JEEAdvancedPractice';
import NotificationService from './src/util/NotificationService';
import NotificationDebugService from './src/util/NotificationDebugService';
import {getMessaging} from '@react-native-firebase/messaging';
import NotificationPermissionHandler from './src/util/NotificationPermissionHandler';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      // Request permissions first
      const hasPermission =
        await NotificationPermissionHandler.checkAndRequestPermissions();

      if (hasPermission) {
        // Continue with your existing notification setup
        const token = await getMessaging().getToken();
        console.log('FCM Token:', token);
        // ... rest of your notification setup
      }
    }

    setupNotifications();
  }, []);
  useEffect(() => {
    async function setupNotifications() {
      const hasPermission = await NotificationService.requestUserPermission();
      if (hasPermission) {
        const token = await NotificationService.getFCMToken();
        // Send token to your backend

        // Setup notification listeners
        const unsubscribe = NotificationService.setupNotificationListeners();
        return unsubscribe;
      }
    }

    setupNotifications();
  }, []);

  useEffect(() => {
    async function debugNotifications() {
      const result = await NotificationDebugService.checkNotificationSetup();
      console.log('Debug Result:', result);

      // Test local notification to verify basic notification setup
      const localTest = await NotificationDebugService.testLocalNotification();
      console.log('Local Test Result:', localTest);
    }

    debugNotifications();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
          cardStyle: {backgroundColor: '#1a1a1a'},
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JEEScreen"
          component={JEEScreen}
          options={{
            title: 'JEE Mains Syllabus',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="NEETScreen"
          component={NEETScreen}
          options={{
            title: 'NEET Preparation',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="JeeLevels"
          component={JeeLevelsScreen}
          initialParams={{questions: questionsData.questions}}
          options={({navigation}) => ({
            title: 'JEE Mains Levels',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{paddingLeft: 5}}>
                <Icon name="arrow-left" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        {/* <Stack.Screen
          name="JeeLevels"
          component={JeeLevelsScreen}
          initialParams={{questions: questionsData.questions}}
          options={{title: 'JEE Levels'}}
        /> */}
        {/* <Stack.Screen
          name="NEETLevelsScreen"
          component={NeetLevelsScreen}
          options={{
            title: 'NEET Practice Quiz',
            headerTransparent: false,
          }}
        /> */}
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{title: 'Question'}}
        />
        <Stack.Screen
          name="JeeadvancedSyllabus"
          component={JEEAdvancedSyllabus}
          options={{title: 'JEE Advanced Syllabus'}}
        />
        <Stack.Screen
          name="JEEAdvancedPractice"
          component={JEEAdvancedPractice}
          // initialParams={{questions: questionsData.questions}}
          options={{title: 'JEE Advanced Practice'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
