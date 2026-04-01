import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Link as LinkIcon, Download, BookOpen } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const phrases = [
  'Full-Stack & AI Developer 🚀',
  'React · Java · JavaScript 💙',
  'Building AI-enabled apps 🤖',
  'Shipping practical, user-focused software 💻'
];

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    let ticker = setInterval(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearInterval(ticker);
  }, [text, isDeleting, loopNum]);

  const handleTyping = () => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    setText(isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1)
    );

    if (!isDeleting) {
      setTypingSpeed(60);
    } else {
      setTypingSpeed(30);
    }

    if (!isDeleting && text === fullText) {
      setIsDeleting(true);
      setTypingSpeed(2000); // Pause at end
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(400); // Pause before starting next
    }
  };

  return (
    <section id="about" className="pt-16 pb-16 px-6 max-w-[1200px] w-full mx-auto scroll-mt-24">
      <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
        <motion.div 
          className="w-full md:w-[300px] shrink-0 flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block w-48 h-48 md:w-full md:aspect-square rounded-full border border-github-border group cursor-pointer overflow-hidden leading-none selection:bg-transparent">
            <img 
              src="https://avatars.githubusercontent.com/Niru-26016" 
              alt="Niranjan Reddy P R" 
              className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 right-6 bg-[#0d1117] border border-[#30363d] rounded-full p-2 flex items-center justify-center">
              <span className="text-xl leading-none" role="img" aria-label="Status">🟢</span>
            </div>
          </div>

          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-500/20 dark:to-blue-500/20 border border-green-500/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6 shadow-[0_0_20px_rgba(46,160,67,0.1)] dark:shadow-[0_0_20px_rgba(46,160,67,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Applying for SWE Intern (Frontend) @ takeUforward
            </motion.div>

            <h1 className="text-[1.6rem] leading-tight font-bold text-github-text">Niranjan Reddy P R</h1>
            <p className="text-[1.15rem] leading-tight text-github-secondary mb-4">Niru-26016</p>
            <div className="h-6 mb-6 font-mono text-sm text-github-text">
              {text}<span className="animate-pulse">|</span>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-github-text mb-6">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-github-secondary" /> Chennai, India
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-github-secondary" />
                <a href="mailto:niranjan.polaka@gmail.com" className="hover:text-github-link hover:underline">niranjan.polaka@gmail.com</a>
              </span>
              <span className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-github-secondary" />
                <a href="https://niranjanreddy.me" target="_blank" rel="noreferrer" className="hover:text-github-link hover:underline">niranjanreddy.me</a>
              </span>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3">
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5, y: -5 }} 
                  whileTap={{ scale: 0.9 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  href="https://github.com/Niru-26016" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 border border-github-border rounded-xl bg-white/50 dark:bg-[#0d1117]/80 backdrop-blur-md hover:bg-gray-100 dark:hover:bg-[#161b22] hover:border-black dark:hover:border-white transition-all text-github-text hover:text-black dark:hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <FaGithub className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: -5, y: -5 }} 
                  whileTap={{ scale: 0.9 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  href="https://www.linkedin.com/in/niranjanpolaka" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 border border-github-border rounded-xl bg-white/50 dark:bg-[#0d1117]/80 backdrop-blur-md hover:bg-blue-50 dark:hover:bg-[#161b22] hover:border-blue-500 dark:hover:border-blue-400 transition-all text-github-text hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <FaLinkedin className="w-6 h-6" />
                </motion.a>
              </div>

              <motion.a 
                whileHover={{ scale: 1.02, y: -4, boxShadow: "0 10px 30px -10px rgba(35,134,54,0.6)" }} 
                whileTap={{ scale: 0.98 }} 
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                href="./resume.pdf" 
                download 
                className="github-btn inline-flex items-center gap-2 w-full justify-center text-md py-3 rounded-xl bg-[#238636] hover:bg-[#2ea043] transition-colors"
              >
                <Download className="w-5 h-5" /> Download Resume
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Readme Side */}
        <motion.div 
          className="w-full flex-1 border border-github-border rounded-md overflow-hidden bg-github-dark"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-github-header border-b border-github-border px-4 py-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-github-secondary" />
            <span className="text-sm font-medium text-github-text">README.md</span>
          </div>
          <div className="p-6 md:p-8 pb-12 text-github-text text-[1rem] leading-relaxed">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-github-border flex items-center gap-2 text-black dark:text-white">
              <span role="img" aria-label="wave">👋</span> Hi, I'm Niranjan Reddy P R
            </h2>
            <p className="mb-6">
              A frontend-focused Computer Science student at <strong className="font-semibold text-black dark:text-white">Panimalar Engineering College, Chennai</strong> who is passionate about building <strong className="font-semibold text-black dark:text-white">high-quality, responsive, and performant user interfaces</strong> with React.js, JavaScript, and modern CSS.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2 text-black dark:text-white">
              <span role="img" aria-label="rocket">🚀</span> What I bring to takeUforward
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-6 md:ml-2">
              <li><strong className="font-semibold text-black dark:text-white">Mobile-first UI engineering</strong> — I obsess over making the mobile browser feel as smooth and polished as a native app</li>
              <li><strong className="font-semibold text-black dark:text-white">React.js & component architecture</strong> — Built production apps with reusable, performant component systems</li>
              <li><strong className="font-semibold text-black dark:text-white">Responsive & pixel-perfect layouts</strong> — Tailwind CSS, Framer Motion, and modern CSS for seamless cross-device experiences</li>
              <li><strong className="font-semibold text-black dark:text-white">Performance-driven mindset</strong> — Focused on fast load times, smooth animations, and optimized rendering</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">💼 Frontend Experience</h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li><strong className="font-semibold text-black dark:text-white">Test Yantra</strong> — Built responsive web apps with React.js, handled state management & Firebase integration</li>
              <li><strong className="font-semibold text-black dark:text-white">Zapyo Fashions</strong> — Developed customer-facing Shopify storefronts optimized for mobile commerce</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">📱 Why this internship</h3>
            <p>I want to work on real frontend challenges at scale — improving mobile browser UX for <strong className="font-semibold text-black dark:text-white">1.5M+ users</strong> is exactly the kind of high-impact work I'm looking for. No backend distractions. Just pure frontend craft.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
