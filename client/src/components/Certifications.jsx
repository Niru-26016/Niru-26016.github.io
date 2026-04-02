import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certs = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    date: 'Jul 2025',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=E3B2B64E1394DC9FE6BAE06EEABC4B28E5B97486AE039BA8960F2D272E6A5658',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    border: 'border-[#f80000]/30 hover:border-[#f80000]',
    shadow: 'hover:shadow-[0_10px_30px_rgba(248,0,0,0.15)]'
  },
  {
    title: 'Foundations of User Experience (UX) Design',
    issuer: 'Google (Coursera)',
    date: 'Jun 2025',
    link: 'https://coursera.org/verify/ZVOCX8WU43UD',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    border: 'border-[#4285F4]/30 hover:border-[#4285F4]',
    shadow: 'hover:shadow-[0_10px_30px_rgba(66,133,244,0.15)]'
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'Apr 2026',
    link: 'https://verify.skilljar.com/c/tpd6ihhgj26x',
    icon: 'https://cdn.simpleicons.org/anthropic/181818/e8e8e8',
    border: 'border-[#d4a574]/30 hover:border-[#d4a574]',
    shadow: 'hover:shadow-[0_10px_30px_rgba(212,165,116,0.15)]'
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="section-container border-t border-github-border">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2 text-github-text">
          <Award className="w-5 h-5 text-github-secondary" /> 
          Certifications
        </h2>
        <p className="text-github-secondary">Professional certifications & achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-lg bg-github-dark border transition-all duration-300 hover:-translate-y-2 ${cert.border} ${cert.shadow}`}
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <img src={cert.icon} alt={cert.issuer} className="w-8 h-8 object-contain" />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-github-text leading-tight mb-2">
                {cert.title}
              </h3>
              <p className="text-sm text-github-secondary">{cert.issuer}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <span className="text-xs bg-github-header border border-github-border px-2 py-1 rounded-md text-github-secondary">
                  {cert.date}
                </span>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-github-link hover:underline inline-flex items-center gap-1"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
