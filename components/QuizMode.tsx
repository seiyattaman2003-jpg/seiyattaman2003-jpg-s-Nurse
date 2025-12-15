import React, { useState, useEffect } from 'react';
import { Scenario, Answer } from '../types';
import { SCENARIOS } from '../constants';
import StudyCard from './StudyCard';
import { 
  RefreshCw, Trophy, HelpCircle, CheckCircle2, XCircle, 
  ArrowRight, AlertTriangle, Check, X 
} from 'lucide-react';

const QuizMode: React.FC = () => {
  const [questions, setQuestions] = useState<Scenario[]>(SCENARIOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  
  // Current question state
  const [options, setOptions] = useState<Answer[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentScenario = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  // Initialize options when question changes
  useEffect(() => {
    if (!currentScenario) return;
    
    setSelectedOptionIndex(null);
    setIsCorrect(null);

    // Generate distractors
    const otherScenarios = SCENARIOS.filter(s => s.id !== currentScenario.id);
    const distractors = [...otherScenarios]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(s => s.correctAnswer);
    
    // Combine and shuffle
    const allOptions = [currentScenario.correctAnswer, ...distractors];
    const shuffled = allOptions.sort(() => 0.5 - Math.random());
    setOptions(shuffled);
  }, [currentScenario]);

  const handleOptionSelect = (index: number) => {
    if (selectedOptionIndex !== null) return;

    const selected = options[index];
    const correct = JSON.stringify(selected) === JSON.stringify(currentScenario.correctAnswer);
    
    setSelectedOptionIndex(index);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    } else {
      setWrongIds(prev => {
        // Avoid duplicates if weird race condition, though unlikely
        if (prev.includes(currentScenario.id)) return prev;
        return [...prev, currentScenario.id];
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartAll = () => {
    setQuestions(SCENARIOS);
    setWrongIds([]);
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
  };

  const restartWrong = () => {
    const wrongQuestions = SCENARIOS.filter(s => wrongIds.includes(s.id));
    setQuestions(wrongQuestions);
    setWrongIds([]);
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
  };

  if (showResult) {
    const isPerfect = score === questions.length;
    
    return (
      <div className="max-w-2xl mx-auto text-center py-10 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-indigo-100">
          <Trophy className={`w-20 h-20 mx-auto mb-6 ${isPerfect ? 'text-amber-400' : 'text-slate-300'}`} />
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {questions.length === SCENARIOS.length ? '道場修了！' : '復習完了！'}
          </h2>
          <p className="text-slate-500 mb-8">今回の成績</p>
          
          <div className="text-6xl font-black text-indigo-600 mb-6">
            {score} <span className="text-2xl text-slate-400 font-medium">/ {questions.length}</span>
          </div>
          
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {wrongIds.length > 0 && (
              <button 
                onClick={restartWrong}
                className="flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-amber-600 transition-transform active:scale-95"
              >
                <AlertTriangle className="w-5 h-5" />
                間違えた{wrongIds.length}問を復習する
              </button>
            )}
            
            <button 
              onClick={restartAll}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
                wrongIds.length > 0 
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              {questions.length !== SCENARIOS.length ? '全問を解き直す' : 'もう一度挑戦する'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Progress */}
      <div className="mb-6 sticky top-20 z-40 bg-slate-50/90 backdrop-blur-sm py-2">
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
          <span>QUESTION {currentIndex + 1} / {questions.length}</span>
          <span>SCORE: {score}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Question Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
            問題 {currentScenario.id}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed mb-6">
            {currentScenario.questionText}
          </h3>

          {!selectedOptionIndex && selectedOptionIndex !== 0 && (
             <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
               <HelpCircle className="w-4 h-4" />
               <span>正しい組み合わせを選択してください</span>
             </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, idx) => {
              // Determine styles based on state
              let btnClass = "relative p-4 rounded-xl border-2 text-left transition-all duration-200 ";
              const isSelected = selectedOptionIndex === idx;
              const isThisCorrect = JSON.stringify(option) === JSON.stringify(currentScenario.correctAnswer);
              
              if (selectedOptionIndex === null) {
                // Default state
                btnClass += "bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer shadow-sm hover:shadow-md";
              } else {
                // Revealed state
                if (isThisCorrect) {
                  // This is the correct answer
                  btnClass += "bg-green-50 border-green-500 shadow-md ring-2 ring-green-100";
                } else if (isSelected && !isThisCorrect) {
                  // This is the wrong selection
                  btnClass += "bg-red-50 border-red-500 opacity-60";
                } else {
                  // Other unselected wrong answers
                  btnClass += "bg-slate-50 border-slate-100 opacity-40 grayscale";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={selectedOptionIndex !== null}
                  className={btnClass}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-800 mb-1">{option.category}</div>
                      <div className="text-sm text-slate-600">
                        {option.functionType} / {option.ward}
                      </div>
                    </div>
                    {selectedOptionIndex !== null && isThisCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                    {selectedOptionIndex !== null && isSelected && !isThisCorrect && (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Section (Revealed after answer) */}
        {selectedOptionIndex !== null && (
          <div className="animate-slideUp">
             {/* Result Banner */}
             <div className={`p-4 rounded-xl mb-6 flex items-center justify-between shadow-sm ${
               isCorrect 
                 ? 'bg-green-100 text-green-800 border border-green-200' 
                 : 'bg-red-100 text-red-800 border border-red-200'
             }`}>
               <div className="flex items-center gap-3">
                 {isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                 <div>
                   <span className="font-bold text-lg block">{isCorrect ? '正解！' : '不正解...'}</span>
                   <span className="text-sm opacity-90">{isCorrect ? '素晴らしい！この調子でいきましょう。' : '解説を読んで復習しましょう。'}</span>
                 </div>
               </div>
             </div>

             {/* Study Card for detailed explanation */}
             <div className="mb-6 opacity-90 hover:opacity-100 transition-opacity">
               <StudyCard scenario={currentScenario} />
             </div>

             {/* Next Button */}
             <div className="flex justify-end">
               <button
                 onClick={handleNext}
                 className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform active:scale-95 text-lg"
               >
                 {currentIndex < questions.length - 1 ? '次の問題へ' : '結果を見る'}
                 <ArrowRight className="w-5 h-5" />
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMode;