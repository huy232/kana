/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import ReactHlsPlayer from 'react-hls-player';
import './home.css'
import { supabase } from '../../supabaseClient'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
function Home(){ 
    // <ReactHlsPlayer
    // src = "https://uryrsgzighirhzyhxkpz.supabase.in/storage/v1/object/sign/isekai-shokudou/001.m3u8?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpc2VrYWktc2hva3Vkb3UvMDAxLm0zdTgiLCJpYXQiOjE2NDAzMTg5ODYsImV4cCI6MTk1NTY3ODk4Nn0.OI3_6vH9jRPDE9oZcEbTfozTTKH6D0ErZhI8y1AlLeU"
    // autoPlay = {false}
    // controls = {true}
    // width = "100%"
    // height = "auto"
    // />

    // let url = 'https://scontent.cdninstagram.com/v/t66.36240-6/10000000_505160830707010_5480025691372016235_n.mp4?_nc_cat=109&ccb=1-5&_nc_sid=985c63&efg=eyJybHIiOjE1MDAsInJsYSI6NDA5NiwidmVuY29kZV90YWciOiJvZXBfaGQifQ%3D%3D&_nc_ohc=98oexxZpl30AX_8Q2jH&rl=1500&vabr=700&_nc_ht=scontent-mxp2-1.xx&edm=APRAPSkEAAAA&oh=00_AT9RF2qHSDajRxbGhUw3fhxWV4_i1jeLlLwJ538ZRNpiJg&oe=61C9578C'
    // let url1= 'https://uryrsgzighirhzyhxkpz.supabase.in/storage/v1/object/sign/isekai-shokudou/001.m3u8?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpc2VrYWktc2hva3Vkb3UvMDAxLm0zdTgiLCJpYXQiOjE2NDAzOTg1MjcsImV4cCI6MTk1NTc1ODUyN30.TeqtBfNMOejCDX1Wd0HN1hO-5qL2GRyGDpWmcfn88yg'
    // var xhr = new XMLHttpRequest();
    // xhr.open('HEAD', url, true);

    // xhr.onload = function() {
    //     var contentType = xhr.getResponseHeader('Content-Type');
    //     if (contentType == 'video/mp4'){
    //         console.log(contentType);
    //         console.log("This is mp4 video")
    //     }
    //     else {
    // 		console.log("This is m3u8 then")
    //     }
    // };

// xhr.send();
    useEffect(()=>{
        fetchAnime()
    }, [])
    const [animeDetail, setAnimeDetail] = useState({id: "", anime_title: "", anime_status: "", anime_episodes: "", anime_image: "", anime_description: "", anime_background: ""})
    async function fetchAnime() {
        const { data } = await supabase
            .from ('anime')
            .select ()
            setAnimeDetail(animeDetail)
            console.log("data: ", data)
    }

    return (
        <>
        <div className="spacer">
            &nbsp;
        </div>
        <div className="home-section">
                <h2>Trang chủ</h2>
                {/* <video width="100%" height="100%" controls>
                    <source src = "https://www1641.ff-04.com/token=jTbS7Sy3KLnY2it5utdoKA/1640519166/2405:4803::/22/c/fc/d3c5f06bafbdfa7c8ff5f3e76b7bafcc-720p.mp4" type = "video/mp4"/>
                </video> */}
            <Swiper slidesPerView={5}
            spaceBetween={30}
            loop={true}
            pagination={{
            "clickable": true
            }} 
            navigation={true} className="mySwiper">
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </div>
        </>
    )

}
export default Home