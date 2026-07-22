import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data';
import { BugReport, PortfolioProject } from '../types';
import { Bug, Sliders, CheckCircle, RefreshCw } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
}

export default function JiraBoard({ isDarkMode }: Props) {
  const [selectedProjIdx, setSelectedProjIdx] = useState(0);
  const [ticketStates, setTicketStates] = useState<Record<string, 'BACKLOG' | 'PROGRESS' | 'TESTING' | 'RESOLVED'>>({});
  const [selectedBug, setSelectedBug] = useState<BugReport | null>(null);

  const activeProject = PROJECTS[selectedProjIdx];

  // Distribute initial ticket states on load or project selection
  useEffect(() => {
    const states: Record<string, 'BACKLOG' | 'PROGRESS' | 'TESTING' | 'RESOLVED'> = {};
    activeProject.detailedBugs.forEach((bug, index) => {
      if (index === 0) {
        states[bug.id] = 'TESTING';
      } else if (index === 1) {
        states[bug.id] = 'PROGRESS';
      } else {
        states[bug.id] = 'BACKLOG';
      }
    });
    setTicketStates(states);
    setSelectedBug(null);
  }, [selectedProjIdx]);

  const moveTicket = (bugId: string, nextState: 'BACKLOG' | 'PROGRESS' | 'TESTING' | 'RESOLVED') => {
    setTicketStates((prev) => ({
      ...prev,
      [bugId]: nextState,
    }));
  };

  const getTicketsInLane = (lane: 'BACKLOG' | 'PROGRESS' | 'TESTING' | 'RESOLVED') => {
    return activeProject.detailedBugs.filter((b) => ticketStates[b.id] === lane);
  };

  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#150F30]/80 border-[#3B2D6E]' : 'bg-white/80 border-[#DDD6FE]'} shadow-lg transition-all duration-300 text-left`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 min-w-0">
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-purple-950'}`}>Agile Sprint Board (Jira Clone)</h3>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-purple-700/80'}`}>Select a past QA cycle to manage identified defects inside a simulated Kanban board.</p>
        </div>

        {/* Project Selector tabs */}
        <div className="w-full lg:w-auto min-w-0"><div className={`flex p-1 rounded-full border space-x-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-purple-100 border-purple-200'}`}>
          {PROJECTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProjIdx(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${selectedProjIdx === idx ? 'bg-purple-600 text-white shadow-md' : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-purple-700 hover:text-purple-900 hover:bg-purple-200/50')}`}
            >
              {p.title.split(' ')[0]} Testing
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* Grid of Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* Lane: BACKLOG */}
        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/40 border border-slate-900' : 'bg-purple-50/30 border border-purple-100'} flex flex-col min-h-64`}>
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-purple-900/10">
            <span className={`text-sm font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-purple-900'}`}>Backlog</span>
            <span className={`px-1.5 py-0.2 text-sm font-mono rounded ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-200 text-slate-700'}`}>{getTicketsInLane('BACKLOG').length}</span>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {getTicketsInLane('BACKLOG').map((bug) => (
              <div
                key={bug.id}
                onClick={() => setSelectedBug(bug)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${isDarkMode ? 'bg-[#120D2A]/60 border-slate-850 hover:border-purple-500/50' : 'bg-white border-purple-100 hover:border-purple-400'} space-y-2`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>{bug.id}</span>
                  <span className={`text-[8.5px] px-1 font-bold rounded uppercase ${(bug.severity === 'Critical' || bug.severity === 'High') ? (isDarkMode ? 'bg-rose-950 text-rose-300' : 'bg-rose-100 text-rose-700') : bug.severity === 'Medium' ? (isDarkMode ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-700') : (isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700')}`}>{bug.severity}</span>
                </div>
                <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-slate-200' : 'text-purple-950'}`}>{bug.title}</h4>
                <div className={`flex justify-end pt-1.5 border-t ${isDarkMode ? 'border-purple-900/5' : 'border-purple-200/50'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveTicket(bug.id, 'PROGRESS'); }}
                    className={`text-xs font-mono px-2.5 py-1.5 rounded-md shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-purple-950/40 text-purple-400 border border-purple-800/20 hover:bg-purple-600 hover:text-white' : 'bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-600 hover:text-white'}`}
                  >
                    Start Sprint &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lane: IN PROGRESS */}
        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/40 border border-slate-900' : 'bg-purple-50/30 border border-purple-100'} flex flex-col min-h-64`}>
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-purple-900/10">
            <span className={`text-sm font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-purple-900'}`}>In Progress</span>
            <span className={`px-1.5 py-0.2 text-sm font-mono rounded ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-200 text-slate-700'}`}>{getTicketsInLane('PROGRESS').length}</span>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {getTicketsInLane('PROGRESS').map((bug) => (
              <div
                key={bug.id}
                onClick={() => setSelectedBug(bug)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${isDarkMode ? 'bg-[#120D2A]/60 border-slate-850 hover:border-purple-500/50' : 'bg-white border-purple-100 hover:border-purple-400'} space-y-2`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>{bug.id}</span>
                  <span className={`text-[8.5px] px-1 font-bold rounded uppercase ${(bug.severity === 'Critical' || bug.severity === 'High') ? (isDarkMode ? 'bg-rose-950 text-rose-300' : 'bg-rose-100 text-rose-700') : bug.severity === 'Medium' ? (isDarkMode ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-700') : (isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700')}`}>{bug.severity}</span>
                </div>
                <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-slate-200' : 'text-purple-950'}`}>{bug.title}</h4>
                <div className={`flex justify-between items-center pt-1.5 border-t ${isDarkMode ? 'border-purple-900/5' : 'border-purple-200/50'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveTicket(bug.id, 'BACKLOG'); }}
                    className={`text-xs font-mono transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-purple-700'}`}
                  >
                    &larr; Revert
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveTicket(bug.id, 'TESTING'); }}
                    className={`text-xs font-mono px-2.5 py-1.5 rounded-md shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-purple-950/40 text-purple-400 border border-purple-800/20 hover:bg-purple-600 hover:text-white' : 'bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-600 hover:text-white'}`}
                  >
                    Deploy to QA &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lane: IN TESTING */}
        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/40 border border-slate-900' : 'bg-purple-50/30 border border-purple-100'} flex flex-col min-h-64`}>
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-purple-900/10">
            <span className={`text-sm font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-purple-900'}`}>In Testing</span>
            <span className={`px-1.5 py-0.2 text-sm font-mono rounded ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-200 text-slate-700'}`}>{getTicketsInLane('TESTING').length}</span>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {getTicketsInLane('TESTING').map((bug) => (
              <div
                key={bug.id}
                onClick={() => setSelectedBug(bug)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${isDarkMode ? 'bg-[#120D2A]/60 border-slate-850 hover:border-purple-500/50' : 'bg-white border-purple-100 hover:border-purple-400'} space-y-2`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>{bug.id}</span>
                  <span className={`text-[8.5px] px-1 font-bold rounded uppercase ${(bug.severity === 'Critical' || bug.severity === 'High') ? (isDarkMode ? 'bg-rose-950 text-rose-300' : 'bg-rose-100 text-rose-700') : bug.severity === 'Medium' ? (isDarkMode ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-700') : (isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700')}`}>{bug.severity}</span>
                </div>
                <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-slate-200' : 'text-purple-950'}`}>{bug.title}</h4>
                <div className={`flex justify-between items-center pt-1.5 border-t ${isDarkMode ? 'border-purple-900/5' : 'border-purple-200/50'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveTicket(bug.id, 'PROGRESS'); }}
                    className={`text-xs font-mono transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-purple-700'}`}
                  >
                    &larr; Reject
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveTicket(bug.id, 'RESOLVED'); }}
                    className={`text-xs font-mono px-2.5 py-1.5 rounded-md shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/30 hover:bg-emerald-600 hover:text-white' : 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white'}`}
                  >
                    Sign Off &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lane: RESOLVED */}
        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/40 border border-slate-900' : 'bg-purple-50/30 border border-purple-100'} flex flex-col min-h-64`}>
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-purple-900/10">
            <span className={`text-sm font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-purple-900'}`}>Resolved</span>
            <span className={`px-1.5 py-0.2 text-sm font-mono rounded ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-200 text-slate-700'}`}>{getTicketsInLane('RESOLVED').length}</span>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {getTicketsInLane('RESOLVED').map((bug) => (
              <div
                key={bug.id}
                onClick={() => setSelectedBug(bug)}
                className={`p-3 opacity-60 rounded-lg cursor-pointer space-y-2 hover:opacity-100 transition-all border ${isDarkMode ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-100 border-slate-200'}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-mono font-bold line-through ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>[{bug.id}]</span>
                  <span className={`text-[8.5px] font-bold px-1 rounded ${isDarkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>CLOSED</span>
                </div>
                <h4 className={`text-xs font-bold leading-tight line-through ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{bug.title}</h4>
                <div className={`flex justify-start pt-1.5 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveTicket(bug.id, 'TESTING'); }}
                    className={`text-xs font-mono transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-purple-700'}`}
                  >
                    &larr; Reopen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Inspector Detail modal inside component */}
      {selectedBug && (
        <div className={`mt-6 p-5 border rounded-2xl ${isDarkMode ? 'bg-slate-950/80 border-slate-900' : 'bg-purple-50/40 border-purple-100 animate-fadeIn'}`}>
          <div className="flex items-center justify-between border-b border-purple-900/10 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 text-xs font-mono rounded font-bold border ${isDarkMode ? 'bg-purple-900/40 border-purple-800/20 text-purple-400' : 'bg-purple-100 border-purple-200 text-purple-800'}`}>{selectedBug.id}</span>
              <span className={`text-sm font-bold uppercase ${selectedBug.severity === 'Critical' || selectedBug.severity === 'High' ? 'text-rose-400' : 'text-amber-400'}`}>
                {selectedBug.severity} Priority
              </span>
            </div>
            <button
              onClick={() => setSelectedBug(null)}
              className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-purple-700'}`}
            >
              Close Inspector [X]
            </button>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <span className="text-sm uppercase font-mono text-slate-500 block">Defect Name</span>
              <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-purple-950'}`}>{selectedBug.title}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5">
              <div>
                <span className="text-sm uppercase font-mono text-slate-500 block">Steps to Reproduce (Manual Playbook)</span>
                <ol className={`list-decimal list-inside space-y-1 mt-1 font-mono text-sm ${isDarkMode ? 'text-slate-300' : 'text-purple-950'}`}>
                  {selectedBug.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm uppercase font-mono text-slate-500 block">Expected System Behavior</span>
                  <p className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>{selectedBug.expected}</p>
                </div>
                <div>
                  <span className="text-sm uppercase font-mono text-slate-500 block">Actual System Outcome</span>
                  <p className={`font-semibold ${isDarkMode ? 'text-rose-400' : 'text-rose-800'}`}>{selectedBug.actual}</p>
                </div>
                <div>
                  <span className="text-sm uppercase font-mono text-slate-500 block">Diagnostics Environment</span>
                  <span className={`font-mono text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{selectedBug.environment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
