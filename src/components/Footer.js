import React, { useRef, useEffect, useState } from "react";
import linkedin from "../assets/images/linkedin.svg";
import instagram from "../assets/images/instagram.svg";
import email from "../assets/images/email.svg";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    const location = useLocation();
    const isDetailPage = location.pathname.match(/\/projects\/.+/);
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

    return(
        <motion.footer 
            className={`footer ${isDetailPage ? 'is-detail-page' : ''}`}
            animate={{
                y: isOpen ? '-8vh' : '0vh',
                opacity: isMobile && isOnAnyProjectPage ? 0 : 1  // ← Opacity 0 sur mobile si /projects
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <button onClick={() => setIsOpen(!isOpen)}>
                let's chat
            </button>
            <div className='social-links'>
                <a href="https://www.linkedin.com/in/alison-ndikumana-076a57274/" target="_blank" rel="noopener noreferrer"> 
                <img src={linkedin} alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/arisoonnn/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" />
                </a>
                <a href="mailto:alison.ndikumana@gmail.com">
                <img src={email} alt="Email" />
                </a>
            </div>
        </motion.footer>
    )
}

export default Footer;