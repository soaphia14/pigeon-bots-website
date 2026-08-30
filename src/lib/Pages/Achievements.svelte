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

        // Wait for Svelte to render the Robolyst embed
        await tick();

        // Load the Robolyst embed script
        const script = document.createElement("script");
        script.src = "https://robolyst.org/embed.js";
        script.async = true;
        document.body.appendChild(script);
    });
</script>

<h1 class={title_class_def}>Achievements</h1>
<br>

{#if done}

    <!-- ==================== TEAM STATISTICS ==================== -->

    <h2 class={title_secondary_class_def}>Team Statistics</h2>
    <br>

    <div
        data-robolyst-embed="https://robolyst.org/embed?c=eyJ2IjoxLCJzdWJqZWN0Ijp7ImtpbmQiOiJ0ZWFtIiwiaWQiOiIyMzk3NSIsInNlYXNvbiI6bnVsbH0sImJsb2NrcyI6W3sidCI6InRlYW0tY2FyZCIsInMiOnsic2hvd0xvY2F0aW9uIjp0cnVlLCJzaG93Um9va2llIjp0cnVlLCJzaG93UmVjb3JkIjp0cnVlLCJzaG93RXZlbnRzIjp0cnVlLCJzaG93QXdhcmRzIjp0cnVlfX0seyJ0IjoidGVhbS11cGNvbWluZyIsInMiOnsiY291bnQiOjMsInNob3dDb3VudGRvd24iOnRydWV9fSx7InQiOiJ0ZWFtLWV2ZW50cyIsInMiOnsiY291bnQiOjIwLCJzaG93UmVjb3JkIjp0cnVlLCJzaG93UmFuayI6dHJ1ZSwic2hvd0F3YXJkcyI6dHJ1ZSwic2hvd0RhdGVzIjp0cnVlfX0seyJ0IjoidGVhbS1tZXRyaWNzIiwicyI6eyJtZXRyaWNzIjpbIm9wciIsIm9wcmMiLCJzdHJlbmd0aCJdLCJiYXNpcyI6ImJlc3QiLCJsYXlvdXQiOiJncmlkIn19LHsidCI6InRlYW0tYXdhcmRzIiwicyI6eyJsaW1pdCI6NjAsImdyb3VwQnlTZWFzb24iOnRydWUsInN0eWxlIjoid2FsbCJ9fV0sImxheW91dCI6eyJ3IjowLCJoIjoyMTA4LCJjb2xzIjoxLCJnYXAiOjEyLCJwYWQiOjE2LCJyYWRpdXMiOjE0LCJkZW5zaXR5IjoiY29tZm9ydGFibGUiLCJkaXIiOiJjb2x1bW4ifSwidGhlbWUiOnsicHJlc2V0IjoiZGFyayIsImJnIjoiMDIwNDEwIiwic3VyZmFjZSI6IjE2MTYxNiIsImJvcmRlciI6IjI3MjYyNSIsInRleHQiOiJmZGZkZmQiLCJtdXRlZCI6Ijg4ODg4OCIsImFjY2VudCI6IjhjNTJmZiIsInBvcyI6IjRhZGU4MCIsIm5lZyI6ImY4NzE3MSIsImJnQWxwaGEiOjEsImJyYW5kQmciOiIiLCJicmFuZEJnQWxwaGEiOjEsImJyYW5kVGV4dCI6IiIsImZvbnQiOiJzb3JhIiwiZ29vZ2xlRm9udCI6IiIsInNob3dCb3JkZXIiOnRydWUsInNoYWRvdyI6ZmFsc2UsImdsYXNzIjpmYWxzZSwibW90aW9uIjp0cnVlfSwibW9kZSI6Im5vcm1hbCIsInJlZnJlc2giOjAsInRpdGxlIjoiIn0"
        data-height="1879"
    >
        <a href="https://robolyst.org/team/ftc/23975">
            Robolyst — Team 23975
        </a>
    </div>

    <br>
    <hr>
    <br>

    <!-- ==================== YEAR ACHIEVEMENTS ==================== -->

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

{/if}
