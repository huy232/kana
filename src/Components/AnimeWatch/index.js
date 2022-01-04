/* eslint-disable react-hooks/exhaustive-deps */
import ReactHlsPlayer from 'react-hls-player';
import { useState, useEffect } from "react"
import { supabase } from '../../supabaseClient'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import cheerio from 'cheerio'           
//  <video width="100%" height="auto" controls>
//                     <source src = "https://video.fhph1-2.fna.fbcdn.net/v/t42.27313-2/10000000_585305236028498_4655663809418310632_n.mp4?_nc_cat=101&vs=8217fbae166b266b&_nc_vs=HBksFQAYJEdJQ1dtQUJTdkszX1ZCUUNBT2d6QldLUlBaeEFickZxQUFBRhUAAsgBABUAGCRHSUNXbUFCdGVZNjAzRDBDQUpjZjNGcVVDbU01YnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAmjtL%2B0eW2jQsVAigCQzMYC3Z0c19wcmV2aWV3HBdAlkOzMzMzMxgyZGFzaF9nZW4zYmFzaWNfcGFzc3Rocm91Z2hhbGlnbmVkX2hxMl9mcmFnXzJfdmlkZW8SABgYdmlkZW9zLnZ0cy5jYWxsYmFjay5wcm9kOBJWSURFT19WSUVXX1JFUVVFU1QbCIgVb2VtX3RhcmdldF9lbmNvZGVfdGFnBm9lcF9oZBNvZW1fcmVxdWVzdF90aW1lX21zDTE2NDA1MjE4OTkwNDEMb2VtX2NmZ19ydWxlB3VubXV0ZWQTb2VtX3JvaV9yZWFjaF9jb3VudAEwDG9lbV92aWRlb19pZBAzMTI1NzUzNDExMDM3OTU4Em9lbV92aWRlb19hc3NldF9pZBAzMTI1NzUzNDA0MzcxMjkyFW9lbV92aWRlb19yZXNvdXJjZV9pZBAzMTI1NzUzNDAxMDM3OTU5HG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQPMjQzNjU2NTcxMTY0ODkwJQIcACXEARsHiAFzAzYwMgJjZAoyMDIxLTExLTEzA3JjYgEwA2FwcBBCdXNpbmVzcyBNYW5hZ2VyAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwgxNDI1LjI2MgJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=1-5&_nc_sid=41a7d5&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=mKJjKZsRUYkAX8oi9JN&_nc_ht=video-lax3-2.xx&oh=00_AT8Cj39mXJGIClIv0w-vXGDSr4yJvpiQyxgEdYRyaFAJ3w&oe=61C9D768&_nc_rid=4d56b03ca4ce414" type = "video/mp4"/>
//             </video>


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
        setAnimeWatch(finalData[0].anime_video)
    })

    return (
        <>
        {animeWatch === ''? <div>Loading movie</div> :
        <video width="100%" height="auto" controls >
        <source src = {animeWatch} type = "video/mp4"/>
        </video>}

        {/* <video width="100%" height="auto" controls >
        <source src = {animeWatch} type = "video/mp4"/>
        </video> */}
        {/* <iframe width="1280" height="720" src="https://web.microsoftstream.com/embed/video/cf48b47c-a599-4ccc-a555-25f12a395070?autoplay=false&showinfo=true" allowFullScreen style={{border:"none"}}></iframe> */}
        {/* <ReactHlsPlayer
        src = "https://hlss.xyz/cdn/hls/e1018667d636206729870076ba01c5ea/master.m3u8"
        autoPlay = {false}
        controls = {true}
        width = "100%"
        height = "100%"
        /> */}
        
        </>


    )

}



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

export default AnimeWatch