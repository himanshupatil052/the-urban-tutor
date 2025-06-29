
import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Volume2 } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number;
  explanation: string;
}

interface CompletedQuiz {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  questions: QuizQuestion[];
}

interface QuizReviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const completedQuizzes: CompletedQuiz[] = [
  {
    id: 'math-1',
    subject: 'Mathematics',
    chapter: 'Algebra',
    title: 'Basic Equations Quiz',
    score: 8,
    totalQuestions: 10,
    completedAt: '2024-01-15',
    questions: [
      {
        id: 1,
        question: 'What is the value of x in the equation: 2x + 5 = 15?',
        options: ['3', '5', '7', '10'],
        correctAnswer: 1,
        selectedAnswer: 1,
        explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5'
      },
      {
        id: 2,
        question: 'Solve for y: 3y - 7 = 8',
        options: ['3', '5', '7', '15'],
        correctAnswer: 1,
        selectedAnswer: 0,
        explanation: 'Add 7 to both sides: 3y = 15, then divide by 3: y = 5'
      }
    ]
  },
  {
    id: 'physics-1',
    subject: 'Physics',
    chapter: 'Mechanics',
    title: 'Motion and Forces',
    score: 9,
    totalQuestions: 10,
    completedAt: '2024-01-14',
    questions: [
      {
        id: 1,
        question: 'What is Newton\'s first law of motion?',
        options: ['F = ma', 'An object at rest stays at rest', 'Action = Reaction', 'E = mc²'],
        correctAnswer: 1,
        selectedAnswer: 1,
        explanation: 'Newton\'s first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.'
      }
    ]
  }
];

const playTextToSpeech = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.log('Text-to-speech not supported in this browser');
  }
};

const QuizReview: React.FC<QuizReviewProps> = ({ isOpen, onClose }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<CompletedQuiz | null>(null);

  if (!isOpen) return null;

  const handleQuizSelect = (quiz: CompletedQuiz) => {
    setSelectedQuiz(quiz);
  };

  const handleBackToList = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedQuiz ? `${selectedQuiz.title} - Review` : 'Quiz Review'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {!selectedQuiz ? (
            // Quiz List View
            <div className="space-y-4">
              <p className="text-gray-600 mb-6">Review your completed quizzes and see detailed explanations.</p>
              
              {completedQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  onClick={() => handleQuizSelect(quiz)}
                  className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {quiz.subject} • {quiz.chapter}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Completed on {new Date(quiz.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        quiz.score / quiz.totalQuestions >= 0.8 ? 'text-green-600' : 
                        quiz.score / quiz.totalQuestions >= 0.6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {quiz.score}/{quiz.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Quiz Detail View
            <div className="space-y-6">
              <button
                onClick={handleBackToList}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Quiz List
              </button>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Quiz Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Subject: {selectedQuiz.subject}</p>
                    <p className="text-gray-600">Chapter: {selectedQuiz.chapter}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Score: {selectedQuiz.score}/{selectedQuiz.totalQuestions}</p>
                    <p className="text-gray-600">Percentage: {Math.round((selectedQuiz.score / selectedQuiz.totalQuestions) * 100)}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Question Review</h4>
                
                {selectedQuiz.questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800 mb-2">
                          Question {index + 1}: {question.question}
                        </h5>
                      </div>
                      <button
                        onClick={() => playTextToSpeech(question.question)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Play question aloud"
                      >
                        <Volume2 size={16} className="text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded-lg flex items-center gap-2 ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 border border-green-300'
                              : optionIndex === question.selectedAnswer && question.selectedAnswer !== question.correctAnswer
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          {optionIndex === question.correctAnswer ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : optionIndex === question.selectedAnswer && question.selectedAnswer !== question.correctAnswer ? (
                            <XCircle size={16} className="text-red-600" />
                          ) : (
                            <div className="w-4 h-4" />
                          )}
                          <span className={`${
                            optionIndex === question.correctAnswer
                              ? 'text-green-800 font-medium'
                              : optionIndex === question.selectedAnswer && question.selectedAnswer !== question.correctAnswer
                              ? 'text-red-800'
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                      <p className="text-sm text-blue-700">{question.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizReview;
