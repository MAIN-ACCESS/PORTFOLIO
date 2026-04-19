export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'DARK_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen bg-dark-radial flex items-center justify-center relative overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-7xl mx-auto px-8 min-h-screen">
        
        {/* Floating Left Side Elements */}
        <div className="hidden lg:flex flex-col space-y-8 absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
          <button 
            onClick={() => {
              const event = new CustomEvent('openAxonChat');
              window.dispatchEvent(event);
            }}
            className="w-16 h-16 rounded-full glass-card flex items-center justify-center hover-glow cursor-pointer animate-float" 
            style={{ animationDelay: "0.5s" }}
            title="Chat with AXON"
          >
            <i className="fas fa-robot text-lg"></i>
          </button>
          <button className="w-16 h-16 rounded-full glass-card flex items-center justify-center hover-glow cursor-pointer animate-float" style={{ animationDelay: "1s" }}>
            <i className="fas fa-lock text-lg"></i>
          </button>
          <button className="w-16 h-16 rounded-full glass-card flex items-center justify-center hover-glow cursor-pointer animate-float" style={{ animationDelay: "1.5s" }}>
            <i className="fas fa-lock text-lg"></i>
          </button>
        </div>

        {/* Perfectly Centered Content */}
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-sans mb-6 animate-fade-from-bottom text-white" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
            DARK
          </h1>
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light mb-8 tracking-[0.2em] sm:tracking-[0.3em] uppercase animate-fade-from-bottom text-portfolio-muted" style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}>virtuosos DEVELOPER</h2>
          <div className="text-xs sm:text-sm md:text-base font-light tracking-[0.2em] sm:tracking-[0.4em] uppercase flex flex-wrap justify-center items-center gap-2 sm:gap-6 animate-fade-from-bottom" style={{ animationDelay: "1.3s", opacity: 0, animationFillMode: "forwards" }}>
            <span className="text-portfolio-muted">EDITOR</span>
            <span className="text-portfolio-muted hidden sm:inline">|</span>
            <span className="text-portfolio-muted">DEVELOPER</span>
            <span className="text-portfolio-muted hidden sm:inline">|</span>
            <span className="text-portfolio-muted">DESIGNER</span>
          </div>
        </div>

        {/* Floating Right Side Actions */}
        <div className="hidden lg:flex flex-col space-y-6 absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={downloadResume}
            className="glass-card px-6 py-3 rounded-full hover-glow transition-all text-sm tracking-wide uppercase"
          >
            <i className="fas fa-download mr-2"></i>
            DOWNLOAD CV
          </button>
          <button
            onClick={() => scrollToSection("axon")}
            className="glass-card px-6 py-3 rounded-full hover-glow transition-all text-sm tracking-wide uppercase"
          >
            <i className="fas fa-robot mr-2"></i>
            Meet AXON
          </button>
        </div>
      </div>
      {/* Mobile Action Buttons */}
      <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        <button
          onClick={downloadResume}
          className="glass-card px-4 py-2 rounded-full hover-glow transition-all text-xs tracking-wide uppercase"
        >
          <i className="fas fa-download mr-2"></i>
          RESUME
        </button>
        <button
          onClick={() => scrollToSection("axon")}
          className="glass-card px-4 py-2 rounded-full hover-glow transition-all text-xs tracking-wide uppercase"
        >
          <i className="fas fa-robot mr-2"></i>
          AXON
        </button>
      </div>
      {/* Decorative particles only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
