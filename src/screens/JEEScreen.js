import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2627956667785383/7800891012';

const {width} = Dimensions.get('window');

const JEEScreen = () => {
  const renderSubjectDetails = (title, sections, gradientColors) => (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={styles.subjectCard}>
      <LinearGradient
        colors={gradientColors}
        style={styles.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.subjectTitle}>{title}</Text>
        {Object.entries(sections).map(([sectionTitle, topics], index) => (
          <View key={index} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            {topics.map((topic, topicIndex) => (
              <Text key={topicIndex} style={styles.topicText}>
                • {topic}
              </Text>
            ))}
          </View>
        ))}
      </LinearGradient>
    </Animated.View>
  );

  const physicsTopics = {
    Mechanics: [
      'Kinematics',
      'Laws of Motion',
      'Work, Energy and Power',
      'Rotational Motion',
      'Gravitation',
      'Properties of Solids and Liquids',
    ],
    'Thermodynamics & KTG': [
      'Thermal Properties of Matter',
      'Thermodynamics',
      'Kinetic Theory of Gases',
    ],
    Electromagnetism: [
      'Electrostatics',
      'Current Electricity',
      'Magnetic Effects of Current',
      'Electromagnetic Induction',
      'Alternating Current',
    ],
    'Optics & Modern Physics': [
      'Ray Optics',
      'Wave Optics',
      'Dual Nature of Matter',
      'Atoms and Nuclei',
      'Semiconductor Electronics',
    ],
  };

  const chemistryTopics = {
    'Physical Chemistry': [
      'States of Matter',
      'Atomic Structure',
      'Chemical Bonding',
      'Chemical Thermodynamics',
      'Solutions',
      'Electrochemistry',
      'Chemical Kinetics',
      'Surface Chemistry',
      'Nuclear Chemistry',
    ],
    'Inorganic Chemistry': [
      'Periodic Table',
      's-Block Elements',
      'p-Block Elements',
      'd & f Block Elements',
      'Coordination Compounds',
      'Environmental Chemistry',
    ],
    'Organic Chemistry': [
      'Basic Concepts',
      'Hydrocarbons',
      'Organic Compounds with Functional Groups',
      'Biomolecules',
      'Polymers',
      'Chemistry in Everyday Life',
    ],
  };

  const mathematicsTopics = {
    Algebra: [
      'Complex Numbers',
      'Matrices and Determinants',
      'Sets, Relations and Functions',
      'Mathematical Induction',
      'Permutations and Combinations',
      'Binomial Theorem',
    ],
    Calculus: [
      'Limits and Continuity',
      'Differentiation',
      'Application of Derivatives',
      'Integration',
      'Differential Equations',
    ],
    'Coordinate Geometry': [
      'Straight Lines',
      'Circles',
      'Conics',
      '3D Geometry',
    ],
    'Trigonometry & Statistics': [
      'Trigonometric Ratios',
      'Trigonometric Equations',
      'Statistics and Probability',
    ],
  };

  return (
    <View style={styles.syllabusContainer}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.background}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      <Animated.Text
        entering={FadeInDown.delay(200).springify()}
        style={styles.syllabusTitle}>
        JEE Mains Syllabus
      </Animated.Text>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {renderSubjectDetails('Physics', physicsTopics, ['#4CAF50', '#45a049'])}
        {renderSubjectDetails('Chemistry', chemistryTopics, [
          '#2196F3',
          '#1976D2',
        ])}
        {renderSubjectDetails('Mathematics', mathematicsTopics, [
          '#9C27B0',
          '#7B1FA2',
        ])}
      </Animated.ScrollView>
      <View style={{width, alignItems: 'center'}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: 'bottom',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  syllabusContainer: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  syllabusTitle: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: hp('2.5%'),
  },
  scrollView: {
    paddingHorizontal: wp('5%'),
  },
  subjectCard: {
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
  cardGradient: {
    borderRadius: wp('4%'),
    padding: wp('5%'),
  },
  subjectTitle: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#fff',
    marginBottom: hp('2%'),
  },
  sectionContainer: {
    marginTop: hp('1.5%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#fff',
    marginBottom: hp('1%'),
    opacity: 0.9,
  },
  topicText: {
    fontSize: wp('4%'),
    color: '#fff',
    marginBottom: hp('1%'),
    lineHeight: hp('3%'),
    paddingLeft: wp('3%'),
    opacity: 0.8,
  },
});

export default JEEScreen;
