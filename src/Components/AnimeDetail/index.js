/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import './animedetail.css'
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
function AnimeDetail(){

    let animeID = useParams()

    useEffect(async () => {
        // GET ID
        let id = await animeID.id
        console.log(id)

        // QUERY WITH ID
        const {data, error} = await supabase
        .from('animes')
        .select('id, anime_title, anime_url')
        .match({id: id})

        // GET ANIME TITLE BY ID
        let animeTitle = data[0].anime_title
        console.log(animeTitle)

        // GET EPISODE BASED ON ANIME TITLE
        const res = await supabase
        .from(`anime_detail`)
        .select(`id, anime_title, anime_url, anime_episode`)
        .filter(`anime_title`, `in`, `(${animeTitle})`)

        console.log(res.data)
    }, [animeID])


    return (
        <>
        <div className = "anime-list-section">
        <h2>Anime Detail:</h2>
        <p></p>
        </div>
        </>
    )

}
export default AnimeDetail