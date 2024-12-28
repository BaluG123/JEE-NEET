// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import  LinearGradient  from 'react-native-linear-gradient';
// import Animated, { 
//   useAnimatedStyle, 
//   useSharedValue, 
//   withSpring,
//   withTiming,
//   FadeIn,
//   FadeOut
// } from 'react-native-reanimated';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { StyleSheet } from 'react-native';

// const SplashScreen = ({ navigation }) => {
//   const scale = useSharedValue(0);
//   const opacity = useSharedValue(0);

//   useEffect(() => {
//     // Start animations
//     scale.value = withSpring(1, { damping: 15 });
//     opacity.value = withTiming(1, { duration: 1000 });

//     // Navigate to Home after 3 seconds
//     const timer = setTimeout(() => {
//       navigation.replace('Home');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const logoStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: scale.value }],
//       opacity: opacity.value,
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#667eea', '#764ba2']}
//         style={styles.background}
//       />
//       <Animated.View 
//         entering={FadeIn}
//         exiting={FadeOut}
//         style={[styles.contentContainer, logoStyle]}
//       >
//         <Text style={styles.title}>ExamPrep</Text>
//         <Text style={styles.subtitle}>JEE & NEET</Text>
//       </Animated.View>
      
//       <Animated.Text 
//         entering={FadeIn.delay(500)}
//         style={styles.tagline}
//       >
//         Your Path to Success
//       </Animated.Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: wp('12%'),
//     fontWeight: '800',
//     color: '#fff',
//     letterSpacing: wp('0.5%'),
//   },
//   subtitle: {
//     fontSize: wp('6%'),
//     fontWeight: '600',
//     color: '#fff',
//     opacity: 0.9,
//     marginTop: hp('1%'),
//   },
//   tagline: {
//     fontSize: wp('4%'),
//     color: '#fff',
//     opacity: 0.8,
//     marginTop: hp('3%'),
//     fontWeight: '500',
//   }
// });

// export default SplashScreen;

// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Start animations
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 1000 });

    // Navigate to Home after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}}
      />
      <Animated.View 
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.contentContainer, logoStyle]}
      >
        <Text style={styles.title}>ExamPrep</Text>
        <Text style={styles.subtitle}>JEE & NEET</Text>
      </Animated.View>
      
      <Animated.Text 
        entering={FadeIn.delay(500)}
        style={styles.tagline}
      >
        Your Path to Success
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('12%'),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: wp('0.5%'),
  },
  subtitle: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
    marginTop: hp('1%'),
  },
  tagline: {
    fontSize: wp('4%'),
    color: '#fff',
    opacity: 0.8,
    marginTop: hp('3%'),
    fontWeight: '500',
  }
});

export default SplashScreen;