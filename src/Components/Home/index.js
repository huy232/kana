/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import './home.css'
import { supabase } from '../../supabaseClient'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination,Navigation } from 'swiper'
import 'swiper/css'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

SwiperCore.use([Pagination,Navigation]);
function Home(){
    
    const [animeDetail, setAnimeDetail] = useState([])
    const [animeList, setAnimeList] = useState([])
    const [swiperIndex, setSwiperIndex] = useState(3)

    useEffect(async ()=>{
        await fetchAnime()
        await fetchAnimeList()
    }, [])

    
    if (animeDetail.length === 0) {
        console.log('Loading')
        return <div>Loading</div>
    }

    async function fetchAnime() {
        const { data } = await supabase
            .from ('animes')
            .select ()
            .limit(20)
            setAnimeDetail(data)
    }
    async function fetchAnimeList() {
        const { data } = await supabase
            .from ('animes')
            .select ()
            .limit(100)
            setAnimeList(data)
    }

    return (
        <>
        <div className="home-section">
            <h2>Home Page</h2>
            <Swiper
            initialSlide={3}
            centeredSlides={true}
            centeredSlidesBounds={true}
            slidesPerView = {6}
            spaceBetween={0}
            loop={true}
            pagination={false}
            onActiveIndexChange={(swiperCore) => {setSwiperIndex(swiperCore.realIndex)}}
            navigation={true} className="mySwiper">
                {animeDetail.map((element, i)=> 
                    (
                    <SwiperSlide key = {i}>
                        <img src={element.anime_image}/>
                    </SwiperSlide>
                    )
                    )}
            </Swiper>
        {/* Current index of active slide */}
        {/* {console.log(swiperIndex)} */}
        {/* The specific info contains on active slide */}
        {/* {console.log(animeDetail[swiperIndex])} */}
            <div className="anime-info-container" style={
                {backgroundImage:`url(${animeDetail[swiperIndex].anime_background}), linear-gradient(77deg, rgba(0,0,0,.8) 25%, transparent 85%)`, 
                 backgroundColor: `transparent`,
                height: `100%`}
                }>
                <h1 className = "anime-info-title">{animeDetail[swiperIndex].anime_title}</h1>
                {/* <p className = "anime-info-description">{animeDetail[swiperIndex].anime_description}</p> */}
            </div>
            <h2>Anime List of Today</h2>
            <div className="anime-list">
                {animeList.map((element, i)=> 
                <div className = "anime-item" key = {i}>
                    <Link to = {"/anime/detail/" + element.id}>
                    <img className="fas fa-play" src={element.anime_image}/>
                    </Link>
                </div>
                )}
            </div>
        </div>
        </>
    )

}
export default Home