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
        imageDuProjet1 {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        imageDuProjet2 {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        imageDuProjet3 {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        imageDuProjet4 {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        imageDuProjet5 {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        imageDuProjet6 {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
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