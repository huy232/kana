/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { supabase } from '../../supabaseClient'
import { useParams } from 'react-router-dom'
import axios from 'axios'         


function AnimeWatch() {
    const [animeEpisode, setAnimeEpisode] = useState(0)
    const [animeWatch, setAnimeWatch] = useState('')
    let animeInfo = useParams()

    useEffect(async()=>{
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
        // console.log(data[0].anime_title)
        // console.log(animeEpisode)

        await axios.post(url, {animeURL: secondData[0].anime_url, animeTitle: data[0].anime_title, anime_episode: animeEpisode})
        .then(res => console.log(res.data))
        .catch(err => console.log(err.data))

        const {data: finalData} = await supabase
        .from(`anime_detail`)
        .select(`anime_title, anime_url, anime_episode, anime_video`)
        .match({anime_title: data[0].anime_title, anime_episode: animeEpisode})
        const delayTime = setTimeout(()=> {
            setAnimeWatch(finalData[0].anime_video)
        }, 3000)
        return () => clearTimeout(delayTime)
    })

    return (
        <>
        {console.log(animeWatch)}
        {animeWatch === '' || animeWatch == null? <div>Loading movie</div> :
        <video width="100%" height="auto" controls key = {animeWatch}>
        <source src = {animeWatch} type = "video/mp4"/>
        </video>}      
        </>


    )

}


export default AnimeWatch