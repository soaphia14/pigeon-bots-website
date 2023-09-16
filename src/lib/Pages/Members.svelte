<script>
    import { writable } from "svelte/store";
    import { prefix, title_class_def } from "../globalVars";
    let blank_img = "1g94wTr1GUc74FOoySBXBHut015Dq9aYs";
    let people = [
        {
            name: "Eddie",
            role: "Captain",
            des: "Hello, my name is Eddie, and I’m in 9th grade at Mclean High School. This is my 3rd year in FTC and my 5th year in FIRST. I help CAD and programming. I enjoy playing video games and reading.",
            image_src: "15V8R92Wi4x3koGJ4BTcEqKgc2FiMWgJP"
        },
        {
            name: "Alex",
            role: "CAD/Build",
            des: "Hello, my name is Alex and I’m a freshman at Winston Churchill Highschool in Rockville Maryland. I’ve been doing FTC for 3 years now and I mainly do CAD and building. I enjoy reading and playing video games.",
            image_src: "15d6MUJJ-bu_YVRJWkGXeLSzWCGmCShOx"
        },
        {
            name: "Isabelle",
            role: "Programming",
            des: "Hi, my name is Isabelle and I’m in 8th grade at Cabin John Middle School. This is my 4th year in FTC and my 5th year in FIRST. I am the head programmer, part-time CADder, and help with building.",
            image_src: "15VyEyAmA7Jtt74S9ByZ9owjUz64fRIT_"
        },
        {
            name: "Jesse",
            role: "Outreach/Programming",
            des: "Hi, I’m Jesse, an 8th grader at Takoma Park Middle School. This is my 2nd year participating in FTC. I mainly do outreach on the team. I also enjoy playing video games and basketball in my free time.",
            image_src: blank_img
        },
        {
            name: "Sophia",
            role: "Programming",
            des: "Hi, I’m Sophia! I’m 15 years old and I attend Poolesville High School. I’ve been in FTC as a programmer for three years, and I like to ice skate in my free time.",
            image_src: "14wnT1_Qa0XW82Ik1PNmBHqs4dGLefUC6"
        },
        {
            name: "Ben",
            role: "",
            des: "",
            image_src: "15Jt3h80GCauh7j0q18F8YWHoPjN2NQJi"
        },
        { // THEY ARE THE RIGHT NAMES!!
            name: "Aliana",
            role: "",
            des: "",
            image_src: "1597Alp46H-563Pl-aDbdKR00bQciIqWg"   
        },
        {
            name: "Alicia",
            role: "",
            des: "",
            image_src: "15131FQ735TUj_EZFxElPQ1b2qFg96KXK",  
        },
        {
            name: "Kaixin",
            role: "",
            des: "",
            image_src: blank_img
        }
    ]
    // need: aliana, alicia, ben, kaixin, ben

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
        let person = people[index];
        modal_info.set(person);

    };
    jQuery(document).on('shown.bs.modal', "#personModal", handleModal);
    jQuery(document).on('hide.bs.modal', "#personModal", resetModal);
    
    
</script>

<h1 class = {title_class_def}>Members</h1>
<p class = "d-flex justify-content-center">Click on a person's profile to learn more!</p>
<br>
<div class = "row d-flex justify-content-center">
    {#each people as person, i}
        <div id = {"Member" + i} class = "col-sm-3 my-3 mx-4 border p-0" data-bs-toggle = "modal" data-bs-target = "#personModal">
            <div class = "d-flex image-div w-100 bg-gray">
                <img src = {prefix + person.image_src} alt = {person.name + "'s Photo"} class = "" style = "object-fit: cover; width: 100%;"/>
            </div>
            <div class = "content mt-3 px-3">
                <b><h5>{person.name}</h5></b>
                <p>{person.role}</p>
            </div>
        </div>
    {/each}
</div>

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
                            <img src = {prefix + ($modal_info.image_src || blank_img)} alt = "Member" style = "object-fit: cover; width: 100%; max-width: 300px; min-width: 300px;" />
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
    .col-sm-3:hover {
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