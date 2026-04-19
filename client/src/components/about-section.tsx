import cropped_image from "@assets/cropped-image.png";
export default function AboutSection() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'DARK_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    "GRAPHIC DESIGNER",
    "EDITOR", 
    "WEB DEVELOPER",
    "ARTIST",
    "MASTER MIND"
  ];

  return (
    <section id="about" className="bg-dark-gradient flex flex-col lg:flex-row lg:items-center lg:min-h-screen py-16 lg:py-20 px-6 lg:px-12">

      {/* Mobile/tablet: full-width single column */}
      <div className="flex flex-col flex-1 lg:hidden">
        <h2
          className="text-5xl sm:text-6xl font-black font-sans mb-8 text-center"
          style={{ textShadow: "0 2px 20px rgba(255,255,255,0.08)", letterSpacing: "0.12em" }}
        >ABOUT</h2>

        <div className="text-sm leading-relaxed text-portfolio-muted hover-glow p-8 rounded-2xl glass-card">
          <p>"I'm a Graphic Designer, Editor, and Web Developer dedicated to delivering creative solutions with uncompromising quality. I don't just sell a project — I craft experiences that inspire, engage, and leave a lasting impression."</p>
        </div>

        <div className="space-y-4 mt-8">
          <h3 className="text-sm font-medium mb-6 tracking-[0.2em] uppercase text-portfolio-muted">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="skill-box px-5 py-2 glass-card rounded-full text-xs font-light tracking-wide">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Button pushed to bottom */}
        <div className="flex justify-center mt-10">
          <button onClick={downloadResume} className="resume-btn-about px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center">
            <i className="fas fa-download mr-3"></i>
            DOWNLOAD RESUME
          </button>
        </div>
      </div>

      {/* Desktop: two-column layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-20 items-center container mx-auto">
        <div className="space-y-8">
          <h2
            className="text-8xl font-black font-sans mb-8 text-center"
            style={{ textShadow: "0 2px 20px rgba(255,255,255,0.08)", letterSpacing: "0.12em" }}
          >ABOUT</h2>

          <div className="text-sm leading-relaxed text-portfolio-muted hover-glow p-8 rounded-2xl glass-card">
            <p>"I'm a Graphic Designer, Editor, and Web Developer dedicated to delivering creative solutions with uncompromising quality. I don't just sell a project — I craft experiences that inspire, engage, and leave a lasting impression."</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium mb-6 tracking-[0.2em] uppercase text-portfolio-muted">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="skill-box px-5 py-2 glass-card rounded-full text-xs font-light tracking-wide">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={downloadResume} className="resume-btn-about px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center">
              <i className="fas fa-download mr-3"></i>
              DOWNLOAD RESUME
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="hover-glow">
            <img src={cropped_image} alt="DARK-PORTFOLIO" className="w-96 h-96 object-cover rounded-2xl shadow-2xl grayscale" />
          </div>
        </div>
      </div>

    </section>
  );
}
