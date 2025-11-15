// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import SocialShare from "../../components/SocialShare";
// import RelatedVideoCard from "../../components/RelatedVideoCard";
// import DailymotionPlayer from "../../components/DailymotionPlayer";
// import ShortICUPlayer from "../../components/ShortICUPlayer";
// import videoData from "../../data/data.json";
// import { 
//   getDetails, 
//   getImageUrl, 
//   getMovieStreamingUrls, 
//   getTVStreamingUrls,
//   getTrending,
//   getMovie,
//   getTV
// } from "../../lib/tmdb";

// export default function VideoPage({ 
//   video, 
//   relatedVideos, 
//   media, 
//   relatedMedia, 
//   source, 
//   streamingUrls,
//   mediaType,
//   seasons 
// }) {
//   const router = useRouter();
//   const [currentStreamingSource, setCurrentStreamingSource] = useState("vidsrc");
//   const [isClient, setIsClient] = useState(false);
//   const [selectedSeason, setSelectedSeason] = useState(1);
//   const [selectedEpisode, setSelectedEpisode] = useState(1);
//   const [seasonData, setSeasonData] = useState(null);
//   const [loadingSeason, setLoadingSeason] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Load season data when season changes (TV shows only)
//   useEffect(() => {
//     if (mediaType === 'tv' && media && selectedSeason) {
//       loadSeasonData(selectedSeason);
//     }
//   }, [selectedSeason, media, mediaType]);

//   const loadSeasonData = async (seasonNumber) => {
//     if (!media || mediaType !== 'tv') return;
    
//     setLoadingSeason(true);
//     try {
//       const response = await fetch(`/api/tv-season?tvId=${media.id}&season=${seasonNumber}`);
//       const data = await response.json();
//       setSeasonData(data);
//       // Reset to first episode when season changes only if current episode doesn't exist in new season
//       if (data && data.episodes) {
//         const episodeExists = data.episodes.some(ep => ep.episode_number === selectedEpisode);
//         if (!episodeExists) {
//           setSelectedEpisode(1);
//         }
//       } else {
//         setSelectedEpisode(1);
//       }
//     } catch (error) {
//       console.error('Error loading season data:', error);
//       setSeasonData({ episodes: [] });
//     } finally {
//       setLoadingSeason(false);
//     }
//   };

//   if (router.isFallback) {
//     return <LoadingState />;
//   }

//   const isTMDB = source === 'tmdb';
//   const currentMedia = isTMDB ? media : video;

//   if (!currentMedia) {
//     return <NotFoundState />;
//   }

//   const canonicalUrl = isTMDB 
//     ? `https://capitalroot.vercel.app/video/${mediaType}/${media.id}`
//     : `https://capitalroot.vercel.app/video/${video.slug}`;

//   const getThumbnailUrl = () => {
//     if (isTMDB) {
//       return getImageUrl(media.poster_path || media.backdrop_path, "w500");
//     } else {
//       if (!video.thumbnail) {
//         return "/default-thumbnail.jpg";
//       }
//       if (video.thumbnail.startsWith('http')) {
//         return video.thumbnail;
//       } else {
//         return `https://capitalroot.vercel.app${video.thumbnail}`;
//       }
//     }
//   };

//   const thumbnailUrl = getThumbnailUrl();

//   const formatReleaseDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Get iframe src based on streaming source and media type
//   const getIframeSrc = () => {
//     if (!isTMDB) {
//       return "#";
//     }

//     if (mediaType === 'movie') {
//       const movieId = media.id.toString();
//       switch(currentStreamingSource) {
//         case "vidsrc":
//           return `https://vidsrc.cc/v2/embed/movie/${movieId}`;
//         case "vidsrc-me":
//           return `https://vidsrc-me.su/embed/movie/${movieId}`;
//         case "2embed":
//           return `https://www.2embed.cc/embed/${movieId}`;
//         default:
//           return `https://vidsrc.xyz/embed/movie/${movieId}`;
//       }
//     } else if (mediaType === 'tv') {
//       const tvId = media.id.toString();
//       switch(currentStreamingSource) {
//         case "vidsrc":
//           return `https://vidsrc.cc/v2/embed/tv/${tvId}/${selectedSeason}/${selectedEpisode}`;
//         case "vidsrc-me":
//           return `https://vidsrc-me.su/embed/tv/${tvId}/${selectedSeason}-${selectedEpisode}`;
//         case "2embed":
//           return `https://www.2embed.cc/embedtv/${tvId}&s=${selectedSeason}&e=${selectedEpisode}`;
//         default:
//           return `https://vidsrc.xyz/embed/tv/${tvId}/${selectedSeason}/${selectedEpisode}`;
//       }
//     }
//   };

//   // Get video player for JSON videos based on videoSource
//   const getJSONVideoPlayer = () => {
//     if (video.videoSource === "dailymotion") {
//       return (
//         <DailymotionPlayer 
//           videoId={video.videoId} 
//           title={video.title} 
//           autoplay={false}
//         />
//       );
//     } else if (video.videoSource === "shorticu") {
//       return (
//         <ShortICUPlayer 
//           videoId={video.videoId} 
//           title={video.title}
//         />
//       );
//     } else if (video.videoSource === "youtube") {
//       return (
//         <div className="video-player-container">
//           <iframe
//             src={`https://www.youtube.com/embed/${video.videoId}`}
//             title={video.title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="video-iframe"
//           ></iframe>
//         </div>
//       );
//     } else if (video.videoSource === "vimeo") {
//       return (
//         <div className="video-player-container">
//           <iframe
//             src={`https://player.vimeo.com/video/${video.videoId}`}
//             title={video.title}
//             frameBorder="0"
//             allow="autoplay; fullscreen; picture-in-picture"
//             allowFullScreen
//             className="video-iframe"
//           ></iframe>
//         </div>
//       );
//     } else {
//       return (
//         <div className="video-player-container">
//           <video
//             controls
//             className="video-player"
//             poster={thumbnailUrl}
//           >
//             <source src={video.videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     }
//   };

//   // Season and episode selector for TV shows only
//   const renderTVShowSelector = () => {
//     if (mediaType !== 'tv' || !seasons) return null;

//     const episodeOptions = [];
//     if (seasonData && seasonData.episodes && seasonData.episodes.length > 0) {
//       seasonData.episodes.forEach(episode => {
//         episodeOptions.push(
//           <option key={episode.episode_number} value={episode.episode_number}>
//             Episode {episode.episode_number}: {episode.name || `Episode ${episode.episode_number}`}
//           </option>
//         );
//       });
//     } else {
//       const episodeCount = seasons.find(s => s.season_number === selectedSeason)?.episode_count || 10;
//       for (let i = 1; i <= episodeCount; i++) {
//         episodeOptions.push(
//           <option key={i} value={i}>
//             Episode {i}
//           </option>
//         );
//       }
//     }

//     return (
//       <section className="tv-show-selector">
//         <h3>Select Season & Episode</h3>
//         <div className="selector-grid">
//           <div className="season-selector">
//             <label htmlFor="season-select">Season:</label>
//             <select 
//               id="season-select"
//               value={selectedSeason} 
//               onChange={(e) => setSelectedSeason(Number(e.target.value))}
//               className="selector-dropdown"
//             >
//               {seasons.map(season => (
//                 <option key={season.season_number} value={season.season_number}>
//                    {season.season_number} {season.name && `- ${season.name}`}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="episode-selector">
//             <label htmlFor="episode-select">Episode:</label>
//             <select 
//               id="episode-select"
//               value={selectedEpisode} 
//               onChange={(e) => setSelectedEpisode(Number(e.target.value))}
//               className="selector-dropdown"
//             >
//               {episodeOptions}
//             </select>
//           </div>
//         </div>

//         {loadingSeason && (
//           <div className="loading-indicator">
//             <div className="loading-spinner-small"></div>
//             <span>Loading episodes...</span>
//           </div>
//         )}

//         {seasonData && seasonData.episodes && seasonData.episodes.find(ep => ep.episode_number === selectedEpisode) && (
//           <div className="episode-info">
//             <h4>
//               {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).name || 
//                `Episode ${selectedEpisode}`}
//             </h4>
//             <p>
//               {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).overview || 
//                'No description available.'}
//             </p>
//             <div className="episode-meta">
//               <span>
//                 Air Date: {formatReleaseDate(
//                   seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).air_date
//                 )}
//               </span>
//               {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).runtime && (
//                 <span>
//                   Runtime: {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).runtime} min
//                 </span>
//               )}
//             </div>
//           </div>
//         )}
//       </section>
//     );
//   };

//   const getStructuredData = () => {
//     if (isTMDB) {
//       if (mediaType === 'movie') {
//         return {
//           "@context": "https://schema.org",
//           "@type": "Movie",
//           "name": media.title,
//           "description": media.overview,
//           "image": thumbnailUrl,
//           "dateCreated": media.release_date,
//           "duration": media.runtime ? `PT${media.runtime}M` : undefined,
//           "genre": media.genres?.map(genre => genre.name) || [],
//           "actor": media.credits?.cast?.slice(0, 5).map(actor => ({
//             "@type": "Person",
//             "name": actor.name,
//             "character": actor.character
//           })),
//           "director": media.credits?.crew?.find(person => person.job === "Director")?.name,
//           "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": media.vote_average,
//             "bestRating": "10",
//             "worstRating": "0",
//             "ratingCount": media.vote_count
//           }
//         };
//       } else {
//         return {
//           "@context": "https://schema.org",
//           "@type": "TVSeries",
//           "name": media.name,
//           "description": media.overview,
//           "image": thumbnailUrl,
//           "numberOfSeasons": media.number_of_seasons,
//           "numberOfEpisodes": media.number_of_episodes,
//           "genre": media.genres?.map(genre => genre.name) || [],
//           "actor": media.credits?.cast?.slice(0, 5).map(actor => ({
//             "@type": "Person",
//             "name": actor.name,
//             "character": actor.character
//           })),
//           "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": media.vote_average,
//             "bestRating": "10",
//             "worstRating": "0",
//             "ratingCount": media.vote_count
//           }
//         };
//       }
//     } else {
//       return {
//         "@context": "https://schema.org",
//         "@type": "Movie",
//         "name": video.title,
//         "description": video.description,
//         "image": thumbnailUrl,
//         "thumbnailUrl": thumbnailUrl,
//         "dateCreated": video.releaseYear ? `${video.releaseYear}` : undefined,
//         "genre": video.genre || video.category || "Entertainment",
//         "duration": video.duration,
//         "actor": video.cast
//           ? video.cast.map((actor) => ({ "@type": "Person", name: actor }))
//           : undefined,
//         "director": video.director
//           ? { "@type": "Person", name: video.director }
//           : undefined,
//         "countryOfOrigin": video.country
//           ? { "@type": "Country", name: video.country }
//           : undefined,
//       };
//     }
//   };

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://capitalroot.vercel.app",
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": mediaType === 'tv' ? "TV Shows" : "Movies",
//         "item": `https://capitalroot.vercel.app/${mediaType === 'tv' ? 'tv' : 'videos'}`,
//       },
//       {
//         "@type": "ListItem",
//         "position": 3,
//         "name": currentMedia.title || currentMedia.name,
//         "item": canonicalUrl,
//       },
//     ],
//   };

//   const videoObjectSchema = {
//     "@context": "https://schema.org",
//     "@type": "VideoObject",
//     "name": currentMedia.title || currentMedia.name,
//     "description": isTMDB ? media.overview : video.description,
//     "thumbnailUrl": thumbnailUrl,
//     "uploadDate": isTMDB ? (media.release_date || media.first_air_date) : video.uploadDate,
//     "duration": isTMDB ? (media.runtime ? `PT${media.runtime}M` : 'PT60M') : video.duration,
//     "contentUrl": canonicalUrl,
//     "embedUrl": canonicalUrl,
//     "publisher": {
//       "@type": "Organization",
//       "name": "Capital Root Movies",
//       "url": "https://capitalroot.vercel.app",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://capitalroot.vercel.app/icon-512.png",
//       },
//     },
//   };

//   const handleStreamingSourceChange = (source) => {
//     setCurrentStreamingSource(source);
//   };

//   const renderMediaDetails = () => {
//     if (isTMDB) {
//       if (mediaType === 'movie') {
//         return (
//           <>
//             {media.release_date && (
//               <div className="info-item">
//                 <strong>Release Date:</strong>{" "}
//                 {formatReleaseDate(media.release_date)}
//               </div>
//             )}
//             {media.genres && media.genres.length > 0 && (
//               <div className="info-item">
//                 <strong>Genre:</strong> {media.genres.map(g => g.name).join(', ')}
//               </div>
//             )}
//             {media.runtime && (
//               <div className="info-item">
//                 <strong>Duration:</strong> {Math.floor(media.runtime / 60)}h {media.runtime % 60}m
//               </div>
//             )}
//             {media.vote_average && (
//               <div className="info-item">
//                 <strong>Rating:</strong> <span className="rating">⭐ {media.vote_average.toFixed(1)}/10</span>
//               </div>
//             )}
//             {media.credits?.crew?.find(person => person.job === "Director") && (
//               <div className="info-item">
//                 <strong>Director:</strong> {media.credits.crew.find(person => person.job === "Director")?.name}
//               </div>
//             )}
//             {media.credits?.cast && media.credits.cast.length > 0 && (
//               <div className="info-item">
//                 <strong>Cast:</strong> {media.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
//               </div>
//             )}
           
//           </>
//         );
//       } else {
//         return (
//           <>
//             {media.first_air_date && (
//               <div className="info-item">
//                 <strong>First Air Date:</strong>{" "}
//                 {formatReleaseDate(media.first_air_date)}
//               </div>
//             )}
//             {media.last_air_date && (
//               <div className="info-item">
//                 <strong>Last Air Date:</strong>{" "}
//                 {formatReleaseDate(media.last_air_date)}
//               </div>
//             )}
//             {media.genres && media.genres.length > 0 && (
//               <div className="info-item">
//                 <strong>Genre:</strong> {media.genres.map(g => g.name).join(', ')}
//               </div>
//             )}
//             {media.number_of_seasons && (
//               <div className="info-item">
//                 <strong>Seasons:</strong> {media.number_of_seasons}
//               </div>
//             )}
//             {media.number_of_episodes && (
//               <div className="info-item">
//                 <strong>Episodes:</strong> {media.number_of_episodes}
//               </div>
//             )}
//             {media.episode_run_time && media.episode_run_time.length > 0 && (
//               <div className="info-item">
//                 <strong>Episode Runtime:</strong> {media.episode_run_time[0]} min
//               </div>
//             )}
//             {media.vote_average && (
//               <div className="info-item">
//                 <strong>Rating:</strong> <span className="rating">⭐ {media.vote_average.toFixed(1)}/10</span>
//               </div>
//             )}
//             {media.credits?.cast && media.credits.cast.length > 0 && (
//               <div className="info-item">
//                 <strong>Cast:</strong> {media.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
//               </div>
//             )}
//             {media.created_by && media.created_by.length > 0 && (
//               <div className="info-item">
//                 <strong>Created By:</strong> {media.created_by.map(creator => creator.name).join(', ')}
//               </div>
//             )}
//             {media.networks && media.networks.length > 0 && (
//               <div className="info-item">
//                 <strong>Network:</strong> {media.networks.map(network => network.name).join(', ')}
//               </div>
//             )}
//           </>
//         );
//       }
//     } else {
//       return (
//         <>
//           {video.director && (
//             <div className="info-item">
//               <strong>Director:</strong> {video.director}
//             </div>
//           )}
//           {video.cast && video.cast.length > 0 && (
//             <div className="info-item">
//               <strong>Cast:</strong> {video.cast.join(", ")}
//             </div>
//           )}
//           {video.genre && (
//             <div className="info-item">
//               <strong>Genre:</strong> {video.genre}
//             </div>
//           )}
//           {video.releaseYear && (
//             <div className="info-item">
//               <strong>Release Year:</strong> {video.releaseYear}
//             </div>
//           )}
//           {video.country && (
//             <div className="info-item">
//               <strong>Country:</strong> {video.country}
//             </div>
//           )}
//           {video.language && (
//             <div className="info-item">
//               <strong>Language:</strong> {video.language}
//             </div>
//           )}
        
//           {video.duration && (
//             <div className="info-item">
//               <strong>Duration:</strong>{" "}
//               {video.duration
//                 .replace("PT", "")
//                 .replace("H", "h ")
//                 .replace("M", "m")}
//             </div>
//           )}
//           {video.rating && (
//             <div className="info-item">
//               <strong>Rating:</strong>{" "}
//               <span className="rating">{video.rating}</span>
//             </div>
//           )}
//         </>
//       );
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>{currentMedia.title || currentMedia.name} - {mediaType === 'tv' ? 'Watch TV Show' : 'Watch Online'} | Capital Root Movies</title>
//         <meta
//           name="description"
//           content={`Watch ${currentMedia.title || currentMedia.name} online in HD quality. ${isTMDB ? media.overview : video.description}`}
//         />
//         <meta
//           name="keywords"
//           content={`${currentMedia.title || currentMedia.name}, watch online, stream, ${isTMDB ? media.genres?.map(g => g.name).join(', ') : video.tags?.join(", ") || ""}, ${mediaType === 'tv' ? 'tv shows' : 'movies'}`}
//         />
//         <link rel="canonical" href={canonicalUrl} />

//         <meta
//           property="og:title"
//           content={`${currentMedia.title || currentMedia.name} - ${mediaType === 'tv' ? 'Watch TV Show' : 'Watch Online'} | Capital Root Movies`}
//         />
//         <meta property="og:description" content={isTMDB ? media.overview : video.description} />
//         <meta property="og:type" content={mediaType === 'tv' ? 'video.tv_show' : 'video.movie'} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content={thumbnailUrl} />
//         <meta property="og:image:width" content="1280" />
//         <meta property="og:image:height" content="720" />
//         <meta property="og:image:alt" content={currentMedia.title || currentMedia.name} />
//         <meta property="og:site_name" content="Capital Root Movies" />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@capitalroot" />
//         <meta name="twitter:title" content={currentMedia.title || currentMedia.name} />
//         <meta name="twitter:description" content={isTMDB ? media.overview : video.description} />
//         <meta name="twitter:image" content={thumbnailUrl} />
//         <meta name="twitter:image:alt" content={currentMedia.title || currentMedia.name} />

//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
//           key="structured-schema"
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//           key="breadcrumb-schema"
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(videoObjectSchema),
//           }}
//           key="videoobject-schema"
//         />
//       </Head>

//       <Header />
//       <main className="video-page-main">
//         <div className="container">
//           <nav aria-label="Breadcrumb" className="page-navigation">
//             <button
//               onClick={() => router.push(mediaType === 'tv' ? "/videos" : "/videos")}
//               className="back-button"
//               aria-label={`Go back to all ${mediaType === 'tv' ? 'TV shows' : 'movies'}`}
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//               </svg>
//               Back to All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
//             </button>
//           </nav>

//           <article className="video-page-content">
//             <section className="video-player-section" style={{ marginTop: "60px" }}>
//               {isTMDB ? (
//                 <div className="video-player-container">
//                   <iframe
//                     src={getIframeSrc()}
//                     title={mediaType === 'movie' ? media.title : `${media.name} - S${selectedSeason}E${selectedEpisode}`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     className="video-iframe"
//                   ></iframe>
//                 </div>
//               ) : (
//                 getJSONVideoPlayer()
//               )}
//             </section>

//             {/* TV Show Season/Episode Selector - Only for TV shows */}
//             {mediaType === 'tv' && renderTVShowSelector()}

//             {/* Streaming Sources - Only for TMDB content */}
//             {isTMDB && streamingUrls && (
//               <section className="streaming-options-section">
//                 <h3>Streaming Sources</h3>
//                 <div className="streaming-buttons">
//                   <button 
//                     className={`stream-btn ${currentStreamingSource === "vidsrc" ? "active" : ""}`}
//                     onClick={() => handleStreamingSourceChange("vidsrc")}
//                   >
//                     Vidsrc
//                   </button>
//                   <button 
//                     className={`stream-btn ${currentStreamingSource === "vidsrc-me" ? "active" : ""}`}
//                     onClick={() => handleStreamingSourceChange("vidsrc-me")}
//                   >
//                     Vidsrc.me
//                   </button>
//                   <button 
//                     className={`stream-btn ${currentStreamingSource === "2embed" ? "active" : ""}`}
//                     onClick={() => handleStreamingSourceChange("2embed")}
//                   >
//                     2Embed
//                   </button>
//                 </div>
//               </section>
//             )}

//             <section className="video-info-section">
//               <header className="video-info-header">
//                 <h1>{currentMedia.title || currentMedia.name}</h1>
//                 {isTMDB && (
//                   <div className="tmdb-badge">
//                     <span>Powered by TMDB</span>
//                   </div>
//                 )}
//                 {mediaType === 'tv' && (
//                   <div className="media-type-badge">
//                     <span>TV Show</span>
//                   </div>
//                 )}
//                 {!isTMDB && (
//                   <div className="source-badge">
//                     <span>{video.videoSource.toUpperCase()}</span>
//                   </div>
//                 )}
//               </header>

//               <div className="video-content-grid">
//                 <div className="movie-image">
//                   <Image
//                     src={thumbnailUrl}
//                     alt={`${currentMedia.title || currentMedia.name} poster`}
//                     width={400}
//                     height={600}
//                     quality={100}
//                     priority
//                     // className="poster-image"
//                     placeholder="blur"
//                     blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
//                     onError={(e) => {
//                       e.target.src = "/default-thumbnail.jpg";
//                     }}
//                   />
//                 </div>

//                 <div className="movie-details">
//                   <div className="details-grid">
//                     {renderMediaDetails()}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="movie-storyline">
//                 <h2>{mediaType === 'tv' ? 'Overview' : 'Storyline'}</h2>
//                 <p>{isTMDB ? media.overview : video.description}</p>
//               </div>

//               <nav aria-label="Breadcrumb" className="page-navigation">
//                 <button
//                   onClick={() => router.push(mediaType === 'tv' ? "/videos" : "/videos")}
//                   className="back-button"
//                   aria-label={`Go back to all ${mediaType === 'tv' ? 'TV shows' : 'movies'}`}
//                 >
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//                   </svg>
//                   Back to All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
//                 </button>
//               </nav>

//               {/* {!isTMDB && (
//                 <div className="technical-specs">
//                   <h3>Technical Specifications</h3>
//                   <div className="specs-grid">
//                     {video.quality && (
//                       <div className="spec-item">
//                         <strong>Video Quality:</strong> {video.quality}
//                       </div>
//                     )}
//                     {video.size && (
//                       <div className="spec-item">
//                         <strong>File Size:</strong> {video.size}
//                       </div>
//                     )}
//                     {video.subtitles && (
//                       <div className="spec-item">
//                         <strong>Subtitles:</strong> {video.subtitles}
//                       </div>
//                     )}
//                     <div className="spec-item">
//                       <strong>Format:</strong> MP4 HD
//                     </div>
//                   </div>
//                 </div>
//               )} */}

         
// <SocialShare />
//             </section>

//             {(relatedVideos && relatedVideos.length > 0) || (relatedMedia && relatedMedia.length > 0) ? (
//               <aside className="related-videos" aria-label="Recommended content">
//                 <h2>More {mediaType === 'tv' ? 'TV Shows' : 'Movies'} You Might Like</h2>
//                 <div className="related-videos-grid">
//                   {(isTMDB ? relatedMedia : relatedVideos).map((relatedItem) => (
//                     <RelatedVideoCard
//                       key={relatedItem.id}
//                       video={relatedItem}
//                       mediaType={isTMDB ? mediaType : 'json'}
//                     />
//                   ))}
//                 </div>
//               </aside>
//             ) : null}
//           </article>
//         </div>
//       </main>
//       <Footer />

//       <style jsx>{`
//         .video-page-main {
//           padding: 2rem 0;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1rem;
//         }

//         .page-navigation {
//           margin-bottom: 2rem;
//         }

//         .back-button {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #e50914;
//           color: white;
//           border: none;
//           padding: 0.8rem 1.5rem;
//           border-radius: 5px;
//           cursor: pointer;
//           font-weight: 500;
//           transition: background 0.3s;
//         }

//         .back-button:hover {
//           background: #f40612;
//         }

//         .video-player-container {
//           position: relative;
//           width: 100%;
//           height: 0;
//           padding-bottom: 56.25%;
//           margin-bottom: 2rem;
//         }

//         .video-iframe {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .video-player {
//           width: 100%;
//           height: auto;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .tv-show-selector {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .tv-show-selector h3 {
//           color: #333;
//           margin-bottom: 1rem;
//           font-size: 1.3rem;
//         }

//         .selector-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         .season-selector,
//         .episode-selector {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .selector-dropdown {
//           padding: 0.8rem;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//           font-size: 1rem;
//           background: white;
//         }

//         .loading-indicator {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.5rem;
//           color: #666;
//           font-size: 0.9rem;
//         }

//         .loading-spinner-small {
//           border: 2px solid #f3f3f3;
//           border-top: 2px solid #e50914;
//           border-radius: 50%;
//           width: 16px;
//           height: 16px;
//           animation: spin 1s linear infinite;
//         }

//         .episode-info {
//           padding: 1rem;
//           background: white;
//           border-radius: 5px;
//           border-left: 4px solid #01b4e4;
//         }

//         .episode-info h4 {
//           margin: 0 0 0.5rem 0;
//           color: #333;
//         }

//         .episode-info p {
//           margin: 0 0 1rem 0;
//           color: #666;
//           line-height: 1.5;
//         }

//         .episode-meta {
//           display: flex;
//           gap: 1rem;
//           font-size: 0.9rem;
//           color: #888;
//         }

//         .streaming-options-section {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .streaming-options-section h3 {
//           color: #333;
//           margin-bottom: 1rem;
//           font-size: 1.3rem;
//         }

//         .streaming-buttons {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .stream-btn {
//           padding: 0.8rem 1.5rem;
//           border: 2px solid #e50914;
//           background: white;
//           color: #e50914;
//           border-radius: 5px;
//           font-weight: 500;
//           transition: all 0.3s;
//           cursor: pointer;
//           font-size: 0.9rem;
//         }

//         .stream-btn:hover, .stream-btn.active {
//           background: #e50914;
//           color: white;
//         }

//         .video-info-header {
//           margin-bottom: 2rem;
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .video-info-header h1 {
//           font-size: 2.5rem;
//           margin: 0;
//           color: #333;
//         }

//         .tmdb-badge {
//           background: #01b4e4;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }

//         .media-type-badge {
//           background: #e50914;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }

//         .source-badge {
//           background: #10b981;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }

//         .video-content-grid {
//           display: grid;
//           grid-template-columns: 300px 1fr;
//           gap: 2rem;
//           margin-bottom: 2rem;
//         }

//         .movie-poster {
//           position: relative;
//         }

//         .poster-image {
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .movie-details {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .details-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         .info-item {
//           padding: 0.8rem;
//           background: #f8f9fa;
//           border-radius: 5px;
//           border-left: 4px solid #e50914;
//         }

//         .info-item strong {
//           color: #333;
//           display: block;
//           margin-bottom: 0.3rem;
//         }

//         .rating {
//           color: #e50914;
//           font-weight: bold;
//         }

//         .movie-storyline {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .movie-storyline h2 {
//           color: #333;
//           margin-bottom: 1rem;
//         }

//         .movie-storyline p {
//           line-height: 1.6;
//           color: #666;
//         }

//         .technical-specs {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .technical-specs h3 {
//           color: #333;
//           margin-bottom: 1rem;
//         }

//         .specs-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1rem;
//         }

//         .spec-item {
//           padding: 0.5rem;
//         }

//         .related-videos {
//           margin-top: 3rem;
//           padding-top: 2rem;
//           border-top: 2px solid #e9ecef;
//         }

//         .related-videos h2 {
//           color: #333;
//           margin-bottom: 1.5rem;
//           font-size: 1.8rem;
//         }

//         .related-videos-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @media (max-width: 768px) {
//           .video-content-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .video-info-header h1 {
//             font-size: 2rem;
//           }
          
//           .details-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .selector-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .streaming-buttons {
//             flex-direction: column;
//           }
          
//           .related-videos-grid {
//             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           }
          
//           .episode-meta {
//             flex-direction: column;
//             gap: 0.5rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// function LoadingState() {
//   return (
//     <div className="loading-container">
//       <div className="loading-spinner"></div>
//       <p>Loading...</p>
//       <style jsx>{`
//         .loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 50vh;
//         }
//         .loading-spinner {
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #e50914;
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
          
//       `}</style>
//     </div>
//   );
// }

// function NotFoundState() {
//   const router = useRouter();
  
//   return (
//     <div className="error-container">
//       <h2>Content Not Found</h2>
//       <p>The content you're looking for doesn't exist.</p>
//       <button onClick={() => router.push("/videos")} className="back-button">
//         Back to All Movies
//       </button>
//       <style jsx>{`
//         .error-container {
//           text-align: center;
//           padding: 4rem 2rem;
//         }
//         h2 {
//           color: #e50914;
//           margin-bottom: 1rem;
//         }
//         .back-button {
//           background: #e50914;
//           color: white;
//           border: none;
//           padding: 0.8rem 2rem;
//           border-radius: 5px;
//           cursor: pointer;
//           margin-top: 1rem;
//         }
//       `}</style>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   const jsonPaths = videoData.videos.map((video) => ({
//     params: { slug: video.slug },
//   }));

//   let tmdbPaths = [];
//   try {
//     const [trendingMovies, trendingTV] = await Promise.all([
//       getTrending('movie'),
//       getTrending('tv')
//     ]);

//     const moviePaths = trendingMovies.results.slice(0, 30).map((movie) => ({
//       params: { slug: `movie-${movie.id}` },
//     }));

//     const tvPaths = trendingTV.results.slice(0, 30).map((tv) => ({
//       params: { slug: `tv-${tv.id}` },
//     }));

//     tmdbPaths = [...moviePaths, ...tvPaths];
//   } catch (error) {
//     console.error('Error fetching TMDB paths:', error);
//   }

//   const paths = [...jsonPaths, ...tmdbPaths];

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
  
//   // Check if it's a TMDB slug (movie-123 or tv-456)
//   const isTMDBMovie = slug.startsWith('movie-');
//   const isTMDBTV = slug.startsWith('tv-');
  
//   if (isTMDBMovie || isTMDBTV) {
//     try {
//       const id = slug.split('-')[1];
//       const mediaType = isTMDBMovie ? 'movie' : 'tv';
      
//       let media = null;
//       let seasons = null;

//       if (mediaType === 'movie') {
//         media = await getMovie(id);
//       } else {
//         media = await getTV(id);
        
//         if (media && media.seasons) {
//           seasons = media.seasons.filter(season => season.season_number > 0);
//         }
//       }

//       if (!media) {
//         return {
//           notFound: true,
//         };
//       }

//       const relatedMedia = [
//         ...(media.similar?.results || []),
//         ...(media.recommendations?.results || [])
//       ].slice(0, 8);

//       const streamingUrls = mediaType === 'movie' 
//         ? getMovieStreamingUrls(id)
//         : getTVStreamingUrls(id, 1, 1);

//       return {
//         props: {
//           media,
//           relatedMedia,
//           streamingUrls,
//           source: 'tmdb',
//           mediaType,
//           seasons
//         },
//         revalidate: 86400,
//       };
//     } catch (error) {
//       console.error('Error fetching TMDB details:', error);
//       return {
//         notFound: true,
//       };
//     }
//   } else {
//     // Handle JSON videos
//     const video = videoData.videos.find((v) => v.slug === slug);

//     if (!video) {
//       return {
//         notFound: true,
//       };
//     }

//     const otherVideos = videoData.videos.filter((v) => v.slug !== video.slug);
//     const shuffledVideos = [...otherVideos].sort(() => Math.random() - 0.5);
//     const relatedVideos = shuffledVideos.slice(0, 9);

//     return {
//       props: {
//         video,
//         relatedVideos,
//         source: 'json',
//         mediaType: 'movie'
//       },
//       revalidate: 3600,
//     };
//   }
// }







































































































































// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import SocialShare from "../../components/SocialShare";
// import RelatedVideoCard from "../../components/RelatedVideoCard";
// import DailymotionPlayer from "../../components/DailymotionPlayer";
// import ShortICUPlayer from "../../components/ShortICUPlayer";
// import videoData from "../../data/data.json";
// import { 
//   getDetails, 
//   getImageUrl, 
//   getMovieStreamingUrls, 
//   getTVStreamingUrls,
//   getTrending,
//   getMovie,
//   getTV
// } from "../../lib/tmdb";

// export default function VideoPage({ 
//   video, 
//   relatedVideos, 
//   media, 
//   relatedMedia, 
//   source, 
//   streamingUrls,
//   mediaType,
//   seasons 
// }) {
//   const router = useRouter();
//   const [currentStreamingSource, setCurrentStreamingSource] = useState("vidsrc");
//   const [isClient, setIsClient] = useState(false);
//   const [selectedSeason, setSelectedSeason] = useState(1);
//   const [selectedEpisode, setSelectedEpisode] = useState(1);
//   const [seasonData, setSeasonData] = useState(null);
//   const [loadingSeason, setLoadingSeason] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Load season data when season changes (TV shows only)
//   useEffect(() => {
//     if (mediaType === 'tv' && media && selectedSeason) {
//       loadSeasonData(selectedSeason);
//     }
//   }, [selectedSeason, media, mediaType]);

//   const loadSeasonData = async (seasonNumber) => {
//     if (!media || mediaType !== 'tv') return;
    
//     setLoadingSeason(true);
//     try {
//       const response = await fetch(`/api/tv-season?tvId=${media.id}&season=${seasonNumber}`);
//       const data = await response.json();
//       setSeasonData(data);
//       // Reset to first episode when season changes only if current episode doesn't exist in new season
//       if (data && data.episodes) {
//         const episodeExists = data.episodes.some(ep => ep.episode_number === selectedEpisode);
//         if (!episodeExists) {
//           setSelectedEpisode(1);
//         }
//       } else {
//         setSelectedEpisode(1);
//       }
//     } catch (error) {
//       console.error('Error loading season data:', error);
//       setSeasonData({ episodes: [] });
//     } finally {
//       setLoadingSeason(false);
//     }
//   };

//   if (router.isFallback) {
//     return <LoadingState />;
//   }

//   const isTMDB = source === 'tmdb';
//   const currentMedia = isTMDB ? media : video;

//   if (!currentMedia) {
//     return <NotFoundState />;
//   }

//   const canonicalUrl = isTMDB 
//     ? `https://capitalroot.vercel.app/video/${mediaType}/${media.id}`
//     : `https://capitalroot.vercel.app/video/${video.slug}`;

//   const getThumbnailUrl = () => {
//     if (isTMDB) {
//       return getImageUrl(media.poster_path || media.backdrop_path, "w500");
//     } else {
//       if (!video.thumbnail) {
//         return "/default-thumbnail.jpg";
//       }
//       if (video.thumbnail.startsWith('http')) {
//         return video.thumbnail;
//       } else {
//         return `https://capitalroot.vercel.app${video.thumbnail}`;
//       }
//     }
//   };

//   const thumbnailUrl = getThumbnailUrl();

//   const formatReleaseDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Get iframe src based on streaming source and media type
//   const getIframeSrc = () => {
//     if (!isTMDB) {
//       return "#";
//     }

//     if (mediaType === 'movie') {
//       const movieId = media.id.toString();
//       switch(currentStreamingSource) {
//         case "vidsrc":
//           return `https://vidsrc.cc/v2/embed/movie/${movieId}`;
//         case "vidsrc-me":
//           return `https://vidsrc-me.su/embed/movie/${movieId}`;
//         case "2embed":
//           return `https://www.2embed.cc/embed/${movieId}`;
//         default:
//           return `https://vidsrc.xyz/embed/movie/${movieId}`;
//       }
//     } else if (mediaType === 'tv') {
//       const tvId = media.id.toString();
//       switch(currentStreamingSource) {
//         case "vidsrc":
//           return `https://vidsrc.cc/v2/embed/tv/${tvId}/${selectedSeason}/${selectedEpisode}`;
//         case "vidsrc-me":
//           return `https://vidsrc-me.su/embed/tv/${tvId}/${selectedSeason}-${selectedEpisode}`;
//         case "2embed":
//           return `https://www.2embed.cc/embedtv/${tvId}&s=${selectedSeason}&e=${selectedEpisode}`;
//         default:
//           return `https://vidsrc.xyz/embed/tv/${tvId}/${selectedSeason}/${selectedEpisode}`;
//       }
//     }
//   };

//   // Get video player for JSON videos based on videoSource
//   const getJSONVideoPlayer = () => {
//     if (video.videoSource === "dailymotion") {
//       return (
//         <DailymotionPlayer 
//           videoId={video.videoId} 
//           title={video.title} 
//           autoplay={false}
//         />
//       );
//     } else if (video.videoSource === "shorticu") {
//       return (
//         <ShortICUPlayer 
//           videoId={video.videoId} 
//           title={video.title}
//         />
//       );
//     } else if (video.videoSource === "youtube") {
//       return (
//         <div className="video-player-container">
//           <iframe
//             src={`https://www.youtube.com/embed/${video.videoId}`}
//             title={video.title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="video-iframe"
//           ></iframe>
//         </div>
//       );
//     } else if (video.videoSource === "vimeo") {
//       return (
//         <div className="video-player-container">
//           <iframe
//             src={`https://player.vimeo.com/video/${video.videoId}`}
//             title={video.title}
//             frameBorder="0"
//             allow="autoplay; fullscreen; picture-in-picture"
//             allowFullScreen
//             className="video-iframe"
//           ></iframe>
//         </div>
//       );
//     } else {
//       return (
//         <div className="video-player-container">
//           <video
//             controls
//             className="video-player"
//             poster={thumbnailUrl}
//           >
//             <source src={video.videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     }
//   };

//   // Season and episode selector for TV shows only
//   const renderTVShowSelector = () => {
//     if (mediaType !== 'tv' || !seasons) return null;

//     const episodeOptions = [];
//     if (seasonData && seasonData.episodes && seasonData.episodes.length > 0) {
//       seasonData.episodes.forEach(episode => {
//         episodeOptions.push(
//           <option key={episode.episode_number} value={episode.episode_number}>
//             Episode {episode.episode_number}: {episode.name || `Episode ${episode.episode_number}`}
//           </option>
//         );
//       });
//     } else {
//       const episodeCount = seasons.find(s => s.season_number === selectedSeason)?.episode_count || 10;
//       for (let i = 1; i <= episodeCount; i++) {
//         episodeOptions.push(
//           <option key={i} value={i}>
//             Episode {i}
//           </option>
//         );
//       }
//     }

//     return (
//       <section className="tv-show-selector">
//         <h3>Select Season & Episode</h3>
//         <div className="selector-grid">
//           <div className="season-selector">
//             <label htmlFor="season-select">Season:</label>
//             <select 
//               id="season-select"
//               value={selectedSeason} 
//               onChange={(e) => setSelectedSeason(Number(e.target.value))}
//               className="selector-dropdown"
//             >
//               {seasons.map(season => (
//                 <option key={season.season_number} value={season.season_number}>
//                    {season.season_number} {season.name && `- ${season.name}`}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="episode-selector">
//             <label htmlFor="episode-select">Episode:</label>
//             <select 
//               id="episode-select"
//               value={selectedEpisode} 
//               onChange={(e) => setSelectedEpisode(Number(e.target.value))}
//               className="selector-dropdown"
//             >
//               {episodeOptions}
//             </select>
//           </div>
//         </div>

//         {loadingSeason && (
//           <div className="loading-indicator">
//             <div className="loading-spinner-small"></div>
//             <span>Loading episodes...</span>
//           </div>
//         )}

//         {seasonData && seasonData.episodes && seasonData.episodes.find(ep => ep.episode_number === selectedEpisode) && (
//           <div className="episode-info">
//             <h4>
//               {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).name || 
//                `Episode ${selectedEpisode}`}
//             </h4>
//             <p>
//               {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).overview || 
//                'No description available.'}
//             </p>
//             <div className="episode-meta">
//               <span>
//                 Air Date: {formatReleaseDate(
//                   seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).air_date
//                 )}
//               </span>
//               {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).runtime && (
//                 <span>
//                   Runtime: {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).runtime} min
//                 </span>
//               )}
//             </div>
//           </div>
//         )}
//       </section>
//     );
//   };

//   const getStructuredData = () => {
//     if (isTMDB) {
//       if (mediaType === 'movie') {
//         return {
//           "@context": "https://schema.org",
//           "@type": "Movie",
//           "name": media.title,
//           "description": media.overview,
//           "image": thumbnailUrl,
//           "dateCreated": media.release_date,
//           "duration": media.runtime ? `PT${media.runtime}M` : undefined,
//           "genre": media.genres?.map(genre => genre.name) || [],
//           "actor": media.credits?.cast?.slice(0, 5).map(actor => ({
//             "@type": "Person",
//             "name": actor.name,
//             "character": actor.character
//           })),
//           "director": media.credits?.crew?.find(person => person.job === "Director")?.name,
//           "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": media.vote_average,
//             "bestRating": "10",
//             "worstRating": "0",
//             "ratingCount": media.vote_count
//           }
//         };
//       } else {
//         return {
//           "@context": "https://schema.org",
//           "@type": "TVSeries",
//           "name": media.name,
//           "description": media.overview,
//           "image": thumbnailUrl,
//           "numberOfSeasons": media.number_of_seasons,
//           "numberOfEpisodes": media.number_of_episodes,
//           "genre": media.genres?.map(genre => genre.name) || [],
//           "actor": media.credits?.cast?.slice(0, 5).map(actor => ({
//             "@type": "Person",
//             "name": actor.name,
//             "character": actor.character
//           })),
//           "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": media.vote_average,
//             "bestRating": "10",
//             "worstRating": "0",
//             "ratingCount": media.vote_count
//           }
//         };
//       }
//     } else {
//       return {
//         "@context": "https://schema.org",
//         "@type": "Movie",
//         "name": video.title,
//         "description": video.description,
//         "image": thumbnailUrl,
//         "thumbnailUrl": thumbnailUrl,
//         "dateCreated": video.releaseYear ? `${video.releaseYear}` : undefined,
//         "genre": video.genre || video.category || "Entertainment",
//         "duration": video.duration,
//         "actor": video.cast
//           ? video.cast.map((actor) => ({ "@type": "Person", name: actor }))
//           : undefined,
//         "director": video.director
//           ? { "@type": "Person", name: video.director }
//           : undefined,
//         "countryOfOrigin": video.country
//           ? { "@type": "Country", name: video.country }
//           : undefined,
//       };
//     }
//   };

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://capitalroot.vercel.app",
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": mediaType === 'tv' ? "TV Shows" : "Movies",
//         "item": `https://capitalroot.vercel.app/${mediaType === 'tv' ? 'tv' : 'videos'}`,
//       },
//       {
//         "@type": "ListItem",
//         "position": 3,
//         "name": currentMedia.title || currentMedia.name,
//         "item": canonicalUrl,
//       },
//     ],
//   };

//   const videoObjectSchema = {
//     "@context": "https://schema.org",
//     "@type": "VideoObject",
//     "name": currentMedia.title || currentMedia.name,
//     "description": isTMDB ? media.overview : video.description,
//     "thumbnailUrl": thumbnailUrl,
//     "uploadDate": isTMDB ? (media.release_date || media.first_air_date) : video.uploadDate,
//     "duration": isTMDB ? (media.runtime ? `PT${media.runtime}M` : 'PT60M') : video.duration,
//     "contentUrl": canonicalUrl,
//     "embedUrl": canonicalUrl,
//     "publisher": {
//       "@type": "Organization",
//       "name": "Capital Root Movies",
//       "url": "https://capitalroot.vercel.app",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://capitalroot.vercel.app/icon-512.png",
//       },
//     },
//   };

//   const handleStreamingSourceChange = (source) => {
//     setCurrentStreamingSource(source);
//   };

//   const renderMediaDetails = () => {
//     if (isTMDB) {
//       if (mediaType === 'movie') {
//         return (
//           <>
//             {media.release_date && (
//               <div className="info-item">
//                 <strong>Release Date:</strong>{" "}
//                 {formatReleaseDate(media.release_date)}
//               </div>
//             )}
//             {media.genres && media.genres.length > 0 && (
//               <div className="info-item">
//                 <strong>Genre:</strong> {media.genres.map(g => g.name).join(', ')}
//               </div>
//             )}
//             {media.runtime && (
//               <div className="info-item">
//                 <strong>Duration:</strong> {Math.floor(media.runtime / 60)}h {media.runtime % 60}m
//               </div>
//             )}
//             {media.vote_average && (
//               <div className="info-item">
//                 <strong>Rating:</strong> <span className="rating">⭐ {media.vote_average.toFixed(1)}/10</span>
//               </div>
//             )}
//             {media.credits?.crew?.find(person => person.job === "Director") && (
//               <div className="info-item">
//                 <strong>Director:</strong> {media.credits.crew.find(person => person.job === "Director")?.name}
//               </div>
//             )}
//             {media.credits?.cast && media.credits.cast.length > 0 && (
//               <div className="info-item">
//                 <strong>Cast:</strong> {media.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
//               </div>
//             )}
           
//           </>
//         );
//       } else {
//         return (
//           <>
//             {media.first_air_date && (
//               <div className="info-item">
//                 <strong>First Air Date:</strong>{" "}
//                 {formatReleaseDate(media.first_air_date)}
//               </div>
//             )}
//             {media.last_air_date && (
//               <div className="info-item">
//                 <strong>Last Air Date:</strong>{" "}
//                 {formatReleaseDate(media.last_air_date)}
//               </div>
//             )}
//             {media.genres && media.genres.length > 0 && (
//               <div className="info-item">
//                 <strong>Genre:</strong> {media.genres.map(g => g.name).join(', ')}
//               </div>
//             )}
//             {media.number_of_seasons && (
//               <div className="info-item">
//                 <strong>Seasons:</strong> {media.number_of_seasons}
//               </div>
//             )}
//             {media.number_of_episodes && (
//               <div className="info-item">
//                 <strong>Episodes:</strong> {media.number_of_episodes}
//               </div>
//             )}
//             {media.episode_run_time && media.episode_run_time.length > 0 && (
//               <div className="info-item">
//                 <strong>Episode Runtime:</strong> {media.episode_run_time[0]} min
//               </div>
//             )}
//             {media.vote_average && (
//               <div className="info-item">
//                 <strong>Rating:</strong> <span className="rating">⭐ {media.vote_average.toFixed(1)}/10</span>
//               </div>
//             )}
//             {media.credits?.cast && media.credits.cast.length > 0 && (
//               <div className="info-item">
//                 <strong>Cast:</strong> {media.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
//               </div>
//             )}
//             {media.created_by && media.created_by.length > 0 && (
//               <div className="info-item">
//                 <strong>Created By:</strong> {media.created_by.map(creator => creator.name).join(', ')}
//               </div>
//             )}
//             {media.networks && media.networks.length > 0 && (
//               <div className="info-item">
//                 <strong>Network:</strong> {media.networks.map(network => network.name).join(', ')}
//               </div>
//             )}
//           </>
//         );
//       }
//     } else {
//       return (
//         <>
//           {video.director && (
//             <div className="info-item">
//               <strong>Director:</strong> {video.director}
//             </div>
//           )}
//           {video.cast && video.cast.length > 0 && (
//             <div className="info-item">
//               <strong>Cast:</strong> {video.cast.join(", ")}
//             </div>
//           )}
//           {video.genre && (
//             <div className="info-item">
//               <strong>Genre:</strong> {video.genre}
//             </div>
//           )}
//           {video.releaseYear && (
//             <div className="info-item">
//               <strong>Release Year:</strong> {video.releaseYear}
//             </div>
//           )}
//           {video.country && (
//             <div className="info-item">
//               <strong>Country:</strong> {video.country}
//             </div>
//           )}
//           {video.language && (
//             <div className="info-item">
//               <strong>Language:</strong> {video.language}
//             </div>
//           )}
        
//           {video.duration && (
//             <div className="info-item">
//               <strong>Duration:</strong>{" "}
//               {video.duration
//                 .replace("PT", "")
//                 .replace("H", "h ")
//                 .replace("M", "m")}
//             </div>
//           )}
//           {video.rating && (
//             <div className="info-item">
//               <strong>Rating:</strong>{" "}
//               <span className="rating">{video.rating}</span>
//             </div>
//           )}
//         </>
//       );
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>{currentMedia.title || currentMedia.name} - {mediaType === 'tv' ? 'Watch TV Show' : 'Watch Online'} | Capital Root Movies</title>
//         <meta
//           name="description"
//           content={`Watch ${currentMedia.title || currentMedia.name} online in HD quality. ${isTMDB ? media.overview : video.description}`}
//         />
//         <meta
//           name="keywords"
//           content={`${currentMedia.title || currentMedia.name}, watch online, stream, ${isTMDB ? media.genres?.map(g => g.name).join(', ') : video.tags?.join(", ") || ""}, ${mediaType === 'tv' ? 'tv shows' : 'movies'}`}
//         />
//         <link rel="canonical" href={canonicalUrl} />

//         <meta
//           property="og:title"
//           content={`${currentMedia.title || currentMedia.name} - ${mediaType === 'tv' ? 'Watch TV Show' : 'Watch Online'} | Capital Root Movies`}
//         />
//         <meta property="og:description" content={isTMDB ? media.overview : video.description} />
//         <meta property="og:type" content={mediaType === 'tv' ? 'video.tv_show' : 'video.movie'} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content={thumbnailUrl} />
//         <meta property="og:image:width" content="1280" />
//         <meta property="og:image:height" content="720" />
//         <meta property="og:image:alt" content={currentMedia.title || currentMedia.name} />
//         <meta property="og:site_name" content="Capital Root Movies" />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@capitalroot" />
//         <meta name="twitter:title" content={currentMedia.title || currentMedia.name} />
//         <meta name="twitter:description" content={isTMDB ? media.overview : video.description} />
//         <meta name="twitter:image" content={thumbnailUrl} />
//         <meta name="twitter:image:alt" content={currentMedia.title || currentMedia.name} />

//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
//           key="structured-schema"
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//           key="breadcrumb-schema"
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(videoObjectSchema),
//           }}
//           key="videoobject-schema"
//         />
//       </Head>

//       <Header />
//       <main className="video-page-main">
//         <div className="container">
//           <nav aria-label="Breadcrumb" className="page-navigation">
//             <button
//               onClick={() => router.push(mediaType === 'tv' ? "/videos" : "/videos")}
//               className="back-button"
//               aria-label={`Go back to all ${mediaType === 'tv' ? 'TV shows' : 'movies'}`}
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//               </svg>
//               Back to All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
//             </button>
//           </nav>

//           <article className="video-page-content">
//             <section className="video-player-section" style={{ marginTop: "60px" }}>
//               {isTMDB ? (
//                 <div className="video-player-container">
//                   <iframe
//                     src={getIframeSrc()}
//                     title={mediaType === 'movie' ? media.title : `${media.name} - S${selectedSeason}E${selectedEpisode}`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     className="video-iframe"
//                   ></iframe>
//                 </div>
//               ) : (
//                 getJSONVideoPlayer()
//               )}
//             </section>

//             {/* TV Show Season/Episode Selector - Only for TV shows */}
//             {mediaType === 'tv' && renderTVShowSelector()}

//             {/* Streaming Sources - Only for TMDB content */}
//             {isTMDB && streamingUrls && (
//               <section className="streaming-options-section">
//                 <h3>Streaming Sources</h3>
//                 <div className="streaming-buttons">
//                   <button 
//                     className={`stream-btn ${currentStreamingSource === "vidsrc" ? "active" : ""}`}
//                     onClick={() => handleStreamingSourceChange("vidsrc")}
//                   >
//                     Vidsrc
//                   </button>
//                   <button 
//                     className={`stream-btn ${currentStreamingSource === "vidsrc-me" ? "active" : ""}`}
//                     onClick={() => handleStreamingSourceChange("vidsrc-me")}
//                   >
//                     Vidsrc.me
//                   </button>
//                   <button 
//                     className={`stream-btn ${currentStreamingSource === "2embed" ? "active" : ""}`}
//                     onClick={() => handleStreamingSourceChange("2embed")}
//                   >
//                     2Embed
//                   </button>
//                 </div>
//               </section>
//             )}

//             <section className="video-info-section">
//               <header className="video-info-header">
//                 <h1>{currentMedia.title || currentMedia.name}</h1>
//                 {isTMDB && (
//                   <div className="tmdb-badge">
//                     <span>Powered by TMDB</span>
//                   </div>
//                 )}
//                 {mediaType === 'tv' && (
//                   <div className="media-type-badge">
//                     <span>TV Show</span>
//                   </div>
//                 )}
//                 {!isTMDB && (
//                   <div className="source-badge">
//                     <span>{video.videoSource.toUpperCase()}</span>
//                   </div>
//                 )}
//               </header>

//               <div className="video-content-grid">
//                 <div className="movie-image">
//                   <Image
//                     src={thumbnailUrl}
//                     alt={`${currentMedia.title || currentMedia.name} poster`}
//                     width={300}
//                     height={450}
//                     quality={100}
//                     priority
//                     placeholder="blur"
//                     blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
//                     onError={(e) => {
//                       e.target.src = "/default-thumbnail.jpg";
//                     }}
//                   />
//                 </div>

//                 <div className="movie-details">
//                   <div className="details-grid">
//                     {renderMediaDetails()}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="movie-storyline">
//                 <h2>{mediaType === 'tv' ? 'Overview' : 'Storyline'}</h2>
//                 <p>{isTMDB ? media.overview : video.description}</p>
//               </div>

//               <nav aria-label="Breadcrumb" className="page-navigation">
//                 <button
//                   onClick={() => router.push(mediaType === 'tv' ? "/videos" : "/videos")}
//                   className="back-button"
//                   aria-label={`Go back to all ${mediaType === 'tv' ? 'TV shows' : 'movies'}`}
//                 >
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//                   </svg>
//                   Back to All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
//                 </button>
//               </nav>
              
// <SocialShare 
//   mediaData={isTMDB ? media : null}
//   videoData={!isTMDB ? video : null}
//   mediaType={mediaType}
//   currentUrl={canonicalUrl} // FORCE the canonical URL
//   currentImage={thumbnailUrl} // FORCE the thumbnail image
//   currentTitle={currentMedia.title || currentMedia.name} // FORCE the title
// />             
//             </section>

//             {(relatedVideos && relatedVideos.length > 0) || (relatedMedia && relatedMedia.length > 0) ? (
//               <aside className="related-videos" aria-label="Recommended content">
//                 <h2>More {mediaType === 'tv' ? 'TV Shows' : 'Movies'} You Might Like</h2>
//                 <div className="related-videos-grid">
//                   {(isTMDB ? relatedMedia : relatedVideos).map((relatedItem) => (
//                     <RelatedVideoCard
//                       key={relatedItem.id}
//                       video={relatedItem}
//                       mediaType={isTMDB ? mediaType : 'json'}
//                     />
//                   ))}
//                 </div>
//               </aside>
//             ) : null}
//           </article>
//         </div>
//       </main>
      
//       <Footer />

//       <style jsx>{`
//         .video-page-main {
//           padding: 2rem 0;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1rem;
//         }

//         .page-navigation {
//           margin-bottom: 2rem;
//         }

//         .back-button {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #e50914;
//           color: white;
//           border: none;
//           padding: 0.8rem 1.5rem;
//           border-radius: 5px;
//           cursor: pointer;
//           font-weight: 500;
//           transition: background 0.3s;
//         }

//         .back-button:hover {
//           background: #f40612;
//         }

//         .video-player-container {
//           position: relative;
//           width: 100%;
//           height: 0;
//           padding-bottom: 56.25%;
//           margin-bottom: 2rem;
//         }

//         .video-iframe {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .video-player {
//           width: 100%;
//           height: auto;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .tv-show-selector {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .tv-show-selector h3 {
//           color: #333;
//           margin-bottom: 1rem;
//           font-size: 1.3rem;
//         }

//         .selector-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         .season-selector,
//         .episode-selector {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .selector-dropdown {
//           padding: 0.8rem;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//           font-size: 1rem;
//           background: white;
//         }

//         .loading-indicator {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.5rem;
//           color: #666;
//           font-size: 0.9rem;
//         }

//         .loading-spinner-small {
//           border: 2px solid #f3f3f3;
//           border-top: 2px solid #e50914;
//           border-radius: 50%;
//           width: 16px;
//           height: 16px;
//           animation: spin 1s linear infinite;
//         }

//         .episode-info {
//           padding: 1rem;
//           background: white;
//           border-radius: 5px;
//           border-left: 4px solid #01b4e4;
//         }

//         .episode-info h4 {
//           margin: 0 0 0.5rem 0;
//           color: #333;
//         }

//         .episode-info p {
//           margin: 0 0 1rem 0;
//           color: #666;
//           line-height: 1.5;
//         }

//         .episode-meta {
//           display: flex;
//           gap: 1rem;
//           font-size: 0.9rem;
//           color: #888;
//         }

//         .streaming-options-section {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .streaming-options-section h3 {
//           color: #333;
//           margin-bottom: 1rem;
//           font-size: 1.3rem;
//         }

//         .streaming-buttons {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .stream-btn {
//           padding: 0.8rem 1.5rem;
//           border: 2px solid #e50914;
//           background: white;
//           color: #e50914;
//           border-radius: 5px;
//           font-weight: 500;
//           transition: all 0.3s;
//           cursor: pointer;
//           font-size: 0.9rem;
//         }

//         .stream-btn:hover, .stream-btn.active {
//           background: #e50914;
//           color: white;
//         }

//         .video-info-header {
//           margin-bottom: 2rem;
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .video-info-header h1 {
//           font-size: 2.5rem;
//           margin: 0;
//           color: #333;
//         }

//         .tmdb-badge {
//           background: #01b4e4;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }

//         .media-type-badge {
//           background: #e50914;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }

//         .source-badge {
//           background: #10b981;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }

//         .video-content-grid {
//           display: grid;
//           grid-template-columns: 300px 1fr;
//           gap: 2rem;
//           margin-bottom: 2rem;
//         }

//         .movie-image {
//           position: relative;
//         }

//         .movie-details {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .details-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         .info-item {
//           padding: 0.8rem;
//           background: #f8f9fa;
//           border-radius: 5px;
//           border-left: 4px solid #e50914;
//         }

//         .info-item strong {
//           color: #333;
//           display: block;
//           margin-bottom: 0.3rem;
//         }

//         .rating {
//           color: #e50914;
//           font-weight: bold;
//         }

//         .movie-storyline {
//           margin: 2rem 0;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }

//         .movie-storyline h2 {
//           color: #333;
//           margin-bottom: 1rem;
//         }

//         .movie-storyline p {
//           line-height: 1.6;
//           color: #666;
//         }

//         .related-videos {
//           margin-top: 3rem;
//           padding-top: 2rem;
//           border-top: 2px solid #e9ecef;
//         }

//         .related-videos h2 {
//           color: #333;
//           margin-bottom: 1.5rem;
//           font-size: 1.8rem;
//         }

//         .related-videos-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @media (max-width: 768px) {
//           .video-content-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .video-info-header h1 {
//             font-size: 2rem;
//           }
          
//           .details-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .selector-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .streaming-buttons {
//             flex-direction: column;
//           }
          
//           .related-videos-grid {
//             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           }
          
//           .episode-meta {
//             flex-direction: column;
//             gap: 0.5rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// function LoadingState() {
//   return (
//     <div className="loading-container">
//       <div className="loading-spinner"></div>
//       <p>Loading...</p>
//       <style jsx>{`
//         .loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 50vh;
//         }
//         .loading-spinner {
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #e50914;
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// function NotFoundState() {
//   const router = useRouter();
  
//   return (
//     <div className="error-container">
//       <h2>Content Not Found</h2>
//       <p>The content you're looking for doesn't exist.</p>
//       <button onClick={() => router.push("/videos")} className="back-button">
//         Back to All Movies
//       </button>
//       <style jsx>{`
//         .error-container {
//           text-align: center;
//           padding: 4rem 2rem;
//         }
//         h2 {
//           color: #e50914;
//           margin-bottom: 1rem;
//         }
//         .back-button {
//           background: #e50914;
//           color: white;
//           border: none;
//           padding: 0.8rem 2rem;
//           border-radius: 5px;
//           cursor: pointer;
//           margin-top: 1rem;
//         }
//       `}</style>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   const jsonPaths = videoData.videos.map((video) => ({
//     params: { slug: video.slug },
//   }));

//   let tmdbPaths = [];
//   try {
//     const [trendingMovies, trendingTV] = await Promise.all([
//       getTrending('movie'),
//       getTrending('tv')
//     ]);

//     const moviePaths = trendingMovies.results.slice(0, 30).map((movie) => ({
//       params: { slug: `movie-${movie.id}` },
//     }));

//     const tvPaths = trendingTV.results.slice(0, 30).map((tv) => ({
//       params: { slug: `tv-${tv.id}` },
//     }));

//     tmdbPaths = [...moviePaths, ...tvPaths];
//   } catch (error) {
//     console.error('Error fetching TMDB paths:', error);
//   }

//   const paths = [...jsonPaths, ...tmdbPaths];

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
  
//   // Check if it's a TMDB slug (movie-123 or tv-456)
//   const isTMDBMovie = slug.startsWith('movie-');
//   const isTMDBTV = slug.startsWith('tv-');
  
//   if (isTMDBMovie || isTMDBTV) {
//     try {
//       const id = slug.split('-')[1];
//       const mediaType = isTMDBMovie ? 'movie' : 'tv';
      
//       let media = null;
//       let seasons = null;

//       if (mediaType === 'movie') {
//         media = await getMovie(id);
//       } else {
//         media = await getTV(id);
        
//         if (media && media.seasons) {
//           seasons = media.seasons.filter(season => season.season_number > 0);
//         }
//       }

//       if (!media) {
//         return {
//           notFound: true,
//         };
//       }

//       const relatedMedia = [
//         ...(media.similar?.results || []),
//         ...(media.recommendations?.results || [])
//       ].slice(0, 8);

//       const streamingUrls = mediaType === 'movie' 
//         ? getMovieStreamingUrls(id)
//         : getTVStreamingUrls(id, 1, 1);

//       return {
//         props: {
//           media,
//           relatedMedia,
//           streamingUrls,
//           source: 'tmdb',
//           mediaType,
//           seasons
//         },
//         revalidate: 86400,
//       };
//     } catch (error) {
//       console.error('Error fetching TMDB details:', error);
//       return {
//         notFound: true,
//       };
//     }
//   } else {
//     // Handle JSON videos
//     const video = videoData.videos.find((v) => v.slug === slug);

//     if (!video) {
//       return {
//         notFound: true,
//       };
//     }

//     const otherVideos = videoData.videos.filter((v) => v.slug !== video.slug);
//     const shuffledVideos = [...otherVideos].sort(() => Math.random() - 0.5);
//     const relatedVideos = shuffledVideos.slice(0, 9);

//     return {
//       props: {
//         video,
//         relatedVideos,
//         source: 'json',
//         mediaType: 'movie'
//       },
//       revalidate: 3600,
//     };
//   }
// }













import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SocialShare from "../../components/SocialShare";
import RelatedVideoCard from "../../components/RelatedVideoCard";
import DailymotionPlayer from "../../components/DailymotionPlayer";
import ShortICUPlayer from "../../components/ShortICUPlayer";
import videoData from "../../data/data.json";
import { 
  getDetails, 
  getImageUrl, 
  getMovieStreamingUrls, 
  getTVStreamingUrls,
  getTrending,
  getMovie,
  getTV
} from "../../lib/tmdb";

export default function VideoPage({ 
  video, 
  relatedVideos, 
  media, 
  relatedMedia, 
  source, 
  streamingUrls,
  mediaType,
  seasons,
  slug // Add slug to props
}) {
  const router = useRouter();
  const [currentStreamingSource, setCurrentStreamingSource] = useState("vidsrc");
  const [isClient, setIsClient] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasonData, setSeasonData] = useState(null);
  const [loadingSeason, setLoadingSeason] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load season data when season changes (TV shows only)
  useEffect(() => {
    if (mediaType === 'tv' && media && selectedSeason) {
      loadSeasonData(selectedSeason);
    }
  }, [selectedSeason, media, mediaType]);

  const loadSeasonData = async (seasonNumber) => {
    if (!media || mediaType !== 'tv') return;
    
    setLoadingSeason(true);
    try {
      const response = await fetch(`/api/tv-season?tvId=${media.id}&season=${seasonNumber}`);
      const data = await response.json();
      setSeasonData(data);
      // Reset to first episode when season changes only if current episode doesn't exist in new season
      if (data && data.episodes) {
        const episodeExists = data.episodes.some(ep => ep.episode_number === selectedEpisode);
        if (!episodeExists) {
          setSelectedEpisode(1);
        }
      } else {
        setSelectedEpisode(1);
      }
    } catch (error) {
      console.error('Error loading season data:', error);
      setSeasonData({ episodes: [] });
    } finally {
      setLoadingSeason(false);
    }
  };

  if (router.isFallback) {
    return <LoadingState />;
  }

  const isTMDB = source === 'tmdb';
  const currentMedia = isTMDB ? media : video;

  if (!currentMedia) {
    return <NotFoundState />;
  }

  // FIXED: Use the actual current URL for canonical
  const getCanonicalUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    // Fallback for SSR
    return `https://capitalroot.vercel.app/video/${slug}`;
  };

  const canonicalUrl = getCanonicalUrl();

  // FIXED: Better thumbnail URL handling
  const getThumbnailUrl = () => {
    if (isTMDB) {
      if (media.poster_path || media.backdrop_path) {
        return getImageUrl(media.poster_path || media.backdrop_path, "w500");
      }
      return "/default-thumbnail.jpg";
    } else {
      if (!video.thumbnail) {
        return "/default-thumbnail.jpg";
      }
      if (video.thumbnail.startsWith('http')) {
        return video.thumbnail;
      } else {
        // Ensure proper URL format
        if (video.thumbnail.startsWith('/')) {
          return `https://capitalroot.vercel.app${video.thumbnail}`;
        } else {
          return `https://capitalroot.vercel.app/${video.thumbnail}`;
        }
      }
    }
  };

  const thumbnailUrl = getThumbnailUrl();

  // FIXED: Handle image error properly
  const handleImageError = (e) => {
    console.log('Image failed to load, using fallback');
    e.target.src = "https://capitalroot.vercel.app/default-thumbnail.jpg";
    e.onerror = null; // Prevent infinite loop
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get iframe src based on streaming source and media type
  const getIframeSrc = () => {
    if (!isTMDB) {
      return "#";
    }

    if (mediaType === 'movie') {
      const movieId = media.id.toString();
      switch(currentStreamingSource) {
        case "vidsrc":
          return `https://vidsrc.cc/v2/embed/movie/${movieId}`;
        case "vidsrc-me":
          return `https://vidsrc-me.su/embed/movie/${movieId}`;
        case "2embed":
          return `https://www.2embed.cc/embed/${movieId}`;
        default:
          return `https://vidsrc.xyz/embed/movie/${movieId}`;
      }
    } else if (mediaType === 'tv') {
      const tvId = media.id.toString();
      switch(currentStreamingSource) {
        case "vidsrc":
          return `https://vidsrc.cc/v2/embed/tv/${tvId}/${selectedSeason}/${selectedEpisode}`;
        case "vidsrc-me":
          return `https://vidsrc-me.su/embed/tv/${tvId}/${selectedSeason}-${selectedEpisode}`;
        case "2embed":
          return `https://www.2embed.cc/embedtv/${tvId}&s=${selectedSeason}&e=${selectedEpisode}`;
        default:
          return `https://vidsrc.xyz/embed/tv/${tvId}/${selectedSeason}/${selectedEpisode}`;
      }
    }
  };

  // Get video player for JSON videos based on videoSource
  const getJSONVideoPlayer = () => {
    if (video.videoSource === "dailymotion") {
      return (
        <DailymotionPlayer 
          videoId={video.videoId} 
          title={video.title} 
          autoplay={false}
        />
      );
    } else if (video.videoSource === "shorticu") {
      return (
        <ShortICUPlayer 
          videoId={video.videoId} 
          title={video.title}
        />
      );
    } else if (video.videoSource === "youtube") {
      return (
        <div className="video-player-container">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-iframe"
          ></iframe>
        </div>
      );
    } else if (video.videoSource === "vimeo") {
      return (
        <div className="video-player-container">
          <iframe
            src={`https://player.vimeo.com/video/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="video-iframe"
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="video-player-container">
          <video
            controls
            className="video-player"
            poster={thumbnailUrl}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  };

  // Season and episode selector for TV shows only
  const renderTVShowSelector = () => {
    if (mediaType !== 'tv' || !seasons) return null;

    const episodeOptions = [];
    if (seasonData && seasonData.episodes && seasonData.episodes.length > 0) {
      seasonData.episodes.forEach(episode => {
        episodeOptions.push(
          <option key={episode.episode_number} value={episode.episode_number}>
            Episode {episode.episode_number}: {episode.name || `Episode ${episode.episode_number}`}
          </option>
        );
      });
    } else {
      const episodeCount = seasons.find(s => s.season_number === selectedSeason)?.episode_count || 10;
      for (let i = 1; i <= episodeCount; i++) {
        episodeOptions.push(
          <option key={i} value={i}>
            Episode {i}
          </option>
        );
      }
    }

    return (
      <section className="tv-show-selector">
        <h3>Select Season & Episode</h3>
        <div className="selector-grid">
          <div className="season-selector">
            <label htmlFor="season-select">Season:</label>
            <select 
              id="season-select"
              value={selectedSeason} 
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="selector-dropdown"
            >
              {seasons.map(season => (
                <option key={season.season_number} value={season.season_number}>
                   {season.season_number} {season.name && `- ${season.name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="episode-selector">
            <label htmlFor="episode-select">Episode:</label>
            <select 
              id="episode-select"
              value={selectedEpisode} 
              onChange={(e) => setSelectedEpisode(Number(e.target.value))}
              className="selector-dropdown"
            >
              {episodeOptions}
            </select>
          </div>
        </div>

        {loadingSeason && (
          <div className="loading-indicator">
            <div className="loading-spinner-small"></div>
            <span>Loading episodes...</span>
          </div>
        )}

        {seasonData && seasonData.episodes && seasonData.episodes.find(ep => ep.episode_number === selectedEpisode) && (
          <div className="episode-info">
            <h4>
              {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).name || 
               `Episode ${selectedEpisode}`}
            </h4>
            <p>
              {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).overview || 
               'No description available.'}
            </p>
            <div className="episode-meta">
              <span>
                Air Date: {formatReleaseDate(
                  seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).air_date
                )}
              </span>
              {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).runtime && (
                <span>
                  Runtime: {seasonData.episodes.find(ep => ep.episode_number === selectedEpisode).runtime} min
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    );
  };

  const getStructuredData = () => {
    if (isTMDB) {
      if (mediaType === 'movie') {
        return {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": media.title,
          "description": media.overview,
          "image": thumbnailUrl,
          "dateCreated": media.release_date,
          "duration": media.runtime ? `PT${media.runtime}M` : undefined,
          "genre": media.genres?.map(genre => genre.name) || [],
          "actor": media.credits?.cast?.slice(0, 5).map(actor => ({
            "@type": "Person",
            "name": actor.name,
            "character": actor.character
          })),
          "director": media.credits?.crew?.find(person => person.job === "Director")?.name,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": media.vote_average,
            "bestRating": "10",
            "worstRating": "0",
            "ratingCount": media.vote_count
          }
        };
      } else {
        return {
          "@context": "https://schema.org",
          "@type": "TVSeries",
          "name": media.name,
          "description": media.overview,
          "image": thumbnailUrl,
          "numberOfSeasons": media.number_of_seasons,
          "numberOfEpisodes": media.number_of_episodes,
          "genre": media.genres?.map(genre => genre.name) || [],
          "actor": media.credits?.cast?.slice(0, 5).map(actor => ({
            "@type": "Person",
            "name": actor.name,
            "character": actor.character
          })),
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": media.vote_average,
            "bestRating": "10",
            "worstRating": "0",
            "ratingCount": media.vote_count
          }
        };
      }
    } else {
      return {
        "@context": "https://schema.org",
        "@type": "Movie",
        "name": video.title,
        "description": video.description,
        "image": thumbnailUrl,
        "thumbnailUrl": thumbnailUrl,
        "dateCreated": video.releaseYear ? `${video.releaseYear}` : undefined,
        "genre": video.genre || video.category || "Entertainment",
        "duration": video.duration,
        "actor": video.cast
          ? video.cast.map((actor) => ({ "@type": "Person", name: actor }))
          : undefined,
        "director": video.director
          ? { "@type": "Person", name: video.director }
          : undefined,
        "countryOfOrigin": video.country
          ? { "@type": "Country", name: video.country }
          : undefined,
      };
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://capitalroot.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": mediaType === 'tv' ? "TV Shows" : "Movies",
        "item": `https://capitalroot.vercel.app/${mediaType === 'tv' ? 'tv' : 'videos'}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentMedia.title || currentMedia.name,
        "item": canonicalUrl,
      },
    ],
  };

  const videoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": currentMedia.title || currentMedia.name,
    "description": isTMDB ? media.overview : video.description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": isTMDB ? (media.release_date || media.first_air_date) : video.uploadDate,
    "duration": isTMDB ? (media.runtime ? `PT${media.runtime}M` : 'PT60M') : video.duration,
    "contentUrl": canonicalUrl,
    "embedUrl": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root Movies",
      "url": "https://capitalroot.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://capitalroot.vercel.app/icon-512.png",
      },
    },
  };

  const handleStreamingSourceChange = (source) => {
    setCurrentStreamingSource(source);
  };

  const renderMediaDetails = () => {
    if (isTMDB) {
      if (mediaType === 'movie') {
        return (
          <>
            {media.release_date && (
              <div className="info-item">
                <strong>Release Date:</strong>{" "}
                {formatReleaseDate(media.release_date)}
              </div>
            )}
            {media.genres && media.genres.length > 0 && (
              <div className="info-item">
                <strong>Genre:</strong> {media.genres.map(g => g.name).join(', ')}
              </div>
            )}
            {media.runtime && (
              <div className="info-item">
                <strong>Duration:</strong> {Math.floor(media.runtime / 60)}h {media.runtime % 60}m
              </div>
            )}
            {media.vote_average && (
              <div className="info-item">
                <strong>Rating:</strong> <span className="rating">⭐ {media.vote_average.toFixed(1)}/10</span>
              </div>
            )}
            {media.credits?.crew?.find(person => person.job === "Director") && (
              <div className="info-item">
                <strong>Director:</strong> {media.credits.crew.find(person => person.job === "Director")?.name}
              </div>
            )}
            {media.credits?.cast && media.credits.cast.length > 0 && (
              <div className="info-item">
                <strong>Cast:</strong> {media.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
              </div>
            )}
           
          </>
        );
      } else {
        return (
          <>
            {media.first_air_date && (
              <div className="info-item">
                <strong>First Air Date:</strong>{" "}
                {formatReleaseDate(media.first_air_date)}
              </div>
            )}
            {media.last_air_date && (
              <div className="info-item">
                <strong>Last Air Date:</strong>{" "}
                {formatReleaseDate(media.last_air_date)}
              </div>
            )}
            {media.genres && media.genres.length > 0 && (
              <div className="info-item">
                <strong>Genre:</strong> {media.genres.map(g => g.name).join(', ')}
              </div>
            )}
            {media.number_of_seasons && (
              <div className="info-item">
                <strong>Seasons:</strong> {media.number_of_seasons}
              </div>
            )}
            {media.number_of_episodes && (
              <div className="info-item">
                <strong>Episodes:</strong> {media.number_of_episodes}
              </div>
            )}
            {media.episode_run_time && media.episode_run_time.length > 0 && (
              <div className="info-item">
                <strong>Episode Runtime:</strong> {media.episode_run_time[0]} min
              </div>
            )}
            {media.vote_average && (
              <div className="info-item">
                <strong>Rating:</strong> <span className="rating">⭐ {media.vote_average.toFixed(1)}/10</span>
              </div>
            )}
            {media.credits?.cast && media.credits.cast.length > 0 && (
              <div className="info-item">
                <strong>Cast:</strong> {media.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
              </div>
            )}
            {media.created_by && media.created_by.length > 0 && (
              <div className="info-item">
                <strong>Created By:</strong> {media.created_by.map(creator => creator.name).join(', ')}
              </div>
            )}
            {media.networks && media.networks.length > 0 && (
              <div className="info-item">
                <strong>Network:</strong> {media.networks.map(network => network.name).join(', ')}
              </div>
            )}
          </>
        );
      }
    } else {
      return (
        <>
          {video.director && (
            <div className="info-item">
              <strong>Director:</strong> {video.director}
            </div>
          )}
          {video.cast && video.cast.length > 0 && (
            <div className="info-item">
              <strong>Cast:</strong> {video.cast.join(", ")}
            </div>
          )}
          {video.genre && (
            <div className="info-item">
              <strong>Genre:</strong> {video.genre}
            </div>
          )}
          {video.releaseYear && (
            <div className="info-item">
              <strong>Release Year:</strong> {video.releaseYear}
            </div>
          )}
          {video.country && (
            <div className="info-item">
              <strong>Country:</strong> {video.country}
            </div>
          )}
          {video.language && (
            <div className="info-item">
              <strong>Language:</strong> {video.language}
            </div>
          )}
        
          {video.duration && (
            <div className="info-item">
              <strong>Duration:</strong>{" "}
              {video.duration
                .replace("PT", "")
                .replace("H", "h ")
                .replace("M", "m")}
            </div>
          )}
          {video.rating && (
            <div className="info-item">
              <strong>Rating:</strong>{" "}
              <span className="rating">{video.rating}</span>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{currentMedia.title || currentMedia.name} - {mediaType === 'tv' ? 'Watch TV Show' : 'Watch Online'} | Capital Root Movies</title>
        <meta
          name="description"
          content={`Watch ${currentMedia.title || currentMedia.name} online in HD quality. ${isTMDB ? media.overview : video.description}`}
        />
        <meta
          name="keywords"
          content={`${currentMedia.title || currentMedia.name}, watch online, stream, ${isTMDB ? media.genres?.map(g => g.name).join(', ') : video.tags?.join(", ") || ""}, ${mediaType === 'tv' ? 'tv shows' : 'movies'}`}
        />
        
        {/* FIXED: Use proper canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        <meta
          property="og:title"
          content={`${currentMedia.title || currentMedia.name} - ${mediaType === 'tv' ? 'Watch TV Show' : 'Watch Online'} | Capital Root Movies`}
        />
        <meta property="og:description" content={isTMDB ? media.overview : video.description} />
        <meta property="og:type" content={mediaType === 'tv' ? 'video.tv_show' : 'video.movie'} />
        <meta property="og:url" content={canonicalUrl} />
        
        {/* FIXED: Ensure image URL is always absolute */}
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:secure_url" content={thumbnailUrl} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={currentMedia.title || currentMedia.name} />
        <meta property="og:site_name" content="Capital Root Movies" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:title" content={currentMedia.title || currentMedia.name} />
        <meta name="twitter:description" content={isTMDB ? media.overview : video.description} />
        <meta name="twitter:image" content={thumbnailUrl} />
        <meta name="twitter:image:alt" content={currentMedia.title || currentMedia.name} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
          key="structured-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          key="breadcrumb-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoObjectSchema),
          }}
          key="videoobject-schema"
        />
      </Head>

      <Header />
      <main className="video-page-main">
        <div className="container">
          <nav aria-label="Breadcrumb" className="page-navigation">
            <button
              onClick={() => router.push(mediaType === 'tv' ? "/videos" : "/videos")}
              className="back-button"
              aria-label={`Go back to all ${mediaType === 'tv' ? 'TV shows' : 'movies'}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
            </button>
          </nav>

          <article className="video-page-content">
            <section className="video-player-section" style={{ marginTop: "60px" }}>
              {isTMDB ? (
                <div className="video-player-container">
                  <iframe
                    src={getIframeSrc()}
                    title={mediaType === 'movie' ? media.title : `${media.name} - S${selectedSeason}E${selectedEpisode}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                </div>
              ) : (
                getJSONVideoPlayer()
              )}
            </section>

            {/* TV Show Season/Episode Selector - Only for TV shows */}
            {mediaType === 'tv' && renderTVShowSelector()}

            {/* Streaming Sources - Only for TMDB content */}
            {isTMDB && streamingUrls && (
              <section className="streaming-options-section">
                <h3>Streaming Sources</h3>
                <div className="streaming-buttons">
                  <button 
                    className={`stream-btn ${currentStreamingSource === "vidsrc" ? "active" : ""}`}
                    onClick={() => handleStreamingSourceChange("vidsrc")}
                  >
                    Vidsrc
                  </button>
                  <button 
                    className={`stream-btn ${currentStreamingSource === "vidsrc-me" ? "active" : ""}`}
                    onClick={() => handleStreamingSourceChange("vidsrc-me")}
                  >
                    Vidsrc.me
                  </button>
                  <button 
                    className={`stream-btn ${currentStreamingSource === "2embed" ? "active" : ""}`}
                    onClick={() => handleStreamingSourceChange("2embed")}
                  >
                    2Embed
                  </button>
                </div>
              </section>
            )}

            <section className="video-info-section">
              <header className="video-info-header">
                <h1>{currentMedia.title || currentMedia.name}</h1>
                {isTMDB && (
                  <div className="tmdb-badge">
                    <span>Powered by TMDB</span>
                  </div>
                )}
                {mediaType === 'tv' && (
                  <div className="media-type-badge">
                    <span>TV Show</span>
                  </div>
                )}
                {!isTMDB && (
                  <div className="source-badge">
                    <span>{video.videoSource.toUpperCase()}</span>
                  </div>
                )}
              </header>

              <div className="video-content-grid">
                <div className="movie-image">
                  {/* FIXED: Better image handling with proper error fallback */}
                  <Image
                    src={thumbnailUrl}
                    alt={`${currentMedia.title || currentMedia.name} poster`}
                    width={300}
                    height={450}
                    quality={100}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    onError={handleImageError}
                  />
                </div>

                <div className="movie-details">
                  <div className="details-grid">
                    {renderMediaDetails()}
                  </div>
                </div>
              </div>
              
              <div className="movie-storyline">
                <h2>{mediaType === 'tv' ? 'Overview' : 'Storyline'}</h2>
                <p>{isTMDB ? media.overview : video.description}</p>
              </div>

              <nav aria-label="Breadcrumb" className="page-navigation">
                <button
                  onClick={() => router.push(mediaType === 'tv' ? "/videos" : "/videos")}
                  className="back-button"
                  aria-label={`Go back to all ${mediaType === 'tv' ? 'TV shows' : 'movies'}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  Back to All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
                </button>
              </nav>
              
              <SocialShare 
                mediaData={isTMDB ? media : null}
                videoData={!isTMDB ? video : null}
                mediaType={mediaType}
                currentUrl={canonicalUrl}
                currentImage={thumbnailUrl}
                currentTitle={currentMedia.title || currentMedia.name}
              />             
            </section>

            {(relatedVideos && relatedVideos.length > 0) || (relatedMedia && relatedMedia.length > 0) ? (
              <aside className="related-videos" aria-label="Recommended content">
                <h2>More {mediaType === 'tv' ? 'TV Shows' : 'Movies'} You Might Like</h2>
                <div className="related-videos-grid">
                  {(isTMDB ? relatedMedia : relatedVideos).map((relatedItem) => (
                    <RelatedVideoCard
                      key={relatedItem.id}
                      video={relatedItem}
                      mediaType={isTMDB ? mediaType : 'json'}
                    />
                  ))}
                </div>
              </aside>
            ) : null}
          </article>
        </div>
      </main>
      
      <Footer />

      <style jsx>{`
        .video-page-main {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-navigation {
          margin-bottom: 2rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #e50914;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s;
        }

        .back-button:hover {
          background: #f40612;
        }

        .video-player-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          margin-bottom: 2rem;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .video-player {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tv-show-selector {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .tv-show-selector h3 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .selector-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .season-selector,
        .episode-selector {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .selector-dropdown {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          background: white;
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }

        .loading-spinner-small {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #e50914;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }

        .episode-info {
          padding: 1rem;
          background: white;
          border-radius: 5px;
          border-left: 4px solid #01b4e4;
        }

        .episode-info h4 {
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .episode-info p {
          margin: 0 0 1rem 0;
          color: #666;
          line-height: 1.5;
        }

        .episode-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #888;
        }

        .streaming-options-section {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .streaming-options-section h3 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .streaming-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stream-btn {
          padding: 0.8rem 1.5rem;
          border: 2px solid #e50914;
          background: white;
          color: #e50914;
          border-radius: 5px;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .stream-btn:hover, .stream-btn.active {
          background: #e50914;
          color: white;
        }

        .video-info-header {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .video-info-header h1 {
          font-size: 2.5rem;
          margin: 0;
          color: #333;
        }

        .tmdb-badge {
          background: #01b4e4;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .media-type-badge {
          background: #e50914;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .source-badge {
          background: #10b981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .video-content-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .movie-image {
          position: relative;
        }

        .movie-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-item {
          padding: 0.8rem;
          background: #f8f9fa;
          border-radius: 5px;
          border-left: 4px solid #e50914;
        }

        .info-item strong {
          color: #333;
          display: block;
          margin-bottom: 0.3rem;
        }

        .rating {
          color: #e50914;
          font-weight: bold;
        }

        .movie-storyline {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .movie-storyline h2 {
          color: #333;
          margin-bottom: 1rem;
        }

        .movie-storyline p {
          line-height: 1.6;
          color: #666;
        }

        .related-videos {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid #e9ecef;
        }

        .related-videos h2 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .related-videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .video-content-grid {
            grid-template-columns: 1fr;
          }
          
          .video-info-header h1 {
            font-size: 2rem;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .selector-grid {
            grid-template-columns: 1fr;
          }
          
          .streaming-buttons {
            flex-direction: column;
          }
          
          .related-videos-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .episode-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

function LoadingState() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #e50914;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function NotFoundState() {
  const router = useRouter();
  
  return (
    <div className="error-container">
      <h2>Content Not Found</h2>
      <p>The content you're looking for doesn't exist.</p>
      <button onClick={() => router.push("/videos")} className="back-button">
        Back to All Movies
      </button>
      <style jsx>{`
        .error-container {
          text-align: center;
          padding: 4rem 2rem;
        }
        h2 {
          color: #e50914;
          margin-bottom: 1rem;
        }
        .back-button {
          background: #e50914;
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const jsonPaths = videoData.videos.map((video) => ({
    params: { slug: video.slug },
  }));

  let tmdbPaths = [];
  try {
    const [trendingMovies, trendingTV] = await Promise.all([
      getTrending('movie'),
      getTrending('tv')
    ]);

    const moviePaths = trendingMovies.results.slice(0, 30).map((movie) => ({
      params: { slug: `movie-${movie.id}` },
    }));

    const tvPaths = trendingTV.results.slice(0, 30).map((tv) => ({
      params: { slug: `tv-${tv.id}` },
    }));

    tmdbPaths = [...moviePaths, ...tvPaths];
  } catch (error) {
    console.error('Error fetching TMDB paths:', error);
  }

  const paths = [...jsonPaths, ...tmdbPaths];

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Check if it's a TMDB slug (movie-123 or tv-456)
  const isTMDBMovie = slug.startsWith('movie-');
  const isTMDBTV = slug.startsWith('tv-');
  
  if (isTMDBMovie || isTMDBTV) {
    try {
      const id = slug.split('-')[1];
      const mediaType = isTMDBMovie ? 'movie' : 'tv';
      
      let media = null;
      let seasons = null;

      if (mediaType === 'movie') {
        media = await getMovie(id);
      } else {
        media = await getTV(id);
        
        if (media && media.seasons) {
          seasons = media.seasons.filter(season => season.season_number > 0);
        }
      }

      if (!media) {
        return {
          notFound: true,
        };
      }

      const relatedMedia = [
        ...(media.similar?.results || []),
        ...(media.recommendations?.results || [])
      ].slice(0, 8);

      const streamingUrls = mediaType === 'movie' 
        ? getMovieStreamingUrls(id)
        : getTVStreamingUrls(id, 1, 1);

      return {
        props: {
          media,
          relatedMedia,
          streamingUrls,
          source: 'tmdb',
          mediaType,
          seasons,
          slug // Pass slug to component
        },
        revalidate: 86400,
      };
    } catch (error) {
      console.error('Error fetching TMDB details:', error);
      return {
        notFound: true,
      };
    }
  } else {
    // Handle JSON videos
    const video = videoData.videos.find((v) => v.slug === slug);

    if (!video) {
      return {
        notFound: true,
      };
    }

    const otherVideos = videoData.videos.filter((v) => v.slug !== video.slug);
    const shuffledVideos = [...otherVideos].sort(() => Math.random() - 0.5);
    const relatedVideos = shuffledVideos.slice(0, 9);

    return {
      props: {
        video,
        relatedVideos,
        source: 'json',
        mediaType: 'movie',
        slug // Pass slug to component
      },
      revalidate: 3600,
    };
  }
}
