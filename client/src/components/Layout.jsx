import React from 'react';
import Navbar from './Navbar';
import { FaGithub } from 'react-icons/fa';
import InteractiveBackground from './InteractiveBackground';

const Footer = () => {
  return (
    <footer className="border-t border-github-border mt-16 bg-github-dark py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-github-secondary">
          <FaGithub className="w-6 h-6" />
          <span>© 2026 Niranjan Reddy P R. Built with ❤️ and React.</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-github-link transition-colors">About</a>
          <a href="#projects" className="hover:text-github-link transition-colors">Repos</a>
          <a href="#skills" className="hover:text-github-link transition-colors">Skills</a>
          <a href="#contact" className="hover:text-github-link transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <>
      <InteractiveBackground />
      <div className="min-h-screen flex flex-col pt-16 pb-24 md:pb-0 selection:bg-github-link/30 overflow-x-hidden">
        <Navbar />
      <main className="flex-grow flex flex-col gap-12 sm:gap-16">
        {children}
      </main>
        <Footer />
      </div>
    </>
  );
};
