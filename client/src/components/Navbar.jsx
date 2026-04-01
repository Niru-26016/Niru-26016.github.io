import React, { useState, useEffect } from 'react';
import { Sun, Moon, Home, FolderCode, Award, User } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('#about');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme : 'dark';
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Activity', href: '#activity' },
    { name: 'Skills', href: '#skills' },
    { name: 'Repositories', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header>
      {/* Desktop Header & Mobile Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/70 dark:bg-[#0d1117]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 h-16 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-lg' : 'bg-transparent h-20'
        }`}
      >
        <nav className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <FaGithub className="w-8 h-8 text-black dark:text-github-text" />
            <span className="font-bold text-lg hidden sm:block tracking-tight text-black dark:text-white">Niru-26016</span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-github-secondary hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-gray-600 dark:text-github-secondary hover:text-black dark:hover:text-white rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-white via-white/95 dark:from-[#010409] dark:via-[#010409]/95 to-transparent pointer-events-none">
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-16 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-full flex items-center justify-around px-2 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto relative overflow-hidden"
        >
          <a href="#about" onClick={() => setActiveTab('#about')} className={`relative flex flex-col items-center justify-center w-14 h-full transition-colors ${activeTab === '#about' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-github-secondary hover:text-black dark:hover:text-gray-300'}`}>
            {activeTab === '#about' && <motion.div layoutId="bubble" className="absolute inset-2 bg-black/5 dark:bg-white/10 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
            <Home className="w-5 h-5 relative z-10" />
            <span className="text-[10px] font-medium mt-1 relative z-10">Home</span>
          </a>
          
          <a href="#skills" onClick={() => setActiveTab('#skills')} className={`relative flex flex-col items-center justify-center w-14 h-full transition-colors ${activeTab === '#skills' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-github-secondary hover:text-black dark:hover:text-gray-300'}`}>
            {activeTab === '#skills' && <motion.div layoutId="bubble" className="absolute inset-2 bg-black/5 dark:bg-white/10 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
            <Award className="w-5 h-5 relative z-10" />
            <span className="text-[10px] font-medium mt-1 relative z-10">Skills</span>
          </a>

          <a href="#projects" onClick={() => setActiveTab('#projects')} className={`relative flex flex-col items-center justify-center w-14 h-full transition-colors ${activeTab === '#projects' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-github-secondary hover:text-black dark:hover:text-gray-300'}`}>
            {activeTab === '#projects' && <motion.div layoutId="bubble" className="absolute inset-2 bg-black/5 dark:bg-white/10 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
            <FolderCode className="w-5 h-5 relative z-10" />
            <span className="text-[10px] font-medium mt-1 relative z-10">Repos</span>
          </a>

          <a href="#contact" onClick={() => setActiveTab('#contact')} className={`relative flex flex-col items-center justify-center w-14 h-full transition-colors ${activeTab === '#contact' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-github-secondary hover:text-black dark:hover:text-gray-300'}`}>
            {activeTab === '#contact' && <motion.div layoutId="bubble" className="absolute inset-2 bg-black/5 dark:bg-white/10 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
            <User className="w-5 h-5 relative z-10" />
            <span className="text-[10px] font-medium mt-1 relative z-10">Contact</span>
          </a>
        </motion.nav>
      </div>
    </header>
  );
};

export default Navbar;
