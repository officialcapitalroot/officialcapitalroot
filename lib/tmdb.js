// // lib/tmdb.js
// const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"
// const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// // Video source URLs for movies
// const VIDSRC_CC_MOVIE_URL = "https://vidsrc.cc/v2/embed/movie/"
// const VIDSRC_ME_MOVIE_URL = "https://vidsrc.me/embed/movie/"
// const EMBED_CC_MOVIE_URL = "https://www.2embed.cc/embed/"
// const SHORT_ICU_URL = "https://short.icu/"

// // Video source URLs for TV shows
// const VIDSRC_CC_TV_URL = "https://vidsrc.cc/v2/embed/tv/"
// const VIDSRC_ME_TV_URL = "https://vidsrc.me/embed/tv/"
// const EMBED_CC_TV_URL = "https://www.2embed.cc/embedtv/"

// // Base URL for the website
// export const SITE_URL = "https://capitalroot.vercel.app"
// export const SITE_NAME = "Capital Root Movies"

// // TMDB API token
// export const TMDB_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZlYWI1ODQxMDUxNzE3ODE5OGI2ZmM0YzAwYjI3MyIsIm5iZiI6MTc0MzQxOTE5MS4yMDUsInN1YiI6IjY3ZWE3NzM3NzAwYTZhOTRjNmU1OGI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xs8NiR2Mi3uzGZetJBUcYX6N2nlaLSltvS6UAcOp07Q"

// // Update the fetchFromTMDB function to handle errors better
// export async function fetchFromTMDB(endpoint, options = {}) {
//   // Default to caching for 24 hours with stale-while-revalidate pattern
//   const {
//     cache = "force-cache",
//     next = {
//       revalidate: 60 * 60 * 24, // 24 hours
//       tags: ["tmdb"],
//     },
//   } = options

//   const headers = {
//     Authorization: `Bearer ${TMDB_API_TOKEN}`,
//     "Content-Type": "application/json",
//   }

//   try {
//     console.log(`Fetching from TMDB: ${TMDB_API_BASE_URL}${endpoint}`)

//     const response = await fetch(`${TMDB_API_BASE_URL}${endpoint}`, {
//       headers,
//       cache,
//       next,
//     })

//     if (!response.ok) {
//       const errorText = await response.text()
//       console.error(`TMDB API error (${response.status}):`, errorText)
//       throw new Error(`Failed to fetch data from TMDB: ${response.status}`)
//     }

//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error(`Error fetching from TMDB (${endpoint}):`, error)
//     throw error
//   }
// }

// export function getImageUrl(path, size = "original") {
//   if (!path) return "/placeholder.svg"
//   return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
// }

// // Add a new function to search with shorter cache time
// export async function searchMulti(query) {
//   if (!query || query.trim() === "") return { results: [] }
//   return fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, {
//     cache: "no-store", // Don't cache search results
//     next: { revalidate: false },
//   })
// }

// // Update the getTrending function to use more specific caching strategies
// export async function getTrending(mediaType = "all", timeWindow = "week") {
//   return fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`, {
//     next: {
//       revalidate: 60 * 60, // Revalidate trending data every hour
//       tags: [`trending-${mediaType}-${timeWindow}`],
//     },
//   })
// }

// // Update the getPopular function to use more specific caching strategies
// export async function getPopular(mediaType) {
//   return fetchFromTMDB(`/${mediaType}/popular`, {
//     next: {
//       revalidate: 60 * 60 * 6, // Revalidate popular data every 6 hours
//       tags: [`popular-${mediaType}`],
//     },
//   })
// }

// // Update the getDetails function to handle errors better
// export async function getDetails(mediaType, id) {
//   try {
//     return await fetchFromTMDB(`/${mediaType}/${id}?append_to_response=videos,credits,similar,recommendations`, {
//       next: {
//         revalidate: 60 * 60 * 24 * 7, // Revalidate details every week
//         tags: [`${mediaType}-${id}`],
//       },
//     })
//   } catch (error) {
//     console.error(`Error fetching details for ${mediaType} ${id}:`, error)
//     throw error
//   }
// }

// // Get streaming URLs for different sources for movies
// export function getMovieStreamingUrls(movieId) {
//   return {
//     vidsrcCc: `${VIDSRC_CC_MOVIE_URL}${movieId}`,
//     vidsrcMe: `${VIDSRC_ME_MOVIE_URL}${movieId}`,
//     embedCc: `${EMBED_CC_MOVIE_URL}${movieId}`,
//     shortIcu: `${SHORT_ICU_URL}${movieId}`,
//   }
// }

// // Get streaming URLs for different sources for TV episodes
// export function getTvEpisodeStreamingUrls(tvId, seasonNumber, episodeNumber) {
//   return {
//     vidsrcCc: `${VIDSRC_CC_TV_URL}${tvId}/${seasonNumber}/${episodeNumber}`,
//     vidsrcMe: `${VIDSRC_ME_TV_URL}${tvId}/${seasonNumber}-${episodeNumber}`,
//     embedCc: `${EMBED_CC_TV_URL}${tvId}&s=${seasonNumber}&e=${episodeNumber}`,
//   }
// }

// // Export the constants for use in other files
// export {
//   TMDB_API_BASE_URL,
//   TMDB_IMAGE_BASE_URL,
//   VIDSRC_CC_MOVIE_URL,
//   VIDSRC_ME_MOVIE_URL,
//   EMBED_CC_MOVIE_URL,
//   SHORT_ICU_URL,
//   VIDSRC_CC_TV_URL,
//   VIDSRC_ME_TV_URL,
//   EMBED_CC_TV_URL
// }








// lib/tmdb.js
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Video source URLs for movies
const VIDSRC_CC_MOVIE_URL = "https://vidsrc.cc/v2/embed/movie/"
const VIDSRC_ME_MOVIE_URL = "https://vidsrc.me/embed/movie/"
const EMBED_CC_MOVIE_URL = "https://www.2embed.cc/embed/"
const SHORT_ICU_URL = "https://short.icu/"

// Video source URLs for TV shows
const VIDSRC_CC_TV_URL = "https://vidsrc.cc/v2/embed/tv/"
const VIDSRC_ME_TV_URL = "https://vidsrc.me/embed/tv/"
const EMBED_CC_TV_URL = "https://www.2embed.cc/embedtv/"

// Base URL for the website
export const SITE_URL = "https://capitalroot.vercel.app"
export const SITE_NAME = "Capital Root Movies"

// TMDB API token - using a fresh token
export const TMDB_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTNhYzViMTM0YWJhOTBjZmJiMTVmOTA3ZDU1YTVlOCIsIm5iZiI6MTc2MzEyMzM0Ny41MDgsInN1YiI6IjY5MTcyMDkzODZmOGYzZmNlN2FjMjg4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qQksdZWs3lp-rvKOHQWvoeA1Q8T-cGJSQRyi6dNzezQ"

// Enhanced fetch function with better error handling
export async function fetchFromTMDB(endpoint, options = {}) {
  const {
    cache = "force-cache",
    next = {
      revalidate: 60 * 60 * 24, // 24 hours
      tags: ["tmdb"],
    },
    timeoutMs = 15000, // Increased to 15 seconds
    retries = 2,
  } = options

  const headers = {
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  }

  // Remove timeout function as it might cause issues with Next.js
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`Fetching from TMDB (attempt ${attempt + 1}): ${TMDB_API_BASE_URL}${endpoint}`)

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(`${TMDB_API_BASE_URL}${endpoint}`, {
        headers,
        cache,
        next,
        signal: controller.signal
      })

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Don't throw error for 404, return empty data instead
        if (response.status === 404) {
          console.warn(`TMDB 404 for endpoint: ${endpoint}`);
          return null;
        }
        
        const errorText = await response.text();
        console.error(`TMDB API error (${response.status}):`, errorText);
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error;
      
      // Don't log timeout errors for every attempt
      if (error.name === 'AbortError') {
        console.warn(`Attempt ${attempt + 1} timed out for ${endpoint}`);
      } else {
        console.error(`Attempt ${attempt + 1} failed for ${endpoint}:`, error.message);
      }
      
      // Don't wait on last attempt
      if (attempt < retries) {
        // Exponential backoff: 1s, 2s
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  // If all retries failed, return null instead of throwing
  console.error(`All ${retries + 1} attempts failed for ${endpoint}`);
  return null;
}

export function getImageUrl(path, size = "w500") {
  if (!path) return "/default-thumbnail.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Get poster image URL
export function getPosterUrl(path, size = "w342") {
  if (!path) return "/default-poster.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Get backdrop image URL
export function getBackdropUrl(path, size = "w1280") {
  if (!path) return "/default-backdrop.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Search function with better error handling
export async function searchMulti(query) {
  if (!query || query.trim() === "") return { results: [] };
  
  try {
    const data = await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, {
      cache: "no-store",
      next: { revalidate: 0 },
      timeoutMs: 10000,
    });
    
    return data || { results: [] };
  } catch (error) {
    console.error("Search error:", error);
    return { results: [] };
  }
}

// Trending function with fallback
export async function getTrending(mediaType = "all", timeWindow = "week") {
  try {
    const data = await fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: [`trending-${mediaType}-${timeWindow}`],
      },
      timeoutMs: 15000,
    });
    
    return data || { results: [] };
  } catch (error) {
    console.error("Error fetching trending:", error);
    return { results: [] };
  }
}

// Popular function with fallback
export async function getPopular(mediaType) {
  if (!mediaType) return { results: [] };
  
  try {
    const data = await fetchFromTMDB(`/${mediaType}/popular`, {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
        tags: [`popular-${mediaType}`],
      },
      timeoutMs: 15000,
    });
    
    return data || { results: [] };
  } catch (error) {
    console.error(`Error fetching popular ${mediaType}:`, error);
    return { results: [] };
  }
}

// Details function with comprehensive error handling
export async function getDetails(mediaType, id, season = null) {
  if (!mediaType || !id) return null;
  
  try {
    let endpoint;
    if (mediaType === 'tv' && season) {
      endpoint = `/tv/${id}/season/${season}`;
    } else {
      endpoint = `/${mediaType}/${id}?append_to_response=videos,credits,similar,recommendations`;
    }
    
    const data = await fetchFromTMDB(endpoint, {
      next: {
        revalidate: 60 * 60 * 24 * 7, // 1 week
        tags: [`${mediaType}-${id}`],
      },
      timeoutMs: 20000,
    });
    
    return data;
  } catch (error) {
    console.error(`Error fetching details for ${mediaType} ${id}:`, error);
    return null;
  }
}

// Get movie by ID
export async function getMovie(id) {
  return getDetails('movie', id);
}

// Get TV show by ID
export async function getTV(id) {
  return getDetails('tv', id);
}

// Get TV season details
export async function getTVSeason(tvId, seasonNumber) {
  return getDetails('tv', tvId, seasonNumber);
}

// Get streaming URLs for movies
export function getMovieStreamingUrls(movieId) {
  if (!movieId) return {};
  
  return {
    vidsrc: `${VIDSRC_CC_MOVIE_URL}${movieId}`,
    vidsrcCc: `${VIDSRC_CC_MOVIE_URL}${movieId}`,
    vidsrcMe: `${VIDSRC_ME_MOVIE_URL}${movieId}`,
    embedCc: `${EMBED_CC_MOVIE_URL}${movieId}`,
    shortIcu: `${SHORT_ICU_URL}${movieId}`,
  }
}

// Get streaming URLs for TV episodes
export function getTVStreamingUrls(tvId, seasonNumber, episodeNumber) {
  if (!tvId || seasonNumber === undefined || episodeNumber === undefined) return {};
  
  return {
    vidsrc: `${VIDSRC_CC_TV_URL}${tvId}/${seasonNumber}/${episodeNumber}`,
    vidsrcCc: `${VIDSRC_CC_TV_URL}${tvId}/${seasonNumber}/${episodeNumber}`,
    vidsrcMe: `${VIDSRC_ME_TV_URL}${tvId}/${seasonNumber}-${episodeNumber}`,
    embedCc: `${EMBED_CC_TV_URL}${tvId}&s=${seasonNumber}&e=${episodeNumber}`,
  }
}

// Get genres
export async function getGenres(mediaType = 'movie') {
  try {
    const data = await fetchFromTMDB(`/genre/${mediaType}/list`, {
      next: {
        revalidate: 60 * 60 * 24 * 30, // 30 days
      },
    });
    
    return data || { genres: [] };
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { genres: [] };
  }
}

// Get movies by genre
export async function getMoviesByGenre(genreId, page = 1) {
  try {
    const data = await fetchFromTMDB(`/discover/movie?with_genres=${genreId}&page=${page}`, {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    });
    
    return data || { results: [] };
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { results: [] };
  }
}

// Get TV shows by genre
export async function getTVByGenre(genreId, page = 1) {
  try {
    const data = await fetchFromTMDB(`/discover/tv?with_genres=${genreId}&page=${page}`, {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    });
    
    return data || { results: [] };
  } catch (error) {
    console.error("Error fetching TV by genre:", error);
    return { results: [] };
  }
}

// Utility function to check if TMDB is accessible
export async function checkTMDBHealth() {
  try {
    const response = await fetch(`${TMDB_API_BASE_URL}/configuration`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
      },
      signal: AbortSignal.timeout(10000)
    });
    
    return response.ok;
  } catch (error) {
    console.error("TMDB health check failed:", error);
    return false;
  }
}

// Export the constants
export {
  TMDB_API_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  VIDSRC_CC_MOVIE_URL,
  VIDSRC_ME_MOVIE_URL,
  EMBED_CC_MOVIE_URL,
  SHORT_ICU_URL,
  VIDSRC_CC_TV_URL,
  VIDSRC_ME_TV_URL,
  EMBED_CC_TV_URL
}