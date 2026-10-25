import React from 'react';
import { AlertTriangle, RotateCcw, Home, ShieldAlert } from 'lucide-react';

/**
 * Production Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs the error, and displays a graceful Minecraft-themed fallback UI
 * instead of crashing the entire React application.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to development console safely
    console.error('ErrorBoundary caught a runtime exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="max-w-3xl mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-[#141520] border-2 border-red-500/40 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center mx-auto text-red-400 shadow-inner">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider block">
              COMPONENT EXCEPTION RECOVERED
            </span>
            <h3 className="font-pixel text-xl sm:text-2xl text-white mc-shadow">
              YOU ENCOUNTERED A RUNTIME GLITCH!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
              An unexpected rendering issue occurred within this module. The rest of the portal remains fully intact and operational.
            </p>
          </div>

          {/* Error summary */}
          {this.state.error && (
            <div className="p-3 bg-black/60 border border-red-900/40 rounded-xl text-left font-mono text-xs text-red-300 max-w-lg mx-auto overflow-x-auto">
              <span className="text-zinc-500 block mb-1">Exception:</span>
              <code>{this.state.error.message || String(this.state.error)}</code>
            </div>
          )}

          {/* Recovery Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="mc-btn mc-btn-green text-xs py-2.5 px-5 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>RESPAWN AT PORTAL HOME</span>
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mc-btn py-2.5 px-4 text-xs flex items-center gap-2 text-zinc-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>TRY RELOADING MODULE</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
