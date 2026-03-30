import React, { useState, useEffect } from 'react';
import { Book, Star, GitFork } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

const fallbackProjects = [
  {
    name: 'college-bus-tracker',
    description: 'Real-time GPS tracking system with live bus location, ETA prediction, and stop notifications — used by 50+ students.',
    language: 'JavaScript',
    stars: 12,
    forks: 3,
    url: 'https://github.com/Niru-26016',
    topics: ['Flutter', 'Firebase', 'Google Maps', 'Dart']
  },
  {
    name: 'ai-whatsapp-chatbot',
    description: 'Multi-modal WhatsApp chatbot supporting text, voice & image queries with multilingual support and intent detection.',
    language: 'Python',
    stars: 15,
    forks: 5,
    url: 'https://github.com/Niru-26016',
    topics: ['Python', 'OpenAI', 'Twilio', 'n8n']
  },
  {
    name: 'loansense-ai-calling',
    description: 'Automated outbound calling platform with Text-to-Speech voice messages, reducing manual calling effort by 35%.',
    language: 'JavaScript',
    stars: 8,
    forks: 2,
    url: 'https://github.com/Niru-26016',
    topics: ['Node.js', 'Retell AI', 'Twilio', 'React']
  },
  {
    name: 'vibely-web-app',
    description: 'React.js + Firebase web app with authentication and real-time database operations. Built during internship at Test Yantra.',
    language: 'JavaScript',
    stars: 6,
    forks: 1,
    url: 'https://github.com/Niru-26016',
    topics: ['React', 'Firebase', 'Node.js', 'CSS']
  },
  {
    name: 'shopify-storefront',
    description: 'Mobile-optimized Shopify storefront using Liquid templates with product catalog and inventory management.',
    language: 'HTML',
    stars: 4,
    forks: 1,
    url: 'https://github.com/Niru-26016',
    topics: ['Shopify', 'Liquid', 'HTML', 'CSS']
  },
  {
    name: 'Niru-26016.github.io',
    description: 'My personal portfolio — a React + Tailwind adaptation of a GitHub-themed dark-mode experience. You\'re looking at it right now!',
    language: 'JavaScript',
    stars: 3,
    forks: 0,
    url: 'https://github.com/Niru-26016/Niru-26016.github.io',
    topics: ['React', 'Tailwind', 'Vite', 'Framer Motion']
  }
];

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/repos`);
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        if (data.length > 0) {
          setProjects(data);
          return;
        }
      } catch (err) {
        console.warn('Backend unavailable or empty, falling back to static projects.');
      }
      // Fallback
      setProjects(fallbackProjects);
    };
    fetchRepos();
  }, []);

  const getLanguageColor = (lang) => {
    const colors = {
      'JavaScript': 'bg-yellow-400',
      'Python': 'bg-blue-500',
      'HTML': 'bg-orange-500',
      'Java': 'bg-red-500',
      'CSS': 'bg-purple-500'
    };
    return colors[lang] || 'bg-gray-400';
  };

  return (
    <section id="projects" className="section-container border-t border-github-border">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2 text-github-text">
          <Book className="w-5 h-5 text-github-secondary" /> 
          Pinned Repositories
        </h2>
        <p className="text-github-secondary">Popular repositories I've built or contributed to</p>
      </div>

      <div ref={parent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((repo) => (
          <ProjectCard key={repo.name} repo={repo} getLanguageColor={getLanguageColor} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ repo, getLanguageColor }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      className="group relative border border-github-border rounded-lg bg-github-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(88,166,255,0.1)] hover:border-[#58a6ff]/50 flex flex-col h-full overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(88, 166, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full p-4 pointer-events-none">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-github-secondary" />
            <span className="font-semibold text-github-link group-hover:underline break-all">
              {repo.name}
            </span>
            <span className="text-xs border border-github-border text-github-secondary px-2 rounded-full hidden sm:inline-block">
              Public
            </span>
          </div>
        </div>

        <p className="text-sm text-github-secondary mb-4 flex-grow line-clamp-2">
          {repo.description || 'No description provided.'}
        </p>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 pointer-events-auto">
            {repo.topics.slice(0, 4).map(topic => (
              <span key={topic} className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#1f3050] text-[#58a6ff] border border-[#388bfd]/20 transition-colors hover:bg-[#388bfd] hover:text-white cursor-default">
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-github-secondary mt-auto pt-2 pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
            <span>{repo.language || 'Code'}</span>
          </div>
          
          <div className="flex items-center gap-1 hover:text-github-link transition-colors cursor-pointer">
            <Star className="w-4 h-4" />
            <span>{repo.stars || 0}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-github-link transition-colors cursor-pointer">
            <GitFork className="w-4 h-4" />
            <span>{repo.forks || 0}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectGrid;
