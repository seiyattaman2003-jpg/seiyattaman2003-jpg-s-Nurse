import React from 'react';
import { Scenario } from '../types';
import { Tag, CheckCircle2, Building2, Stethoscope, Bed } from 'lucide-react';

interface StudyCardProps {
  scenario: Scenario;
}

const StudyCard: React.FC<StudyCardProps> = ({ scenario }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">
            問 {scenario.id}
          </span>
          <div className="flex gap-1 flex-wrap">
            {scenario.tags.map((tag) => (
              <span key={tag} className="flex items-center text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-lg font-medium text-slate-800 leading-relaxed">
          {scenario.questionText}
        </h3>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h4 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 正解
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="text-xs text-indigo-500 font-bold mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3" /> 病院区分
              </div>
              <div className="text-indigo-900 font-semibold">{scenario.correctAnswer.category}</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="text-xs text-indigo-500 font-bold mb-1 flex items-center gap-1">
                <Stethoscope className="w-3 h-3" /> 病院機能
              </div>
              <div className="text-indigo-900 font-semibold">{scenario.correctAnswer.functionType}</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="text-xs text-indigo-500 font-bold mb-1 flex items-center gap-1">
                <Bed className="w-3 h-3" /> 病棟
              </div>
              <div className="text-indigo-900 font-semibold">{scenario.correctAnswer.ward}</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <h4 className="font-bold text-amber-800 mb-2 text-sm">💡 解説ポイント</h4>
          <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {scenario.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;