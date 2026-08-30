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

<div data-robolyst-embed="https://robolyst.org/embed?c=eyJ2IjoxLCJzdWJqZWN0Ijp7ImtpbmQiOiJ0ZWFtIiwiaWQiOiIyMzk3NSIsInNlYXNvbiI6bnVsbH0sImJsb2NrcyI6W3sidCI6InRlYW0tY2FyZCIsInMiOnsic2hvd0xvY2F0aW9uIjp0cnVlLCJzaG93Um9va2llIjp0cnVlLCJzaG93UmVjb3JkIjp0cnVlLCJzaG93RXZlbnRzIjp0cnVlLCJzaG93QXdhcmRzIjp0cnVlfX0seyJ0IjoidGVhbS11cGNvbWluZyIsInMiOnsiY291bnQiOjMsInNob3dDb3VudGRvd24iOnRydWV9fSx7InQiOiJ0ZWFtLWV2ZW50cyIsInMiOnsiY291bnQiOjMsInNob3dSZWNvcmQiOnRydWUsInNob3dSYW5rIjp0cnVlLCJzaG93QXdhcmRzIjp0cnVlLCJzaG93RGF0ZXMiOnRydWV9fSx7InQiOiJ0ZWFtLW1ldHJpY3MiLCJzIjp7Im1ldHJpY3MiOlsib3ByIiwib3ByYyIsInN0cmVuZ3RoIl0sImJhc2lzIjoiYmVzdCIsImxheW91dCI6ImdyaWQifX0seyJ0IjoidGVhbS1hd2FyZHMiLCJzIjp7ImxpbWl0Ijo2MCwiZ3JvdXBCeVNlYXNvbiI6dHJ1ZSwic3R5bGUiOiJ3YWxsIn19XSwibGF5b3V0Ijp7InciOjAsImgiOjE4NzksImNvbHMiOjEsImdhcCI6MTIsInBhZCI6MTYsInJhZGl1cyI6MTQsImRlbnNpdHkiOiJjb21mb3J0YWJsZSIsImRpciI6ImNvbHVtbiJ9LCJ0aGVtZSI6eyJwcmVzZXQiOiJkYXJrIiwiYmciOiIwMjA0MTAiLCJzdXJmYWNlIjoiMTYxNjE2IiwiYm9yZGVyIjoiMjcyNjI1IiwidGV4dCI6ImZkZmRmZCIsIm11dGVkIjoiODg4ODg4IiwiYWNjZW50IjoiOGM1MmZmIiwicG9zIjoiNGFkZTgwIiwibmVnIjoiZjg3MTcxIiwiYmdBbHBoYSI6MSwiYnJhbmRCZyI6IiIsImJyYW5kQmdBbHBoYSI6MSwiYnJhbmRUZXh0IjoiIiwiZm9udCI6InNvcmEiLCJnb29nbGVGb250IjoiIiwic2hvd0JvcmRlciI6dHJ1ZSwic2hhZG93IjpmYWxzZSwiZ2xhc3MiOmZhbHNlLCJtb3Rpb24iOnRydWV9LCJtb2RlIjoibm9ybWFsIiwicmVmcmVzaCI6MCwidGl0bGUiOiIifQ" data-height="1879">
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

<!-- 
<h2 class = {title_secondary_class_def}>2022 - 2023</h2>
<br>
<b><i><u>Union Bridge Qualifier - 3rd Qualifier (Jan. 28)</u></i></b>
<br>
<ul>
    <li>Finalist Alliance Captain</li>
    <li>Design Award 2nd Place</li>
    <li>OPR of 96.8</li>
</ul>

<br>
<b><i><u>McHenry Qualifier - 2nd Qualifier (Jan. 21)</u></i></b>
<br>
<ul>
    <li>Winning Alliance Captain</li>
    <li>Design Award 1st Place</li>
    <li>Motivate Award 2nd Place</li>
    <li>OPR of 106.6</li>
</ul>

<br>
<b><i><u>Mechanicsville Qualifier - 1st Qualifier (Dec. 3)</u></i></b>
<br>
<ul>
    <li>Winning Alliance Captain</li>
    <li>Design Award 1st Place</li>
    <li>OPR of 115.8</li>
</ul>
<br>
<hr>
<br>
<h2 class = {title_secondary_class_def}>2021 - 2022</h2>
<br>
<b><i><u>Alexandria Qualifier 4 – 3rd Qualifier (Jan. 22)</u></i></b>
<br>
<ul>
    <li>Ranked 1st Place</li>
    <li>818 Ranking Points</li>
    <li>215 High Score</li>
    <li>4 – 1 – 0 Record</li>
</ul>

<br>
<b><i><u>Alexandria Qualifier 1 – 2nd Qualifier (Jan. 15)</u></i></b>
<br>
<ul>
    <li>Ranked 12th Place</li>
    <li>526 Ranking Points</li>
    <li>189 High Score</li>
    <li>3 – 2 – 0 Record</li>
    
</ul>

<br>
<b><i><u>Columbia Qualifier 2 – 1st Qualifier (Dec. 4)</u></i></b>
<br>
<ul>
    <li>Ranked 4th Place</li>
    <li>366 Ranking Points</li>
    <li>101 High Score</li>
    <li>5 – 0 – 0 Record</li>
</ul> -->

