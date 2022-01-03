/* eslint-disable react-hooks/exhaustive-deps */
import ReactHlsPlayer from 'react-hls-player';
import { useState, useEffect } from "react"
import { supabase } from '../../supabaseClient'
import { useParams } from 'react-router-dom'
import axios from 'axios'           
//  <video width="100%" height="auto" controls>
//                     <source src = "https://video.fhph1-2.fna.fbcdn.net/v/t42.27313-2/10000000_585305236028498_4655663809418310632_n.mp4?_nc_cat=101&vs=8217fbae166b266b&_nc_vs=HBksFQAYJEdJQ1dtQUJTdkszX1ZCUUNBT2d6QldLUlBaeEFickZxQUFBRhUAAsgBABUAGCRHSUNXbUFCdGVZNjAzRDBDQUpjZjNGcVVDbU01YnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAmjtL%2B0eW2jQsVAigCQzMYC3Z0c19wcmV2aWV3HBdAlkOzMzMzMxgyZGFzaF9nZW4zYmFzaWNfcGFzc3Rocm91Z2hhbGlnbmVkX2hxMl9mcmFnXzJfdmlkZW8SABgYdmlkZW9zLnZ0cy5jYWxsYmFjay5wcm9kOBJWSURFT19WSUVXX1JFUVVFU1QbCIgVb2VtX3RhcmdldF9lbmNvZGVfdGFnBm9lcF9oZBNvZW1fcmVxdWVzdF90aW1lX21zDTE2NDA1MjE4OTkwNDEMb2VtX2NmZ19ydWxlB3VubXV0ZWQTb2VtX3JvaV9yZWFjaF9jb3VudAEwDG9lbV92aWRlb19pZBAzMTI1NzUzNDExMDM3OTU4Em9lbV92aWRlb19hc3NldF9pZBAzMTI1NzUzNDA0MzcxMjkyFW9lbV92aWRlb19yZXNvdXJjZV9pZBAzMTI1NzUzNDAxMDM3OTU5HG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQPMjQzNjU2NTcxMTY0ODkwJQIcACXEARsHiAFzAzYwMgJjZAoyMDIxLTExLTEzA3JjYgEwA2FwcBBCdXNpbmVzcyBNYW5hZ2VyAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwgxNDI1LjI2MgJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=1-5&_nc_sid=41a7d5&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=mKJjKZsRUYkAX8oi9JN&_nc_ht=video-lax3-2.xx&oh=00_AT8Cj39mXJGIClIv0w-vXGDSr4yJvpiQyxgEdYRyaFAJ3w&oe=61C9D768&_nc_rid=4d56b03ca4ce414" type = "video/mp4"/>
//             </video>


function AnimeWatch() {
    const [animeEpisode, setAnimeEpisode] = useState(0)
    let animeInfo = useParams()

    useEffect(async()=>{

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
        console.log(secondData[0].anime_url)

    })

    return (
        <>
        {/* <video width="100%" height="auto" controls >
        <source src = "https://lbs.cdnproxy.xyz/video.mp4?hash=1d7f6960095ee1d35f08d8d833f70938283520a8aa065a2aee336b7eb4cfa25e425d76713e339c6341e904101608db900869eafc4f9348aa8a5921ecd150cbd3f89f7ce50977289fd0f94599fff338f960ddee18f8fb18e671bde2394d87a4f5c5332e16f2931274cee61098abbf50bf58d5749fd2cda264f527a5993a5b1693ca3ae52f72978533f4d52d46d1de2cde23a3b7fc8a3a6ab4e67a69bcfb391627d68733ff4baa83ba318b744d85ff8fe92d411d475ebedc7f8998af3150916248879830c9e3497096e5de072f991e2e6e4215d335452b36caa33c3d2a438e59632d7be6ac75f3b5f2ee33bfb9c9477fca93d975291b8e3f6698fd21953fdf978315851a03d0aca872f8fc7effe8581081765c7718da1abc13d30e24463b849cbe7a7b8cd336e8fac81bd809d71564a4c52f42c30a079b145a9a6bb2cce502d022b1d6ff661807c719039224bdb1f9420801c2fb73972e0e25e2f369e18f5cac23db0f9a5e9b23db0e3fc891d169fdc67823013ab8c7ae8b308482344beeea8f8dc916328a9ce687ff3517362a502582e260e2f8523b98d0afea1e1790d27240c8af22aed73206b10c7496af01fc012c88d263a2524edede1b59917f583a77ccb5a331e23fa619038933b69a0f3a6218a360874fb7ca28aed451ccd41996cc882b35c0532faa2121ede243e0669f439a31cefa46e99bfd13141255ee58cd5c32cf77cef485e312605e7b6cc767cb629db9de4349426aaf332ddb722f7396e5140ac52dd226ee958e8e2d22298091c27a6962acf9759e5ba57b0fbe4eff112a01ad4f912a5086d36fb601df7333982ddbdff528a4c1b3311ae5aae7eb17ac001f818c2a4b7c5b8020b555a8da9140bcf05f3195f9398e17c7c42e117cf24d251ab82d63f555ebfd80bfbe60b267029672b239becdb5085772ad3d3695838d373313f0d528441276863c26a5afe1abb04db16d33d602f34f8c313a69c882471ae6fa0412fe8902e94726c899a579cdb6ed01234d7f5950b83281ac49e0ed0e1aaca124c30113b1a0e6a23f1fb320b0ad618e7793a75e580a4e659981e3ed2ba7f5699a062677cdb93ec52975f09b7a30cc778c5a562d6c4cd866e1aec3adb54f7f822ea5ee85&cookie=5jBn36GkUpE" type = "video/mp4"/>
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