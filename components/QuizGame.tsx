
import React, { useState, useEffect, useCallback } from 'react';
import { generateQuizQuestions } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { QuizIcon } from './icons/QuizIcon';

type GameState = 'idle' | 'loading' | 'active' | 'finished';

export const QuizGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startQuiz = useCallback(async () => {
    setGameState('loading');
    const fetchedQuestions = await generateQuizQuestions();
    if (fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState('active');
    } else {
      setGameState('idle');
      alert('No se pudieron cargar las preguntas. Por favor, intenta de nuevo.');
    }
  }, []);

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('finished');
    }
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) {
      return 'bg-nica-white hover:bg-nica-light-gray';
    }
    if (option === questions[currentQuestionIndex].answer) {
      return 'bg-green-500 text-white';
    }
    if (option === selectedAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-nica-white opacity-60';
  };
  
  const renderContent = () => {
    switch (gameState) {
      case 'loading':
        return <LoadingSpinner message="Preparando el desafío..." />;
      case 'active':
        const q = questions[currentQuestionIndex];
        return (
          <div>
            <div className="mb-6 text-center">
                <p className="text-sm text-gray-500">Pregunta {currentQuestionIndex + 1} de {questions.length}</p>
                <h3 className="text-2xl font-semibold text-nica-dark-blue mt-2">{q.question}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                  className={`p-4 rounded-lg shadow-md text-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${getButtonClass(option)}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <div className="text-center mt-6">
                <p className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </p>
                <button onClick={handleNextQuestion} className="mt-4 bg-nica-blue hover:bg-nica-dark-blue text-white font-bold py-2 px-6 rounded-lg">
                  {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                </button>
              </div>
            )}
          </div>
        );
      case 'finished':
        return (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-nica-dark-blue">¡Reto Completado!</h3>
            <p className="text-5xl font-extrabold text-nica-blue my-4">{score} / {questions.length}</p>
            <p className="text-lg text-gray-700">¡Felicidades! Has demostrado tu conocimiento sobre nuestra cultura.</p>
            <button onClick={startQuiz} className="mt-8 bg-nica-gold hover:bg-yellow-500 text-nica-dark-blue font-bold py-3 px-8 rounded-lg text-lg">
              Jugar de Nuevo
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <QuizIcon className="w-20 h-20 mx-auto text-nica-blue opacity-50 mb-4" />
            <h3 className="text-2xl font-bold text-nica-dark-blue">¿Listo para el Reto Cultural?</h3>
            <p className="text-gray-600 my-4 max-w-md mx-auto">Pon a prueba cuánto sabes sobre Nicaragua. Cada pregunta es una oportunidad para aprender algo nuevo.</p>
            <button onClick={startQuiz} className="bg-nica-blue hover:bg-nica-dark-blue text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-200 transform hover:scale-105">
              ¡Comenzar!
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="bg-nica-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-nica-blue min-h-[500px] flex items-center justify-center">
           {renderContent()}
        </div>
    </div>
  );
};
