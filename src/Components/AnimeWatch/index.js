/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { supabase } from '../../supabaseClient'
import { useParams, useNavigate } from 'react-router-dom'
import './animewatch.css'
import ReactNetflixPlayer from "react-netflix-player"
import axios from 'axios'         


function AnimeWatch() {
    const navigate = useNavigate();
    const [animeInfoPlayer, setAnimeInfoPlayer] = useState('')
    const [animeEpisode, setAnimeEpisode] = useState(0)
    const [animeWatch, setAnimeWatch] = useState('')
    let animeInfo = useParams()

    useEffect(async()=>{
        let unmounted = false;
        let url = 'http://localhost:8000'
        let infoMainID = animeInfo.id
        let infoMainEpisode = ("Tập " + animeInfo.episode)
        setAnimeEpisode(infoMainEpisode)

        const {data} = await supabase
        .from('animes')
        .select('id, anime_title')
        .match({id: infoMainID})
        
        const {data: secondData} = await supabase
        .from(`anime_detail`)
        .select(`anime_title, anime_url, anime_episode`)
        .match({anime_title: data[0].anime_title, anime_episode: animeEpisode})
        setAnimeInfoPlayer(data[0].anime_title)

        await axios.post(url, {animeURL: secondData[0].anime_url, animeTitle: data[0].anime_title, anime_episode: animeEpisode})
            .then(res => res.data)
            .catch(err => err.data)



        const {data: finalData} = await supabase
        .from(`anime_detail`)
        .select(`anime_title, anime_url, anime_episode, anime_video`)
        .match({anime_title: data[0].anime_title, anime_episode: animeEpisode})
        
        const delayTime = setTimeout(()=> {
            setAnimeWatch(finalData[0].anime_video)
        }, 2000)
        return () => {
            unmounted = true
            clearTimeout(delayTime)
        }
    })

    function handleClick(e) {
        navigate('/');
      }


    return (
        <>
        <ReactNetflixPlayer
        key = {animeWatch}
        src = {animeWatch}
        playerLanguage="en"
        fullPlayer = {true}
        autoControllCloseEnabled = {true}
        titleMedia = {animeInfoPlayer}
        extraInfoMedia = {animeEpisode}
        title = {animeInfoPlayer}
        subTitle = {animeEpisode}
        overlayEnabled = {true}
        autoPlay = {false}
        playbackRateEnable = {false}
        backButton = {handleClick}
        primaryColor="#b81f40"
        secundaryColor="#ffffff"
        onCrossClick = {handleClick}
        />
        </>

    )

}


export default AnimeWatch