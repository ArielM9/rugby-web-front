const API_URL = 'https://newsapi.org/v2/everything?q=rugby&language=es&apiKey=5f074115c1fb42729ffa52aabb6c2d95'

export const fetchNoticias = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      if (data.status === 'ok' && data.articles) {
        const allNews = data.articles.map(article => {
          const cleanDescription = article.description?.endsWith(" Leer")
            ? article.description.slice(0, -5) 
            : article.description;
  
          return {
            source: article.source.name,
            image: article.urlToImage,
            title: article.title,
            description: cleanDescription,
            date: new Date(article.publishedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            link: article.url 
          };
        });
  
        sessionStorage.setItem('noticias', JSON.stringify(allNews));
        return allNews;
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      return []; // Retorna un array vacío en caso de error
    }
  };
  