// import React from 'react';
// import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const { width } = Dimensions.get('window');

// const NEETScreen = () => {
//   const renderSubjectDetails = (title, sections) => (
//     <Animated.View
//       entering={FadeInUp.delay(200).springify()}
//       style={styles.subjectCard}
//     >
//       <Text style={styles.subjectTitle}>{title}</Text>
//       {Object.entries(sections).map(([sectionTitle, topics], index) => (
//         <View key={index} style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>{sectionTitle}</Text>
//           {topics.map((topic, topicIndex) => (
//             <Text key={topicIndex} style={styles.topicText}>• {topic}</Text>
//           ))}
//         </View>
//       ))}
//     </Animated.View>
//   );

//   const physicsTopics = {
//     'Mechanics': [
//       'Kinematics',
//       'Laws of Motion',
//       'Work, Energy and Power',
//       'Rotational Motion',
//       'Gravitation',
//       'Properties of Solids and Liquids'
//     ],
//     'Thermodynamics & KTG': [
//       'Thermal Properties of Matter',
//       'Thermodynamics',
//       'Kinetic Theory of Gases'
//     ],
//     'Electromagnetism': [
//       'Electrostatics',
//       'Current Electricity',
//       'Magnetic Effects of Current',
//       'Electromagnetic Induction',
//       'Alternating Current'
//     ],
//     'Optics & Modern Physics': [
//       'Ray Optics',
//       'Wave Optics',
//       'Dual Nature of Matter',
//       'Atoms and Nuclei',
//       'Semiconductor Electronics'
//     ]
//   };

//   const chemistryTopics = {
//     'Physical Chemistry': [
//       'States of Matter',
//       'Atomic Structure',
//       'Chemical Bonding',
//       'Chemical Thermodynamics',
//       'Solutions',
//       'Electrochemistry',
//       'Chemical Kinetics',
//       'Surface Chemistry',
//       'Nuclear Chemistry'
//     ],
//     'Inorganic Chemistry': [
//       'Periodic Table',
//       's-Block Elements',
//       'p-Block Elements',
//       'd & f Block Elements',
//       'Coordination Compounds',
//       'Environmental Chemistry'
//     ],
//     'Organic Chemistry': [
//       'Basic Concepts',
//       'Hydrocarbons',
//       'Organic Compounds with Functional Groups',
//       'Biomolecules',
//       'Polymers',
//       'Chemistry in Everyday Life'
//     ]
//   };

//   const biologyTopics = {
//     'Botany': {
//       'Diversity in Living World': [
//         'Living World',
//         'Biological Classification',
//         'Plant Kingdom',
//         'Animal Kingdom'
//       ],
//       'Plant Physiology': [
//         'Transport in Plants',
//         'Mineral Nutrition',
//         'Photosynthesis',
//         'Respiration',
//         'Plant Growth and Development'
//       ],
//       'Plant Reproduction': [
//         'Reproduction in Organisms',
//         'Sexual Reproduction in Flowering Plants',
//         'Human Reproduction',
//         'Reproductive Health'
//       ],
//       'Genetics and Evolution': [
//         'Principles of Inheritance and Variation',
//         'Molecular Basis of Inheritance',
//         'Evolution'
//       ]
//     },
//     'Zoology': {
//       'Human Physiology': [
//         'Digestion and Absorption',
//         'Breathing and Exchange of Gases',
//         'Body Fluids and Circulation',
//         'Excretory Products',
//         'Locomotion and Movement',
//         'Neural Control and Coordination',
//         'Chemical Coordination and Integration'
//       ],
//       'Ecology & Environment': [
//         'Organisms and Environment',
//         'Biodiversity and Conservation',
//         'Environmental Issues'
//       ],
//       'Cell Biology': [
//         'Cell Structure and Function',
//         'Biomolecules',
//         'Cell Cycle and Cell Division',
//         'Transport in Cells'
//       ]
//     }
//   };

//   return (
//     <View style={styles.syllabusContainer}>
//       <LinearGradient
//         colors={['#f6f9fc', '#e9f1f9']}
//         style={styles.background}
//       />
//       <Text style={styles.syllabusTitle}>NEET Syllabus</Text>
//       <Animated.ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         {renderSubjectDetails('Physics', physicsTopics)}
//         {renderSubjectDetails('Chemistry', chemistryTopics)}
//         <Animated.View
//           entering={FadeInUp.delay(200).springify()}
//           style={styles.subjectCard}
//         >
//           <Text style={styles.subjectTitle}>Biology</Text>
//           {Object.entries(biologyTopics).map(([branch, sections], branchIndex) => (
//             <View key={branchIndex} style={styles.branchContainer}>
//               <Text style={styles.branchTitle}>{branch}</Text>
//               {Object.entries(sections).map(([sectionTitle, topics], sectionIndex) => (
//                 <View key={sectionIndex} style={styles.sectionContainer}>
//                   <Text style={styles.sectionTitle}>{sectionTitle}</Text>
//                   {topics.map((topic, topicIndex) => (
//                     <Text key={topicIndex} style={styles.topicText}>• {topic}</Text>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           ))}
//         </Animated.View>
//       </Animated.ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   syllabusContainer: {
//     flex: 1,
//     paddingTop: hp('5%'),
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
//   syllabusTitle: {
//     fontSize: wp('6%'),
//     fontWeight: '700',
//     color: '#1a1a1a',
//     textAlign: 'center',
//     marginBottom: hp('2.5%'),
//   },
//   scrollView: {
//     paddingHorizontal: wp('5%'),
//   },
//   subjectCard: {
//     backgroundColor: '#fff',
//     borderRadius: wp('4%'),
//     padding: wp('5%'),
//     marginBottom: hp('2%'),
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: hp('0.25%'),
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: wp('1%'),
//   },
//   subjectTitle: {
//     fontSize: wp('5%'),
//     fontWeight: '600',
//     color: '#1a1a1a',
//     marginBottom: hp('1.5%'),
//   },
//   branchContainer: {
//     marginTop: hp('1.5%'),
//   },
//   branchTitle: {
//     fontSize: wp('4.8%'),
//     fontWeight: '600',
//     color: '#2a2a2a',
//     marginBottom: hp('1%'),
//   },
//   sectionContainer: {
//     marginTop: hp('1%'),
//     marginLeft: wp('2%'),
//   },
//   sectionTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: '500',
//     color: '#2a2a2a',
//     marginBottom: hp('1%'),
//   },
//   topicText: {
//     fontSize: wp('4%'),
//     color: '#4a4a4a',
//     marginBottom: hp('1%'),
//     lineHeight: hp('3%'),
//     paddingLeft: wp('3%'),
//   },
// });

// export default NEETScreen;

// import React from 'react';
// import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const { width } = Dimensions.get('window');

// const NEETScreen = () => {
//   const renderSubjectDetails = (title, sections, gradientColors) => (
//     <Animated.View
//       entering={FadeInUp.delay(200).springify()}
//       style={styles.subjectCard}
//     >
//       <LinearGradient
//         colors={gradientColors}
//         style={styles.cardGradient}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//       >
//         <Text style={styles.subjectTitle}>{title}</Text>
//         {Object.entries(sections).map(([sectionTitle, topics], index) => (
//           <View key={index} style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>{sectionTitle}</Text>
//             {topics.map((topic, topicIndex) => (
//               <Text key={topicIndex} style={styles.topicText}>• {topic}</Text>
//             ))}
//           </View>
//         ))}
//       </LinearGradient>
//     </Animated.View>
//   );

//   // Keeping your existing topic definitions...
//   const physicsTopics = {
//     'Mechanics': [
//       'Kinematics',
//       'Laws of Motion',
//       'Work, Energy and Power',
//       'Rotational Motion',
//       'Gravitation',
//       'Properties of Solids and Liquids'
//     ],
//     // ... rest of physics topics
//   };

//   const chemistryTopics = {
//     'Physical Chemistry': [
//       'States of Matter',
//       'Atomic Structure',
//       'Chemical Bonding',
//       'Chemical Thermodynamics',
//       'Solutions',
//       'Electrochemistry',
//       'Chemical Kinetics',
//       'Surface Chemistry',
//       'Nuclear Chemistry'
//     ],
//     // ... rest of chemistry topics
//   };

//   const biologyTopics = {
//     'Botany': {
//       'Diversity in Living World': [
//         'Living World',
//         'Biological Classification',
//         'Plant Kingdom',
//         'Animal Kingdom'
//       ],
//       // ... rest of botany topics
//     },
//     'Zoology': {
//       'Human Physiology': [
//         'Digestion and Absorption',
//         'Breathing and Exchange of Gases',
//         'Body Fluids and Circulation',
//         'Excretory Products',
//         'Locomotion and Movement',
//         'Neural Control and Coordination',
//         'Chemical Coordination and Integration'
//       ],
//       // ... rest of zoology topics
//     }
//   };

//   const renderBiologyCard = () => (
//     <Animated.View
//       entering={FadeInUp.delay(200).springify()}
//       style={styles.subjectCard}
//     >
//       <LinearGradient
//         colors={['#FF9800', '#F57C00']}
//         style={styles.cardGradient}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//       >
//         <Text style={styles.subjectTitle}>Biology</Text>
//         {Object.entries(biologyTopics).map(([branch, sections], branchIndex) => (
//           <View key={branchIndex} style={styles.branchContainer}>
//             <Text style={styles.branchTitle}>{branch}</Text>
//             {Object.entries(sections).map(([sectionTitle, topics], sectionIndex) => (
//               <View key={sectionIndex} style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>{sectionTitle}</Text>
//                 {topics.map((topic, topicIndex) => (
//                   <Text key={topicIndex} style={styles.topicText}>• {topic}</Text>
//                 ))}
//               </View>
//             ))}
//           </View>
//         ))}
//       </LinearGradient>
//     </Animated.View>
//   );

//   return (
//     <View style={styles.syllabusContainer}>
//       <LinearGradient
//         colors={['#1a1a1a', '#2a2a2a']}
//         style={styles.background}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
//       <Animated.Text 
//         entering={FadeInDown.delay(200).springify()}
//         style={styles.syllabusTitle}
//       >
//         NEET Syllabus
//       </Animated.Text>
//       <Animated.ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         {renderSubjectDetails('Physics', physicsTopics, ['#4CAF50', '#45a049'])}
//         {renderSubjectDetails('Chemistry', chemistryTopics, ['#2196F3', '#1976D2'])}
//         {renderBiologyCard()}
//       </Animated.ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   syllabusContainer: {
//     flex: 1,
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
//   syllabusTitle: {
//     fontSize: wp('7%'),
//     fontWeight: '700',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginVertical: hp('2.5%'),
//   },
//   scrollView: {
//     paddingHorizontal: wp('5%'),
//   },
//   subjectCard: {
//     marginBottom: hp('2%'),
//     borderRadius: wp('4%'),
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: hp('0.5%'),
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: wp('2%'),
//   },
//   cardGradient: {
//     borderRadius: wp('4%'),
//     padding: wp('5%'),
//   },
//   subjectTitle: {
//     fontSize: wp('6%'),
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: hp('2%'),
//   },
//   branchContainer: {
//     marginTop: hp('1.5%'),
//   },
//   branchTitle: {
//     fontSize: wp('5%'),
//     fontWeight: '600',
//     color: '#fff',
//     marginBottom: hp('1%'),
//     opacity: 0.95,
//   },
//   sectionContainer: {
//     marginTop: hp('1%'),
//     marginLeft: wp('2%'),
//   },
//   sectionTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: '500',
//     color: '#fff',
//     marginBottom: hp('1%'),
//     opacity: 0.9,
//   },
//   topicText: {
//     fontSize: wp('4%'),
//     color: '#fff',
//     marginBottom: hp('1%'),
//     lineHeight: hp('3%'),
//     paddingLeft: wp('3%'),
//     opacity: 0.8,
//   },
// });

// export default NEETScreen;

import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const NEETScreen = () => {
  const renderSubjectDetails = (title, sections, gradientColors) => (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={styles.subjectCard}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <Text style={styles.subjectTitle}>{title}</Text>
        {Object.entries(sections).map(([sectionTitle, topics], index) => (
          <View key={index} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            {topics.map((topic, topicIndex) => (
              <Text key={topicIndex} style={styles.topicText}>• {topic}</Text>
            ))}
          </View>
        ))}
      </LinearGradient>
    </Animated.View>
  );

  const physicsTopics = {
    'Mechanics': [
      'Kinematics',
      'Laws of Motion',
      'Work, Energy and Power',
      'Rotational Motion',
      'Gravitation',
      'Properties of Solids and Liquids'
    ],
    'Thermodynamics & KTG': [
      'Thermal Properties of Matter',
      'Thermodynamics',
      'Kinetic Theory of Gases'
    ],
    'Electromagnetism': [
      'Electrostatics',
      'Current Electricity',
      'Magnetic Effects of Current',
      'Electromagnetic Induction',
      'Alternating Current'
    ],
    'Optics & Modern Physics': [
      'Ray Optics',
      'Wave Optics',
      'Dual Nature of Matter',
      'Atoms and Nuclei',
      'Semiconductor Electronics'
    ]
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
      'Nuclear Chemistry'
    ],
    'Inorganic Chemistry': [
      'Periodic Table',
      's-Block Elements',
      'p-Block Elements',
      'd & f Block Elements',
      'Coordination Compounds',
      'Environmental Chemistry'
    ],
    'Organic Chemistry': [
      'Basic Concepts',
      'Hydrocarbons',
      'Organic Compounds with Functional Groups',
      'Biomolecules',
      'Polymers',
      'Chemistry in Everyday Life'
    ]
  };

  const biologyTopics = {
    'Botany': {
      'Diversity in Living World': [
        'Living World',
        'Biological Classification',
        'Plant Kingdom',
        'Animal Kingdom'
      ],
      'Plant Physiology': [
        'Transport in Plants',
        'Mineral Nutrition',
        'Photosynthesis',
        'Respiration',
        'Plant Growth and Development'
      ],
      'Plant Reproduction': [
        'Reproduction in Organisms',
        'Sexual Reproduction in Flowering Plants',
        'Human Reproduction',
        'Reproductive Health'
      ],
      'Genetics and Evolution': [
        'Principles of Inheritance and Variation',
        'Molecular Basis of Inheritance',
        'Evolution'
      ]
    },
    'Zoology': {
      'Human Physiology': [
        'Digestion and Absorption',
        'Breathing and Exchange of Gases',
        'Body Fluids and Circulation',
        'Excretory Products',
        'Locomotion and Movement',
        'Neural Control and Coordination',
        'Chemical Coordination and Integration'
      ],
      'Ecology & Environment': [
        'Organisms and Environment',
        'Biodiversity and Conservation',
        'Environmental Issues'
      ],
      'Cell Biology': [
        'Cell Structure and Function',
        'Biomolecules',
        'Cell Cycle and Cell Division',
        'Transport in Cells'
      ]
    }
  };

  const renderBiologyCard = () => (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={styles.subjectCard}
    >
      <LinearGradient
        colors={['#FF9800', '#F57C00']}
        style={styles.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <Text style={styles.subjectTitle}>Biology</Text>
        {Object.entries(biologyTopics).map(([branch, sections], branchIndex) => (
          <View key={branchIndex} style={styles.branchContainer}>
            <Text style={styles.branchTitle}>{branch}</Text>
            {Object.entries(sections).map(([sectionTitle, topics], sectionIndex) => (
              <View key={sectionIndex} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                {topics.map((topic, topicIndex) => (
                  <Text key={topicIndex} style={styles.topicText}>• {topic}</Text>
                ))}
              </View>
            ))}
          </View>
        ))}
      </LinearGradient>
    </Animated.View>
  );

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
        style={styles.syllabusTitle}
      >
        NEET Syllabus
      </Animated.Text>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderSubjectDetails('Physics', physicsTopics, ['#4CAF50', '#45a049'])}
        {renderSubjectDetails('Chemistry', chemistryTopics, ['#2196F3', '#1976D2'])}
        {renderBiologyCard()}
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
  branchContainer: {
    marginTop: hp('1.5%'),
  },
  branchTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#fff',
    marginBottom: hp('1%'),
    opacity: 0.95,
  },
  sectionContainer: {
    marginTop: hp('1%'),
    marginLeft: wp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '500',
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

export default NEETScreen;