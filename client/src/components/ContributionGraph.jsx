import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const API_BASE = 'http://localhost:3001';

const getLevelClass = (count) => {
  if (count === 0) return 'bg-github-square-0';
  if (count <= 2) return 'bg-github-square-1';
  if (count <= 5) return 'bg-github-square-2';
  if (count <= 9) return 'bg-github-square-3';
  return 'bg-github-square-4';
};

const formatTooltip = (count, dateString) => {
  const dateStr = new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const contribText = count === 0 ? 'No contributions' : `${count} contribution${count > 1 ? 's' : ''}`;
  return `${contribText} on ${dateStr}`;
};

const ContributionGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/contributions`);
        if (!res.ok) throw new Error('API down');
        const json = await res.json();
        setData(json);
      } catch (err) {
        // Fallback: Simulate ~52 weeks empty but randomized data
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
            if (date <= now && Math.random() > 0.7) {
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

  return (
    <section id="activity" className="section-container border-t border-github-border">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <Activity className="w-6 h-6 text-github-text" /> 
          Contribution Activity
        </h2>
        <p className="text-github-secondary">My coding activity throughout the year</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-github-border rounded-lg p-6 bg-github-dark"
      >
        <div className="text-sm mb-4">
          {loading ? (
            <span className="text-github-secondary animate-pulse">Loading contributions...</span>
          ) : (
            <span className="text-github-text">
              <span className="font-semibold">{data?.total.toLocaleString() || 0} contributions</span> in the last year
            </span>
          )}
        </div>

        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex gap-1 min-w-max">
            {!loading && data?.weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    title={formatTooltip(day.contributionCount, day.date)}
                    className={`w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-125 hover:ring-1 hover:ring-white/50 cursor-pointer ${getLevelClass(day.contributionCount)}`}
                  />
                ))}
              </div>
            ))}
            {loading && (
              <div className="animate-pulse flex gap-1 h-[90px] w-full bg-github-header/50 rounded" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs text-github-secondary mt-4">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[10px] h-[10px] rounded-[2px] bg-github-square-0" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-github-square-1" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-github-square-2" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-github-square-3" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-github-square-4" />
          </div>
          <span>More</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ContributionGraph;
