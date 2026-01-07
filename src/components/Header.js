import React, { useRef, useEffect, useState } from "react";
import logo from "../assets/images/andi.svg";
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const location = useLocation();
    const isProjectsPage = location.pathname === '/projects';
    const [scrollPos, setScrollPos] = useState(0);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    const isProjectDetailPage = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';
    const isOnAnyProjectPage = location.pathname.startsWith('/projects');

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        
        const checkMobile = (e) => {
            setIsMobile(e ? e.matches : mobileQuery.matches);
        };
        
        checkMobile();
        mobileQuery.addEventListener('change', checkMobile);
        return () => mobileQuery.removeEventListener('change', checkMobile);
    }, []);

    const isProjectsVisible = scrollPos > 100;
    
    return (
        <motion.header 
            className='header'
        >
           <motion.a 
            href="/" 
            className="logo-link"
            animate={{
                scale: !isMobile && isOnAnyProjectPage ? 0.5 : 1,
                y: !isMobile && isOnAnyProjectPage ? -280 : 0,
                opacity: isMobile && isOnAnyProjectPage ? 0.2 : 1,  // ← Ajout opacity
            }}
            transition={{ 
                duration: isProjectDetailPage ? 0 : 0.4,
                ease: "easeInOut" 
            }}
        >
            <img src={logo} alt="Andi Logo" />
        </motion.a>
        </motion.header>
    );
}

export default Header;