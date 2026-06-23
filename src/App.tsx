import { useState, useEffect } from 'react';
import { compressImage } from './utils/compressImage';
import { Uploader } from './components/Uploader';
import { SettingsPreview } from './components/SettingsPreview';
import { Result } from './components/Result';
import { ImageIcon } from 'lucide-react';

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
    // Reset compressed state
    setCompressedFile(null);
    setCompressedPreview(null);
    setQuality(80); // Reset to default quality
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

  // Effect to run compression when quality or original file changes
  useEffect(() => {
    if (originalFile) {
      const timer = setTimeout(() => {
        handleCompress(originalFile, quality);
      }, 500); // Debounce quality slider
      
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
    <div className="min-h-screen bg-prismatic-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-prismatic-primary/10 p-3 rounded-2xl">
              <ImageIcon size={40} className="text-prismatic-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-prismatic-textPrimary tracking-tight mb-3">
            ImageShrink
          </h1>
          <p className="text-lg text-prismatic-textSecondary max-w-2xl mx-auto">
            Premium client-side image compression. Fast, secure, and right in your browser.
          </p>
        </div>

        {!originalFile ? (
          <Uploader onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-prismatic-border shadow-level-1">
              <span className="font-medium text-prismatic-textPrimary truncate mr-4">
                {originalFile.name}
              </span>
              <button 
                onClick={handleReset}
                className="btn-secondary whitespace-nowrap"
              >
                Upload New Image
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
}

export default App;
