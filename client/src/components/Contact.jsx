import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const contacts = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Me',
      desc: 'Drop me a line anytime',
      link: 'mailto:niranjan.polaka@gmail.com',
      linkText: 'niranjan.polaka@gmail.com'
    },
    {
      icon: <FaGithub className="w-8 h-8" />,
      title: 'GitHub',
      desc: 'Check out my open source work',
      link: 'https://github.com/Niru-26016',
      linkText: 'github.com/Niru-26016'
    },
    {
      icon: <FaLinkedin className="w-8 h-8" />,
      title: 'LinkedIn',
      desc: "Let's connect professionally",
      link: 'https://www.linkedin.com/in/niranjanpolaka',
      linkText: 'linkedin.com/in/niranjanpolaka'
    }
  ];

  return (
    <section id="contact" className="section-container border-t border-github-border">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-2xl font-semibold flex items-center justify-center md:justify-start gap-2 mb-2 text-github-text">
          <MessageSquare className="w-5 h-5 text-github-secondary" /> 
          Get In Touch
        </h2>
        <p className="text-github-secondary">Want to work together or just say hi? Let's connect!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, i) => (
          <motion.a
            key={contact.title}
            href={contact.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center justify-center p-8 bg-github-dark border border-github-border rounded-lg hover:-translate-y-2 hover:bg-github-header hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-[#58a6ff]/50 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_2s_infinite]"></div>
            <div className="bg-github-header group-hover:bg-[#58a6ff]/20 group-hover:text-[#58a6ff] transition-colors duration-300 p-4 rounded-full text-github-text mb-6 relative z-10">
              {contact.icon}
            </div>
            
            <h3 className="font-semibold text-lg text-github-text mb-2">
              {contact.title}
            </h3>
            
            <p className="text-sm text-github-secondary mb-4 text-center">
              {contact.desc}
            </p>
            
            <span className="text-sm text-github-link font-mono break-all text-center">
              {contact.linkText}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
