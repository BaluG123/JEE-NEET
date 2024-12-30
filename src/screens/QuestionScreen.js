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

const {width} = Dimensions.get('window');

const QuestionScreen = ({route, navigation}) => {
  const {level, questions} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  useEffect(() => {
    loadQuestion();
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
      }, 2000);
    } else {
      setShowErrorModal(true);
      // Auto close error modal after 1.5 seconds
      setTimeout(() => {
        setShowErrorModal(false);
      }, 1500);
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
      {/* Level Header */}
      <View style={styles.levelHeader}>
        <Text style={styles.levelText}>Level {level}</Text>
        <View style={styles.subjectContainer}>
          <Icon name="book-open-variant" size={20} color="#4CAF50" />
          <Text style={styles.subjectText}>{currentQuestion.subject}</Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
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

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowHintModal(true)}>
            <Icon name="lightbulb-outline" size={24} color="#FFC107" />
            <Text style={styles.iconButtonText}>Hint</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowSolutionModal(true)}>
            <Icon name="book-open-page-variant" size={24} color="#2196F3" />
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
    padding: 16,
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  levelText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  subjectText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 26,
    marginVertical: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIndex: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    width: 24,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
    paddingBottom: 16,
  },
  iconButton: {
    alignItems: 'center',
    gap: 4,
  },
  iconButtonText: {
    color: 'white',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: width * 0.8,
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  modalText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  solutionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  solutionModalContent: {
    backgroundColor: '#333',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  solutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  solutionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  solutionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default QuestionScreen;
