<script>
    import Carousel from "./Carousel.svelte";
    
    export var image_src = [];
    export var title = "";

    var size = "7";
    if (image_src.length == 0) {
        size = "12"
    }
</script>

<div class = "row rounded" style = "border: 1.5px solid rgba(50, 50, 50, 0.35);">
    <div class = "col-lg-{size} content">
        <b><i>{title}</i></b>
        <br><br>
        <slot/>
    </div>

    {#if image_src.length != 0}
        <div class = "col-lg-5 image">
            <Carousel images_info = {image_src} />
        </div>
    {/if}
</div>

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