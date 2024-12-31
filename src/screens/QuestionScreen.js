// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {StorageService} from '../util/Storage';

// const QuestionScreen = ({route, navigation}) => {
//   const {level, questions} = route.params;
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadQuestion();
//   }, [level]);

//   const loadQuestion = async () => {
//     try {
//       // Find question for current level
//       const question = questions.find(q => q.level === level);
//       setCurrentQuestion(question);
//     } catch (error) {
//       console.error('Error loading question:', error);
//       Alert.alert('Error', 'Failed to load question');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswer = async selectedIndex => {
//     if (currentQuestion.correctOption === selectedIndex) {
//       await StorageService.saveCompletedLevel(level);
//       Alert.alert('Correct!', 'Moving to next level', [
//         {
//           text: 'Continue',
//           onPress: () => navigation.replace('JeeLevels'),
//         },
//       ]);
//     } else {
//       Alert.alert('Incorrect', 'Try again!');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   if (!currentQuestion) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No question found for this level</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.questionContainer}>
//         <Text style={styles.subjectText}>{currentQuestion.subject}</Text>
//         <Text style={styles.questionText}>{currentQuestion.question}</Text>

//         <View style={styles.optionsContainer}>
//           {currentQuestion.options.map((option, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.optionButton}
//               onPress={() => handleAnswer(index)}>
//               <Text style={styles.optionText}>{option}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <TouchableOpacity
//           style={styles.hintButton}
//           onPress={() => Alert.alert('Hint', currentQuestion.hint)}>
//           <Text style={styles.hintButtonText}>Show Hint</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default QuestionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1a1a',
//     padding: 16,
//   },
//   questionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   subjectText: {
//     color: '#4CAF50',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   questionText: {
//     color: 'white',
//     fontSize: 20,
//     marginBottom: 32,
//     lineHeight: 28,
//   },
//   optionsContainer: {
//     gap: 16,
//   },
//   optionButton: {
//     backgroundColor: '#333',
//     padding: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   optionText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   hintButton: {
//     marginTop: 32,
//     padding: 16,
//     backgroundColor: '#2196F3',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   hintButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StorageService} from '../util/Storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const {width} = Dimensions.get('window');

// Replace with your ad unit ID
const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-2627956667785383/7745050694';

const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['education', 'learning'],
});

const QuestionScreen = ({route, navigation}) => {
  const {level, questions} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [rewardedAdLoaded, setRewardedAdLoaded] = useState(false);

  useEffect(() => {
    loadQuestion();
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedAdLoaded(true);
      },
    );
    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        setShowSolutionModal(true);
      },
    );

    // Start loading the rewarded ad straight away
    rewardedAd.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [level]);

  const loadQuestion = async () => {
    try {
      const question = questions.find(q => q.level === level);
      setCurrentQuestion(question);
    } catch (error) {
      console.error('Error loading question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async selectedIndex => {
    if (currentQuestion.correctOption === selectedIndex) {
      await StorageService.saveCompletedLevel(level);
      setShowSuccessModal(true);
      // Auto close success modal after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.replace('JeeLevels');
      }, 1500);
    } else {
      setShowErrorModal(true);
      // Auto close error modal after 1.5 seconds
      setTimeout(() => {
        setShowErrorModal(false);
      }, 1500);
    }
  };

  const showRewardedAd = () => {
    if (rewardedAdLoaded) {
      rewardedAd.show().catch(error => {
        // console.error('Ad show error:', error);
        Alert.alert(
          'Quick Update',
          'We encountered a small hiccup with the ad, but no worries - you can still view the solution!',
          [
            {
              text: 'Show Solution',
              onPress: () => setShowSolutionModal(true),
            },
          ],
        );
      });
    } else {
      Alert.alert(
        'Just a Moment',
        'The ad is taking a bit longer to load. We will show you the solution right away instead!',
        [
          {
            text: 'Show Solution',
            onPress: () => setShowSolutionModal(true),
          },
        ],
      );
    }
  };

  const ResultModal = ({visible, onClose, isSuccess}) => (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LottieView
              source={
                isSuccess
                  ? require('../util/success.json')
                  : require('../util/error.json')
              }
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            />
            <Text style={styles.modalText}>
              {isSuccess ? 'Correct Answer!' : 'Try Again!'}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const HintModal = ({visible, onClose}) => (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.solutionModalOverlay}>
        <View style={styles.solutionModalContent}>
          <View style={styles.solutionHeader}>
            <Text style={styles.solutionTitle}>Hint</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.solutionText}>{currentQuestion?.hint}</Text>
        </View>
      </View>
    </Modal>
  );

  const SolutionModal = ({visible, onClose}) => (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.solutionModalOverlay}>
        <View style={styles.solutionModalContent}>
          <View style={styles.solutionHeader}>
            <Text style={styles.solutionTitle}>Solution</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.solutionText}>{currentQuestion?.solution}</Text>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../util/loading.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No question found for this level</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.levelHeader}>
        <Text style={styles.levelText}>Level {level}</Text>
        <View style={styles.subjectContainer}>
          <Icon name="book-open-variant" size={wp('5%')} color="#4CAF50" />
          <Text style={styles.subjectText}>{currentQuestion.subject}</Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(index)}>
                <Text style={styles.optionIndex}>
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowHintModal(true)}>
            <Icon name="lightbulb-outline" size={wp('6%')} color="#FFC107" />
            <Text style={styles.iconButtonText}>Hint</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={showRewardedAd}>
            <Icon
              name="book-open-page-variant"
              size={wp('6%')}
              color="#2196F3"
            />
            <Text style={styles.iconButtonText}>Solution</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ResultModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        isSuccess={true}
      />

      <ResultModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        isSuccess={false}
      />

      <SolutionModal
        visible={showSolutionModal}
        onClose={() => setShowSolutionModal(false)}
      />
      <HintModal
        visible={showHintModal}
        onClose={() => setShowHintModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  levelHeader: {
    padding: wp('4%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    height: hp('8%'),
  },
  levelText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  questionContainer: {
    flex: 1,
    padding: wp('4%'),
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: hp('10%'), // Space for bottom buttons
  },
  subjectText: {
    color: '#4CAF50',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  questionText: {
    color: 'white',
    fontSize: wp('4.5%'),
    lineHeight: hp('3.5%'),
    marginBottom: hp('4%'),
  },
  optionsContainer: {
    width: '100%',
    gap: hp('2%'),
  },
  optionButton: {
    backgroundColor: '#333',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
    minHeight: hp('7%'), // Reduced height
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionIndex: {
    color: '#4CAF50',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    width: wp('6%'),
  },
  optionText: {
    color: 'white',
    fontSize: wp('4%'),
    flex: 1,
    paddingRight: wp('2%'),
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('2%'),
    backgroundColor: '#1a1a1a',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    flexDirection: 'row',
    gap: wp('2%'),
  },
  iconButtonText: {
    color: 'white',
    fontSize: wp('3.5%'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#333',
    borderRadius: wp('4%'),
    padding: wp('6%'),
    alignItems: 'center',
    width: wp('80%'),
    maxWidth: 400, // Add maximum width
  },
  lottieAnimation: {
    width: wp('35%'),
    height: wp('35%'),
    maxWidth: 200, // Add maximum width
    maxHeight: 200, // Add maximum height
  },
  loadingAnimation: {
    width: wp('40%'),
    height: wp('40%'),
  },
  modalText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  solutionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  solutionModalContent: {
    backgroundColor: '#333',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    padding: wp('6%'),
    maxHeight: hp('70%'),
  },
  solutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  solutionTitle: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  closeButton: {
    padding: wp('2%'),
  },
  solutionText: {
    color: 'white',
    fontSize: wp('4%'),
    lineHeight: hp('3%'),
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('4%'),
  },
});

export default QuestionScreen;
