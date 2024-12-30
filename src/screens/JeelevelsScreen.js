import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StorageService} from '../util/Storage';

const JeeLevelsScreen = ({route}) => {
  const navigation = useNavigation();
  const {questions} = route.params;
  // const totalLevels = Math.max(...questions.map(q => q.level));
  const totalLevels = 200;
  const columns = 5;
  const [completedLevels, setCompletedLevels] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, []),
  );

  const loadProgress = async () => {
    const completed = await StorageService.getCompletedLevels();
    setCompletedLevels(completed);
  };

  const handleLevelPress = level => {
    navigation.navigate('Question', {
      level,
      questions,
    });
  };

  const isLevelLocked = level => {
    if (level === 1) return false;
    return !completedLevels.includes(level - 1);
  };

  const renderLevel = level => {
    const isLocked = isLevelLocked(level);
    const isCompleted = completedLevels.includes(level);

    return (
      <TouchableOpacity
        key={level}
        onPress={() => handleLevelPress(level)}
        style={styles.levelButton}
        disabled={isLocked}>
        <LinearGradient
          colors={
            isCompleted
              ? ['#4CAF50', '#45a049']
              : isLocked
              ? ['#666', '#444']
              : ['#2196F3', '#1976D2']
          }
          style={styles.levelGradient}>
          <Text style={[styles.levelText, isLocked && styles.lockedText]}>
            {level}
          </Text>
          {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
          {isCompleted && <Text style={styles.completedIcon}>✓</Text>}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderGrid = () => {
    const rows = Math.ceil(totalLevels / columns);
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowLevels = [];
      for (let col = 0; col < columns; col++) {
        const level = row * columns + col + 1;
        if (level <= totalLevels) {
          rowLevels.push(renderLevel(level));
        }
      }
      grid.push(
        <View key={row} style={styles.row}>
          {rowLevels}
        </View>,
      );
    }
    return grid;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderGrid()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: hp('2%'),
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    padding: wp('2%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  levelButton: {
    width: wp('18%'),
    aspectRatio: 1,
    margin: wp('0.5%'),
  },
  levelGradient: {
    flex: 1,
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2%'),
  },
  levelText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  lockedText: {
    opacity: 0.7,
  },
  lockIcon: {
    fontSize: wp('3%'),
    marginTop: hp('0.5%'),
  },
});

export default JeeLevelsScreen;

// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';

// const JeeLevelsScreen = () => {
//   const navigation = useNavigation();
//   const totalLevels = 200;
//   const columns = 5;

//   const handleLevelPress = (level) => {
//     // Navigate to level detail screen or game screen
//     // navigation.navigate('LevelDetail', { level });
//     console.log(`Level ${level} pressed`);
//   };

//   const renderLevel = (level, index) => {
//     // Determine if level is locked (you can modify this logic based on your game state)
//     const isLocked = level > 1; // For demo, only level 1 is unlocked

//     return (
//       <TouchableOpacity
//         key={level}
//         onPress={() => handleLevelPress(level)}
//         style={styles.levelButton}
//         disabled={isLocked}
//       >
//         <LinearGradient
//           colors={isLocked ? ['#e9f1f9', '#f6f9fc'] : ['#667eea', '#764ba2']}
//           style={styles.levelGradient}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 0}}
//         >
//           <Text style={[styles.levelText, isLocked && styles.lockedText]}>
//             {level}
//           </Text>
//           {isLocked && (
//             <Text style={styles.lockIcon}>🔒</Text>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>
//     );
//   };

//   const renderGrid = () => {
//     const rows = Math.ceil(totalLevels / columns);
//     const grid = [];

//     for (let row = 0; row < rows; row++) {
//       const rowLevels = [];
//       for (let col = 0; col < columns; col++) {
//         const level = row * columns + col + 1;
//         if (level <= totalLevels) {
//           rowLevels.push(renderLevel(level, row * columns + col));
//         }
//       }
//       grid.push(
//         <Animated.View
//           key={row}
//           entering={FadeInUp.delay(200 + row * 50).springify()}
//           style={styles.row}
//         >
//           {rowLevels}
//         </Animated.View>
//       );
//     }
//     return grid;
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#f6f9fc', '#e9f1f9']}
//         style={styles.background}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
//       <SafeAreaView style={styles.safeArea}>
//         <Animated.Text
//           entering={FadeInDown.delay(200).springify()}
//           style={styles.headerText}
//         >
//           JEE Levels
//         </Animated.Text>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {renderGrid()}
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   headerText: {
//     fontSize: wp('7%'),
//     fontWeight: '700',
//     color: '#1a1a1a',
//     textAlign: 'center',
//     marginVertical: hp('2%'),
//   },
//   scrollContent: {
//     padding: wp('2%'),
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('1%'),
//   },
//   levelButton: {
//     width: wp('17%'),
//     aspectRatio: 1,
//     margin: wp('0.5%'),
//     borderRadius: wp('2%'),
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: hp('0.2%'),
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: wp('1%'),
//   },
//   levelGradient: {
//     flex: 1,
//     borderRadius: wp('2%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: wp('2%'),
//   },
//   levelText: {
//     color: '#fff',
//     fontSize: wp('4%'),
//     fontWeight: '700',
//   },
//   lockedText: {
//     color: '#1a1a1a',
//     opacity: 0.5,
//   },
//   lockIcon: {
//     fontSize: wp('3%'),
//     marginTop: hp('0.5%'),
//   },
// });

// export default JeeLevelsScreen;
