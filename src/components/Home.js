import React from 'react';
import scrollDown from "../assets/images/scroll-down.svg";
import { Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { delay, motion } from 'framer-motion';



const Home = () => {

    const location = useLocation();
    const isProjectsPage = location.pathname.includes('/projects');

    
    return (
        
        <div className='home'>
            <article className='presentation'>
                <motion.p
                animate={{
                    opacity: isProjectsPage ? 0.2 : 1,
                }}
                transition={{
                    duration: isProjectsPage ? 0 : 0.8,
                    ease: "easeInOut"
                }}
                >hi, i’m alison, i do graphic design, ui/ux design and front-end development</motion.p>
                <motion.img
                animate={{
                    opacity: isProjectsPage ? 0 : [0, 1, 0], // 0 fixe sur /projects, clignote ailleurs
                    }}
                transition={{
                    duration: isProjectsPage ? 0 : 0.8, // Pas d'animation sur /projects
                    repeat: isProjectsPage ? 0 : Infinity,
                    ease: "linear"
                    }}
    src={scrollDown} alt="Scroll Down" 
/>
            </article>
        </div>
       
        
    )
}

export default Home;