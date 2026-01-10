// const WORDPRESS_GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://andi-design.fr/graphql';
const WORDPRESS_GRAPHQL_URL = 'https://admin.andi-design.fr/graphql';

export const fetchProjects = async () => {
  try {
    const response = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetProjects {
  projects {
    nodes {
      id
      title
      content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      projet {
        imageDuProjet1 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet2 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet3 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet4 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet5 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet6 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet7 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet8 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet9 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet10 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet11 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet12 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet13 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet14 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet15 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet16 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet17 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet18 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet19 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet20 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet21 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet22 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet23 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet24 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet25 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet26 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet27 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet28 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet29 { node { sourceUrl altText mediaDetails { width height } } }
        imageDuProjet30 { node { sourceUrl altText mediaDetails { width height } } }
        videoDuProjet {
          node {
            mediaItemUrl
          }
        }
        category
      }
    }
  }
}
        `
      })
    });

    const { data, errors } = await response.json();
    
    if (errors) {
      console.error('GraphQL Errors:', errors);
      return [];
    }
    
    console.log('Projets récupérés depuis WordPress:', data?.projects?.nodes);
    return data?.projects?.nodes || [];
  } catch (error) {
    console.error('Erreur lors du fetch des projets:', error);
    return [];
  }
};