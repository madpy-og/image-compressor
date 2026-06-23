import { useState, useEffect } from 'react';
import { compressImage } from './utils/compressImage';
import { Uploader } from './components/Uploader';
import { SettingsPreview } from './components/SettingsPreview';
import { Result } from './components/Result';
import { Hero } from './components/Hero';
import { Features } from './components/Features';

function App() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);

  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);

  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    const previewUrl = URL.createObjectURL(file);
    setOriginalPreview(previewUrl);
    setCompressedFile(null);
    setCompressedPreview(null);
    setQuality(80);
  };

  const handleCompress = async (file: File, q: number) => {
    setIsCompressing(true);
    try {
      const result = await compressImage(file, q);
      setCompressedFile(result.file);
      setCompressedPreview(result.previewUrl);
    } catch (error) {
      alert('Failed to compress image. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  useEffect(() => {
    if (originalFile) {
      const timer = setTimeout(() => {
        handleCompress(originalFile, quality);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [originalFile, quality]);

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedFile(null);
    setCompressedPreview(null);
    setQuality(80);
  };

  return (
    <div className="min-h-screen bg-prismatic-surface flex flex-col font-sans">
      <Hero />

      {/* Main Content Area */}
      <div className="flex-grow pb-24 px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto">
          {!originalFile ? (
            <>
              <div className="bg-white rounded-[16px] shadow-level-3 p-6 md:p-8 border border-prismatic-border">
                <Uploader onFileSelect={handleFileSelect} />
              </div>
              
              <Features />
            </>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-prismatic-border shadow-level-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] text-prismatic-textPrimary truncate mr-4">
                    {originalFile.name}
                  </span>
                  <span className="text-[13px] text-prismatic-textSecondary mt-0.5">
                    Ready for compression
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-secondary whitespace-nowrap"
                >
                  Upload New Image
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <SettingsPreview
                  originalFile={originalFile}
                  originalPreview={originalPreview}
                  quality={quality}
                  onQualityChange={setQuality}
                />

                <Result
                  originalFile={originalFile}
                  compressedFile={compressedFile}
                  compressedPreview={compressedPreview}
                  isCompressing={isCompressing}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-prismatic-border text-center text-prismatic-textSecondary text-sm">
        <p>Built with React, Vite, and Prismatic Pay Design System.</p>
      </footer>
    </div>
  );
}

export default App;
