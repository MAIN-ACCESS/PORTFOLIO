import { useState } from "react";
import websiteImage from "@assets/website_1754840729933.jpg";
import gameImage from "@assets/game_1754848341794.jpg";
import appImage from "@assets/app_1754848348620.jpg";

export default function ProjectsSection() {
  const [currentProject, setCurrentProject] = useState(1);

  const projects = [
    {
      id: 1,
      title: "WEB PORTAL",
      description: "YOUR GATEWAY TO MODERN, FAST, AND STUNNING WEBSITES.",
      image: websiteImage,
      link: "#"
    },
    {
      id: 2,
      title: "GAME PORTAL",
      description: "ENTER A WORLD OF FUN, CHALLENGES, AND LIMITLESS ADVENTURES.",
      image: gameImage,
      link: "#"
    },
    {
      id: 3,
      title: "APP PORTAL",
      description: "DISCOVER, BUILD, AND LAUNCH APPS THAT TURN IDEAS INTO REALITY.",
      image: appImage,
      link: "#"
    }
  ];

  const nextProject = () => {
    setCurrentProject(currentProject === projects.length - 1 ? 0 : currentProject + 1);
  };

  const prevProject = () => {
    setCurrentProject(currentProject === 0 ? projects.length - 1 : currentProject - 1);
  };

  const getCardClass = (index: number) => {
    const diff = index - currentProject;
    const total = projects.length;
    
    // Normalize difference to handle wrap-around
    let normalizedDiff = ((diff % total) + total) % total;
    
    if (normalizedDiff === 0) return "carousel-card center";
    
    // For 3 cards, position them properly
    if (total === 3) {
      if (normalizedDiff === 1) return "carousel-card right";
      if (normalizedDiff === 2) return "carousel-card left";
    }
    
    // For more cards, use more positions
    if (normalizedDiff === 1) return "carousel-card right";
    if (normalizedDiff === total - 1) return "carousel-card left";
    if (normalizedDiff === 2) return "carousel-card far-right";
    if (normalizedDiff === total - 2) return "carousel-card far-left";
    
    return "carousel-card hidden";
  };

  return (
    <section id="projects" className="min-h-screen bg-dark-gradient flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans mb-6">PROJECTS</h2>
          <p className="text-portfolio-muted text-xs tracking-[0.2em] uppercase">A showcase of my development work</p>
        </div>

        {/* Desktop 3D Carousel */}
        <div className="hidden md:block relative carousel-container">
          <div className="carousel-wrapper">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${getCardClass(index)} glass-card rounded-3xl overflow-hidden flex flex-col`}
                onClick={() => setCurrentProject(index)}
              >
                <div className="p-4 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="px-6 flex-1 flex flex-col items-center justify-center pb-6">
                  <h3 className="text-xl font-semibold mb-2 text-center">{project.title}</h3>
                  <p className="text-portfolio-muted text-sm text-center mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold transition-all hover:bg-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project
                    <i className="fas fa-project-diagram ml-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 arrow-button glass-card rounded-full flex items-center justify-center hover-glow z-20"
          >
            <i className="fas fa-chevron-left text-lg"></i>
          </button>
          <button
            onClick={nextProject}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 arrow-button glass-card rounded-full flex items-center justify-center hover-glow z-20"
          >
            <i className="fas fa-chevron-right text-lg"></i>
          </button>
        </div>

        {/* Mobile Project Carousel */}
        <div className="md:hidden relative">
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-sm carousel-container">
              <div className="carousel-wrapper">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`${getCardClass(index)} glass-card rounded-3xl overflow-hidden w-full flex flex-col`}
                    onClick={() => setCurrentProject(index)}
                  >
                    <div className="p-3 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-36 object-contain rounded-lg bg-white"
                      />
                    </div>
                    <div className="px-5 flex-1 flex flex-col items-center justify-center pb-4">
                      <h3 className="text-base font-semibold mb-1 text-center">{project.title}</h3>
                      <p className="text-portfolio-muted text-xs leading-relaxed text-center mb-3">{project.description}</p>
                      <a
                        href={project.link}
                        className="inline-flex items-center text-white hover:text-gray-300 transition-colors text-xs tracking-wide uppercase"
                      >
                        View Project<i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Mobile Carousel Navigation */}
          <button
            onClick={prevProject}
            className="arrow-button absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl p-4 hover:text-white transition-colors bg-black bg-opacity-30 rounded-full"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextProject}
            className="arrow-button absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl p-4 hover:text-white transition-colors bg-black bg-opacity-30 rounded-full"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentProject ? "bg-white" : "bg-gray-500"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
