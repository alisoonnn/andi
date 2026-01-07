import React, { useRef, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProjects } from '../services/wordpress';

const Projects = ({ isMobile = false }) => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [scrollPos, setScrollPos] = useState(0);
    const [cycleWidth, setCycleWidth] = useState(0);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const isDetailPage = location.pathname.match(/\/projects\/.+/);
    
    console.log('ProjectsDesktop MOUNTED');

    // Charger les projets depuis WordPress
    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const wpProjects = await fetchProjects();
            
            if (wpProjects.length > 0) {
                // Transforme les données WordPress
                const transformedProjects = wpProjects.map(project => ({
                    id: project.id,
    title: project.title,
    category: project.projet?.category || 'Projet',
    thumbnail: project.featuredImage?.node?.sourceUrl,
    imageUrl: project.projet?.imageDuProjet1?.node?.sourceUrl,
    image2: project.projet?.imageDuProjet2?.node?.sourceUrl,
    image3: project.projet?.imageDuProjet3?.node?.sourceUrl,
    image4: project.projet?.imageDuProjet4?.node?.sourceUrl,
    image5: project.projet?.imageDuProjet5?.node?.sourceUrl,
    imageAlt: project.featuredImage?.node?.altText
                }));

                transformedProjects.reverse();
                setProjects(transformedProjects);
                console.log('✅ Projets WordPress chargés:', transformedProjects);
            } else {
                // Fallback sur données statiques
                console.log('⚠️ Pas de projets WordPress, utilisation des données statiques');
                setProjects([
                    { id: 'bothiam', title: 'Bothiam', category: 'visual identity design' },
                    { id: 'fiftylab', title: 'FiftyLab', category: 'ui/ux design and web dev' },
                    { id: 'woodblocks', title: 'WoodBlocks', category: 'ui/ux design and web dev' },
                    { id: 'ezra', title: 'Ezra', category: 'visual experiment' },
                    { id: 'bxbox', title: 'BxBox', category: 'event poster' },
                    { id: 'interlinked', title: 'Interlinked', category: 'visual experiment' },
                    { id: 'lettering', title: 'Lettering', category: 'visual experiment' },
                    { id: 'iliona', title: 'Iliona', category: 'camroll' }
                ]);
            }
            setLoading(false);
        };

        loadProjects();
    }, []);

    

    useEffect(() => {
        const calculateWidth = () => {
            const vw = window.innerWidth / 100;
            setCycleWidth((2*2+6*5 + (20+18+25+17+15+16+17)) * vw);
        };
        
        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    const opacity = Math.min(scrollPos / 500, 1);
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const sectionTranslateX = Math.max(vw - (scrollPos * 2), 0);
    
    useEffect(() => {
        if (window.innerWidth < 768) return;
        const vw = window.innerWidth;
        console.log('ProjectsDesktop useEffect - navigation check');
        
        const isDetailPage = location.pathname.match(/\/projects\/.+/);
        if (isDetailPage) return;
        
        if (sectionTranslateX < vw && location.pathname !== '/projects') {
            navigate('/projects', { replace: true });
        } else if (sectionTranslateX >= vw && location.pathname === '/projects') {
            navigate('/', { replace: true });
        }
    }, [sectionTranslateX, navigate, location.pathname]);
    
    const scrollAtStart = vw / 2;
    const effectiveScrollForHorizontal = Math.max(0, scrollPos - scrollAtStart);
    const horizontalOffset = sectionTranslateX === 0 && cycleWidth > 0 
        ? (effectiveScrollForHorizontal / 2) % cycleWidth 
        : 0;

    const projectsContent = (
        <>
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    className='project-link' 
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/projects/${project.title.toLowerCase().replace(/[^a-z]/g, '')}`);
                    }}
                    whileHover={{ scale: 1.1 }}
                    style={{ cursor: 'pointer' }}
                >
                    <article className={`div-projet ${project.title.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        <div 
                            className={`img img-${project.id}`}
                            style={project.thumbnail ? { 
                                backgroundImage: `url(${project.thumbnail})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            } : {}}
                        ></div>
                        <div className={`title-${project.id}`}>
                            <h2>{project.title}</h2>
                        </div>
                        <div className={`cat-${project.id}`}>
                            <p>{project.category}</p>
                        </div>
                    </article>
                </motion.div>
            ))}
        </>
    );

    console.log('📸 Projects à afficher:', projects);
console.log('📸 Premier projet:', projects[0]);

    return (
        <motion.section 
            className={`projects-page-wrapper ${isDetailPage ? 'is-detail-page' : ''}`}
            style={{
                opacity,
                x: sectionTranslateX
            }}
        >
            <div 
                className="projects-page" 
                ref={ref} 
                style={{
                    transform: `translateX(-${horizontalOffset}px)`
                }}
            >
                {projectsContent}
                {projectsContent}
                {projectsContent}
                {projectsContent}
            </div>
        </motion.section>
    );
}

export default Projects;