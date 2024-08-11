
<script>
    import { onMount } from "svelte";
    import Carousel from "../General/Carousel.svelte";
    import { doc, getDoc } from "@firebase/firestore";
    import {db, storage} from '../../firebase';
    import { getDownloadURL, listAll, ref } from "@firebase/storage";
    import AdminSection from "./AdminSection.svelte";
    
    var carouselSrc = [];
    var sponsorsSrc = [];
    var homeData;
    var done;
    
    onMount(async () => {
        // get descriptions/links
        homeData = (await getDoc(doc(db, "General/Home"))).data();
        
        // get slideshow photos
        const res = await listAll(ref(storage, "homeSlideshow"))
        var foo = await new Promise((resolve, reject) => {
            res.items.forEach(async (itemRef, index, array) => {
                const imgSrc = await getDownloadURL(ref(storage, "homeSlideshow/"+itemRef.name));
                carouselSrc.push(imgSrc);
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
        
        done = true;
        
    });
</script>

{#if done}

<h1>Home</h1>

<button class = "btn btn-success">Add Section</button>
<br><br>
<AdminSection />
<AdminSection />
<!-- 
<div class = "row">
    <div class = "col-sm-1 text-center d-flex flex-column border border-2 p-2">
        #1
        <span class = "btn btn-outline-dark fs-3 mt-5 mb-3">^</span>
        <span class = "btn btn-outline-dark fs-4 mb-5">v</span>
        <span class = "btn btn-danger">Remove</span>
    </div>
    <div class = "col-sm-6 border border-2  p-3 d-flex flex-column">
        <span class = "d-flex">
            Title:
            <input class = "ms-3" type="text" placeholder="About Us" />
            <select class="form-select ms-3" style="width: 100px;" aria-label="Default select example">
                <option selected value="teal">Teal</option>
                <option value="purple">Purple</option>
            </select>
        </span>
        <span>
            Text:
            <textarea placeholder="Welcome!" class = "w-100 mh-100" style="min-height: 200px;" value = {homeData.aboutDes}/>
        </span>
    </div>
    <div class = "col-sm-5 border-2 border p-3 d-flex flex-column">
        <span class = "btn btn-dark mb-2">Toggle View</span>
         <div>
            {#each [1, 2, 3, 4, 5, 6, 7] as thing}
            <div class = 'ms-1 border-bottom border-top border-2 w-100 row py-1'>
                <span class = "col-sm-8">
                    chippi chappa
                </span>
                <span class = "col-sm-4 d-flex">
                    <button class = "btn btn-outline-primary ms-auto">View</button>
                    <button class = "btn btn-danger ms-3">X</button>
                </span>
            </div>
            {/each}
        </div> 
        <Carousel images_info={carouselSrc} />
    </div>
</div> -->

{/if}
<style>
    
</style>