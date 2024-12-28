// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#f6f9fc', '#e9f1f9']}
//         style={styles.background}
//         start={{x: 0, y: 0}} 
//         end={{x: 1, y: 1}}
//       />
//       <Animated.Text 
//         entering={FadeInDown.delay(200).springify()}
//         style={styles.title}
//       >
//         Choose Your Exam
//       </Animated.Text>
      
//       <Animated.View 
//         entering={FadeInUp.delay(400).springify()}
//         style={styles.cardsContainer}
//       >
//         <TouchableOpacity
//           onPress={() => navigation.navigate('JEEScreen')}
//           style={styles.cardWrapper}
//         >
//           <LinearGradient
//             colors={['#667eea', '#764ba2']}
//             style={styles.card}
//             start={{x: 0, y: 0}} 
//             end={{x: 1, y: 0}}
//           >
//             <Text style={styles.cardTitle}>JEE Mains</Text>
//             <Text style={styles.cardSubtitle}>Physics • Chemistry • Mathematics</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('NEETScreen')}
//           style={styles.cardWrapper}
//         >
//           <LinearGradient
//             colors={['#4facfe', '#00f2fe']}
//             style={styles.card}
//             start={{x: 0, y: 0}} 
//             end={{x: 1, y: 0}}
//           >
//             <Text style={styles.cardTitle}>NEET</Text>
//             <Text style={styles.cardSubtitle}>Physics • Chemistry • Biology</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('JEELevelsScreen')}
//           style={styles.cardWrapper}
//         >
//           <LinearGradient
//             colors={['#f6d365', '#fda085']}
//             style={styles.card}
//             start={{x: 0, y: 0}} 
//             end={{x: 1, y: 0}}
//           >
//             <Text style={styles.cardTitle}>JEE Quiz</Text>
//             <Text style={styles.cardSubtitle}>Test Your Knowledge</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('NEETLevelsScreen')}
//           style={styles.cardWrapper}
//         >
//           <LinearGradient
//             colors={['#84fab0', '#8fd3f4']}
//             style={styles.card}
//             start={{x: 0, y: 0}} 
//             end={{x: 1, y: 0}}
//           >
//             <Text style={styles.cardTitle}>NEET Quiz</Text>
//             <Text style={styles.cardSubtitle}>Challenge Yourself</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       paddingTop: hp('5%'), // Reduced from 7% to accommodate more cards
//     },
//     background: {
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//     },
//     title: {
//       fontSize: wp('7%'),
//       fontWeight: '700',
//       color: '#1a1a1a',
//       marginBottom: hp('4%'), // Reduced from 5% to accommodate more cards
//     },
//     cardsContainer: {
//       width: wp('90%'),
//     },
//     cardWrapper: {
//       marginBottom: hp('2%'), // Reduced from 2.5% to accommodate more cards
//       borderRadius: wp('4%'),
//       elevation: 4,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: hp('0.5%'),
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: wp('2%'),
//     },
//     card: {
//       padding: wp('6%'),
//       borderRadius: wp('4%'),
//     },
//     cardTitle: {
//       fontSize: wp('6%'),
//       fontWeight: '700',
//       color: '#fff',
//       marginBottom: hp('1%'),
//     },
//     cardSubtitle: {
//       fontSize: wp('4%'),
//       color: '#fff',
//       opacity: 0.9,
//     }
// });

// export default HomeScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.background}
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}}
      />
      <Animated.Text 
        entering={FadeInDown.delay(200).springify()}
        style={styles.title}
      >
        Choose Your Exam
      </Animated.Text>
      
      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.cardsContainer}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('JEEScreen')}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={styles.card}
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
          >
            <Text style={styles.cardTitle}>JEE Mains</Text>
            <Text style={styles.cardSubtitle}>Physics • Chemistry • Mathematics</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('NEETScreen')}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={['#2196F3', '#1976D2']}
            style={styles.card}
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
          >
            <Text style={styles.cardTitle}>NEET</Text>
            <Text style={styles.cardSubtitle}>Physics • Chemistry • Biology</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('JEELevelsScreen')}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={['#FF9800', '#F57C00']}
            style={styles.card}
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
          >
            <Text style={styles.cardTitle}>JEE Quiz</Text>
            <Text style={styles.cardSubtitle}>Test Your Knowledge</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('NEETLevelsScreen')}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={['#9C27B0', '#7B1FA2']}
            style={styles.card}
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
          >
            <Text style={styles.cardTitle}>NEET Quiz</Text>
            <Text style={styles.cardSubtitle}>Challenge Yourself</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: hp('5%'),
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    title: {
      fontSize: wp('7%'),
      fontWeight: '700',
      color: 'white',
      marginBottom: hp('4%'),
    },
    cardsContainer: {
      width: wp('90%'),
    },
    cardWrapper: {
      marginBottom: hp('2%'),
      borderRadius: wp('4%'),
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: hp('0.5%'),
      },
      shadowOpacity: 0.3,
      shadowRadius: wp('2%'),
    },
    card: {
      padding: wp('6%'),
      borderRadius: wp('4%'),
    },
    cardTitle: {
      fontSize: wp('6%'),
      fontWeight: '700',
      color: '#fff',
      marginBottom: hp('1%'),
    },
    cardSubtitle: {
      fontSize: wp('4%'),
      color: '#fff',
      opacity: 0.9,
    }
});

export default HomeScreen;