
import React from 'react';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, children }) => (
  <div className="bg-slate-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1">
    <div className="flex items-center">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-900/50 text-indigo-400 rounded-full font-bold text-xl">
        {step}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      </div>
    </div>
    <p className="mt-4 text-slate-400">{description}</p>
    <div className="mt-4 text-indigo-400">{children}</div>
  </div>
);

export const HowItWorks: React.FC = () => (
  <section className="text-center">
    <h2 className="text-3xl font-bold text-slate-200 mb-2">Simple & Fast</h2>
    <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
      Create your perfect QR code in just a few clicks.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StepCard step="1" title="Paste Link" description="Copy your desired URL and paste it into the input field to get started.">
        <code className="text-sm bg-slate-700 p-1 rounded">https://your-link.com</code>
      </StepCard>
      <StepCard step="2" title="Generate" description="Your QR code is instantly generated as you type, ready for customization.">
        <div className="flex justify-center items-center">✨ Instant Preview</div>
      </StepCard>
      <StepCard step="3" title="Customize" description="Change colors, shapes, and add your logo to match your brand's style.">
         <div className="flex justify-center items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
            <span className="w-4 h-4 rounded-full bg-green-500"></span>
            <span className="w-4 h-4 rounded-full bg-red-500"></span>
         </div>
      </StepCard>
      <StepCard step="4" title="Download" description="Export your final QR code in high-resolution PNG format and share it.">
        <div className="flex justify-center items-center font-semibold">Ready to Share!</div>
      </StepCard>
    </div>
  </section>
);