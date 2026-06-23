

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-discord-surface1/80 backdrop-blur-md border-b border-discord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[15px] sm:text-lg text-discord-onPrimary truncate">Super Compressor</span>
          </div>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#home" className="text-[13px] sm:text-sm font-medium text-discord-inkMuted hover:text-discord-onPrimary transition-colors">
              Home
            </a>
            <a href="#uploader" className="text-[13px] sm:text-sm font-medium text-discord-inkMuted hover:text-discord-onPrimary transition-colors">
              Compress
            </a>
            <a href="#compare" className="text-[13px] sm:text-sm font-medium text-discord-inkMuted hover:text-discord-onPrimary transition-colors">
              Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
