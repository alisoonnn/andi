import React, { useEffect, useState } from "react";
import logo from "../assets/images/andi.svg";
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    
    const isProjectDetailPage = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';
    const isOnAnyProjectPage = location.pathname.startsWith('/projects');

    useEffect(() => {
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        
        const checkMobile = (e) => {
            setIsMobile(e ? e.matches : mobileQuery.matches);
        };
        
        checkMobile();
        mobileQuery.addEventListener('change', checkMobile);
        return () => mobileQuery.removeEventListener('change', checkMobile);
    }, []);
    
    return (
        <motion.header className='header'>
            <motion.a 
                href="/" 
                className="logo-link"
                animate={{
                    scale: isMobile ? 1 : (isOnAnyProjectPage ? 0.5 : 1),
                    y: isMobile ? 0 : (isOnAnyProjectPage ? -280 : 0),
                    opacity: isMobile && isOnAnyProjectPage ? 0.2 : 1
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