<script>
    import { onMount } from "svelte";
    import {db, storage} from '../../firebase';
    import { doc, getDoc } from "@firebase/firestore";
    import { getDownloadURL, listAll, ref } from "@firebase/storage";

    import Carousel from "../General/Carousel.svelte";
    import { text_green, text_purple, title_class_def, title_secondary_class_def } from "../globalVars";

    /* Pseudo code:
       General (order)
       the ultimate list:
       thing = [
        {
            title: 2022- 2023
            items: [
                {
                    title: "bees"
                    text: [dfksdjfl, sdfkljsdf]
                    img_src: [sdfsdfsdf, sdfsfsfsf]
                }
            ]
        }
       ]
    */

    var general = [];
    var done = false;
    var bar;
    onMount(async () => {
        var outreachData = (await (getDoc(doc(db, "Outreach/General")))).data();
        
        let index = 0;
        for (const yearID of outreachData.order) {
            general.push({
                title: outreachData[yearID].name,
                items: []
            })
            for (const id of outreachData[yearID].ids) {
                var idData = (await (getDoc(doc(db, "Outreach/"+id)))).data(); // title, des, id
                var photoData = await listAll(ref(storage, "outreach/"+id))
                var images = [];

                for (const itemRef of photoData.items) {
                    const imgSrc = await getDownloadURL(ref(storage, "outreach/"+id+"/"+itemRef.name));
                    images.push(imgSrc);
                }

                general[index].items.push({
                    title: idData.title,
                    des: idData.des,
                    image_src: images
                })
                
            }
            index++;

        }
        
        done = true;
        console.log(general);
    })
    
        
</script>
<h1 class = {title_class_def}>Outreach</h1>

{#if done}
    {#each general as year}
        <br>
        <h2 class = {title_secondary_class_def}>{year.title}</h2>
        <br>
        <div class = "container-fluid">
            {#each year.items as event, i}
                <div class = "row rounded" style = "border: 1.5px solid rgba(50, 50, 50, 0.35);">
                    {#if event.image_src.length == 0}
                        <div class = "col-lg-12 content">
                            <b><i>{event.title}</i></b>
                            <br><br>
                            {@html event.des}
                        </div>
                    {:else}
                        <div class = "col-lg-7 content">
                            <b><i>{event.title}</i></b>
                            <br><br>
                            {@html event.des}
                        </div>
                        <div class = "col-lg-5 image">
                            <Carousel images_info = {event.image_src} />
                        </div>
                    {/if}
                </div>
                {#if year.length - 1 != i}
                    <br>
                {/if}
            {/each}
        </div>
    {/each}
{:else}
<div class = "container-fluid text-center">
    Loading...   
    <div class = "spinner-border spinner-border-sm"></div>
</div>
{/if}


<style>
    .row {
        padding: 0.75em;
    }
    .content {
        padding: 1em;
    }
    .container {
        width: 95%;
        min-width: 350px;
        max-width: 900px;
    }
</style>