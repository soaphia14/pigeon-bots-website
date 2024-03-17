<script>
    import { onMount } from "svelte";
    import { prefix } from "../globalVars";
    import db from '../../firebase';
    import Carousel from "../General/Carousel.svelte";
    import {Firestore, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "@firebase/firestore";

    let pigeon_img_src = '17Vg8-uOJ3NoCJplLPk9IEeoosAcI-NMF';
    let bots_img_src = '1OsB2g9HQQzYWigGWKUDfMhdR2NBp9Qxp';
    let team_word_img_src = '15rUD4wia2S7aSCuTuJ1U_uiotORjeUvH';
    let team_num_img_src = '1RptxmhovTHb4R8PdIp-tq-SLDOuiuCp8';
    let team_num_sm_img_src = '1yusp_SgZPIBCFuMDQIcuBE-uR2z8HxXW';

    let pigeon_src = '1BndtkXiDpB-6fc0HIvoRgHvPcnZn-9Vy';

    let carousel_src = ['15JKO906eso44iEdOfQ8OanL4igkqqStb', '1Io-DTa9BKHdN4S0FUc_kyx4rfZ57-TuL', '1huSPWpP7tCeM512dD3JUxW0yDCPuG5ff', '1UAZR6Q7VB6Ep1LIYxy-6ZrymG_8hcULx']
    let sponsors_src = [
        {   link: 'https://www.caci.com/',
            src: '1WAlbbA6Txy9Wn7ka7-sWiNNGNmv7foZ2'}, 
        {   link: 'https://www.potomacoaktutoring.com/',
            src: '18ltUmc47SDlWarq19ppiMNbvTU0LhvMt'},
        {   link:'https://www.codeadvantage.org/',
            src: '19cYuQ0bQYTdpfeeMT2YwuqcyHE5O2zRg'}];

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
    onMount(async () => {
        homeData = (await getDoc(doc(db, "General/Home"))).data();
        setRange();
        done = true;
    });
    
    const copyEmail = () => {
        navigator.clipboard.writeText("pigeonbotsftc@gmail.com").then(
            (message) => {
                jQuery("#copied_alert_button").removeClass("d-none");
            }
        )
    };

    const removeAlert = () => {
        jQuery("#copied_alert_button").addClass("d-none");
        
    };
        
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
        <div class = "col-lg-6 mb-4" >
            {@html homeData.aboutDes}
            <br><br>
            Email us at 
            <a target = "_blank" href = "mailto:pigeonbotsftc@gmail.com">
                {homeData.email}
            </a>!
        </div> 
        <div id = "team_img" class = "col-lg-6 d-flex justify-content-center align-items-center px-5">
            <Carousel images_info = {carousel_src} />
        </div>
    </div>
    <hr>
    <h1 class = "text-green my-4">Current Sponsors</h1>   
    <div class = "row">
        {#each sponsors_src as sponsor_src, i}
        <div class = "col-sm d-flex justify-content-center align-items-center sponsors">
            <a href = {sponsor_src.link} target = "_blank"><img class = "w-75" src = {prefix + sponsor_src.src} alt = {'sponsor'+String(i)}></a>
        </div>
        {/each}
    </div> 


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

