import React, { useState, useEffect } from "react";
import "../styles/anime.css";
import { IoClose } from "react-icons/io5";
import CopyRight from "./copyright";
import BackToTopButton from "./backtotop";

const Anime = () => {
  const [animeData, setAnimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchAnimeData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${query}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data.data);
        setAnimeData(data.data);
        setIsLoading(false);
      } catch (error) {
        setReload(true);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, [query]);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleClose = () => {
    setSelectedAnime(null);
  };

  const handleSelectedAnime = (anime) => {
    setSelectedAnime(anime);
    fetchTrailer(anime.title);
  };

  const fetchTrailer = async (title) => {
    try {
      const Api_Key = "AIzaSyDiG8K9rBBYv-dE0kgJRmW2OMsox9jWYW8";
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${title} trailer&key=${Api_Key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }
      const data = await response.json();
      const videoId = data.items[0].id.videoId;
      setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (error) {
    return <div className="two-01 color">Error: {error}</div>;
  } else if (!animeData) {
    return (
      <div>
        <div className="two-01">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="Anime join">
      <div className="container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for anime..."
          className="one-01"
        />

        {isLoading && <div className="loader"></div>}
        <ul className="search-container">
          {animeData.map((anime) => (
            <li key={anime.mal_id} className="one-02">
              <img
                src={anime.images.jpg.image_url}
                className="one-03"
                alt={anime.title}
                onClick={() => handleSelectedAnime(anime)}
              />
              <h2 className="one-04">{anime.title}</h2>
              <p className="one-05">Type {anime.type}</p>
              <p className="one-05">Episodes {anime.episodes}</p>
              <p className="one-05">Status {anime.status}</p>
              <p className="one-05">Score {anime.score}</p>
            </li>
          ))}
        </ul>
      </div>
      {selectedAnime && (
        <div className="selected-anime">
          <div className="selected-container">
            <span className="close" onClick={handleClose}>
              <IoClose />
            </span>
            <div className="flex-001">
              <div className="image-002">
                {" "}
                {selectedAnime.images.jpg.image_url ? (
                  <img
                    src={selectedAnime.images.jpg.image_url}
                    className="one-003"
                    alt={selectedAnime.title}
                  />
                ) : (
                  <img
                    src={"https://example.com/placeholder_200x200.jpg"}
                    className="one-003"
                    alt={selectedAnime.title}
                  />
                )}
              </div>
              {trailerUrl && (
                <div className="trailer-container">
                  <iframe
                    title="trailer"
                    src={trailerUrl}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {selectedAnime.title ? (
              <h2 className="one-004">{selectedAnime.title}</h2>
            ) : (
              <h2 className="one-004">No Title</h2>
            )}
            <div className="flex">
              {selectedAnime.type && selectedAnime.type !== null && (
                <p className="one-005">
                  <span>Type</span> {selectedAnime.type}
                </p>
              )}
              {selectedAnime.episodes && selectedAnime.episode !== null && (
                <p className="one-005">
                  <span>Episodes </span>
                  {selectedAnime.episodes}
                </p>
              )}
              {selectedAnime.year && selectedAnime.year !== null && (
                <p className="one-005">
                  <span>Year</span> {selectedAnime.year}
                </p>
              )}
              {selectedAnime.rank && selectedAnime.rank !== null && (
                <p className="one-005">
                  <span>Rank</span> {selectedAnime.rank}
                </p>
              )}
              {selectedAnime.ranking && selectedAnime.ranking !== null && (
                <p className="one-005">
                  <span>Ranking</span> {selectedAnime.ranking}
                </p>
              )}
              {selectedAnime.duration && selectedAnime.duration !== null && (
                <p className="one-005">
                  <span>Duration</span> {selectedAnime.duration}
                </p>
              )}
              {selectedAnime.source && selectedAnime.source !== null && (
                <p className="one-005">
                  <span>Source</span> {selectedAnime.source}
                </p>
              )}
              {selectedAnime.season && selectedAnime.season !== null && (
                <p className="one-005">
                  <span>Season</span> {selectedAnime.season}
                </p>
              )}
              {selectedAnime.broadcast.day &&
                selectedAnime.broadcast.day !== null && (
                  <p className="one-005">
                    <span>Broadcast</span> {selectedAnime.broadcast.day}
                  </p>
                )}
            </div>
            {selectedAnime.background && selectedAnime.background !== null && (
              <p className="one-005">
                <span>Background</span> {selectedAnime.background}
              </p>
            )}

            {selectedAnime.synopsis && selectedAnime.synopsis !== null && (
              <p className="one-005">
                <span>Synopsis</span> {selectedAnime.synopsis}
              </p>
            )}
            <div className="flex">
              {selectedAnime.producers.length > 0 &&
                selectedAnime.producers[0].name &&
                selectedAnime.producers[0].name !== null && (
                  <p className="one-005">
                    <span>Producers Name </span>
                    {selectedAnime.producers[0].name}
                  </p>
                )}
              {selectedAnime.producers.length > 0 &&
                selectedAnime.producers[0].url &&
                selectedAnime.producers[0].url !== null && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={selectedAnime.producers[0].url}
                  >
                    Producers Link
                  </a>
                )}
            </div>
            <div className="flex">
              {selectedAnime.studios.length > 0 && (
                <div className="flex">
                  {selectedAnime.studios[0].name &&
                    selectedAnime.studios[0].name !== null && (
                      <p className="one-005">
                        <span> Studios Name</span>
                        {selectedAnime.studios[0].name || "no Data"}
                      </p>
                    )}
                  {selectedAnime.studios[0].url &&
                    selectedAnime.studios[0].url !== null && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selectedAnime.studios[0].url}
                      >
                        Studios
                      </a>
                    )}
                </div>
              )}
            </div>
            <div className="flex-2">
              <div className="flex">
                {selectedAnime.themes.length > 0 && (
                  <div className="flex">
                    {selectedAnime.themes[0].name &&
                      selectedAnime.themes[0].name !== null && (
                        <p className="one-005">
                          <span>Theme</span>
                          {selectedAnime.themes[0].name}
                        </p>
                      )}
                    {selectedAnime.themes[0].type &&
                      selectedAnime.themes[0].type !== null && (
                        <p className="one-005">
                          <span>Type</span> {selectedAnime.themes[0].type}
                        </p>
                      )}
                    {selectedAnime.themes[0].url &&
                      selectedAnime.themes[0].url !== null && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={selectedAnime.themes[0].url}
                        >
                          Theme Link
                        </a>
                      )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-2">
              <div className="flex">
                {selectedAnime.genres.length > 0 && (
                  <div className="flex">
                    {selectedAnime.genres[0].name &&
                      selectedAnime.genres[0].name !== null && (
                        <p className="one-005">
                          <span>Genres</span>
                          {selectedAnime.genres[0].name}
                        </p>
                      )}
                    {selectedAnime.genres[0].type &&
                      selectedAnime.genres[0].type !== null && (
                        <p className="one-005">
                          <span>Type</span> {selectedAnime.genres[0].type}
                        </p>
                      )}
                    {selectedAnime.genres[0].url &&
                      selectedAnime.genres[0].url !== null && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={selectedAnime.genres[0].url}
                        >
                          Genres Link
                        </a>
                      )}
                  </div>
                )}
              </div>
            </div>
            {selectedAnime.score && selectedAnime.score !== null && (
              <p className="one-005">
                <span>Score</span> {selectedAnime.score}
              </p>
            )}
            {selectedAnime.status && selectedAnime.status !== null && (
              <p className="one-005">
                <span>Status</span> {selectedAnime.status}
              </p>
            )}
          </div>
        </div>
      )}
      {reload && <button onClick={reloadPage}>Reload Page</button>}
      {animeData && <CopyRight text="Jayasriraam" />}
      {animeData && <BackToTopButton />}
    </div>
  );
};

export default Anime;
