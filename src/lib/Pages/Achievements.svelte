<script>
    import {db} from '../../firebase';
    import { doc, getDoc } from "@firebase/firestore";
    import { getDownloadURL, listAll, ref } from "@firebase/storage";

    import { title_class_def, title_secondary_class_def } from "../globalVars";
    import { onMount } from 'svelte';

    var done = false;
    var data;
    onMount(async () => {
        data = (await (getDoc(doc(db, "General/Achievements")))).data();
        done = true;
    });
</script>

<h1 class = {title_class_def}>Achievements</h1>
<br>

<!-- Robolyst Team Embed -->
<div data-robolyst-embed="https://robolyst.org/embed?c=eyJ2IjoxLCJzdWJqZWN0Ijp7ImtpbmQiOiJ0ZWFtIiwiaWQiOiIyMzk3NSIsInNlYXNvbiI6bnVsbH0sImJsb2NrcyI6W3sidCI6InRlYW0tY2FyZCIsInMiOnsic2hvd0xvY2F0aW9uIjp0cnVlLCJzaG93Um9va2llIjp0cnVlLCJzaG93UmVjb3JkIjp0cnVlLCJzaG93RXZlbnRzIjp0cnVlLCJzaG93QXdhcmRzIjp0cnVlfX0seyJ0IjoidGVhbS11cGNvbWluZyIsInMiOnsiY291bnQiOjMsInNob3dDb3VudGRvd24iOnRydWV9fSx7InQiOiJ0ZWFtLWV2ZW50cyIsInMiOnsiY291bnQiOjMsInNob3dSZWNvcmQiOnRydWUsInNob3dSYW5rIjp0cnVlLCJzaG93QXdhcmRzIjp0cnVlLCJzaG93RGF0ZXMiOnRydWV9fSx7InQiOiJ0ZWFtLW1ldHJpY3MiLCJzIjp7Im1ldHJpY3MiOlsib3ByIiwib3ByYyIsInN0cmVuZ3RoIl0sImJhc2lzIjoiYmVzdCIsImxheW91dCI6ImdyaWQifX0seyJ0IjoidGVhbS1hd2FyZHMiLCJzIjp7ImxpbWl0Ijo2MCwiZ3JvdXBi yU2Vhc29uIjp0cnVlLCJzdHlsZSI6IndhbGwifX1dLCJsYXlvdXQiOnsidyI6MCwiaCI6MTg3OSwiY29scyI6MSwiZ2FwIjoxMiwicGFkIjoxNiwicmFkaXVzIjoxNCwiZGVuc2l0eSI6ImNvbWZvcnRhYmxlIiwiZGlyIjoiY29sdW1uIn0sInRoZW1lIjp7InByZXNldCI6ImRhcmsiLCJiZyI6IjAyMDQxMCIsInN1cmZhY2UiOiIxNjE2MTYiLCJib3JkZXIiOiIyNzI2MjUiLCJ0ZXh0IjoiZmR mZGYiLCJtdXRlZCI6Ijg4ODg4OCIsImFjY2VudCI6IjhjNTJmZiIsInBvcyI6IjRhZGU4MCIsIm5lZyI6ImY4NzE3MSIsImJnQWxwaGEiOjEsImJyYW5kQmciOiIiLCJicmFuZEJnQWxwaGEiOjEsImJyYW5kVGV4dCI6IiIsImZvbnQiOiJzb3JhIiwiZ29vZ2xlRm9udCI6IiIsInNob3dCb3JkZXIiOnRydWUsInNoYWRvdyI6ZmFsc2UsImdsYXNzIjpmYWxzZSwibW90aW9uIjp0cnVlfSwibW9kZSI6Im5vcm1hbCIsInJlZnJlc2giOjAsInRpdGxlIjoiIn0" data-height="1879">
    <a href="https://robolyst.org/team/ftc/23975">Robolyst — Team 23975</a>
</div>

<script src="https://robolyst.org/embed.js" async></script>

<br>

{#if done}
    {#each data.order as yearID, i}
        <h2 class = {title_secondary_class_def}>{yearID}</h2>
        <br>

        {#each data[yearID] as item, j}
            <b><i><u>{item.title}</u></i></b>
            <br>
            <ul>
                {#each item.bullets as bullet}
                    <li>{bullet}</li>
                {/each}
            </ul>

            {#if data.order.length -1 != i && data[yearID].length -1 == j}
                <hr>
            {:else}
                <br>
            {/if}
        {/each}
    {/each}
{/if}
