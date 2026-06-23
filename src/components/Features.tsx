import React from 'react';
import { Lock, Zap, Code } from 'lucide-react';

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="bg-prismatic-surface border border-prismatic-border w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 text-prismatic-primary shadow-sm">
          <Lock size={24} />
        </div>
        <h3 className="text-prismatic-textPrimary font-semibold text-[20px] mb-3">Absolute Privacy</h3>
        <p className="text-prismatic-textSecondary text-[15px] leading-[24px]">
          Your images are processed entirely on your local machine. No data is ever uploaded to our servers.
        </p>
      </div>
      <div className="text-center">
        <div className="bg-prismatic-surface border border-prismatic-border w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 text-prismatic-primary shadow-sm">
          <Zap size={24} />
        </div>
        <h3 className="text-prismatic-textPrimary font-semibold text-[20px] mb-3">Lightning Fast</h3>
        <p className="text-prismatic-textSecondary text-[15px] leading-[24px]">
          Leveraging Web Workers, compression happens in the background without blocking your browser UI.
        </p>
      </div>
      <div className="text-center">
        <div className="bg-prismatic-surface border border-prismatic-border w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 text-prismatic-primary shadow-sm">
          <Code size={24} />
        </div>
        <h3 className="text-prismatic-textPrimary font-semibold text-[20px] mb-3">Developer Grade</h3>
        <p className="text-prismatic-textSecondary text-[15px] leading-[24px]">
          Built for engineers with meticulous attention to detail, performance, and typography.
        </p>
      </div>
    </div>
  );
}
