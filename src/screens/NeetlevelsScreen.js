import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const NeetLevelsScreen = () => {
  const navigation = useNavigation();
  const totalLevels = 200;
  const columns = 5;

  const handleLevelPress = (level) => {
    // Navigate to level detail screen or game screen
    // navigation.navigate('LevelDetail', { level });
    console.log(`Level ${level} pressed`);
  };

  const renderLevel = (level) => {
    // Determine if level is locked (you can modify this logic based on your game state)
    const isLocked = level > 1; // For demo, only level 1 is unlocked

    return (
      <TouchableOpacity
        key={level}
        onPress={() => handleLevelPress(level)}
        style={styles.levelButton}
        disabled={isLocked}
      >
        <LinearGradient
          colors={isLocked ? ['#666', '#444'] : ['#4CAF50', '#45a049']}
          style={styles.levelGradient}
        >
          <Text style={[styles.levelText, isLocked && styles.lockedText]}>
            {level}
          </Text>
          {isLocked && (
            <Text style={styles.lockIcon}>🔒</Text>
          )}
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
        </View>
      );
    }
    return grid;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>JEE Levels</Text>
      </View> */}
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

export default NeetLevelsScreen;