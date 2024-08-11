<script>
    import { onMount } from "svelte";
    import { prefix } from "../globalVars";
    import {db, storage} from '../../firebase';
    import Carousel from "../General/Carousel.svelte";
    import { doc, getDoc } from "@firebase/firestore";
    import { getDownloadURL, listAll, ref } from "@firebase/storage";
    import PhotoSwipeGallery from "svelte-photoswipe";
    // import    from "svelte-photoswipe";
    var images = [];
    

    let rangeArray =[];
    let setRange = () =>{
        // 16 px = 1 em
        let pigeon_width = 3;
        if (window.innerWidth <= 576){
            pigeon_width = 3;
        }
        let num = Math.round(window.innerWidth/16/pigeon_width)-2;
        rangeArray = Array(num);
    };
    addEventListener("resize", setRange);


    var homeData
    var done = false;
    
    var carouselSrc = [];
    var sponsorsSrc = [];

    onMount(async () => {
        // get descriptions/links
        homeData = (await getDoc(doc(db, "General/Home"))).data();
        
        // get slideshow photos
        const res = await listAll(ref(storage, "homeSlideshow"))
        var foo = await new Promise((resolve, reject) => {
            res.items.forEach(async (itemRef, index, array) => {
                const imgSrc = await getDownloadURL(ref(storage, "homeSlideshow/"+itemRef.name));
                carouselSrc.push(imgSrc);
                images.push({
                    src: imgSrc,
                    width: 3000,
                    height: 4000,
                    alt: "Photo", // optional
                    cropped: true, // optional, default=false; see https://photoswipe.com/v5/docs/ 
                    thumbnail: { src: imgSrc, width: 300, height: 400 }, // "https://picsum.photos/id/1/300/400"
                });
                if (carouselSrc.length == array.length){
                    resolve();
                }
            });
        })
        
        // get sponsor photos
        const res2 = await listAll(ref(storage, "sponsors"))
        var bar = await new Promise((resolve, reject) => {
            res2.items.forEach(async (itemRef, index, array) => {
                const imgSrc = await getDownloadURL(ref(storage, "sponsors/"+itemRef.name));
                let websiteLink = itemRef.name.split(".")[0];
                if (itemRef.name.split(".").length > 2) {
                    websiteLink += "."+itemRef.name.split(".")[1];
                }
                let linkList = websiteLink.split("(");
                websiteLink = linkList[1] + "." + linkList[2];

                sponsorsSrc.push({
                    src: imgSrc,
                    link: websiteLink
                });
                if (sponsorsSrc.length == array.length){
                    resolve();
                }
            });
        })
        
        setRange();
        done = true;
        
    });
    
        
</script>


<div class ="row px-4 mt-3" id = "team_name">
    <div class = "col-sm-6 d-flex justify-content-end m-0">
        <img id = "pigeon_img" src = "pigeonword.png" alt = '"Pigeon"'/>
    </div>
    <div class = "col-sm-6 m-0">
        <img id = "bot_img" src = "bots.png" alt = '"Bots"'/>
    </div>
</div>
<div class ="row pt-4 " id = "team_num">
    <div class = "col-sm-6 d-flex justify-content-end mt-sm-none">
        <img id = "team_word_img" src = "teamteam.png" alt = '"Team"'/>
    </div>
    <div class = "col-sm-6 mt-sm-none">
        <img id = "team_num_img" src = "teamnum.png" alt = '"23975 Regular"'/>
        <img id = "team_num_sm_img" src = "teamnumSM.png" alt = '"#23975 Small"'/>
    </div>
</div>


<div style = "height: 4em;"></div>
<span id = "pigeon_army" class = "position-absolute d-flex w-100 justify-content-center" style = "left:0; border-bottom: 3px solid rgba(0, 0, 0, 0.45);">
    {#each rangeArray as i}
        <img class="repeating-pigeon" src = "pigeon.png" alt = 'Pigeon'/>
    {/each}
</span>

{#if done}
<div id = "Content" class = "mt-5">
    <br><br><br>
    <h1 class = "text-green mb-4">About Us</h1>
    <div class = "row my-4">
        <div class = "col-lg-6">
            {@html homeData.aboutDes}
        </div>
        <div id = "team_img" class = "col-lg-6 flex-center px-5 mt-2" >
            <Carousel images_info = {carouselSrc} />
        </div>
    </div>
    <PhotoSwipeGallery {images} styling="grid" gridColumns={4} />

    
    <hr>

    <h1 class = "text-green my-4">Current Sponsors</h1>   
    <div class = "row container-fluid">
        {#each sponsorsSrc as sponsorSrc, i}
            <div class = "col-lg-3 my-3 px-lg-4 flex-center sponsors text-center">
                <a href = {"https://"+sponsorSrc.link} target = "_blank"><img class = "w-100" src = {sponsorSrc.src} alt = {'sponsor'+String(i)}></a>
            </div>
        {/each}
    </div> 

</div>
{:else}
<br>
<div class = "container-fluid text-center">
    Loading...   
    <div class = "spinner-border spinner-border-sm"></div>
</div>
{/if}
<style>
    /* Pigeon Bot Title */
    #pigeon_img {
        padding-right: 0em;
    }
    #bot_img, #team_num_img{
        padding-left: calc(0.5em + 1vw);
    }

    #team_name > div > img{
        width: 100%;
        aspect-ratio: 4/1;
        max-width: 350px;
        margin-top: 1.5em;
    }
    #team_num > div > img { /* Team 18792 part */
        width: 64%;
        aspect-ratio: 3.85/1;   
        max-width: 225px;
    }

    #team_num_sm_img {
        display: none;
    }
    
    /* Content */
    .sponsors {
        max-width: 33%;
    }
    
    .repeating-pigeon{
        aspect-ratio: 1/1.5;
        width: 100%;
        max-width: 2em;
        margin: 0em 0.25em 0em 0.25em;
    }
    @media only screen and (max-width: 576px){
        #team_word_img, #team_num_img {
            display: none;
        }
        #team_num_sm_img {
            display: block;
            aspect-ratio: 4/1 !important;
            width: 55% !important;
        }

        #pigeon_img, #bot_img {
            padding: 0em !important;
        }
        #pigeon_img {
            width: 80% !important;
        }
        #bot_img  {
            width: 65% !important;
        }

        .sponsors {
            max-width: 100%;
        }
        .sponsors img{
            max-width: 50%;
        }
        .repeating-pigeon {
            max-width: 2em;
        }
    }
</style>

