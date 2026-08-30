<script>
    import { db } from '../../firebase';
    import { doc, getDoc } from "@firebase/firestore";

    import { title_class_def, title_secondary_class_def } from "../globalVars";
    import { onMount, tick } from 'svelte';

    var done = false;
    var data;

    onMount(async () => {
        data = (await getDoc(doc(db, "General/Achievements"))).data();
        done = true;

        // Wait until Svelte has rendered the embed
        await tick();

        // Load Robolyst
        const script = document.createElement("script");
        script.src = "https://robolyst.org/embed.js";
        script.async = true;
        document.body.appendChild(script);
    });
</script>

<h1 class={title_class_def}>Achievements</h1>
<br>

{#if done}

    {#each data.order as yearID, i}
        <h2 class={title_secondary_class_def}>{yearID}</h2>
        <br>

        {#each data[yearID] as item, j}
            <b><i><u>{item.title}</u></i></b>
            <br>

            <ul>
                {#each item.bullets as bullet}
                    <li>{bullet}</li>
                {/each}
            </ul>

            {#if data.order.length - 1 != i && data[yearID].length - 1 == j}
                <hr>
            {:else}
                <br>
            {/if}
        {/each}
    {/each}

    <hr>

    <h2 class={title_secondary_class_def}>Team Statistics</h2>
    <br>

    <!-- PASTE YOUR ORIGINAL ROBOlYST EMBED HERE -->
    <div data-robolyst-embed="PASTE ORIGINAL URL HERE" data-height="1879">
        <a href="https://robolyst.org/team/ftc/23975">
            Robolyst — Team 23975
        </a>
    </div>

{/if}
