<script>
    import { onMount } from "svelte";
    import {db, storage} from '../../firebase';
    import { doc, getDoc } from "@firebase/firestore";
    import { getDownloadURL, listAll, ref } from "@firebase/storage";

    import Carousel from "../General/Carousel.svelte";
    import { text_green, text_purple, title_class_def, title_secondary_class_def } from "../globalVars";

    // let year_2022_2023 = [
    //     {title: "Hosting the First Lego League Festival",
    //     text: ["In early January, our team was given the unique opportunity to host the official FIRST Lego League Explore Festival, along with the Rockville Science Center. Throughout the event, we were able to inform many students and parents about FTC and explained how our robot worked."],
    //     image_src: ["15uH4iBuH3VNkQfU9nPINjxxJTZZ18OX6", "1_uXbiloBMzM087D99ZLAP4EF_RjZcBh0", "1My8yJbd9kPQhQpch-15oC0xdkzxE0Wqo", "1_t-89q1UwLDVrTenfvgZehqb51khOfAQ"]
    //     },
    //     {title: "Scrimmages",
    //     text: ["Our team participated in many scrimmages with other teams throughout the season. We had a lot of fun interacting with other teams and learned a lot from their robots.",
    //             "In addition, we were also able to host our own scrimmage, inviting teams such as Orca Robotics and Thunderstone."],
    //     image_src: ["1iW7B2yNIZ5ovzB9E2LmWzJk2L9-gP7rJ", "1fPUA2qCDZj8EZVUwmrWs0BIur61rj66T"]
    //     },
    //     {title: "Preseason",
    //     text: ["After our 2021-2022 season ended for us, we moved our focus to outreach and making an impact in our community.",
    //             "During the summer of 2022, we reached out to the community and taught at a robotics summer camp which lasted many weeks. Our goal was to promote STEM and robotics within our local community and inspire people who didn’t have any experience in STEM.",
    //             "Our team also was able to introduce FIRST, but particularly FTC, to students at Veritas Collegiate Academy. While there, we guided them through building and programming basic FTC robots."],
    //     image_src: ["14HE9dKCnc3G05y_W6olvFIu1drbcEalL", "1TIeyxh173Oxkl8hR3jdqgGq7MmuFLucy", "1e7cCamfsarkui8cEhRjaDQ3-ZHim6yAt"]}
    // ];
    // let year_2021_2022 = [
    //     {title: "Meeting with Other Teams",
    //     text: ["At the start of the season, we were able to reach out to team 12518, Almond Robotics, in which we discussed design ideas and other helpful tips. Our team also participated with them in several scrimmages over the season.",
    //             "We also met with Robo Troopers after qualifying for states online, in which they gave many different pieces of advice on our robot."],
    //     image_src: ["1UShiIivnOWus6s1SnqGdlPlzLGtlJzbP"]
    //     },
    //     {title: "Mentoring FLL",
    //     text: ["Over the season, our team was able to mentor three FLL teams, Quaker Tech, Phoenix, and Dragons. We helped to guide them through the programming, building, and core values over the season."],
    //     image_src: ["1WWiv4TgiQGstR6sUbhRRHiVvyq0c9LSo", "1ZhK4ynli5IdoXA6cXCVA567ch0Ro6o2z"]
    //     },
    //     {title: "Recruiting New Members",
    //     text: ["In addition to that, we were also able to recruit many more students from the area and helped introduce them to the basic STEM, programming, and structure of our team, and FTC."],
    //     image_src: ["1BW400ZjBi_gLXzqoVGUezVXw09YRzx8i", "1G4_yULhK7JEjhF07FEbi-JIJ1adeKQRA", "1fnuH1v01uwQ-GhR6yIa8rtWKSA6phqTA", "1wuZjpZS-6lqrI2LqJMs83GrxDtsIC6Z-", "10_eXbYCsUNgq-u-CNULEZ8zGAnHqY218"]},
    //     {title: "Post Season",
    //     text: ["After the season ended, we were able to participate in a science fair hosted by the Rockville Science Center. We were able to introduce FTC and STEM to the community.",
    //             "We were also able to meet with NASA Scientist Dr. Dominguez, who specialized in optics. She was able to help us with the lighting issues we experienced at the state competition."],
    //     image_src: ["1VHaqUALCvkQwOM-6_G9s6b-jaFcnB0DG", "1Q__IFJLZc64luCEfVsHf6Ao2V_OhfQTK"]}
    // ];

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
<br>

{#if done}
    {#each general as year}
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