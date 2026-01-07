import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProjects } from '../services/wordpress';

const ProjectsMobile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrollPos, setScrollPos] = useState(0);
    const [hasPassedThreshold, setHasPassedThreshold] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const isDetailPage = location.pathname.match(/\/projects\/.+/);

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
                console.log('✅ Projets Mobile WordPress chargés:', transformedProjects);
            } else {
                // Fallback sur données statiques
                console.log('⚠️ Pas de projets WordPress (mobile), utilisation des données statiques');
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
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const vh = window.innerHeight;
        const threshold = vh * 0.2;
        const passed = scrollPos > threshold;
        
        if (passed !== hasPassedThreshold) {
            setHasPassedThreshold(passed);
            
            if (passed && location.pathname !== '/projects' && !isDetailPage) {
                navigate('/projects', { replace: true });
            } else if (!passed && location.pathname === '/projects') {
                navigate('/', { replace: true });
            }
        }
    }, [scrollPos, hasPassedThreshold, navigate, location.pathname, isDetailPage]);

    return (
        <section className={`projects-page-wrapper mobile ${isDetailPage ? 'is-detail-page' : ''}`}>
            <div className="projects-page mobile-vertical">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((iteration) => (
                    projects.map((project) => (
                        <motion.div
                            key={`${project.id}-${iteration}`}
                            className='project-link' 
                            onClick={() => navigate(`/projects/${project.title.toLowerCase().replace(/[^a-z]/g, '')}`)}
                            whileHover={{ scale: 1.05 }}
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
                    ))
                ))}
            </div>
        </section>
    );
}

export default ProjectsMobile;