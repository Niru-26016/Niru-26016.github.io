import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Flame, GitCommit, Calendar, TrendingUp, Zap } from 'lucide-react';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

const getLevelClass = (count) => {
  if (count === 0) return 'bg-[#d0d7de] dark:bg-[#161b22]';
  if (count <= 2) return 'bg-[#9be9a8] dark:bg-[#0e4429]';
  if (count <= 5) return 'bg-[#40c463] dark:bg-[#006d32]';
  if (count <= 9) return 'bg-[#30a14e] dark:bg-[#26a641]';
  return 'bg-[#216e39] dark:bg-[#39d353]';
};

const getLevelGlow = (count) => {
  if (count === 0) return '';
  if (count <= 2) return 'dark:shadow-[0_0_4px_rgba(14,68,41,0.5)]';
  if (count <= 5) return 'dark:shadow-[0_0_6px_rgba(0,109,50,0.5)]';
  if (count <= 9) return 'dark:shadow-[0_0_8px_rgba(38,166,65,0.4)]';
  return 'dark:shadow-[0_0_10px_rgba(57,211,83,0.5)]';
};

const formatTooltip = (count, dateString) => {
  const dateStr = new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const contribText = count === 0 ? 'No contributions' : `${count} contribution${count > 1 ? 's' : ''}`;
  return `${contribText} on ${dateStr}`;
};

// Animated counter component
const AnimatedNumber = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString());
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return <span ref={ref}>{displayValue}</span>;
};

// Stat card component
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 200, damping: 15, delay }}
    whileHover={{ y: -4, boxShadow: `0 8px 30px -10px ${color}40` }}
    className="relative flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 overflow-hidden group shadow-sm dark:shadow-none"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
         style={{ background: `radial-gradient(circle at 30% 50%, ${color}08, transparent 70%)` }} />
    <div className="p-2.5 rounded-lg relative z-10" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
    <div className="relative z-10">
      <p className="text-xs text-github-secondary font-medium uppercase tracking-wider">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </p>
    </div>
  </motion.div>
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const ContributionGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);
  const graphRef = useRef(null);
  const isInView = useInView(graphRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/contributions`);
        if (!res.ok) throw new Error('API down');
        const json = await res.json();
        setData(json);
      } catch (err) {
        const totalWeeks = 52;
        const now = new Date();
        const weeks = [];
        let total = 0;
        
        for (let w = 0; w < totalWeeks; w++) {
          const days = [];
          for (let d = 0; d < 7; d++) {
            const date = new Date(now);
            date.setDate(date.getDate() - ( (totalWeeks - w - 1) * 7 + (6 - d) ));
            
            let count = 0;
            if (date <= now && Math.random() > 0.65) {
              count = Math.floor(Math.random() * 12);
              total += count;
            }
            
            days.push({
              date: date.toISOString(),
              contributionCount: count
            });
          }
          weeks.push({ contributionDays: days });
        }
        setData({ total, weeks });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // Derive stats from data
  const stats = useMemo(() => {
    if (!data) return { total: 0, streak: 0, bestDay: 0, activeDays: 0 };
    
    let streak = 0;
    let currentStreak = 0;
    let bestDay = 0;
    let activeDays = 0;

    const allDays = data.weeks.flatMap(w => w.contributionDays);
    
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        currentStreak++;
        streak = Math.max(streak, currentStreak);
        activeDays++;
        bestDay = Math.max(bestDay, day.contributionCount);
      } else {
        currentStreak = 0;
      }
    }
    
    return { total: data.total, streak, bestDay, activeDays };
  }, [data]);

  // Derive month labels from weeks data (skip if too close to avoid overlap)
  const monthLabels = useMemo(() => {
    if (!data) return [];
    const labels = [];
    let lastMonth = -1;
    let lastWeekIdx = -4;
    
    data.weeks.forEach((week, wIdx) => {
      if (week.contributionDays.length > 0) {
        const firstDay = new Date(week.contributionDays[0].date);
        const month = firstDay.getMonth();
        if (month !== lastMonth && (wIdx - lastWeekIdx) >= 3) {
          labels.push({ month: MONTHS[month], weekIndex: wIdx });
          lastMonth = month;
          lastWeekIdx = wIdx;
        }
      }
    });
    
    return labels;
  }, [data]);

  return (
    <section id="activity" className="section-container border-t border-github-border">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="p-2 rounded-lg bg-green-500/10 border border-green-500/20"
          >
            <Activity className="w-6 h-6 text-green-400" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Contribution Activity</h2>
            <p className="text-github-secondary text-sm">My coding activity throughout the year</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={GitCommit} label="Contributions" value={stats.total} color="#39d353" delay={0} />
          <StatCard icon={Flame} label="Longest Streak" value={`${stats.streak}d`} color="#f97316" delay={0.1} />
          <StatCard icon={TrendingUp} label="Best Day" value={`${stats.bestDay}`} color="#8b5cf6" delay={0.2} />
          <StatCard icon={Zap} label="Active Days" value={stats.activeDays} color="#3b82f6" delay={0.3} />
        </div>
      )}

      {/* Graph Container */}
      <motion.div 
        ref={graphRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="relative border border-gray-200 dark:border-white/5 rounded-2xl p-6 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md shadow-sm dark:shadow-none"
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Contribution count header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="text-sm">
            {loading ? (
              <span className="text-github-secondary animate-pulse">Loading contributions...</span>
            ) : (
              <span className="text-github-secondary">
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                  <AnimatedNumber value={data?.total || 0} />
                </span>
                {' '}contributions in the last year
              </span>
            )}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-2 text-xs text-github-secondary"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date().getFullYear()}</span>
          </motion.div>
        </div>

        {/* Graph Grid with Month Labels */}
        <div className="relative z-10 overflow-x-auto pb-2 custom-scrollbar">
          <div className="min-w-max">
            {/* Month Labels - inside scrollable area so they align with squares */}
            {!loading && (
              <div className="relative h-5 mb-1" style={{ marginLeft: '40px' }}>
                {monthLabels.map((label, i) => (
                  <span 
                    key={i} 
                    className="absolute text-[10px] text-gray-500 dark:text-github-secondary font-medium"
                    style={{ left: `${label.weekIndex * 16}px` }}
                  >
                    {label.month}
                  </span>
                ))}
              </div>
            )}

            {/* Squares grid */}
            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1 shrink-0">
                {DAYS.map((day, i) => (
                  <div key={i} className="w-8 h-[13px] flex items-center justify-end pr-1">
                    <span className="text-[10px] text-gray-500 dark:text-github-secondary">{day}</span>
                  </div>
                ))}
              </div>

              {/* Squares */}
              {!loading && data?.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dIdx) => {
                    const globalIdx = wIdx * 7 + dIdx;
                    return (
                      <motion.div
                        key={`${wIdx}-${dIdx}`}
                        initial={isInView ? { opacity: 0, scale: 0 } : false}
                        animate={isInView ? { opacity: 1, scale: 1 } : false}
                        transition={{ 
                          delay: (globalIdx * 0.002),
                          type: 'spring',
                          stiffness: 500,
                          damping: 25
                        }}
                        onMouseEnter={() => setHoveredDay({ ...day, wIdx, dIdx })}
                        onMouseLeave={() => setHoveredDay(null)}
                        title={formatTooltip(day.contributionCount, day.date)}
                        className={`w-[13px] h-[13px] rounded-[3px] cursor-pointer transition-all duration-200 
                          hover:scale-[1.6] hover:z-20 hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30 
                          ${getLevelClass(day.contributionCount)} ${getLevelGlow(day.contributionCount)}`}
                      />
                    );
                  })}
                </div>
              ))}

              {loading && (
                <div className="flex gap-[3px] w-full">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <motion.div
                          key={j}
                          animate={{ opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: (i + j) * 0.05 }}
                          className="w-[13px] h-[13px] rounded-[3px] bg-[#d0d7de] dark:bg-[#161b22]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="relative z-10 flex items-center justify-between mt-5 pt-4 border-t border-gray-200 dark:border-white/5">
          <a 
            href="https://github.com/Niru-26016" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-github-secondary hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-1.5"
          >
            <span>Learn how we count contributions</span>
          </a>
          <div className="flex items-center gap-2 text-[11px] text-github-secondary">
            <span>Less</span>
            <div className="flex gap-[3px]">
              {[0, 1, 2, 3, 4].map(level => (
                <motion.div
                  key={level}
                  whileHover={{ scale: 1.4 }}
                  className={`w-[13px] h-[13px] rounded-[3px] ${getLevelClass(level === 0 ? 0 : level * 3)} ${getLevelGlow(level * 3)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContributionGraph;
