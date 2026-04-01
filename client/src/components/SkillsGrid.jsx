import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const skillsData = [
  {
    category: 'Languages',
    items: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#f89820' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776ab' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479a1' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#e34f26' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572b6' }
    ]
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' }
    ]
  },
  {
    category: 'Databases',
    items: [
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#ffca28' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479a1' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47a248' }
    ]
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'OpenAI API', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z'/%3E%3C/svg%3E", color: '#000000', invertDark: true },
      { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', color: '#4285f4' },
      { name: 'Twilio / Retell', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F22F46'%3E%3Cpath d='M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.16c-4.498 0-8.16-3.662-8.16-8.16S7.502 3.84 12 3.84s8.16 3.662 8.16 8.16-3.662 8.16-8.16 8.16zm3.6-11.04c0 .994-.806 1.8-1.8 1.8s-1.8-.806-1.8-1.8.806-1.8 1.8-1.8 1.8.806 1.8 1.8zm-7.2 0c0 .994-.806 1.8-1.8 1.8S4.8 10.114 4.8 9.12s.806-1.8 1.8-1.8 1.8.806 1.8 1.8zm3.6 3.6c0 .994-.806 1.8-1.8 1.8s-1.8-.806-1.8-1.8.806-1.8 1.8-1.8 1.8.806 1.8 1.8z'/%3E%3C/svg%3E", color: '#f22f46' },
      { name: 'n8n Workflows', icon: 'https://cdn.simpleicons.org/n8n/EA4B71', color: '#ea4b71' }
    ]
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#f05032' },
      { name: 'GitHub', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E", color: '#000000', invertDark: true },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#ff6c37' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007acc' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#f24e1e' }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SkillsGrid = () => {
  const [hoveredSkill, setHoveredSkill] = React.useState(null);

  return (
    <section id="skills" className="section-container border-t border-gray-200 dark:border-github-border">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-github-text">
          <Code2 className="w-5 h-5 text-gray-600 dark:text-github-secondary" /> 
          Tech Stack
        </h2>
        <p className="text-gray-600 dark:text-github-secondary">Languages, frameworks, and tools I work with</p>
      </div>

      <div className="flex flex-col gap-8">
        {skillsData.map((category) => (
          <div key={category.category} className="border-t border-gray-200 dark:border-github-border pt-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-github-secondary mb-4">{category.category}</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-wrap gap-3"
            >
              {category.items.map((skill) => {
                const isHovered = hoveredSkill === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    transition={{ duration: 0.15 }}
                    whileHover={{ y: -5 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ 
                      borderColor: isHovered ? `${skill.color}80` : undefined,
                      boxShadow: isHovered ? `0 8px 16px ${skill.color}33, 0 0 8px ${skill.color}1a` : undefined,
                      backgroundColor: isHovered ? (skill.color === '#ffffff' ? 'rgba(255,255,255,0.05)' : `${skill.color}0a`) : undefined
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-white/5 rounded-lg bg-white/80 dark:bg-[#0d1117] transition-all duration-150 cursor-default group"
                  >
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className={`w-7 h-7 object-contain transition-all duration-150 group-hover:scale-125 dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${skill.invertDark ? 'dark:invert' : ''}`} 
                    />
                    <span className="text-base font-semibold text-gray-600 dark:text-[#c9d1d9] transition-colors duration-150" style={{ color: isHovered ? skill.color : undefined }}>
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsGrid;
