<script>
    import { onMount } from "svelte";
    import { carousel_id } from "../globalVars";

    export let images_info = [];
    // console.log("here", images_info, images_info.length)
    let spec_carousel_id;
    onMount(() => {
        carousel_id.update((state)=> (state+1)%20);
        spec_carousel_id = "carousel_"+$carousel_id;
    })

</script>
{#if images_info.length <= 1 }
<div class = "d-flex justify-content-center align-items-center h-100" style = "vertical-align">
    <img src = {images_info[0]} alt = "Slide Img 0" class = "d-block m-3" style = "width: 90%;"/>
</div>
{:else}
<div class = "d-flex justify-content-center align-items-center h-100" >
    <div id = {spec_carousel_id} class = "carousel slide bg-gray" style = "width: 100%;"> <!-- Auto slide: data-bs-ride = "carousel"  -->
        <!-- Indicators -->
        <div class = "carousel-indicators" >
            {#each images_info as x, i}
                {#if i==0}
                     <button data-bs-target = {"#"+spec_carousel_id} data-bs-slide-to = {String(i)} class = "active bg-dark-transparent"></button>
                {:else}
                    <button data-bs-target = {"#"+spec_carousel_id} data-bs-slide-to = {String(i)} class = "bg-dark-transparent"></button>
                {/if}
            {/each}
        </div> 
    
        <!-- Content -->
        <div class = "carousel-inner d-flex align-items-center"> <!-- max-height: 300px; max-idth: 500px; -->
            {#each images_info as image_info, i}
                {#if i == 0}
                <div class = "carousel-item active" style = "vertical-align: middle; w-100">
                    <!-- <iframe src="https://drive.google.com/file/d/1UAZR6Q7VB6Ep1LIYxy-6ZrymG_8hcULx/preview"  class = "d-block w-100" style = "marigin-left: auto; margin-right: auto;" allow="autoplay"></iframe> -->
                    <img src = {image_info} alt = {"Slide Img "+i} class = "d-block w-100" style = "marigin-left: auto; margin-right: auto;"/>
                </div>
                {:else}
                <div class = "carousel-item" style = "vertical-align: middle; w-100">
                    <!-- <iframe src="https://drive.google.com/file/d/{image_info}/preview"  class = "d-block w-100" style = "marigin-left: auto; margin-right: auto; border: 0;" allow="autoplay"></iframe> -->
                    <img src = {image_info} alt = {"Slide Img "+i} class = "d-block w-100" style = "marigin-left: auto; margin-right: auto;"/>

                    <!-- <img src = {prefix + image_info} alt = {"Slide Img "+i} class = "d-block w-100" style = "marigin-left: auto; margin-right: auto;"/> -->
                </div>
                {/if}
            {/each}
        </div>
    
        <!-- Buttons -->
        <button class = "carousel-control carousel-control-prev" data-bs-target={"#"+spec_carousel_id} data-bs-slide="prev">
            <span class = "carousel-control-prev-icon"></span>
        </button>
        <button class = "carousel-control carousel-control-next" data-bs-target={"#"+spec_carousel_id} data-bs-slide="next">
            <span class = "carousel-control-next-icon"></span>
        </button>
    </div>
</div>
{/if}
<style>
    .active {
        background-color: rgba(255, 255, 255, 0.75);
    }
    .bg-dark-transparent {
        background-color: rgba(255, 255, 255, 0.85);
    }
    .carousel-control {
        transition: 0.25s;
    }
    .carousel-control:hover {
        background-color: rgba(0, 0, 0, 0.25);

    }

    .carousel, .carousel-item {
        transition-duration: 350ms;
    }
</style>