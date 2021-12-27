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
    const [swiperIndex, setSwiperIndex] = useState(0)

    useEffect(async ()=>{
        fetchAnime()
    }, [])


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
            initialSlide = {4}
            centeredSlides={true}
            slidesPerView={7}
            spaceBetween={10}
            loop={true}
            pagination={false} 
            // I use onActiveIndexChange to track current active index
            // and update its state using setSwiperIndex
            onActiveIndexChange={(swiperCore) => {setSwiperIndex(swiperCore.activeIndex)}}
            navigation={true} className="mySwiper">
                {animeDetail.map((element, i)=> 
                    (
                    <SwiperSlide key = {i}>
                        <img src={element.anime_image}/>
                    </SwiperSlide>
                    )
                    )}
            </Swiper>
        {/* I tried to call it down here to see whenever I change my slide, will it update the index, but it doesn't */}
        {console.log(swiperIndex)}
        </div>
        </>
    )

}
export default Home