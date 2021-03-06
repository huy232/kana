/* eslint-disable no-undef */
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
import ReactPaginate from "react-paginate"


SwiperCore.use([Pagination,Navigation]);

function Home(){
    const [animeSwiper, setAnimeSwiper] = useState([])
    const [animeList, setAnimeList] = useState([])
    const [swiperIndex, setSwiperIndex] = useState(3)
   
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)

    useEffect(async ()=>{
        await fetchAnime()
        await fetchAnimeList()
    }, [])

    
    if (animeList.length === 0) {
    return(
        <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
    </div>
    ) 

    }

    async function fetchAnime() {
        const { data } = await supabase
            .from ('animes')
            .select ()
            .limit(20)
            setAnimeSwiper(data)
    }
    async function fetchAnimeList() {
        const { data } = await supabase
            .from ('animes')
            .select ('*', {count: 'exact'})
            .order("id", {ascending: false})
            setCount(count)
            setAnimeList(data)
    }

    const animePerPage = 27
    const numberOfRecordVisited = page*animePerPage
    const displayAnime = animeList.slice(numberOfRecordVisited, numberOfRecordVisited + animePerPage).map((element, i)=>{
        return (
            <div className = "anime-item" key = {i}>
                <Link to = {"/anime/detail/" + element.id}>
                <img className="fas fa-play" src={element.anime_image}/>
                </Link>
                <p>{element.anime_title}</p>
            </div>
        )
    })
    const totalPages = Math.ceil(animeList.length / animePerPage);
    const changePage = ({ selected }) => {
        setPage(selected);
      };

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
                {animeSwiper.map((element, i)=> 
                    (
                    <SwiperSlide key = {i}>
                        <img src={element.anime_image}/>
                    </SwiperSlide>
                    )
                    )}
            </Swiper>
            <div className="anime-info-container" style={
                {backgroundImage:`url(${animeSwiper[swiperIndex].anime_background}),
                 linear-gradient(77deg, rgba(0,0,0,.8) 25%, transparent 85%)`, 
                 backgroundColor: `transparent`,
                 height: `100%`}
                }>
                <h1 className = "anime-info-title">{animeSwiper[swiperIndex].anime_title}</h1>
            </div>
            <h2>Anime List</h2>
            <div className="anime-list">
                {displayAnime}
                <div className = "spacerPagination"/>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={totalPages}
                    onPageChange={changePage}
                    containerClassName={"navigationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"navigationDisabled"}
                    activeClassName={"navigationActive"}
                />
            </div>
        </div>
        </>
    )

}
export default Home