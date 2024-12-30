// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, {FadeInUp} from 'react-native-reanimated';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const JEEAdvancedSyllabus = () => {
//   const subjects = {
//     physics: {
//       title: 'Physics',
//       topics: [
//         {
//           title: 'Mechanics',
//           subtopics: [
//             'Classical Mechanics',
//             'Fluid Mechanics',
//             'Thermal Physics',
//             'Rotational Dynamics',
//             'Oscillations',
//             'Waves and Sound',
//             'Center of Mass',
//             'Collision and Momentum',
//             'Work, Energy, Power',
//           ],
//         },
//         {
//           title: 'Electricity & Magnetism',
//           subtopics: [
//             'Electrostatics',
//             'Current Electricity',
//             'Magnetic Effects',
//             'Electromagnetic Induction',
//             'Alternating Current',
//             'Electromagnetic Waves',
//             'Electric Field and Potential',
//             'Capacitance',
//             'Magnetism in Matter',
//           ],
//         },
//         {
//           title: 'Modern Physics',
//           subtopics: [
//             'Quantum Physics',
//             'Atomic Structure',
//             'Nuclear Physics',
//             'Photoelectric Effect',
//             'X-rays',
//             'Wave-Particle Duality',
//             'Radioactivity',
//             'Semiconductor Devices',
//           ],
//         },
//       ],
//     },
//     chemistry: {
//       title: 'Chemistry',
//       topics: [
//         {
//           title: 'Physical Chemistry',
//           subtopics: [
//             'Chemical Kinetics',
//             'Thermodynamics',
//             'Electrochemistry',
//             'Surface Chemistry',
//             'Nuclear Chemistry',
//             'Solutions and Colligative Properties',
//             'Phase Equilibrium',
//             'Chemical Equilibrium',
//             'Ionic Equilibrium',
//           ],
//         },
//         {
//           title: 'Organic Chemistry',
//           subtopics: [
//             'General Organic Chemistry',
//             'Hydrocarbons',
//             'Aromatic Compounds',
//             'Alcohols and Ethers',
//             'Carbonyl Compounds',
//             'Carboxylic Acids',
//             'Amines',
//             'Biomolecules',
//             'Polymers',
//             'Chemistry in Everyday Life',
//           ],
//         },
//         {
//           title: 'Inorganic Chemistry',
//           subtopics: [
//             'Periodic Table',
//             'Chemical Bonding',
//             'd and f Block Elements',
//             'Coordination Compounds',
//             'Metallurgy',
//             'Environmental Chemistry',
//             'Qualitative Analysis',
//             'Salt Analysis',
//           ],
//         },
//       ],
//     },
//     mathematics: {
//       title: 'Mathematics',
//       topics: [
//         {
//           title: 'Algebra',
//           subtopics: [
//             'Complex Numbers',
//             'Matrices and Determinants',
//             'Permutations and Combinations',
//             'Mathematical Induction',
//             'Binomial Theorem',
//             'Sequences and Series',
//             'Vector Algebra',
//             'Mathematical Logic',
//           ],
//         },
//         {
//           title: 'Calculus',
//           subtopics: [
//             'Functions and Relations',
//             'Limits and Continuity',
//             'Differentiation',
//             'Applications of Derivatives',
//             'Indefinite Integration',
//             'Definite Integration',
//             'Differential Equations',
//             'Area Under Curves',
//             'Vector Calculus',
//           ],
//         },
//         {
//           title: 'Coordinate Geometry',
//           subtopics: [
//             'Straight Lines',
//             'Circles',
//             'Parabola',
//             'Ellipse',
//             'Hyperbola',
//             '3D Geometry',
//             'Transformation of Axes',
//             'Polar Coordinates',
//           ],
//         },
//       ],
//     },
//   };

//   const renderSubject = subject => (
//     <Animated.View
//       entering={FadeInUp.delay(200).springify()}
//       style={styles.subjectContainer}
//       key={subject.title}>
//       <LinearGradient
//         colors={['#E91E63', '#C2185B']}
//         style={styles.subjectHeader}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}>
//         <Text style={styles.subjectTitle}>{subject.title}</Text>
//       </LinearGradient>
//       {subject.topics.map((topic, index) => (
//         <View key={index} style={styles.topicContainer}>
//           <Text style={styles.topicTitle}>{topic.title}</Text>
//           {topic.subtopics.map((subtopic, subIndex) => (
//             <Text key={subIndex} style={styles.subtopic}>
//               • {subtopic}
//             </Text>
//           ))}
//         </View>
//       ))}
//     </Animated.View>
//   );

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#1a1a1a', '#2a2a2a']}
//         style={styles.background}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}>
//         {Object.values(subjects).map(subject => renderSubject(subject))}
//       </ScrollView>
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
//   scrollContainer: {
//     padding: wp('4%'),
//   },
//   subjectContainer: {
//     marginBottom: hp('3%'),
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     borderRadius: wp('4%'),
//     overflow: 'hidden',
//   },
//   subjectHeader: {
//     padding: wp('4%'),
//   },
//   subjectTitle: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   topicContainer: {
//     padding: wp('4%'),
//   },
//   topicTitle: {
//     fontSize: wp('5%'),
//     fontWeight: '600',
//     color: '#fff',
//     marginBottom: hp('1%'),
//   },
//   subtopic: {
//     fontSize: wp('4%'),
//     color: '#fff',
//     opacity: 0.8,
//     marginLeft: wp('4%'),
//     marginBottom: hp('0.5%'),
//   },
// });

// export default JEEAdvancedSyllabus;

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
      {/* <Animated.Text
        entering={FadeInDown.delay(200).springify()}
        style={styles.syllabusTitle}>
        JEE Advanced Syllabus
      </Animated.Text> */}
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
