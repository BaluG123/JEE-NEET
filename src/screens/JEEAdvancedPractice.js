// import {Dimensions} from 'react-native';
// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Animated,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Reanimated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import questionsData from '../util/Advanced.json';

// const JEEAdvancedScreen = ({navigation}) => {
//   // States
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showSolution, setShowSolution] = useState(false);
//   const [showHint, setShowHint] = useState(false);
//   const [timer, setTimer] = useState(180);
//   const [questionsAttempted, setQuestionsAttempted] = useState(new Set());
//   const [correctAnswers, setCorrectAnswers] = useState(new Set());
//   const [progressWidth, setProgressWidth] = useState(0);

//   // Animations
//   const fadeAnim = useSharedValue(1);
//   const scaleAnim = useSharedValue(1);

//   // Load questions and restore progress
//   useEffect(() => {
//     const initializeQuiz = async () => {
//       try {
//         setQuestions(questionsData.questions);
//         const savedProgress = await AsyncStorage.getItem('progress');
//         if (savedProgress) {
//           const progress = JSON.parse(savedProgress);
//           setQuestionsAttempted(new Set(progress.questionsAttempted));
//           setCorrectAnswers(new Set(progress.correctAnswers));
//           setCurrentQuestionIndex(progress.currentQuestionIndex);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to initialize quiz');
//         setLoading(false);
//       }
//     };

//     initializeQuiz();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (questions.length > 0) {
//       setProgressWidth(questionsAttempted.size / questions.length);
//     }
//   }, [questionsAttempted, questions]);

//   useEffect(() => {
//     const saveProgress = async () => {
//       try {
//         const progress = {
//           questionsAttempted: Array.from(questionsAttempted),
//           correctAnswers: Array.from(correctAnswers),
//           currentQuestionIndex,
//         };
//         await AsyncStorage.setItem('progress', JSON.stringify(progress));
//       } catch (err) {
//         console.error('Failed to save progress:', err);
//       }
//     };

//     saveProgress();
//   }, [questionsAttempted, correctAnswers, currentQuestionIndex]);

//   // Modified handleAnswerSelect function
//   const handleAnswerSelect = useCallback(
//     optionId => {
//       // Remove the check for already attempted questions to allow re-selection
//       setSelectedAnswer(optionId);

//       // Add to attempted questions
//       const newQuestionsAttempted = new Set(questionsAttempted);
//       newQuestionsAttempted.add(currentQuestionIndex);
//       setQuestionsAttempted(newQuestionsAttempted);

//       // Update correct answers
//       if (optionId === questions[currentQuestionIndex].correctAnswer) {
//         const newCorrectAnswers = new Set(correctAnswers);
//         newCorrectAnswers.add(currentQuestionIndex);
//         setCorrectAnswers(newCorrectAnswers);
//       } else {
//         // Remove from correct answers if previously correct
//         const newCorrectAnswers = new Set(correctAnswers);
//         newCorrectAnswers.delete(currentQuestionIndex);
//         setCorrectAnswers(newCorrectAnswers);
//       }

//       // Animate the selection
//       Animated.sequence([
//         Animated.timing(new Animated.Value(1), {
//           toValue: 0.95,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//         Animated.timing(new Animated.Value(0.95), {
//           toValue: 1,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     },
//     [currentQuestionIndex, questions, questionsAttempted, correctAnswers],
//   );

//   const navigateToNextQuestion = useCallback(() => {
//     if (currentQuestionIndex < questions.length - 1) {
//       fadeAnim.value = withTiming(0, {duration: 200});
//       setTimeout(() => {
//         setCurrentQuestionIndex(prev => prev + 1);
//         setSelectedAnswer(null);
//         setShowSolution(false);
//         setShowHint(false);
//         setTimer(180);
//         fadeAnim.value = withTiming(1, {duration: 200});
//       }, 200);
//     }
//   }, [currentQuestionIndex, questions.length]);

//   const navigateToPreviousQuestion = useCallback(() => {
//     if (currentQuestionIndex > 0) {
//       fadeAnim.value = withTiming(0, {duration: 200});
//       setTimeout(() => {
//         setCurrentQuestionIndex(prev => prev - 1);
//         setSelectedAnswer(null);
//         setShowSolution(false);
//         setShowHint(false);
//         setTimer(180);
//         fadeAnim.value = withTiming(1, {duration: 200});
//       }, 200);
//     }
//   }, [currentQuestionIndex]);

//   const formatTime = seconds => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#3b5998" />
//         <Text style={styles.loadingText}>Loading questions...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => window.location.reload()}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <LinearGradient
//         colors={['#4c669f', '#3b5998', '#192f6a']}
//         style={styles.gradient}>
//         <ScrollView style={styles.scrollView}>
//           <View style={styles.header}>
//             <View style={styles.progressBarContainer}>
//               <Animated.View
//                 style={[
//                   styles.progressBar,
//                   {
//                     width: `${progressWidth * 100}%`,
//                   },
//                 ]}
//               />
//             </View>
//             <View style={styles.timerContainer}>
//               <Icon name="clock-outline" size={24} color="#FFF" />
//               <Text style={styles.timerText}>{formatTime(timer)}</Text>
//               <Text style={styles.scoreText}>
//                 {correctAnswers.size}/{questionsAttempted.size}
//               </Text>
//             </View>
//           </View>

//           <Reanimated.View style={[styles.questionCard, {opacity: fadeAnim}]}>
//             <View style={styles.questionHeader}>
//               <Text style={styles.questionNumber}>
//                 Question {currentQuestionIndex + 1}/{questions.length}
//               </Text>
//               <View style={styles.badges}>
//                 <View style={[styles.badge, {backgroundColor: '#4CAF50'}]}>
//                   <Text style={styles.badgeText}>
//                     Level {questions[currentQuestionIndex].difficulty}
//                   </Text>
//                 </View>
//                 <View style={[styles.badge, {backgroundColor: '#2196F3'}]}>
//                   <Text style={styles.badgeText}>
//                     {questions[currentQuestionIndex].chapter}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <Text style={styles.questionText}>
//               {questions[currentQuestionIndex].question}
//             </Text>

//             {/* Modified Options Section */}
//             {questions[currentQuestionIndex].options.map(option => (
//               <TouchableOpacity
//                 key={option.id}
//                 activeOpacity={0.7}
//                 style={[
//                   styles.optionButton,
//                   selectedAnswer === option.id && styles.selectedOption,
//                   selectedAnswer === option.id &&
//                     option.id ===
//                       questions[currentQuestionIndex].correctAnswer &&
//                     styles.correctOption,
//                   selectedAnswer === option.id &&
//                     option.id !==
//                       questions[currentQuestionIndex].correctAnswer &&
//                     styles.wrongOption,
//                 ]}
//                 onPress={() => handleAnswerSelect(option.id)}>
//                 <Text
//                   style={[
//                     styles.optionText,
//                     selectedAnswer === option.id && styles.selectedOptionText,
//                   ]}>
//                   {option.text}
//                 </Text>
//                 {selectedAnswer === option.id && (
//                   <Icon
//                     name={
//                       option.id ===
//                       questions[currentQuestionIndex].correctAnswer
//                         ? 'check-circle'
//                         : 'close-circle'
//                     }
//                     size={24}
//                     color={
//                       option.id ===
//                       questions[currentQuestionIndex].correctAnswer
//                         ? '#4CAF50'
//                         : '#F44336'
//                     }
//                   />
//                 )}
//               </TouchableOpacity>
//             ))}

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => setShowHint(!showHint)}>
//                 <Icon name="lightbulb-outline" size={24} color="#FFF" />
//                 <Text style={styles.buttonText}>
//                   {showHint ? 'Hide Hint' : 'Show Hint'}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => setShowSolution(!showSolution)}>
//                 <Icon name="book-open-variant" size={24} color="#FFF" />
//                 <Text style={styles.buttonText}>
//                   {showSolution ? 'Hide Solution' : 'Show Solution'}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {showHint && (
//               <View style={styles.hintContainer}>
//                 <Text style={styles.hintText}>
//                   {questions[currentQuestionIndex].hint}
//                 </Text>
//               </View>
//             )}

//             {showSolution && (
//               <View style={styles.solutionContainer}>
//                 <Text style={styles.solutionTitle}>Solution:</Text>
//                 {questions[currentQuestionIndex].solution.steps.map(
//                   (step, index) => (
//                     <Text key={index} style={styles.solutionStep}>
//                       {index + 1}. {step}
//                     </Text>
//                   ),
//                 )}
//               </View>
//             )}
//           </Reanimated.View>
//         </ScrollView>

//         <View style={styles.navigationButtons}>
//           <TouchableOpacity
//             style={[
//               styles.navButton,
//               currentQuestionIndex === 0 && styles.disabledButton,
//             ]}
//             onPress={navigateToPreviousQuestion}
//             disabled={currentQuestionIndex === 0}>
//             <Icon name="chevron-left" size={24} color="#FFF" />
//             <Text style={styles.navButtonText}>Previous</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.navButton,
//               currentQuestionIndex === questions.length - 1 &&
//                 styles.disabledButton,
//             ]}
//             onPress={navigateToNextQuestion}
//             disabled={currentQuestionIndex === questions.length - 1}>
//             <Text style={styles.navButtonText}>Next</Text>
//             <Icon name="chevron-right" size={24} color="#FFF" />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </GestureHandlerRootView>
//   );
// };

import {Dimensions} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import questionsData from '../util/Advanced.json';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const {width} = Dimensions.get('window');

// Replace with your ad unit ID
const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-2627956667785383/3331162967';

const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['education', 'learning'],
});

const JEEAdvancedScreen = ({navigation}) => {
  // States
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(180);
  const [questionsAttempted, setQuestionsAttempted] = useState(new Set());
  const [correctAnswers, setCorrectAnswers] = useState(new Set());
  const [progressWidth, setProgressWidth] = useState(0);
  const [rewardedAdLoaded, setRewardedAdLoaded] = useState(false);

  // Animations
  const fadeAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);

  // Load questions and restore progress
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setQuestions(questionsData.questions);
        const savedProgress = await AsyncStorage.getItem('progress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          setQuestionsAttempted(new Set(progress.questionsAttempted));
          setCorrectAnswers(new Set(progress.correctAnswers));
          setCurrentQuestionIndex(progress.currentQuestionIndex);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to initialize quiz');
        setLoading(false);
      }
    };

    initializeQuiz();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setProgressWidth(questionsAttempted.size / questions.length);
    }
  }, [questionsAttempted, questions]);

  useEffect(() => {
    const saveProgress = async () => {
      try {
        const progress = {
          questionsAttempted: Array.from(questionsAttempted),
          correctAnswers: Array.from(correctAnswers),
          currentQuestionIndex,
        };
        await AsyncStorage.setItem('progress', JSON.stringify(progress));
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    };

    saveProgress();
  }, [questionsAttempted, correctAnswers, currentQuestionIndex]);

  useEffect(() => {
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
        setShowSolution(true);
      },
    );

    // Start loading the rewarded ad straight away
    rewardedAd.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // Modified handleAnswerSelect function
  const handleAnswerSelect = useCallback(
    optionId => {
      // Remove the check for already attempted questions to allow re-selection
      setSelectedAnswer(optionId);

      // Add to attempted questions
      const newQuestionsAttempted = new Set(questionsAttempted);
      newQuestionsAttempted.add(currentQuestionIndex);
      setQuestionsAttempted(newQuestionsAttempted);

      // Update correct answers
      if (optionId === questions[currentQuestionIndex].correctAnswer) {
        const newCorrectAnswers = new Set(correctAnswers);
        newCorrectAnswers.add(currentQuestionIndex);
        setCorrectAnswers(newCorrectAnswers);
      } else {
        // Remove from correct answers if previously correct
        const newCorrectAnswers = new Set(correctAnswers);
        newCorrectAnswers.delete(currentQuestionIndex);
        setCorrectAnswers(newCorrectAnswers);
      }

      // Animate the selection
      Animated.sequence([
        Animated.timing(new Animated.Value(1), {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(new Animated.Value(0.95), {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [currentQuestionIndex, questions, questionsAttempted, correctAnswers],
  );

  const navigateToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      fadeAnim.value = withTiming(0, {duration: 200});
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowSolution(false);
        setShowHint(false);
        setTimer(180);
        fadeAnim.value = withTiming(1, {duration: 200});
      }, 200);
    }
  }, [currentQuestionIndex, questions.length]);

  const navigateToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      fadeAnim.value = withTiming(0, {duration: 200});
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setSelectedAnswer(null);
        setShowSolution(false);
        setShowHint(false);
        setTimer(180);
        fadeAnim.value = withTiming(1, {duration: 200});
      }, 200);
    }
  }, [currentQuestionIndex]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              onPress: () => setShowSolution(true),
            },
          ],
        );
      });
    } else {
      Alert.alert(
        'Just a Moment',
        'The ad is taking a bit longer to load. We willl show you the solution right away instead!',
        [
          {
            text: 'Show Solution',
            onPress: () => setShowSolution(true),
          },
        ],
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: `${progressWidth * 100}%`,
                  },
                ]}
              />
            </View>
            <View style={styles.timerContainer}>
              <Icon name="clock-outline" size={24} color="#FFF" />
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
              <Text style={styles.scoreText}>
                {correctAnswers.size}/{questionsAttempted.size}
              </Text>
            </View>
          </View>

          <Reanimated.View style={[styles.questionCard, {opacity: fadeAnim}]}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                Question {currentQuestionIndex + 1}/{questions.length}
              </Text>
              <View style={styles.badges}>
                <View style={[styles.badge, {backgroundColor: '#4CAF50'}]}>
                  <Text style={styles.badgeText}>
                    Level {questions[currentQuestionIndex].difficulty}
                  </Text>
                </View>
                <View style={[styles.badge, {backgroundColor: '#2196F3'}]}>
                  <Text style={styles.badgeText}>
                    {questions[currentQuestionIndex].chapter}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.questionText}>
              {questions[currentQuestionIndex].question}
            </Text>

            {questions[currentQuestionIndex].options.map(option => (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.7}
                style={[
                  styles.optionButton,
                  selectedAnswer === option.id && styles.selectedOption,
                  selectedAnswer === option.id &&
                    option.id ===
                      questions[currentQuestionIndex].correctAnswer &&
                    styles.correctOption,
                  selectedAnswer === option.id &&
                    option.id !==
                      questions[currentQuestionIndex].correctAnswer &&
                    styles.wrongOption,
                ]}
                onPress={() => handleAnswerSelect(option.id)}>
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === option.id && styles.selectedOptionText,
                  ]}>
                  {option.text}
                </Text>
                {selectedAnswer === option.id && (
                  <Icon
                    name={
                      option.id ===
                      questions[currentQuestionIndex].correctAnswer
                        ? 'check-circle'
                        : 'close-circle'
                    }
                    size={24}
                    color={
                      option.id ===
                      questions[currentQuestionIndex].correctAnswer
                        ? '#4CAF50'
                        : '#F44336'
                    }
                  />
                )}
              </TouchableOpacity>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowHint(!showHint)}>
                <Icon name="lightbulb-outline" size={24} color="#FFF" />
                <Text style={styles.buttonText}>
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={showRewardedAd}>
                <Icon name="book-open-variant" size={24} color="#FFF" />
                <Text style={styles.buttonText}>
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </Text>
              </TouchableOpacity>
            </View>

            {showHint && (
              <View style={styles.hintContainer}>
                <Text style={styles.hintText}>
                  {questions[currentQuestionIndex].hint}
                </Text>
              </View>
            )}

            {showSolution && (
              <View style={styles.solutionContainer}>
                <Text style={styles.solutionTitle}>Solution:</Text>
                {questions[currentQuestionIndex].solution.steps.map(
                  (step, index) => (
                    <Text key={index} style={styles.solutionStep}>
                      {index + 1}. {step}
                    </Text>
                  ),
                )}
              </View>
            )}
          </Reanimated.View>
        </ScrollView>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === 0 && styles.disabledButton,
            ]}
            onPress={navigateToPreviousQuestion}
            disabled={currentQuestionIndex === 0}>
            <Icon name="chevron-left" size={24} color="#FFF" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === questions.length - 1 &&
                styles.disabledButton,
            ]}
            onPress={navigateToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}>
            <Text style={styles.navButtonText}>Next</Text>
            <Icon name="chevron-right" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  progressBarContainer: {
    width: '80%',
    height: hp('1%'),
    backgroundColor: '#E0E0E0',
    borderRadius: hp('0.5%'),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: hp('0.5%'),
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
    padding: wp('2%'),
  },
  timerText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  scoreText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  questionCard: {
    backgroundColor: '#FFF',
    borderRadius: wp('4%'),
    margin: wp('4%'),
    padding: wp('4%'),
    elevation: 5,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  questionNumber: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },
  badges: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  badge: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  badgeText: {
    color: '#FFF',
    fontSize: wp('3%'),
  },
  questionText: {
    fontSize: wp('4.5%'),
    color: '#333',
    marginBottom: hp('3%'),
    lineHeight: hp('3%'),
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: wp('4%'),
    marginVertical: hp('1%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: wp('4%'),
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('2%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    gap: wp('2%'),
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('3.5%'),
  },
  hintContainer: {
    backgroundColor: '#FFF9C4',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginVertical: hp('2%'),
  },
  hintText: {
    fontSize: wp('3.5%'),
    color: '#333',
  },
  solutionContainer: {
    backgroundColor: '#E8F5E9',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginVertical: hp('2%'),
  },
  solutionTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('1%'),
  },
  solutionStep: {
    fontSize: wp('3.5%'),
    color: '#333',
    marginVertical: hp('0.5%'),
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('4%'),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    gap: wp('2%'),
  },
  navButtonText: {
    color: '#FFF',
    fontSize: wp('3.5%'),
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: wp('4%'),
  },
  errorText: {
    fontSize: wp('4%'),
    color: '#F44336',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  retryButton: {
    backgroundColor: '#3b5998',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: wp('3.5%'),
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: wp('4%'),
    marginVertical: hp('1%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#3b5998',
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: wp('4%'),
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default JEEAdvancedScreen;
