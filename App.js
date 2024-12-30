import React from 'react';
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

const Stack = createStackNavigator();

export default function App() {
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
            title: 'JEE Preparation',
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
            title: 'JEE Levels',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{paddingLeft: 5}}>
                <Icon name="arrow-left" size={24} color="#fff" />
                {/* <Text style={{color: '#ffffff', fontSize: 18}}>Back</Text> */}
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
        <Stack.Screen
          name="NEETLevelsScreen"
          component={NeetLevelsScreen}
          options={{
            title: 'NEET Practice Quiz',
            headerTransparent: false,
          }}
        />
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{title: 'Question'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
