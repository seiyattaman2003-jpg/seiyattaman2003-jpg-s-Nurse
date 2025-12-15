import React from 'react';
import { BookOpen, BrainCircuit, Home } from 'lucide-react';
import { AppMode } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentMode, onModeChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 font-bold text-xl cursor-pointer select-none"
            onClick={() => onModeChange('home')}
          >
            <BrainCircuit className="w-6 h-6" />
            <h1>一問一答道場</h1>
          </div>
          <nav className="flex gap-1 md:gap-4">
            <button
              onClick={() => onModeChange('study')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentMode === 'study' 
                  ? 'bg-white text-indigo-700' 
                  : 'text-indigo-100 hover:bg-indigo-500/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">インプット学習</span>
              <span className="md:hidden">学習</span>
            </button>
            <button
              onClick={() => onModeChange('quiz')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentMode === 'quiz' 
                  ? 'bg-amber-400 text-amber-900' 
                  : 'text-indigo-100 hover:bg-indigo-500/50'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span className="hidden md:inline">クイズ道場</span>
              <span className="md:hidden">クイズ</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6">
        {children}
      </main>

      <footer className="bg-slate-200 text-slate-500 py-6 text-center text-sm">
        <p>© 一問一答道場 - 看護師キャリア編</p>
      </footer>
    </div>
  );
};

export default Layout;