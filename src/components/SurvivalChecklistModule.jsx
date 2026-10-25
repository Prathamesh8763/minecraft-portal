import React, { useState, useEffect, useMemo } from 'react';
import { SURVIVAL_CHECKLISTS } from '../data/survivalChecklistsData';
import { 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Compass, 
  ArrowRight, 
  BookOpen, 
  Award,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'mc_survival_checklist_progress';

export default function SurvivalChecklistModule({ onNavigateToSection }) {
  const [activeChecklistId, setActiveChecklistId] = useState('first_day');
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist completed steps to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
    } catch (e) {
      console.warn('Failed to save checklist progress:', e);
    }
  }, [completedSteps]);

  const activeChecklist = useMemo(() => {
    return SURVIVAL_CHECKLISTS.find(c => c.id === activeChecklistId) || SURVIVAL_CHECKLISTS[0];
  }, [activeChecklistId]);

  // Overall statistics
  const totalAllSteps = useMemo(() => {
    return SURVIVAL_CHECKLISTS.reduce((acc, curr) => acc + curr.steps.length, 0);
  }, []);

  const totalCompletedCount = useMemo(() => {
    const allStepIds = new Set(SURVIVAL_CHECKLISTS.flatMap(c => c.steps.map(s => s.id)));
    return completedSteps.filter(id => allStepIds.has(id)).length;
  }, [completedSteps]);

  const overallPercent = Math.round((totalCompletedCount / totalAllSteps) * 100) || 0;

  // Active checklist statistics
  const activeCompletedCount = useMemo(() => {
    return activeChecklist.steps.filter(s => completedSteps.includes(s.id)).length;
  }, [activeChecklist, completedSteps]);

  const activePercent = Math.round((activeCompletedCount / activeChecklist.steps.length) * 100) || 0;

  const handleToggleStep = (stepId) => {
    const isCompleted = completedSteps.includes(stepId);
    let next;
    if (isCompleted) {
      playPop();
      next = completedSteps.filter(id => id !== stepId);
    } else {
      next = [...completedSteps, stepId];
      // Check if this step finishes the entire active checklist
      const remainingInActive = activeChecklist.steps.filter(s => s.id !== stepId && !completedSteps.includes(s.id));
      if (remainingInActive.length === 0) {
        playLevelUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#fbbf24']
        });
      } else {
        playClick();
      }
    }
    setCompletedSteps(next);
  };

  const handleResetChecklist = () => {
    if (window.confirm('Reset progress for this checklist?')) {
      playClick();
      const currentStepIds = new Set(activeChecklist.steps.map(s => s.id));
      setCompletedSteps(prev => prev.filter(id => !currentStepIds.has(id)));
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Reset ALL survival checklist milestones?')) {
      playClick();
      setCompletedSteps([]);
    }
  };

  // Jump to relevant tool
  const getToolLinkForChecklist = (checklistId) => {
    switch (checklistId) {
      case 'first_day': return { route: 'crafting', label: 'Crafting Table & 3×3 Matrix' };
      case 'nether_prep': return { route: 'brewing', label: 'Potion Brewer Simulator' };
      case 'god_gear': return { route: 'enchanting', label: 'Enchantment Lab & Anvil Tree' };
      case 'redstone_mastery': return { route: 'redstone', label: 'Redstone Engineering Lab' };
      default: return null;
    }
  };

  const toolLink = getToolLinkForChecklist(activeChecklist.id);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100 space-y-8 animate-fadeIn">
      
      {/* HEADER SECTION */}
      <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#252738]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1c28] border border-[#3b3d52] text-xs font-silkscreen text-emerald-400">
              <Award className="w-3.5 h-3.5" />
              <span>PLAYER LEARNING &amp; SURVIVAL PROGRESSION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-pixel text-white mc-shadow">
              SURVIVAL CHECKLISTS
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Step-by-step verified roadmaps from your first wooden pickaxe to 4-piece Netherite God Armor. 
              Track your milestones with zero mandatory accounts—all progress stays 100% private in browser storage.
            </p>
          </div>

          {/* OVERALL XP PROGRESS CARD */}
          <div className="bg-[#0c0d14] border-2 border-[#383a50] rounded-2xl p-4 w-full md:w-64 shrink-0 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">TOTAL PROGRESS</span>
              <span className="text-emerald-400 font-bold">{totalCompletedCount} / {totalAllSteps} ({overallPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400">
              <span>{SURVIVAL_CHECKLISTS.length} Checklists</span>
              <button 
                onClick={handleResetAll}
                className="hover:text-red-400 transition-colors"
                title="Reset all milestones"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>

        {/* CHECKLIST TAB SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
          {SURVIVAL_CHECKLISTS.map(cl => {
            const isSelected = activeChecklist.id === cl.id;
            const completedInCl = cl.steps.filter(s => completedSteps.includes(s.id)).length;
            const percent = Math.round((completedInCl / cl.steps.length) * 100);
            const isFinished = percent === 100;

            return (
              <button
                key={cl.id}
                onClick={() => {
                  playClick();
                  setActiveChecklistId(cl.id);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1e202e] border-emerald-400 shadow-lg ring-2 ring-emerald-500/20'
                    : 'bg-[#151620] border-[#2b2d3d] hover:border-zinc-500 hover:bg-[#1a1b26]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      {cl.badge}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isFinished 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {percent}%
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1 mb-1">
                    {cl.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {cl.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{completedInCl} of {cl.steps.length} done</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {cl.estimatedTime}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE CHECKLIST TASK LIST */}
      <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
        
        {/* CHECKLIST TITLE & METADATA BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252738]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                {activeChecklist.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400">
                Applicable: {activeChecklist.applicableVersion}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {activeChecklist.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              {activeChecklist.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetChecklist}
              className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Reset tasks for this checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset List</span>
            </button>

            {toolLink && (
              <button
                onClick={() => {
                  playLevelUp();
                  if (onNavigateToSection) {
                    onNavigateToSection(toolLink.route);
                  } else {
                    window.location.hash = `#${toolLink.route}`;
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/30"
              >
                <span>{toolLink.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* PROGRESS METER */}
        <div className="bg-[#0c0d14] p-4 rounded-2xl border border-[#2b2d3e]">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-zinc-300 font-bold">
              Checklist Completion ({activeCompletedCount} of {activeChecklist.steps.length} Tasks)
            </span>
            <span className="text-emerald-400 font-bold text-sm">
              {activePercent}%
            </span>
          </div>
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-[#80ff20] rounded-full transition-all duration-300"
              style={{ width: `${activePercent}%` }}
            />
          </div>
        </div>

        {/* TASKS LIST */}
        <div className="space-y-3">
          {activeChecklist.steps.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);

            return (
              <div
                key={step.id}
                onClick={() => handleToggleStep(step.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-300' 
                    : 'bg-[#161722] border-[#2e3042] hover:border-emerald-500/50 hover:bg-[#1a1b28]'
                }`}
                role="checkbox"
                aria-checked={isDone}
                tabIndex={0}
                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggleStep(step.id)}
              >
                {/* Checkbox Icon */}
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-zinc-600 hover:text-emerald-400 transition-colors" />
                  )}
                </div>

                {/* Task Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-zinc-500">
                      Step #{idx + 1}
                    </span>
                    <h4 className={`text-sm sm:text-base font-bold ${
                      isDone ? 'text-emerald-200 line-through opacity-80' : 'text-white'
                    }`}>
                      {step.task}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* PRIVACY & PERSISTENCE NOTICE */}
        <div className="p-3.5 rounded-xl bg-[#0e0f17] border border-[#2b2d3d] flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Saved 100% locally in your browser storage. Zero accounts, zero cookies, zero external telemetry.</span>
          </div>
          <span className="text-emerald-400 font-semibold hidden sm:inline">Offline Capable</span>
        </div>

      </div>

    </div>
  );
}
