import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Terminal, Shield, Sparkles, Download } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const vercelJsonContent = `{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Hosting & Deployment
            </div>
            <h2 className="text-xl font-bold">Deploy AI Interview Prep Buddy to Vercel</h2>
            <p className="text-slate-300 text-sm mt-1">
              Download the complete code package or push to GitHub to deploy on Vercel.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Download Complete Package Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white rounded-xl p-5 border border-emerald-600/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-white text-base">Complete Project ZIP Ready</h3>
              </div>
              <p className="text-slate-300 text-xs mt-1">
                Contains all components, question banks, Vercel API routes, and Tailwind setup.
              </p>
            </div>
            <a
              href="/api/download-zip"
              download="ai-interview-prep-buddy.zip"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-xs shrink-0 transition-all transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP Package</span>
            </a>
          </div>
          {/* Step 1: Gemini API Key */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4">
            <h3 className="font-semibold text-blue-950 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              Get your Gemini API Key
            </h3>
            <p className="mt-2 text-slate-600">
              1. Visit Google AI Studio at{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
              >
                aistudio.google.com/app/apikey <ExternalLink className="w-3.5 h-3.5" />
              </a>
              .<br />
              2. Click <strong>Create API Key</strong> and copy your key. (Gemini 2.5/3.8 Flash includes a generous free tier).
            </p>
          </div>

          {/* Step 2: Push to GitHub */}
          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">2</span>
              Push Code to GitHub
            </h3>
            <p className="mt-2 text-slate-600 mb-3">
              Push this repository to your personal GitHub account:
            </p>
            <div className="relative bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <code>git init && git add . && git commit -m "Initial commit"</code>
              <button
                onClick={() => copyToClipboard('git init && git add . && git commit -m "Initial commit"', 1)}
                className="absolute right-2 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                title="Copy command"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3: Import to Vercel */}
          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">3</span>
              Import Project to Vercel
            </h3>
            <p className="mt-2 text-slate-600">
              1. Log in to{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
              >
                vercel.com <ExternalLink className="w-3.5 h-3.5" />
              </a>{' '}
              and click <strong>Add New &gt; Project</strong>.<br />
              2. Select your imported GitHub repository.<br />
              3. Framework Preset will auto-detect as <strong>Vite</strong>.
            </p>
          </div>

          {/* Step 4: Environment Variables */}
          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">4</span>
              Configure Environment Variable on Vercel
            </h3>
            <p className="mt-2 text-slate-600 mb-2">
              In Vercel’s <strong>Environment Variables</strong> section before clicking Deploy, add:
            </p>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between font-mono text-xs">
              <div>
                <span className="font-bold text-slate-900">GEMINI_API_KEY</span> = <span className="text-slate-500">your_api_key_here</span>
              </div>
              <button
                onClick={() => copyToClipboard('GEMINI_API_KEY', 2)}
                className="text-blue-600 hover:text-blue-800 font-sans text-xs font-medium flex items-center gap-1"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Key Name
              </button>
            </div>
          </div>

          {/* vercel.json snippet */}
          <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-600" />
                vercel.json (Included in project root)
              </h4>
              <button
                onClick={() => copyToClipboard(vercelJsonContent, 3)}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy JSON
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              {vercelJsonContent}
            </pre>
          </div>

          {/* Fallback Notice */}
          <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900">
            <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-950">Built-in Resilient Fallback Included</p>
              <p className="mt-0.5 text-emerald-800">
                The app comes with an offline question bank of 90+ curated interview questions and an automated algorithmic evaluator. If the API key is not provided or rate limits occur, students can still practice smoothly without interruptions!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
          >
            Got it, Back to Practice
          </button>
        </div>
      </div>
    </div>
  );
};
