import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "axon", "contact"];
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const downloadResume = () => {
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'DARK_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="glass-navbar rounded-2xl px-8 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold font-sans tracking-wider">
          DARK
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className={`nav-link hover:text-gray-300 transition-colors focus:outline-none focus:ring-0 ${activeSection === "home" ? "active" : ""}`}
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`nav-link hover:text-gray-300 transition-colors focus:outline-none focus:ring-0 ${activeSection === "about" ? "active" : ""}`}
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection("axon")}
            className={`nav-link hover:text-gray-300 transition-colors focus:outline-none focus:ring-0 ${activeSection === "axon" ? "active" : ""}`}
          >
            AXON
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`nav-link hover:text-gray-300 transition-colors focus:outline-none focus:ring-0 ${activeSection === "contact" ? "active" : ""}`}
          >
            CONTACT
          </button>
          <button
            onClick={downloadResume}
            className="nav-link flex items-center hover:text-gray-300 transition-colors focus:outline-none focus:ring-0"
          >
            <i className="fas fa-file-pdf mr-2"></i>RESUME
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden text-2xl z-50 relative ${isMenuOpen ? "hidden" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Compact Navigation Capsule */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Floating Navigation Capsule */}
          <div className="lg:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
            <div className="glass-card-blur rounded-full p-2 flex flex-col space-y-2">
              {/* Close button at the top */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all hover-glow mobile-close-btn"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
              <div className="w-8 h-px bg-gray-600 mx-auto my-1"></div>
              <button
                onClick={() => scrollToSection("home")}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all hover-glow"
              >
                <i className="fas fa-home text-lg"></i>
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all hover-glow"
              >
                <i className="fas fa-user text-lg"></i>
              </button>
              <button
                onClick={() => scrollToSection("axon")}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all hover-glow"
              >
                <i className="fas fa-robot text-lg"></i>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all hover-glow"
              >
                <i className="fas fa-envelope text-lg"></i>
              </button>
              <div className="w-8 h-px bg-gray-600 mx-auto my-1"></div>
              <button
                onClick={downloadResume}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all hover-glow"
              >
                <i className="fas fa-download text-lg"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
