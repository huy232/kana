/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import './home.css'
import { supabase } from '../../supabaseClient'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination,Navigation } from 'swiper';
import 'swiper/css'

SwiperCore.use([Pagination,Navigation]);
function Home(){
    
    const [animeDetail, setAnimeDetail] = useState([])
    const [swiperIndex, setSwiperIndex] = useState(3)

    useEffect(async ()=>{
        fetchAnime()
    }, [])

    
    if (animeDetail.length === 0) {
        console.log('Loading')
        return <div>Loading</div>
    }

    async function fetchAnime() {
        const { data } = await supabase
            .from ('anime')
            .select ()
            setAnimeDetail(data)
    }

    return (
        <>
        <div className="spacer">
            &nbsp;
        </div>
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
        {console.log(swiperIndex)}
        {/* The specific info contains on active slide */}
        {console.log(animeDetail[swiperIndex])}
        {/* An array list contains each anime */}
        {console.log(animeDetail)}
        </div>
        </>
    )

}
export default Home