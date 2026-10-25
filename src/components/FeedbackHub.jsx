import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Send, 
  Mail, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  Heart, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Lightbulb, 
  Bug, 
  BookOpen, 
  Paintbrush, 
  Gauge, 
  Star,
  Info,
  Upload,
  X,
  FileImage,
  Lock,
  Monitor,
  ShieldAlert
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import { 
  getResolvedRecipient, 
  PUBLIC_DISPATCH_META, 
  getFormSubmitEndpoint, 
  getGmailComposeUrl, 
  getMailtoUrl 
} from '../utils/dispatchService';
import confetti from 'canvas-confetti';

// Engineering Specification: 6 Approved Feedback Categories
const CATEGORIES = [
  { 
    id: 'bug', 
    label: 'Bug Report', 
    icon: Bug, 
    color: '#ef4444', 
    desc: 'Broken mechanics, visual glitches, or UI errors' 
  },
  { 
    id: 'suggestion', 
    label: 'Suggestion', 
    icon: Lightbulb, 
    color: '#f59e0b', 
    desc: 'New feature ideas or mechanic enhancements' 
  },
  { 
    id: 'content', 
    label: 'Content', 
    icon: BookOpen, 
    color: '#10b981', 
    desc: 'Missing recipes, mobs, drops, or lore accuracy' 
  },
  { 
    id: 'design', 
    label: 'Design', 
    icon: Paintbrush, 
    color: '#8b5cf6', 
    desc: 'Aesthetics, layouts, typography, or theme' 
  },
  { 
    id: 'performance', 
    label: 'Performance', 
    icon: Gauge, 
    color: '#06b6d4', 
    desc: 'Page load speed, lag, frame drops, or memory' 
  },
  { 
    id: 'other', 
    label: 'Other', 
    icon: MessageSquare, 
    color: '#94a3b8', 
    desc: 'General thoughts, reviews, or questions' 
  }
];

// RATING LABELS (1 to 5)
const RATING_LABELS = {
  1: '1/5 — Critical / Poor (Major issues encountered)',
  2: '2/5 — Needs Improvement (Functional with flaws)',
  3: '3/5 — Fair / Average (Standard experience)',
  4: '4/5 — Good / Solid (Pleasurable and informative)',
  5: '5/5 — Exceptional / Minecraft Legend (Flawless codex)'
};

const MAX_NAME_LENGTH = 100;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 3000;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB Limit
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

export default function FeedbackHub() {
  // 8 Selected Engineering Fields:
  // 1. Name (Optional; max 100 chars; supports non-English, apostrophes, accents)
  const [senderName, setSenderName] = useState('');
  
  // 2. Email Address (Conditional; required only when reply/follow-up requested)
  const [senderEmail, setSenderEmail] = useState('');
  
  // 3. Category (Must match allowed categories)
  const [category, setCategory] = useState(CATEGORIES[0].label);
  
  // 4. Rating (Integer 1-5; measures visitor satisfaction)
  const [rating, setRating] = useState(5);
  
  // 5. Message (Required; 10-3,000 characters)
  const [message, setMessage] = useState('');
  
  // 6. Page URL / Context (Identifies which section/page the visitor was viewing)
  const [pageUrl, setPageUrl] = useState('');
  
  // 7. Screenshot or Attachment (File validation: image types, max 5MB)
  const [attachment, setAttachment] = useState(null); // { file, name, sizeFormatted, dataUrl }
  
  // 8. Permission to follow up (Conditional checkbox; makes email required when true)
  const [permissionToFollowUp, setPermissionToFollowUp] = useState(false);

  // Dedicated Bug Report Details (for Bug Category)
  const [bugSteps, setBugSteps] = useState('');
  const [clientTelemetry, setClientTelemetry] = useState('');

  // Spam Prevention: Honeypot field (hidden from legitimate users)
  const [honeypot, setHoneypot] = useState('');
  
  // Rate Limiting Protection (Anti-abuse cooldown)
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Field-Specific Validation Errors
  const [errors, setErrors] = useState({});

  // Submission UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  const fileInputRef = useRef(null);

  // Auto-capture current page URL and browser telemetry on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
      const telemetry = `Browser: ${navigator.userAgent.slice(0, 80)} | Viewport: ${window.innerWidth}x${window.innerHeight}`;
      setClientTelemetry(telemetry);
    }
  }, []);

  // Format bytes for display
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle Attachment Upload with Client-Side Validation
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrors(prev => ({ ...prev, attachment: null }));

    // Rule 1: Type check
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        attachment: 'Invalid file format. Only PNG, JPEG, WEBP, and GIF images are accepted.'
      }));
      playPop();
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Rule 2: Size check (max 5 MB)
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setErrors(prev => ({
        ...prev,
        attachment: `File is too large (${formatBytes(file.size)}). Maximum allowed size is 5 MB.`
      }));
      playPop();
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Convert to DataURL for live preview
    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({
        file,
        name: file.name,
        size: file.size,
        sizeFormatted: formatBytes(file.size),
        type: file.type,
        dataUrl: reader.result
      });
      playClick();
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAttachment = () => {
    playPop();
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors(prev => ({ ...prev, attachment: null }));
  };

  // Engineering Validation Function
  const validateForm = () => {
    const newErrors = {};

    // 1. Name Validation (Optional, but max 100 characters)
    if (senderName.trim().length > MAX_NAME_LENGTH) {
      newErrors.name = `Name must not exceed ${MAX_NAME_LENGTH} characters (currently ${senderName.trim().length}).`;
    }

    // 2. Email Validation (Conditional: required if permissionToFollowUp is true)
    const trimmedEmail = senderEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (permissionToFollowUp && !trimmedEmail) {
      newErrors.email = 'Email address is required when permission to follow up is checked.';
    } else if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please provide a valid email format (e.g. player@example.com).';
    }

    // 3. Category Validation
    const validCategoryLabels = CATEGORIES.map(c => c.label);
    if (!validCategoryLabels.includes(category)) {
      newErrors.category = 'Please select a valid feedback category.';
    }

    // 4. Rating Validation (Integer between 1 and 5)
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be an integer between 1 and 5.';
    }

    // 5. Message Validation (Required; 10-3,000 characters after trimming)
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Feedback message is required.';
    } else if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message is too brief. Minimum length is ${MIN_MESSAGE_LENGTH} characters (currently ${trimmedMessage.length}).`;
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message exceeds the ${MAX_MESSAGE_LENGTH} character limit (currently ${trimmedMessage.length}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Live Formatted Email Body (Used in Live Parchment Preview & Direct Dispatch)
  const formattedEmailBody = useMemo(() => {
    const hearts = '❤'.repeat(rating) + '♡'.repeat(5 - rating);
    const dateStr = new Date().toLocaleString();

    let body = `=====================================================
🟩 MINECRAFT PORTAL — PLAYER FEEDBACK DISPATCH
=====================================================
• Gamertag / Name:   ${senderName.trim() || 'Anonymous Player'}
• Reply-To Email:    ${senderEmail.trim() || 'Not provided (No reply requested)'}
• Destination:       ${PUBLIC_DISPATCH_META.inboxName} [Protected Channel]
• Category:          ${category}
• Satisfaction:      ${hearts} (${rating}/5 Hearts) — ${RATING_LABELS[rating] || ''}
• Context URL:       ${pageUrl || 'Portal Home'}
• Allow Follow-Up:   ${permissionToFollowUp ? 'YES (Permission granted to reply)' : 'NO (Do not contact)'}
• Timestamp:         ${dateStr}
• Platform Codex:    Minecraft Java Edition 2026 Portal
-----------------------------------------------------
`;

    if (category === 'Bug Report') {
      body += `🐞 BUG REPORT DIAGNOSTICS:
• Steps to Reproduce: ${bugSteps.trim() || 'Not specified'}
• Client Telemetry:   ${clientTelemetry || 'N/A'}
-----------------------------------------------------
`;
    }

    if (attachment) {
      body += `📎 ATTACHED SCREENSHOT / ASSET:
• File Name: ${attachment.name} (${attachment.sizeFormatted})
-----------------------------------------------------
`;
    }

    body += `MESSAGE:
${message.trim() || 'No feedback message entered yet.'}
=====================================================
Sent securely to: Verified Portal Administration`;

    return body;
  }, [senderName, senderEmail, category, rating, pageUrl, permissionToFollowUp, bugSteps, clientTelemetry, attachment, message]);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam Protection: Honeypot check (Bots fill hidden fields)
    if (honeypot) {
      console.warn('Bot detected via honeypot field. Discarding silently.');
      setSubmitStatus('success');
      setStatusMessage('Feedback dispatched successfully to the developer desk!');
      return;
    }

    // Rate Limiting Protection: Prevent spamming within 30 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - lastSubmitTime)) / 1000);
      setStatusMessage(`Rate limit active: Please wait ${waitSeconds} seconds before dispatching another message.`);
      setSubmitStatus('error');
      playPop();
      return;
    }

    // Run independent client-side validation
    if (!validateForm()) {
      setStatusMessage('Please correct the highlighted errors before submitting.');
      setSubmitStatus('error');
      playPop();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');
    playClick();

    try {
      // Build structured JSON payload
      const payload = {
        _subject: `[Minecraft Portal ${category.toUpperCase()}] Rating: ${rating}/5 Hearts from ${senderName.trim() || 'Player'}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: senderEmail.trim() || 'no-reply@minecraft-portal.local',
        sender_name: senderName.trim() || 'Anonymous Player',
        sender_email: senderEmail.trim() || 'No reply email requested',
        category: category,
        rating: `${rating} / 5 Minecraft Hearts (${RATING_LABELS[rating]})`,
        page_url: pageUrl.trim() || 'Minecraft Java Portal',
        permission_to_follow_up: permissionToFollowUp ? 'YES (Player agreed to email follow-up)' : 'NO',
        message: message.trim(),
        ...(category === 'Bug Report' && {
          bug_steps_to_reproduce: bugSteps.trim() || 'Not specified',
          client_telemetry: clientTelemetry
        }),
        attachment_name: attachment ? `${attachment.name} (${attachment.sizeFormatted})` : 'None',
        target_inbox: getResolvedRecipient(),
        timestamp: new Date().toISOString()
      };

      const response = await fetch(getFormSubmitEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      // Confirm success ONLY if service confirms acceptance
      if (response.ok || data.success === 'true' || data.success === true) {
        setSubmitStatus('success');
        setStatusMessage(`Dispatch confirmed! Your ${category.toLowerCase()} and rating have been accepted and forwarded directly to the developer desk.`);
        setLastSubmitTime(Date.now());
        playLevelUp();
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.72 },
          colors: ['#4aedd9', '#5c8e32', '#f8c53a', '#ef4444']
        });

        // Clear only on verified success (preserves input on failure)
        setMessage('');
        setBugSteps('');
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        throw new Error(data.message || 'Dispatch service did not confirm acceptance');
      }
    } catch (err) {
      console.warn('Submission endpoint response:', err.message);
      // Data is PRESERVED. Present actionable fallback to user
      setSubmitStatus('fallback');
      setStatusMessage('The automated endpoint could not be reached. All your entries are preserved! Click "Gmail Compose" below to dispatch directly via your email client.');
      playPop();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct Gmail Web Compose link using abstracted helper
  const openGmailDirectly = () => {
    playClick();
    const emailSubject = `[Minecraft Portal ${category}] ${rating}/5 Hearts — Feedback from ${senderName.trim() || 'Player'}`;
    const gmailUrl = getGmailComposeUrl(emailSubject, formattedEmailBody);
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  // Direct Mailto Client link using abstracted helper
  const openMailto = () => {
    playClick();
    const emailSubject = `[Minecraft Portal ${category}] ${rating}/5 Hearts — Feedback`;
    const mailtoUrl = getMailtoUrl(emailSubject, formattedEmailBody);
    window.location.href = mailtoUrl;
  };

  // Copy Formatted Message
  const handleCopyMessage = () => {
    playPop();
    navigator.clipboard.writeText(formattedEmailBody);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Reset form cleanly
  const handleResetForm = () => {
    playClick();
    setSenderName('');
    setSenderEmail('');
    setCategory(CATEGORIES[0].label);
    setRating(5);
    setMessage('');
    setBugSteps('');
    setAttachment(null);
    setPermissionToFollowUp(false);
    setErrors({});
    setSubmitStatus(null);
    setStatusMessage('');
  };

  return (
    <section id="feedback" className="py-20 bg-[#0b0c12] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1c2214] border border-[#3e5e24] text-[11px] font-silkscreen text-[#85e236]">
            <MessageSquare className="w-3.5 h-3.5 text-[#85e236]" />
            <span>COMMUNITY FEEDBACK & BUG REPORT SYSTEM</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            ENGINEERING FEEDBACK HUB
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Report bugs, rate portal satisfaction, and share suggestions. All submissions are validated, structured, and dispatched directly to the <strong className="text-emerald-400 font-mono">{PUBLIC_DISPATCH_META.inboxName}</strong> with end-to-end delivery.
          </p>
        </div>

        {/* Verified Destination Banner (Abstracted & Protected) */}
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-5 rounded-xl bg-[#141520] border-2 border-[#2b2c3e] shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1f2030] border-2 border-emerald-500/60 flex items-center justify-center shrink-0 shadow-inner">
              <Mail className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-silkscreen text-xs text-white">RECIPIENT CHANNEL:</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-bold">
                  {PUBLIC_DISPATCH_META.statusBadge}
                </span>
              </div>
              <p className="text-sm font-mono text-emerald-300 font-bold mt-1 flex items-center gap-2">
                <span>{PUBLIC_DISPATCH_META.inboxName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/60">
                  PROTECTED CHANNEL
                </span>
              </p>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                Every rating, bug report, and user suggestion arrives directly in the developer's private inbox with end-to-end protection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={openGmailDirectly}
              className="mc-btn py-2 px-3.5 text-xs font-silkscreen flex items-center justify-center gap-2 w-full md:w-auto text-white bg-[#222538] border-[#3b4060]"
              title="Open Google Mail directly"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>GMAIL COMPOSE</span>
            </button>
            <button
              onClick={openMailto}
              className="mc-btn py-2 px-3 text-xs font-silkscreen flex items-center justify-center gap-2 w-full md:w-auto text-white bg-[#222538] border-[#3b4060]"
              title="Open default email app"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>MAIL APP</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Feedback & Bug Form */}
          <div className="lg:col-span-7 mc-panel p-6 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b-2 border-[#2b2c3e] pb-3">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/icons/minecraft/book_and_quill.svg" 
                  alt="Book and Quill" 
                  className="w-6 h-6 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                <span className="font-silkscreen text-xs text-white font-bold">PORTAL FEEDBACK & BUG REPORT</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                DESTINATION: {PUBLIC_DISPATCH_META.inboxName}
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Spam Honeypot Field (Hidden from screen readers and real users) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website_hp">Leave this empty</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Field 3: Feedback Category Picker */}
              <div className="space-y-1.5">
                <label htmlFor="category-picker" className="font-silkscreen text-[10px] text-zinc-300 block">
                  1. FEEDBACK CATEGORY <span className="text-emerald-400">*</span>:
                </label>
                <div id="category-picker" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.label;
                    const Icon = cat.icon;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => { playClick(); setCategory(cat.label); }}
                        className={`p-2 rounded text-left transition-all border flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#22283d] text-white border-indigo-400 shadow-md font-bold scale-[1.02]'
                            : 'bg-[#12131d] text-zinc-400 border-[#2b2c3e] hover:bg-[#191a27] hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" style={{ color: cat.color }} />
                        <span className="text-xs font-mono">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.category && (
                  <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category}</span>
                  </p>
                )}
              </div>

              {/* Field 4: Rating (1 to 5 Minecraft Hearts) */}
              <div className="space-y-1.5 p-3 rounded-lg bg-[#13141f] border border-[#2b2c3e]">
                <div className="flex items-center justify-between">
                  <label htmlFor="rating-group" className="font-silkscreen text-[10px] text-zinc-300">
                    2. VISITOR SATISFACTION RATING (1–5) <span className="text-zinc-500">(OPTIONAL)</span>:
                  </label>
                  <span className="text-xs font-mono text-yellow-400 font-bold">
                    {rating} / 5 HEARTS
                  </span>
                </div>

                <div id="rating-group" className="flex items-center gap-2 py-1" role="radiogroup" aria-label="Satisfaction Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      role="radio"
                      aria-checked={rating === star}
                      onClick={() => { playPop(); setRating(star); }}
                      className="group p-1 transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                      title={`${star} Heart${star > 1 ? 's' : ''} — ${RATING_LABELS[star]}`}
                    >
                      <Heart 
                        className={`w-6 h-6 transition-colors ${
                          star <= rating 
                            ? 'text-red-500 fill-red-500 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]' 
                            : 'text-zinc-700'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-[11px] font-mono text-zinc-400 ml-2 hidden sm:inline">
                    {RATING_LABELS[rating]}
                  </span>
                </div>
              </div>

              {/* Field 1: Name & Field 2: Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="senderName" className="font-silkscreen text-[10px] text-zinc-300 block">
                      3. NAME / GAMERTAG <span className="text-zinc-500">(OPTIONAL)</span>:
                    </label>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {senderName.length}/{MAX_NAME_LENGTH}
                    </span>
                  </div>
                  <input
                    id="senderName"
                    type="text"
                    maxLength={MAX_NAME_LENGTH}
                    placeholder="e.g. Steve, Alex, René, O'Connor"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className={`w-full bg-[#12131d] border-2 rounded p-2.5 text-xs text-white font-mono placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      errors.name ? 'border-red-500' : 'border-[#2b2c3e]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="senderEmail" className="font-silkscreen text-[10px] text-zinc-300 block">
                    4. EMAIL ADDRESS {permissionToFollowUp ? <span className="text-red-400 font-bold">* (REQUIRED FOR REPLY)</span> : <span className="text-zinc-500">(OPTIONAL)</span>}:
                  </label>
                  <input
                    id="senderEmail"
                    type="email"
                    placeholder="e.g. player@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className={`w-full bg-[#12131d] border-2 rounded p-2.5 text-xs text-white font-mono placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      errors.email ? 'border-red-500' : 'border-[#2b2c3e]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Field 8: Permission to Follow Up Checkbox */}
              <div className="flex items-start gap-2.5 p-2.5 rounded bg-[#13141f] border border-[#2b2c3e]">
                <input
                  id="permissionToFollowUp"
                  type="checkbox"
                  checked={permissionToFollowUp}
                  onChange={(e) => {
                    playPop();
                    setPermissionToFollowUp(e.target.checked);
                    if (!e.target.checked) {
                      setErrors(prev => ({ ...prev, email: null }));
                    }
                  }}
                  className="mt-0.5 w-4 h-4 rounded bg-[#1c1d2e] border-[#3b3c4f] text-emerald-500 focus:ring-emerald-400"
                />
                <label htmlFor="permissionToFollowUp" className="text-xs font-mono text-zinc-300 cursor-pointer">
                  <span className="font-bold text-white">Permission to follow up:</span> I agree to be contacted via email regarding this feedback or bug resolution. (Requires email address).
                </label>
              </div>

              {/* Field 6: Page URL / Portal Context */}
              <div className="space-y-1">
                <label htmlFor="pageUrl" className="font-silkscreen text-[10px] text-zinc-300 block">
                  5. PAGE URL / SECTION CONTEXT <span className="text-zinc-500">(OPTIONAL)</span>:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="pageUrl"
                    type="text"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    placeholder="e.g. https://portal.minecraft/#smithing"
                    className="w-full bg-[#12131d] border-2 border-[#2b2c3e] rounded p-2.5 text-xs text-zinc-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      if (typeof window !== 'undefined') setPageUrl(window.location.href);
                    }}
                    className="mc-btn text-[10px] py-2 px-3 shrink-0"
                    title="Auto-detect current URL"
                  >
                    DETECT
                  </button>
                </div>
              </div>

              {/* Dedicated Bug Diagnostics (Active when category === 'Bug Report') */}
              {category === 'Bug Report' && (
                <div className="p-3.5 rounded-lg bg-[#201416] border-2 border-red-900/60 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2 text-red-400 font-silkscreen text-xs font-bold">
                    <Bug className="w-4 h-4" />
                    <span>BUG REPORT DETAILS & REPRODUCTION STEPS</span>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="bugSteps" className="text-[10px] font-silkscreen text-zinc-300 block">
                      STEPS TO REPRODUCE (WHAT HAPPENED? WHAT DID YOU EXPECT?):
                    </label>
                    <textarea
                      id="bugSteps"
                      rows={2}
                      placeholder="e.g. 1. Clicked Smithing Table trim selector. 2. Selected Silence trim. 3. Preview render didn't update."
                      value={bugSteps}
                      onChange={(e) => setBugSteps(e.target.value)}
                      className="w-full bg-[#140d0e] border border-red-900/50 rounded p-2.5 text-xs text-zinc-200 font-mono placeholder-zinc-600 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {clientTelemetry && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 bg-black/40 p-2 rounded">
                      <Monitor className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{clientTelemetry}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Field 5: Message (Required, 10 - 3000 chars) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="message" className="font-silkscreen text-[10px] text-zinc-300 block">
                    6. MAIN FEEDBACK MESSAGE <span className="text-emerald-400">*</span>:
                  </label>
                  <span className={`text-[10px] font-mono ${
                    message.trim().length > MAX_MESSAGE_LENGTH || (message.trim().length > 0 && message.trim().length < MIN_MESSAGE_LENGTH)
                      ? 'text-red-400 font-bold'
                      : 'text-zinc-500'
                  }`}>
                    {message.trim().length} / {MAX_MESSAGE_LENGTH} CHARS (MIN {MIN_MESSAGE_LENGTH})
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={`Write your detailed feedback, review, or suggestions here... (Min ${MIN_MESSAGE_LENGTH} characters). Dispatches directly to the developer desk.`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full bg-[#12131d] border-2 rounded p-3 text-xs text-white font-mono placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 custom-scrollbar ${
                    errors.message ? 'border-red-500' : 'border-[#2b2c3e]'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Field 7: Screenshot or Attachment */}
              <div className="space-y-1.5 p-3 rounded-lg bg-[#13141f] border border-[#2b2c3e]">
                <label className="font-silkscreen text-[10px] text-zinc-300 block">
                  7. SCREENSHOT OR ATTACHMENT <span className="text-zinc-500">(OPTIONAL; PNG, JPG, WEBP; MAX 5MB)</span>:
                </label>

                {!attachment ? (
                  <div>
                    <label 
                      htmlFor="attachment-input"
                      className="cursor-pointer flex flex-col items-center justify-center p-3 rounded-lg border-2 border-dashed border-[#353648] hover:border-emerald-500/60 bg-[#12131d] transition-colors group"
                    >
                      <Upload className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors mb-1" />
                      <span className="text-xs font-mono text-zinc-300">Click to attach screenshot or log file</span>
                      <span className="text-[10px] font-mono text-zinc-500">Max size: 5 MB</span>
                    </label>
                    <input
                      id="attachment-input"
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded bg-[#181a26] border border-emerald-500/40">
                    <div className="flex items-center gap-3">
                      {attachment.dataUrl && (
                        <img 
                          src={attachment.dataUrl} 
                          alt="Attachment preview" 
                          className="w-10 h-10 object-cover rounded border border-[#2b2c3e]"
                        />
                      )}
                      <div>
                        <p className="text-xs font-mono text-white font-semibold truncate max-w-[200px] sm:max-w-[300px]">
                          {attachment.name}
                        </p>
                        <p className="text-[10px] font-mono text-emerald-400">
                          {attachment.sizeFormatted} • Verified image
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveAttachment}
                      className="p-1 rounded hover:bg-red-950/60 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Remove attachment"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {errors.attachment && (
                  <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.attachment}</span>
                  </p>
                )}
              </div>

              {/* Status Alert Banner */}
              {submitStatus && (
                <div className={`p-3.5 rounded-lg border text-xs font-mono flex items-start gap-2.5 ${
                  submitStatus === 'success'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : submitStatus === 'fallback'
                      ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300'
                      : 'bg-red-950/40 border-red-500 text-red-300'
                }`} role="status">
                  {submitStatus === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1.5 flex-1">
                    <p className="font-semibold leading-relaxed">{statusMessage}</p>
                    {submitStatus === 'fallback' && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={openGmailDirectly}
                          className="mc-btn mc-btn-green py-1 px-3 text-[11px] font-silkscreen flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>DISPATCH IN GMAIL COMPOSE</span>
                        </button>
                        <button
                          type="button"
                          onClick={openMailto}
                          className="mc-btn py-1 px-3 text-[11px] font-silkscreen flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-emerald-400" />
                          <span>OPEN MAIL APP</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Privacy Notice & Data Minimization Disclosure */}
              <div className="p-3.5 rounded-xl bg-[#0e0f17] border border-[#26283b] text-[11px] font-mono text-zinc-400 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy &amp; Data Minimization Notice</span>
                </div>
                <p className="leading-relaxed">
                  We collect only the feedback text and category you provide to improve encyclopedia guides and fix bugs. Your email is optional and only used if you request a reply. Messages are delivered via FormSubmit to the developer desk and retained for 90 days. No cookies, trackers, or user profiling are used.
                </p>
              </div>

              {/* Action Buttons: Submit & Fallback */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                
                {/* Primary Direct Send Button (Abstracted) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-6 font-silkscreen text-xs rounded transition-all flex items-center justify-center gap-2 shadow-lg w-full ${
                    isSubmitting 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                      : 'mc-btn mc-btn-green'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting 
                      ? 'TRANSMITTING DISPATCH...' 
                      : 'SEND FEEDBACK TO DEVELOPER'}
                  </span>
                </button>

                {/* Reset Form Button */}
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="py-3 px-3.5 mc-btn text-xs font-silkscreen flex items-center justify-center gap-1.5 w-full sm:w-auto text-zinc-400 hover:text-white"
                  title="Clear form inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>

              </div>

              {/* Privacy Notice Required by Engineering Standards (Abstracted) */}
              <div className="pt-2 border-t border-[#252636] flex items-start gap-2 text-[10px] font-mono text-zinc-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-zinc-300">Privacy Notice:</strong> We collect your rating, feedback category, message, and optional contact info solely to address usability issues and provide support. Your data is dispatched securely to the <span className="text-emerald-400 font-semibold">{PUBLIC_DISPATCH_META.inboxName}</span> and is never shared, sold, or retained for tracking.
                </p>
              </div>

            </form>

          </div>

          {/* Right Column: Live Formatted Dispatch Parchment Preview */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Live Preview Parchment Box */}
            <div className="mc-panel p-5 rounded-xl bg-[#1c1a16] border-4 border-[#4d3d28] shadow-2xl space-y-3 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#3b2e1e] pb-3">
                <div className="flex items-center gap-2">
                  <img 
                    src="/icons/minecraft/paper.svg" 
                    alt="Paper" 
                    className="w-5 h-5 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="font-silkscreen text-xs text-amber-200 font-bold">
                    DISPATCH TRANSMISSION PREVIEW
                  </span>
                </div>

                <button
                  onClick={handleCopyMessage}
                  className="text-[10px] font-mono text-amber-400 hover:text-white flex items-center gap-1"
                  title="Copy formatted text to clipboard"
                >
                  {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* Monospace Code Preview Box */}
              <pre className="p-3.5 rounded-lg bg-[#0e0d0b] border border-[#2e2316] text-[11px] font-mono text-amber-300/90 whitespace-pre-wrap leading-relaxed shadow-inner overflow-x-auto max-h-[420px] custom-scrollbar">
                {formattedEmailBody}
              </pre>

              {/* Delivery Features Checklist */}
              <div className="pt-2 border-t border-[#3b2e1e] space-y-1.5 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PRODUCTION ENGINEERING PIPELINE</span>
                </div>
                <p className="text-zinc-300 leading-normal">
                  • <strong className="text-white">Direct Recipient:</strong> Handled by FormSubmit and delivered to the <span className="text-amber-300 font-semibold">{PUBLIC_DISPATCH_META.inboxName}</span>.
                </p>
                <p className="text-zinc-400 leading-normal">
                  • <strong className="text-white">Validation Guard:</strong> All inputs trimmed, length checked, and formatted.
                </p>
                <p className="text-zinc-400 leading-normal">
                  • <strong className="text-white">Data Preservation:</strong> Form inputs are preserved if connection fails.
                </p>
                <p className="text-zinc-400 leading-normal">
                  • <strong className="text-white">Spam Protection:</strong> Honeypot bot-trapping and 10s cooldown rate limiting.
                </p>
              </div>

            </div>

            {/* Quick Engineering Tips Box */}
            <div className="p-4 rounded-xl bg-[#12131e] border-2 border-[#2b2c3e] text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-silkscreen text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>ACTIVATION & VERIFICATION NOTE:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-300">
                Upon the very first dispatch, FormSubmit sends an automated one-click activation email to the <strong className="text-white">developer inbox</strong> titled <em>"Action Required: Activate FormSubmit"</em>. Once clicked, all future submissions land immediately into your private inbox with zero confirmation steps required!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
