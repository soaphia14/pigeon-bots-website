<script>
    import { writable } from "svelte/store";
    import Carousel from "../General/Carousel.svelte";

    var showCarousel = true
    var isEditing = writable(false)

</script>

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
            <input class = "ms-3" type="text" placeholder="About Us"  readonly={!$isEditing}/>
            <select class="form-select ms-3" style="width: 100px;" aria-label="Default select example"  disabled={!$isEditing}>
                <option selected value="teal">Teal</option>
                <option value="purple">Purple</option>
            </select>
        </span>
        <span>
            Text:
            <textarea placeholder="Welcome!" class = "w-100 mh-100" style="min-height: 150px;" readonly={!$isEditing}/>
        </span>
        <span>
            {#if !$isEditing} <button class = "btn btn-outline-primary" on:click={()=> {isEditing.set(true)}}>Edit</button>
            {:else} <button class = "btn btn-success" on:click={()=> {isEditing.set(false)}}>Save</button>
            {/if}
        </span>
    </div>
    <div class = "col-sm-5 border-2 border p-3 d-flex flex-column">
        <button on:click = {() => {showCarousel =!showCarousel}} class = "btn btn-dark mb-2">Toggle View</button>
        {#if !showCarousel}
            <div>
                {#each [1, 2, 3] as thing}
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
        {:else}
            <Carousel images_info={["https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1920px-Cat_August_2010-4.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1920px-Cat_August_2010-4.jpg"]} />
        {/if}
    </div>
</div>
<br><br>