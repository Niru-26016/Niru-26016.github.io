import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Zap } from 'lucide-react';

const TufPitch = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    },
  };

  const pitchPoints = [
    {
      icon: <Code2 className="w-8 h-8 text-github-link mb-4" />,
      title: 'Frontend Obsessed',
      desc: 'Deeply focused on UI/UX, React, and building performant components. No backend distractions here.',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#8957e5] mb-4" />,
      title: 'Mobile-First Mentality',
      desc: 'Passionate about making the mobile web experience feel as smooth, polished, and robust as a native app.',
    },
    {
      icon: <Zap className="w-8 h-8 text-[#e3b341] mb-4" />,
      title: 'High Velocity Execution',
      desc: 'Proven track record of building, shipping, and iterating fast with strong ownership.',
    },
  ];

  return (
    <section className="px-6 w-full max-w-[1200px] mx-auto py-12">
      <motion.div 
        className="w-full relative rounded-2xl overflow-hidden border border-github-border bg-gradient-to-br from-white to-gray-50 dark:from-[#0d1117] dark:to-[#161b22] p-8 md:p-12 shadow-sm dark:shadow-[0_0_50px_rgba(46,160,67,0.05)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: 'spring', duration: 1 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 mb-4 inline-block">
              Why I fit takeUforward
            </h2>
            <p className="text-gray-600 dark:text-github-secondary text-lg max-w-xl leading-relaxed">
              I read the JD carefully. You need someone who breathes frontend engineering and can build top-tier mobile browser experiences for 1.5M+ users. Here's why I'm ready for the challenge.
            </p>
          </div>
          <div className="shrink-0 flex gap-4">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="p-4 bg-gray-100/50 dark:bg-black/40 rounded-xl border border-github-border backdrop-blur-md">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="w-8 h-8" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: -10 }} className="p-4 bg-gray-100/50 dark:bg-black/40 rounded-xl border border-github-border backdrop-blur-md">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" className="w-8 h-8 rounded-sm" />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pitchPoints.map((point, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
              className="bg-white/80 dark:bg-[#0f1419]/80 backdrop-blur-md border border-github-border p-6 rounded-xl group transition-all"
            >
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="inline-block"
              >
                {point.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-github-text mb-2 group-hover:text-github-link transition-colors">
                {point.title}
              </h3>
              <p className="text-gray-600 dark:text-github-secondary text-sm leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TufPitch;
