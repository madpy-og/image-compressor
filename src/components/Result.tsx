import React from 'react';
import { Download, Zap, ImageIcon } from 'lucide-react';

interface ResultProps {
  originalFile: File | null;
  compressedFile: File | null;
  compressedPreview: string | null;
  isCompressing: boolean;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function Result({ 
  originalFile, 
  compressedFile, 
  compressedPreview, 
  isCompressing 
}: ResultProps) {
  if (!originalFile) return null;

  const handleDownload = () => {
    if (compressedFile && compressedPreview) {
      const link = document.createElement('a');
      link.href = compressedPreview;
      link.download = `compressed-${compressedFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const calculateSavings = () => {
    if (!originalFile || !compressedFile) return 0;
    const savings = ((originalFile.size - compressedFile.size) / originalFile.size) * 100;
    return savings > 0 ? savings.toFixed(1) : 0;
  };

  return (
    <div className="card w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-prismatic-warning" size={20} />
        <h3 className="text-lg font-semibold text-prismatic-textPrimary">Compressed Result</h3>
      </div>

      <div className="bg-prismatic-surface rounded-lg overflow-hidden flex items-center justify-center h-48 mb-4 border border-prismatic-border relative flex-grow min-h-[12rem]">
        {isCompressing ? (
          <div className="flex flex-col items-center justify-center text-prismatic-primary">
            <div className="w-8 h-8 border-4 border-prismatic-primary/20 border-t-prismatic-primary rounded-full animate-spin mb-2"></div>
            <span className="text-sm font-medium">Compressing...</span>
          </div>
        ) : compressedPreview ? (
          <img 
            src={compressedPreview} 
            alt="Compressed preview" 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-prismatic-textSecondary flex flex-col items-center">
            <ImageIcon size={32} className="mb-2 opacity-50" />
            <span className="text-sm">Preview will appear here</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="text-prismatic-textSecondary font-medium">New Size</span>
        <div className="flex items-center gap-3">
          {compressedFile && !isCompressing && (
            <span className="text-prismatic-success font-semibold bg-prismatic-success/10 px-2 py-1 rounded text-xs">
              -{calculateSavings()}%
            </span>
          )}
          <span className="font-mono text-prismatic-textPrimary font-semibold bg-prismatic-surface px-2 py-1 rounded">
            {compressedFile && !isCompressing ? formatBytes(compressedFile.size) : '---'}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-prismatic-border">
        <button 
          onClick={handleDownload}
          disabled={!compressedFile || isCompressing}
          className="btn-gradient w-full py-2.5 h-auto text-[15px] flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download Compressed Image
        </button>
      </div>
    </div>
  );
}
