import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../services/wordpress';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Charger les projets depuis WordPress
    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const wpProjects = await fetchProjects();
            
            if (wpProjects.length > 0) {
                const transformedProjects = wpProjects.map(project => ({
                  id: project.id,
slug: project.title.toLowerCase().replace(/[^a-z]/g, ''),
title: project.title,
category: project.projet?.category || 'Projet',
description: project.content || '',
thumbnail: project.featuredImage?.node?.sourceUrl,
image1: project.projet?.imageDuProjet1?.node?.sourceUrl,
image2: project.projet?.imageDuProjet2?.node?.sourceUrl,
image3: project.projet?.imageDuProjet3?.node?.sourceUrl,
image4: project.projet?.imageDuProjet4?.node?.sourceUrl,
image5: project.projet?.imageDuProjet5?.node?.sourceUrl,
image6: project.projet?.imageDuProjet6?.node?.sourceUrl,
image7: project.projet?.imageDuProjet7?.node?.sourceUrl,
image8: project.projet?.imageDuProjet8?.node?.sourceUrl,
image9: project.projet?.imageDuProjet9?.node?.sourceUrl,
image10: project.projet?.imageDuProjet10?.node?.sourceUrl,
image11: project.projet?.imageDuProjet11?.node?.sourceUrl,
image12: project.projet?.imageDuProjet12?.node?.sourceUrl,
image13: project.projet?.imageDuProjet13?.node?.sourceUrl,
image14: project.projet?.imageDuProjet14?.node?.sourceUrl,
image15: project.projet?.imageDuProjet15?.node?.sourceUrl,
image16: project.projet?.imageDuProjet16?.node?.sourceUrl,
image17: project.projet?.imageDuProjet17?.node?.sourceUrl,
image18: project.projet?.imageDuProjet18?.node?.sourceUrl,
image19: project.projet?.imageDuProjet19?.node?.sourceUrl,
image20: project.projet?.imageDuProjet20?.node?.sourceUrl,
image21: project.projet?.imageDuProjet21?.node?.sourceUrl,
image22: project.projet?.imageDuProjet22?.node?.sourceUrl,
image23: project.projet?.imageDuProjet23?.node?.sourceUrl,
image24: project.projet?.imageDuProjet24?.node?.sourceUrl,
image25: project.projet?.imageDuProjet25?.node?.sourceUrl,
image26: project.projet?.imageDuProjet26?.node?.sourceUrl,
image27: project.projet?.imageDuProjet27?.node?.sourceUrl,
image28: project.projet?.imageDuProjet28?.node?.sourceUrl,
image29: project.projet?.imageDuProjet29?.node?.sourceUrl,
image30: project.projet?.imageDuProjet30?.node?.sourceUrl,
video: project.projet?.videoDuProjet?.node?.mediaItemUrl,
imageAlt: project.featuredImage?.node?.altText
                }));
                console.log('🎥 Premier projet avec vidéo:', transformedProjects[0]);
console.log('🎥 Vidéo URL:', transformedProjects[0]?.video);
                transformedProjects.reverse();
                setProjects(transformedProjects);
            } else {
                // Fallback données statiques
                setProjects([
                    { id: 'bothiam', slug: 'bothiam', title: 'Bothiam', category: 'visual identity design', description: '' },
                    { id: 'fiftylab', slug: 'fiftylab', title: 'FiftyLab', category: 'ui/ux design and web dev', description: '' },
                    { id: 'woodblocks', slug: 'woodblocks', title: 'WoodBlocks', category: 'ui/ux design and web dev', description: '' },
                    { id: 'ezra', slug: 'ezra', title: 'Ezra', category: 'visual experiment', description: '' },
                    { id: 'bxbox', slug: 'bxbox', title: 'BxBox', category: 'event poster', description: '' },
                    { id: 'interlinked', slug: 'interlinked', title: 'Interlinked', category: 'visual experiment', description: '' },
                    { id: 'lettering', slug: 'lettering', title: 'Lettering', category: 'visual experiment', description: '' },
                    { id: 'iliona', slug: 'iliona', title: 'Iliona', category: 'camroll', description: '' }
                ]);
            }
            setLoading(false);
        };

        loadProjects();
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

    // Trouve le projet actuel
    const project = projects.find(p => p.slug === projectId);
    const currentIndex = projects.findIndex(p => p.slug === projectId);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    // Ouvre la lightbox avec une image
    const openLightbox = (imageUrl) => {
        setLightboxImage(imageUrl);
        setLightboxOpen(true);
    };

    if (loading) {
        return <div className="project-detail-overlay">Chargement...</div>;
    }

    if (!project) {
        return <div className="project-detail-overlay">Projet non trouvé</div>;
    }

    // Vidéo + Images
    const videoArray = project.video ? [project.video] : [];
    const allImages = [
        project.image1,
project.image2,
project.image3,
project.image4,
project.image5,
project.image6,
project.image7,
project.image8,
project.image9,
project.image10,
project.image11,
project.image12,
project.image13,
project.image14,
project.image15,
project.image16,
project.image17,
project.image18,
project.image19,
project.image20,
project.image21,
project.image22,
project.image23,
project.image24,
project.image25,
project.image26,
project.image27,
project.image28,
project.image29,
project.image30
    ].filter(Boolean);

    return (
        <motion.div 
            className="project-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                layoutId={`project-${project.slug}`}
                className={`project-detail-modal div-projet ${project.slug}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Div avec vidéo + images */}
                <motion.div 
                    layoutId={`project-${project.slug}-img`}
                    className={`project-detail-image img-${project.slug}`}
                    style={{ cursor: 'pointer' }}
                >
                   {/* Si desktop : vidéo en premier */}
                    {!isMobile && videoArray.map((video, idx) => (
                        <video 
                            key={`video-${idx}`}
                            src={video}
                            controls
                            style={{
                                width: '90%',
                                height: 'auto',
                                marginTop: '12vh',
                                marginBottom: '12vh'
                            }}
                        />
                    ))}
                    
                    {/* Puis les images */}
                    {allImages.length > 0 ? (
                        allImages.map((imageUrl, idx) => (
                            <img 
                                key={idx}
                                src={imageUrl} 
                                alt={`${project.title} - ${idx + 1}`}
                                onClick={() => openLightbox(imageUrl)}
                                style={{
                                    width: '100%', 
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                }} 
                            />
                        ))
                    ) : (
                        !project.video && <div style={{width: '100%', height: '100%', backgroundColor: '#ddd'}} />
                    )}

                {/* Si mobile : vidéo à la fin */}
                {isMobile && videoArray.map((video, idx) => (
                    <video 
                        key={`video-mobile-${idx}`}
                        src={video}
                        controls
                        style={{
                            width: '90%',
                            height: 'auto',
                            marginTop: '12vh',
                            marginBottom: '12vh'
                        }}
                    />
                ))}
                </motion.div>
                
                <div className='project-detail-content'>
                    <h1>{project.title}</h1> - 
                    <h2 className="category">{project.category}</h2>

                    {/* Bouton read more SEULEMENT sur mobile */}
                    {isMobile && (
                        <button 
                            className="read-more-button"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'read less' : 'read more'}
                        </button>
                    )}

                    {/* Description */}
                    {isMobile ? (
                        <motion.div
                            initial={false}
                            animate={{
                                height: isExpanded ? 'auto' : 0,
                                opacity: isExpanded ? 1 : 0
                            }}
                            transition={{ 
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div 
                                className="description" 
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </motion.div>
                    ) : (
                        <div 
                            className="description" 
                            dangerouslySetInnerHTML={{ __html: project.description }}
                        />
                    )}

                    <div className="next-button">
                        {!isMobile && nextProject && (
                            <button onClick={() => navigate(`/projects/${nextProject.slug}`)}>
                                next project →
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            <button 
                className="close-button"
                onClick={() => navigate('/projects')}
            >
                [x]
            </button>

            {isMobile && nextProject && (
                <div className='div-next-button'>
                    <button onClick={() => navigate(`/projects/${nextProject.slug}`)}>
                        [next project →]
                    </button>
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && lightboxImage && (
                    <motion.div 
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxOpen(false)}
                    >
                        <motion.img
                            src={lightboxImage}
                            alt={project.title}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                cursor: 'pointer'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        
                        <button 
                            className="lightbox-close"
                            onClick={() => setLightboxOpen(false)}
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='hidden-bloc'></div>
        </motion.div>
    );
}

export default ProjectDetail;