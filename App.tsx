import React, { useState } from 'react';
import { AppMode } from './types';
import { SCENARIOS } from './constants';
import Layout from './components/Layout';
import StudyCard from './components/StudyCard';
import QuizMode from './components/QuizMode';
import { ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('home');

  const renderContent = () => {
    switch (mode) {
      case 'study':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                インプット学習
              </h2>
              <p className="text-slate-600">
                以下の10個の事例を読み、それぞれの特徴に合った病院分類を覚えましょう。
                解説を読み込むことで、応用力が身につきます。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {SCENARIOS.map((scenario) => (
                <StudyCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </div>
        );
      case 'quiz':
        return <QuizMode />;
      case 'home':
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fadeIn">
            <div className="bg-white p-4 rounded-full shadow-md mb-8">
              <BrainCircuit className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
              病院分類<br className="md:hidden" />一問一答道場
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mb-12 leading-relaxed">
              看護師のキャリア選択において重要な「病院区分」「機能」「病棟」。<br/>
              具体的な希望条件から、最適な職場を見極める力を養いましょう。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
              <button 
                onClick={() => setMode('study')}
                className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all text-left"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen className="w-24 h-24 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">インプット学習</h3>
                <p className="text-slate-500 mb-6">全10問の事例と解説を一覧で確認し、知識を定着させます。</p>
                <span className="inline-flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
                  学習を始める <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>

              <button 
                onClick={() => setMode('quiz')}
                className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-left"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <BrainCircuit className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">実践クイズ道場</h3>
                <p className="text-indigo-100 mb-6">学習した内容をテスト形式で確認。全問正解を目指しましょう。</p>
                <span className="inline-flex items-center text-white font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  挑戦する <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout currentMode={mode} onModeChange={setMode}>
      {renderContent()}
    </Layout>
  );
};

export default App;