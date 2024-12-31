// import React, {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
//   FadeIn,
//   FadeOut,
// } from 'react-native-reanimated';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {StyleSheet} from 'react-native';

// const SplashScreen = ({navigation}) => {
//   const scale = useSharedValue(0);
//   const opacity = useSharedValue(0);

//   useEffect(() => {
//     // Start animations
//     scale.value = withSpring(1, {damping: 15});
//     opacity.value = withTiming(1, {duration: 1000});

//     // Navigate to Home after 3 seconds
//     const timer = setTimeout(() => {
//       navigation.replace('Home');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const logoStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scale.value}],
//       opacity: opacity.value,
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#667eea', '#764ba2']}
//         style={styles.background}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
//       <Animated.View
//         entering={FadeIn}
//         exiting={FadeOut}
//         style={[styles.contentContainer, logoStyle]}>
//         <Text style={styles.title}>ExamPrep</Text>
//         <Text style={styles.subtitle}>JEE & NEET</Text>
//       </Animated.View>

//       <Animated.Text entering={FadeIn.delay(500)} style={styles.tagline}>
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
//   },
// });

// export default SplashScreen;

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  FadeIn,
  FadeOut,
  SlideInUp,
  withRepeat,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SplashScreen = ({navigation}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);
  const slideUp = useSharedValue(50);

  useEffect(() => {
    // Animate scale with bouncy effect
    scale.value = withSequence(
      withTiming(1.2, {duration: 600}),
      withSpring(1, {damping: 12, stiffness: 100}),
    );

    // Fade in effect
    opacity.value = withTiming(1, {duration: 800});

    // Rotate the atom icon
    rotation.value = withRepeat(withTiming(360, {duration: 3000}), -1, false);

    // Slide up animation
    slideUp.value = withDelay(400, withSpring(0, {damping: 15}));

    // Navigate to Home after animation
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  const atomStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}, {scale: scale.value}],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    transform: [{translateY: slideUp.value}],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a237e', '#0d47a1', '#01579b']}
        style={styles.background}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />

      {/* Animated particles using Lottie */}
      <LottieView
        source={require('../util/Particles.json')}
        autoPlay
        loop
        style={styles.particles}
      />

      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.contentContainer, logoStyle]}>
        <Animated.View style={[styles.iconContainer, atomStyle]}>
          <Icon name="atom" size={wp('15%')} color="#fff" />
        </Animated.View>

        <Text style={styles.title}>Achieve JEE</Text>

        <Animated.View
          entering={SlideInUp.delay(300)}
          style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Master the Journey</Text>
          <Text style={styles.subtitle}>Excel in Destiny</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.taglineContainer, taglineStyle]}>
        <Text style={styles.tagline}>Your Gateway to</Text>
        <Text style={styles.taglineHighlight}>Engineering Excellence</Text>
      </Animated.View>

      {/* Bottom wave animation */}
      <LottieView
        source={require('../util/wave.json')}
        autoPlay
        loop
        style={styles.wave}
      />
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
  particles: {
    position: 'absolute',
    width: wp('100%'),
    height: hp('100%'),
    opacity: 0.5,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('12%'),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: wp('0.5%'),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  subtitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
    marginTop: hp('0.5%'),
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  tagline: {
    fontSize: wp('4%'),
    color: '#fff',
    opacity: 0.8,
    fontWeight: '500',
  },
  taglineHighlight: {
    fontSize: wp('4.5%'),
    color: '#fff',
    fontWeight: '700',
    marginTop: hp('0.5%'),
    letterSpacing: wp('0.2%'),
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('20%'),
  },
});

export default SplashScreen;
