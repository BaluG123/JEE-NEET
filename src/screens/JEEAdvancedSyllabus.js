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
  : 'ca-app-pub-2627956667785383/1847762732';

const {width} = Dimensions.get('window');

const JEEAdvancedScreen = () => {
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
    'Classical Mechanics': [
      'Rotational Dynamics',
      'Fluid Mechanics',
      'Oscillations & Waves',
      'Center of Mass',
      'Moment of Inertia',
      'Rigid Body Dynamics',
      'Simple Harmonic Motion',
      'Forced Oscillations',
    ],
    'Electromagnetism & Modern Physics': [
      'Electromagnetic Theory',
      'AC Circuits',
      'Electromagnetic Waves',
      'Quantum Physics',
      'Atomic Structure',
      'Nuclear Physics',
      'Photoelectric Effect',
      'X-rays & Matter Waves',
    ],
    'Thermodynamics & Statistical Physics': [
      'Statistical Mechanics',
      'Heat Engines',
      'Entropy',
      'Carnot Cycle',
      'Maxwell Relations',
      'Phase Transitions',
      'Black Body Radiation',
    ],
    'Optics & Experimental Physics': [
      'Wave Optics',
      'Interference',
      'Diffraction',
      'Polarization',
      'Optical Instruments',
      'Error Analysis',
      'Experimental Design',
    ],
  };

  const chemistryTopics = {
    'Advanced Physical Chemistry': [
      'Chemical Thermodynamics',
      'Phase Equilibria',
      'Solutions & Colligative Properties',
      'Chemical Kinetics',
      'Surface Chemistry',
      'Quantum Mechanics',
      'Spectroscopy',
      'Electrochemistry',
    ],
    'Advanced Inorganic Chemistry': [
      'Coordination Chemistry',
      'Crystal Field Theory',
      'Organometallic Compounds',
      'Lanthanides & Actinides',
      'Nuclear Chemistry',
      'Solid State Chemistry',
      'Metal-Ligand Bonding',
    ],
    'Advanced Organic Chemistry': [
      'Reaction Mechanisms',
      'Stereochemistry',
      'Aromatic Compounds',
      'Name Reactions',
      'Biomolecules',
      'Heterocyclic Compounds',
      'Polymer Chemistry',
      'Spectroscopic Analysis',
    ],
  };

  const mathematicsTopics = {
    'Advanced Algebra': [
      'Group Theory',
      'Ring Theory',
      'Vector Spaces',
      'Linear Transformations',
      'Eigenvalues & Eigenvectors',
      'Complex Analysis',
      'Number Theory',
    ],
    'Advanced Calculus': [
      'Multiple Integrals',
      'Vector Calculus',
      'Differential Equations',
      'Partial Derivatives',
      'Series Solutions',
      'Fourier Series',
      'Laplace Transforms',
    ],
    'Analytical Geometry': [
      'Conic Sections',
      'Polar Coordinates',
      'Parametric Equations',
      'Vector Algebra',
      'Three Dimensional Geometry',
      'Quadric Surfaces',
    ],
    'Applied Mathematics': [
      'Probability Theory',
      'Mathematical Logic',
      'Graph Theory',
      'Optimization',
      'Numerical Methods',
      'Error Analysis',
      'Differential Geometry',
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
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {renderSubjectDetails('Physics', physicsTopics, ['#E91E63', '#C2185B'])}
        {renderSubjectDetails('Chemistry', chemistryTopics, [
          '#00BCD4',
          '#0097A7',
        ])}
        {renderSubjectDetails('Mathematics', mathematicsTopics, [
          '#673AB7',
          '#512DA8',
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

export default JEEAdvancedScreen;
