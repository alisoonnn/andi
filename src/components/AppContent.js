import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import ProjectsDesktop from './Projects';  // ← Renomme l'import
import ProjectsMobile from './ProjectsMobile';
import Footer from './Footer';
import texture from '../assets/images-webp/paper-texture.webp';
import ProjectDetail from './ProjectDetail';

function AppContent() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(
  window.matchMedia('(max-width: 768px)').matches  // ← Détection immédiate
);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
  
  const checkMobile = (e) => {
    const mobile = e ? e.matches : mobileQuery.matches;
    console.log('matchMedia - isMobile:', mobile);
    setIsMobile(mobile);
  };
  
  checkMobile(); // Check initial
  mobileQuery.addEventListener('change', checkMobile);
  return () => mobileQuery.removeEventListener('change', checkMobile);
}, []);
 console.log('Before render - isMobile:', isMobile, 'Width:', window.innerWidth);
  const ProjectsComponent = isMobile ? ProjectsMobile : ProjectsDesktop;
  
  console.log('AppContent render - isMobile:', isMobile, 'Component:', ProjectsComponent.name);

 
console.log('Selected component:', ProjectsComponent.name);
  
  return (
    <>
      <img className='texture' src={texture} alt="paper texture"></img>
      <Header />
      
      <Routes location={location}>
        <Route path="/" element={
          <div className='height-container' style={{height: '100000vh'}}>
            <Home />
            {/* // Dans AppContent.js */}
<ProjectsComponent isMobile={isMobile} />
          </div>
        } />
        
        <Route path="/projects" element={
          <div className='height-container' style={{height: '100000vh'}}>
            <Home />
            <ProjectsComponent isMobile={isMobile} />
          </div>
        } />

        <Route path="/projects/:projectId" element={
          <>
            <div className='height-container' style={{height: '100000vh'}}>
              <Home />
              <ProjectsComponent isMobile={isMobile} />
            </div>
            <ProjectDetail />
          </>
        } />
      </Routes>
      
      <Footer />
    </>
  );
}

export default AppContent;