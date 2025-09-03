<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import {title_class_def, title_secondary_class_def} from "../globalVars";
    import {db} from '../../firebase';
    import { doc, getDoc } from "@firebase/firestore";
    import { getDownloadURL, listAll, ref } from "@firebase/storage";

    let blank_img = "https://firebasestorage.googleapis.com/v0/b/nope-85379.appspot.com/o/members%2Fplaceholder.png?alt=media&token=13de1a21-2c83-4e53-b692-3db7a10d42ef";

    let people = [];
    let alumni = [];

    /*
    format:
    {
        name: (first name)
        role: 
        des: (description)
        image_src: (firebase link)
    }


    
    */

    let modal_info = writable({
        name: "",
        role: "",
        des: "",
        image_src: ""
    });

    
    const resetModal = () => {
        modal_info.set({
            name: "",
            role: "",
            des: "",
            image_src: ""
        });
    }

    const handleModal = (event) => {
        const div = event.relatedTarget;
        const id = "#" + div.id;
        let index = Number(id.slice(7));

        if (div.id.includes("Alumni")){
            let person = alumni[index];
            modal_info.set(person);
        } else {
            let person = people[index];
            modal_info.set(person);
        }

    };
    jQuery(document).on('shown.bs.modal', "#personModal", handleModal);
    jQuery(document).on('hide.bs.modal', "#personModal", resetModal);
    
    var memberData;
    var alumniData;
    var done = false;
    onMount(async () => {
        let memberPhotos = {};
        // var bar = await new Promise((resolve, reject) => {
        //     var count = 0;
        //     res.items.forEach(async (itemRef, index, array) => {
        //         const imgSrc = await getDownloadURL(ref(storage, "members/"+itemRef.name));
        //         let name = itemRef.name.split(".")[0];

        //         memberPhotos[name] = imgSrc;
        //         count++;
        //         if (count == array.length){
        //             resolve();
        //         }
        //     });
        // })

        memberData = (await getDoc(doc(db, "General/Members"))).data();
        let order = memberData.order;

        alumniData = (await getDoc(doc(db, "General/Alumni"))).data();
        let orderAlum = alumniData.order;

        order.forEach(ord => {
            let tempMember = memberData[ord];// to add the img src
            tempMember.image_src = 'members/active/'+tempMember.name+'.jpg';
            people.push(tempMember);
        });

        orderAlum.forEach(ord => {
            let tempMember = alumniData[ord];// to add the img src
            tempMember.image_src = 'members/alumni/'+tempMember.name+'.jpg';
            alumni.push(tempMember);
        });

        done = true;
    })
</script>

<h1 class = {title_class_def}>Meet the Team!</h1>
<br>
<h2 class = {title_secondary_class_def}>Active Members</h2>
<p class = "d-flex justify-content-center">Click on a person's profile to learn more!</p>
{#if done}
<div class = "row d-flex justify-content-center">
    {#each people as person, i}
        <div id = {"Member" + i} class = "modal-active col-sm-3 my-3 mx-4 border p-0" data-bs-toggle = "modal" data-bs-target = "#personModal">
            <div class = "d-flex image-div w-100 bg-gray">
                <img src = {person.image_src} alt = {person.name + "'s Photo"} class = "" style = "object-fit: cover; width: 100%;"/>
            </div>
            <div class = "content mt-3 px-3">
                <b><h5>{person.name}</h5></b>
                <p>{person.role}</p>
            </div>
        </div>
    {/each}
</div>
{/if}

<br><br>
<h2 class = {title_secondary_class_def}>Alumni</h2>
{#if done}
<div class = "row d-flex justify-content-center">
    {#each alumni as person, i}
        <div id = {"Alumni" + i} class = "col-sm-3 my-3 mx-4 border p-0">
            <div class = "d-flex image-div w-100 bg-gray">
                <img src = {person.image_src} alt = {person.name + "'s Photo"} class = "" style = "object-fit: cover; width: 100%;"/>
            </div>
            <div class = "content mt-3 px-3">
                <b><h5>{person.name}</h5></b>
                <p>{person.role}</p>
            </div>
        </div>
    {/each}
</div>
{/if}

<div id = "personModal" class = "modal fade" tabindex = "-1">
    <div class = "modal-lg modal-dialog modal-dialog-centered">
        <div class = "modal-content">
            <div class = "modal-header">
                <span class = "ms-3">{$modal_info.name}</span>
                <button type = "button" class = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
            </div>
            <div class = "modal-body">
                <div class = "container-fluid">
                    <div class = "row">
                        <div class = "col-lg-5 d-flex p-3 justify-content-center" style = "">
                            <img src = {($modal_info.image_src || blank_img)} alt = "Member" style = "object-fit: cover; width: 100%; max-width: 300px; min-width: 300px;" />
                        </div>
                        <div class = "col-lg-7 p-3">
                            <p><b>Name:</b> {$modal_info.name}</p>
                            <p><b>Role:</b> {$modal_info.role}</p>
                            <p>{$modal_info.des}</p>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    </div>
</div>

<style>
    .col-sm-3 {
        aspect-ratio: 1.25/1.5;
        min-width: 250px;
        max-width: 325px;
        transition: 200ms;
    }
    .modal-active:hover {
        cursor: pointer;
        box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
    }
    .image-div {
        aspect-ratio: 1.25/1.5;
    }
    @media only screen and (max-width: 576px){
        .col-sm-3 {
            max-width: 300px;
        }
    }
</style>