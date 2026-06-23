import React from 'react';
import { Zap } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-prismatic-surface relative overflow-hidden py-30 px-4 sm:px-6 lg:px-8 border-b border-prismatic-border/10">
      {/* Subtle Gradient Overlay */}

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prismatic-primary/10 text-prismatic-textPrimary text-sm font-medium mb-8 border border-prismatic-primary/20">
          <Zap size={16} className="text-prismatic-primary" />
          <span>100% Client-Side Compression</span>
        </div>

        <h1 className="text-prismatic-textPrimary font-bold tracking-[-0.03em] text-[40px] leading-[48px] md:text-[60px] md:leading-[68px] mb-6">
          Compress Images with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-[#A259FF]">
            Zero Server Processing
          </span>
        </h1>

        <p className="text-prismatic-textSecondary text-[17px] leading-[28px] max-w-2xl mx-auto mb-10 font-normal tracking-[0.01em]">
          ImageShrink is a premium, engineering-grade image compression tool. Your files never leave your device. We use advanced Web Workers to compress your images securely right inside your browser.
        </p>
      </div>
    </div>
  );
}
