import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("SEND MESSAGE");
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "PLEASE FILL IN ALL FIELDS",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error", 
        description: "PLEASE ENTER A VALID E-MAIL",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Initialize EmailJS with public key
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      
      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      // Change button text to "SENDED"
      setButtonText("SENDED");
      
      toast({
        title: "MESSAGE SENDED!",
        description: "THANK FOR YOUR MESSAGE|",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });

      // After 3 seconds, change button text back to "SEND MESSAGE"
      setTimeout(() => {
        setButtonText("SEND MESSAGE");
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      
      toast({
        title: "Error",
        description: "FAILED TO SEND MESSAGE.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: "fab fa-instagram", url: "https://www.instagram.com/x__creat0r", label: "Instagram" },
    { icon: "fab fa-youtube", url: "https://www.youtube.com/@DARKX0STUDIO", label: "Youtube" },
    { icon: "fab fa-github", url: "", label: "GitHub" },
    { icon: "fab fa-twitter", url: "", label: "Twitter" }
  ];

  return (
    <section id="contact" className="min-h-screen bg-dark-gradient flex items-center py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact Information */}
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold font-sans mb-8">CONTACT</h2>
            
            <div className="space-y-4">
              <div className="hover-glow p-6 rounded-2xl glass-card">
                <div className="flex items-center mb-3">
                  <i className="fas fa-map-marker-alt text-lg mr-4"></i>
                  <h3 className="text-sm font-medium tracking-wide uppercase">ADDRESS</h3>
                </div>
                <p className="text-portfolio-muted ml-8 text-xs">SECTOR Z • GRID 47,
                MATRIX-STREET</p>
              </div>

              <div className="hover-glow p-6 rounded-2xl glass-card">
                <div className="flex items-center mb-3">
                  <i className="fas fa-phone text-lg mr-4"></i>
                  <h3 className="text-sm font-medium tracking-wide uppercase">PHONE</h3>
                </div>
                <p className="text-portfolio-muted ml-8 text-xs">+10 0111101 1001 </p>
              </div>

              <div className="hover-glow p-6 rounded-2xl glass-card">
                <div className="flex items-center mb-3">
                  <i className="fas fa-envelope text-lg mr-4"></i>
                  <h3 className="text-sm font-medium tracking-wide uppercase">Email</h3>
                </div>
                <p className="text-portfolio-muted ml-8 text-xs">darkz.main0@gmail.com</p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-8">
              <h3 className="text-sm font-medium mb-6 tracking-[0.2em] uppercase text-portfolio-muted">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon text-2xl p-4 glass-card rounded-full hover:bg-opacity-20 transition-all"
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="hover-glow p-8 glass-card rounded-3xl">
            <h3 className="text-xl font-semibold mb-6">ASK ANYTHING</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-2 tracking-wide uppercase text-portfolio-muted">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="contact-input w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all text-white placeholder-gray-400 text-sm"
                  placeholder="YOUR FULL NAME"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2 tracking-wide uppercase text-portfolio-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="contact-input w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all text-white placeholder-gray-400 text-sm"
                  placeholder="YOUR E- MAIL"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-2 tracking-wide uppercase text-portfolio-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="contact-textarea w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all resize-none text-white placeholder-gray-400 text-sm"
                  placeholder="TYPE YOUR MESSAGE"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-button w-full py-4 glass-card hover:bg-opacity-30 rounded-xl font-medium transition-all hover-glow text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    {buttonText}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

