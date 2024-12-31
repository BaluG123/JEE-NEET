import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = ({navigation}) => {
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
        style={styles.title}>
        JEE MAINS & ADVANCED
      </Animated.Text>

      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('JEEScreen')}
          style={styles.cardWrapper}>
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={styles.card}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.cardTitle}>JEE Mains Syllabus</Text>
            <Text style={styles.cardSubtitle}>
              Physics • Chemistry • Mathematics
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('JeeadvancedSyllabus')}
          style={styles.cardWrapper}>
          <LinearGradient
            colors={['#E91E63', '#C2185B']}
            style={styles.card}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.cardTitle}>JEE Advanced Syllabus</Text>
            <Text style={styles.cardSubtitle}>
              Advanced Physics • Chemistry • Mathematics
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('JeeLevels')}
          style={styles.cardWrapper}>
          <LinearGradient
            colors={['#FF9800', '#F57C00']}
            style={styles.card}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.cardTitle}>JEE Mains Quiz</Text>
            <Text style={styles.cardSubtitle}>Test Your Knowledge</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('JEEAdvancedPractice')}
          style={styles.cardWrapper}>
          <LinearGradient
            colors={['#673AB7', '#512DA8']}
            style={styles.card}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.cardTitle}>JEE Advanced Quiz</Text>
            <Text style={styles.cardSubtitle}>Advanced Problem Solving</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('NEETScreen')}
          style={styles.cardWrapper}>
          <LinearGradient
            colors={['#2196F3', '#1976D2']}
            style={styles.card}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.cardTitle}>NEET</Text>
            <Text style={styles.cardSubtitle}>
              Physics • Chemistry • Biology
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('NEETLevelsScreen')}
          style={styles.cardWrapper}>
          <LinearGradient
            colors={['#9C27B0', '#7B1FA2']}
            style={styles.card}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.cardTitle}>NEET Quiz</Text>
            <Text style={styles.cardSubtitle}>Challenge Yourself</Text>
          </LinearGradient>
        </TouchableOpacity> */}
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
  },
});

export default HomeScreen;
