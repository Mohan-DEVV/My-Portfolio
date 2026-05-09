import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Cloud, 
  Code, 
  BarChart3, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ChevronRight, 
  ExternalLink, 
  Download,
  Menu,
  X,
  Server,
  Layers,
  Award,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { RESUME_DATA } from './data';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`glass-panel px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'bg-glass-bg shadow-2xl' : 'bg-transparent border-transparent'
        }`}>
          <a href="#" className="text-xl font-display font-bold text-gradient">MV.</a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary flex items-center gap-2 py-2 px-5 text-sm uppercase tracking-wider">
              <Download size={16} /> Resume
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-6 mt-2 md:hidden"
          >
            <div className="glass-panel p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-gray-400 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Download size={18} /> Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-2"
    >
      <div className="h-px w-8 bg-azure-blue/50" />
      <span className="text-sm font-bold text-azure-blue uppercase tracking-[0.3em]">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold"
    >
      {children}
    </motion.h2>
  </div>
);

interface SkillCardProps {
  key?: React.Key;
  title: string;
  items: string[];
  index: number;
}

const SkillCard = ({ title, items, index }: SkillCardProps) => {
  const icons = [<Cloud />, <Layers />, <Database />, <Code />];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel p-8 group hover:border-azure-blue/50 transition-all"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-azure-blue/10 text-azure-blue group-hover:bg-azure-blue group-hover:text-white transition-all">
          {icons[index % icons.length]}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

interface ExperienceItemProps {
  key?: React.Key;
  exp: any;
  index: number;
}

const ExperienceItem = ({ exp, index }: ExperienceItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 md:pl-12 pb-12 last:pb-0"
  >
    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10">
      <motion.div 
        whileHover={{ scale: 1.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-azure-blue border-4 border-deep-bg shadow-[0_0_15px_rgba(0,120,212,0.5)] cursor-pointer z-10 transition-shadow hover:shadow-[0_0_25px_rgba(0,120,212,0.8)]" 
      />
    </div>
    <div className="glass-panel p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
          <p className="text-azure-blue font-medium flex items-center gap-2">
            <Server size={16} /> {exp.company}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="px-4 py-1 rounded-full bg-azure-blue/10 text-azure-blue text-sm font-bold flex items-center gap-2">
            <Calendar size={14} /> {exp.period}
          </span>
          <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
            <MapPin size={12} /> {exp.location}
          </span>
        </div>
      </div>
      
      <ul className="space-y-3">
        {exp.achievements.map((item: string, i: number) => (
          <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed group">
            <CheckCircle2 size={16} className="text-azure-blue/50 shrink-0 mt-0.5 group-hover:text-azure-blue transition-colors" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const FloatingBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-azure-blue/5 blur-[140px]" />
    <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-azure-blue/5 blur-[120px]" />
    <div className="absolute inset-0 bg-grid opacity-[0.15]" />
  </div>
);

// --- Main App Component ---

export default function App() {
  return (
    <div className="min-h-screen bg-deep-bg">
      <FloatingBackground />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-azure-blue font-mono text-sm tracking-widest mb-4 uppercase">
                Hello, I'm
              </h4>
              <h1 className="text-7xl md:text-9xl font-bold mb-6 leading-none">
                {RESUME_DATA.name.split(' ').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="text-gradient">{line}</span> : line}
                  </span>
                ))}
              </h1>
              <p className="text-2xl md:text-3xl font-light text-gray-400 mb-10 max-w-2xl leading-relaxed">
                Expert in <span className="text-white font-medium">Azure Cloud Architecture</span> and 
                <span className="text-white font-medium"> Data Orchestration</span>. Building resilient ETL pipelines at scale.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#experience" className="btn-primary text-center">
                  View My Work
                </a>
                <a href="#contact" className="btn-secondary text-center">
                  Let's Talk
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-azure-blue to-azure-light rounded-[2rem] rotate-6 opacity-20" />
              <div className="absolute inset-0 glass-panel overflow-hidden">
                {/* Profile Illustration / Image Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-azure-blue/20">
                  <Database size={240} className="stroke-[0.5]" />
                </div>
              </div>
            </motion.div>

            <div>
              <SectionHeading subtitle="Profile">About Me</SectionHeading>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-gray-400 text-lg leading-relaxed"
              >
                <p>{RESUME_DATA.summary}</p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <h4 className="text-white font-bold mb-1">3+ Years</h4>
                    <p className="text-sm">Of Industrial Experience</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{RESUME_DATA.location}</h4>
                    <p className="text-sm">Based in</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Expertise">Technical Arsenal</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESUME_DATA.skills.map((skill, index) => (
              <SkillCard key={skill.category} title={skill.category} items={skill.items} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeading subtitle="Journey">Career Path</SectionHeading>
            <div className="mt-16">
              {RESUME_DATA.experience.map((exp, index) => (
                <ExperienceItem key={index} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification & Education */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div id="education">
              <SectionHeading subtitle="Academics">Education</SectionHeading>
              {RESUME_DATA.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="glass-panel p-8"
                >
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className="text-azure-blue font-medium mb-1">{edu.field}</p>
                  <p className="text-gray-400 text-sm mb-4">{edu.institution}</p>
                  <div className="flex items-center justify-between py-3 border-t border-white/5 mt-4">
                    <span className="text-sm font-mono text-azure-blue">{edu.score}</span>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div id="certifications">
              <SectionHeading subtitle="Credentials">Success Badges</SectionHeading>
              {RESUME_DATA.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="glass-panel p-8 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
                    <Award size={80} />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-azure-blue/10 text-azure-blue">
                      <Award size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{cert.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Issued by {cert.issuer}</p>
                  <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                    <span>Year: {cert.year}</span>
                    <span className="text-azure-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer">
                      Verify <ExternalLink size={12} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <SectionHeading subtitle="Connect">Get In Touch</SectionHeading>
                <div className="space-y-8 mt-12 text-gray-400">
                  <p className="text-lg">
                    Have a project in mind or just want to discuss Azure Data architectures? 
                    Feel free to reach out through any of these platforms.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                      <div className="p-3 rounded-xl bg-white/5 text-azure-blue group-hover:bg-azure-blue group-hover:text-white transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Mail Me</p>
                        <a href={`mailto:${RESUME_DATA.email}`} className="text-white hover:text-azure-blue transition-colors">
                          {RESUME_DATA.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group">
                      <div className="p-3 rounded-xl bg-white/5 text-azure-blue group-hover:bg-azure-blue group-hover:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Call Me</p>
                        <a href={`tel:${RESUME_DATA.phone.replace(/ /g, '')}`} className="text-white hover:text-azure-blue transition-colors">
                          {RESUME_DATA.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="p-3 rounded-xl bg-white/5 text-azure-blue group-hover:bg-azure-blue group-hover:text-white transition-all">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Location</p>
                        <span className="text-white">{RESUME_DATA.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    {RESUME_DATA.socials.map((social) => {
                      const Icon = social.icon === 'Linkedin' ? Linkedin : 
                                   social.icon === 'Github' ? Github : Mail;
                      return (
                        <a 
                          key={social.name}
                          href={social.url}
                          className="p-4 glass-panel hover:bg-azure-blue hover:text-white text-azure-blue transition-all"
                          title={social.name}
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="glass-panel p-10">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase">First Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-azure-blue transition-all" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase">Email</label>
                      <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-azure-blue transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 uppercase">Subject</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-azure-blue transition-all" placeholder="Project Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 uppercase">Message</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-azure-blue transition-all h-32 resize-none" placeholder="How can I help you?"></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                    Send Message <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {RESUME_DATA.name}. Built with <span className="text-azure-blue">React</span> & <span className="text-azure-blue">Tailwind</span>.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
