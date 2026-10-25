import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Database, 
  Search, 
  HardDrive, 
  Send, 
  Lock, 
  Clock, 
  FileText,
  ExternalLink
} from 'lucide-react';
import { playClick, playPop } from '../utils/soundFX';

export default function PrivacyNoticeModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div 
        className="bg-[#12131b] border-2 border-[#2f3144] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#252636] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 id="privacy-modal-title" className="font-pixel text-lg sm:text-xl text-white">
                PRIVACY &amp; SECURITY POLICY
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Transparent data handling practices for Minecraft Java Compendium
              </p>
            </div>
          </div>

          <button
            onClick={() => { playPop(); onClose(); }}
            className="p-1.5 rounded-xl bg-[#1b1c28] hover:bg-[#252738] text-zinc-400 hover:text-white border border-[#35374c] transition-colors"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          
          {/* 1. Data Minimization */}
          <div className="flex items-start gap-3 bg-[#171824] p-3.5 rounded-2xl border border-[#27293a]">
            <Database className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
                1. Data Minimization &amp; No Account Requirement
              </h4>
              <p className="text-zinc-400 text-xs">
                We collect only what is strictly necessary. You can browse, read all 19 encyclopedia topics, use all simulators (Crafting, Brewing, Enchanting), and inspect 1,750+ item textures completely anonymously. No accounts, logins, or user registrations exist.
              </p>
            </div>
          </div>

          {/* 2. Search Privacy */}
          <div className="flex items-start gap-3 bg-[#171824] p-3.5 rounded-2xl border border-[#27293a]">
            <Search className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
                2. 100% Client-Side Search Privacy
              </h4>
              <p className="text-zinc-400 text-xs">
                All searches (including the universal search bar, enchantment filters, and command palette) run entirely inside your browser's local JavaScript memory. Your search queries and keystrokes are never logged, tracked, or transmitted to any server.
              </p>
            </div>
          </div>

          {/* 3. Browser Storage */}
          <div className="flex items-start gap-3 bg-[#171824] p-3.5 rounded-2xl border border-[#27293a]">
            <HardDrive className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
                3. Browser Storage &amp; Cookies
              </h4>
              <p className="text-zinc-400 text-xs">
                We do not use tracking or advertising cookies. Any client-side storage is strictly reserved for non-sensitive UI preferences (such as audio mute toggle, view mode preference, and reading progress level).
              </p>
            </div>
          </div>

          {/* 4. Feedback Submissions & FormSubmit */}
          <div className="flex items-start gap-3 bg-[#171824] p-3.5 rounded-2xl border border-[#27293a]">
            <Send className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
                4. Feedback Submissions &amp; Third-Party Processing
              </h4>
              <p className="text-zinc-400 text-xs">
                The optional Feedback Desk allows visitors to report bugs and suggest corrections. Submissions are processed via FormSubmit (encrypted HTTPS endpoint) and routed directly to the developer desk. Providing an email is completely optional and only used if you request a direct follow-up reply.
              </p>
            </div>
          </div>

          {/* 5. Retention & Deletion */}
          <div className="flex items-start gap-3 bg-[#171824] p-3.5 rounded-2xl border border-[#27293a]">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
                5. Data Retention &amp; Deletion Rights
              </h4>
              <p className="text-zinc-400 text-xs">
                Submitted feedback messages are retained for a maximum of 90 days solely to resolve reported issues, after which they are permanently deleted. You can request immediate deletion of any submitted feedback by submitting a removal note via the Feedback Desk.
              </p>
            </div>
          </div>

          {/* 6. Security Headers & CSP */}
          <div className="flex items-start gap-3 bg-[#171824] p-3.5 rounded-2xl border border-[#27293a]">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
                6. Security Headers &amp; Safe Links
              </h4>
              <p className="text-zinc-400 text-xs">
                The application enforces strict Content Security Policy (CSP), frame protection (<code className="text-emerald-300">frame-ancestors 'none'</code>), and content sniffing prevention (<code className="text-emerald-300">X-Content-Type-Options: nosniff</code>). All external links open with <code className="text-emerald-300">rel="noopener noreferrer"</code>.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#252636] flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Last Reviewed: October 2026
          </span>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="mc-btn mc-btn-green py-2 px-5 text-xs font-silkscreen"
          >
            ACKNOWLEDGE &amp; CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
