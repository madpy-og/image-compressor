import { useState, useEffect } from 'react';
import { compressImage } from './utils/compressImage';
import { Uploader } from './components/Uploader';
import { SettingsPreview } from './components/SettingsPreview';
import { Result } from './components/Result';
import { Shield, Zap, Lock, Code } from 'lucide-react';

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
      {/* Hero Section (Navy Background) */}
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

      {/* Main Content Area */}
      <div className="flex-grow pb-24 px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto">
          {!originalFile ? (
            <>
              <div className="bg-white rounded-[16px] shadow-level-3 p-6 md:p-8 border border-prismatic-border">
                <Uploader onFileSelect={handleFileSelect} />
              </div>

              {/* Features Section */}
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
