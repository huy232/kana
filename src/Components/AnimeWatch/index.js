/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import "./animewatch.css";
import ReactNetflixPlayer from "react-netflix-player";
import axios from "axios";

const url = "http://localhost:8000/post-anime";

function AnimeWatch() {
  const animeInfo = useParams();
  const infoMainID = animeInfo.id;
  const animeEpisode = "Tập " + animeInfo.episode;

  const navigate = useNavigate();
  const [animeInfoPlayer, setAnimeInfoPlayer] = useState("");
  const [animeWatch, setAnimeWatch] = useState("");

  useEffect(async () => {
    const { data } = await supabase
      .from("animes")
      .select("id, anime_title")
      .match({ id: infoMainID });

    const { data: secondData } = await supabase
      .from(`anime_detail`)
      .select(`anime_title, anime_url, anime_episode`)
      .match({ anime_title: data[0].anime_title, anime_episode: animeEpisode });
    setAnimeInfoPlayer(data[0].anime_title);

    await axios
      .post(url, {
        animeURL: secondData[0].anime_url,
        animeTitle: data[0].anime_title,
        anime_episode: animeEpisode,
      })
      .then((res) => res.data)
      .catch((err) => err.data);
    const { data: finalData } = await supabase
      .from(`anime_detail`)
      .select(`anime_title, anime_url, anime_episode, anime_video`)
      .match({
        anime_title: data[0].anime_title,
        anime_episode: animeEpisode,
      });
    setAnimeWatch(finalData[0].anime_video);
  }, []);

  function handleClick(e) {
    navigate("/");
  }

  return (
    <>
      {/* <ReactNetflixPlayer
        key={animeWatch}
        src={animeWatch}
        playerLanguage="en"
        fullPlayer={true}
        titleMedia={animeInfoPlayer}
        extraInfoMedia={animeEpisode}
        title={animeInfoPlayer}
        subTitle={animeEpisode}
        overlayEnabled={true}
        backButton={handleClick}
        primaryColor="#b81f40"
        secundaryColor="#ffffff"
        onCrossClick={handleClick}
      /> */}
      <video key={animeWatch} controls>
        <source src={animeWatch}></source>
      </video>
    </>
  );
}

export default AnimeWatch;
