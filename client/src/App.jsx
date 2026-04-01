import React from 'react';
import { Layout } from './components/Layout';
import Hero from './components/Hero';
import TufPitch from './components/TufPitch';
import ContributionGraph from './components/ContributionGraph';
import ProjectGrid from './components/ProjectGrid';
import SkillsGrid from './components/SkillsGrid';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <TufPitch />
      <ContributionGraph />
      <SkillsGrid />
      <ProjectGrid />
      <Certifications />
      <Contact />
    </Layout>
  );
}

export default App;
