/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import './animedetail.css'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
function AnimeDetail(){
    const [animeEpisode, setAnimeEpisode] = useState([])
    const [animeDetailID, setAnimeDetailID] = useState(0)
    const [episode, setEpisode] = useState(0)

    let animeID = useParams()

    useEffect(async () => {
        // GET ID
        let id = animeID.id
        setAnimeDetailID(id)

        // QUERY WITH ID
        const {data, error} = await supabase
        .from('animes')
        .select('id, anime_title, anime_url')
        .match({id: id})

        // GET ANIME TITLE BY ID
        let animeTitle = data[0].anime_title

        // GET EPISODE BASED ON ANIME TITLE

        const {data: dataInfo, error: errorInfo} = await supabase
        .from(`anime_detail`)
        .select(`id, anime_title, anime_url, anime_episode`)
        .filter(`anime_title`, `in`, `(${animeTitle})`)
    
        setAnimeEpisode(dataInfo)
    }, [animeID])


    return (
        <>
        <div className = "anime-list-section">
        <div className = "anime-list-episode">
        <span><h2>Danh sách tập phim</h2></span>
        {animeEpisode.map((element, i) =>
                <div className="episode-item" key={i}>
                    <Link to={'/watch/' + animeDetailID + '/' + element.anime_episode.replace('Tập ', '')}>
                        <h3>{element.anime_episode}</h3>
                    </Link>
                </div>
            )}
        </div>
        
        </div>
        </>
    )

}
export default AnimeDetail