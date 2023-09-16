<script>
    import { onMount } from "svelte";
    import jQuery from 'jquery';
    import { pageOn, prefix, text_green, text_purple } from "../globalVars";


    let smallestSize = 991;
    let windowWidth;
    let windowHeight;

    let collapseNavID = "collapseNav";
    const setTopbar = () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        if (windowWidth > smallestSize) {
            document.getElementById("nonCollapseNav").style.display = "flex";
            document.getElementById(collapseNavID).classList.remove("collapse");
            document.getElementById(collapseNavID).classList.add("d-none");
            document.getElementById(collapseNavID).classList.remove("show");
            
        } else {
            document.getElementById("nonCollapseNav").style.display = "none";
            document.getElementById(collapseNavID).classList.add("collapse");
            document.getElementById(collapseNavID).classList.remove("d-none");
        }
        document.getElementById(collapseNavID).style.maxHeight = String(windowHeight - document.getElementById("navbar").offsetHeight) +"px";

    };

    const setPageCollapse = (page) => {
        pageOn.update(element => page);

        jQuery('#collapseButton').trigger('click');
        setLink();
    }

    $: if (document.getElementById("home_btn") != null && $pageOn != ""){
        setLink();
    }
    const setLink = () => {
        let pages = ["Home", "Outreach", "Achievements", "Members", "Robot History", "Contact Us"];
        let ids = ["home_btn", "outreach_btn", "achievements_btn", "members_btn", "robot_history_btn", "contact_us_btn"];

        let index = pages.indexOf($pageOn);
        
        ids.forEach(id => {
            document.getElementById(id).style.color = "white";
            document.getElementById(id).classList.remove("bg-light");
            document.getElementById(id+"_col").style.textDecoration = "underline 0.15em rgba(0,0,0,0)";

        });

        let id = ids[index];
        if (id != undefined && id != null){
            if (id != "Contact Us") {
                document.getElementById(id).style.color = text_purple;
            } else {
                document.getElementById(id).style.color = text_green;
            }

            document.getElementById(id).classList.add("bg-light");
            document.getElementById(id+"_col").style.textDecoration = "underline 0.15em rgba(255,255,255,1)";
        }
        
    };

    onMount(() =>{
        setTopbar();
        setLink();

    });
    addEventListener("resize", setTopbar);

    let button;
    const handleClick = () => {
        document.getElementById(collapseNavID).style.maxHeight = String(windowHeight - document.getElementById("navbar").offsetHeight) +"px";

        let navHeight = document.getElementById('collapseNav').style.height;
        if (navHeight != '') { // nav is visible
            document.getElementById("toggle-icon").classList.remove("fa-bars");
            document.getElementById("toggle-icon").classList.add("fa-x");

        } else { // nav is not visible
            document.getElementById("toggle-icon").classList.add("fa-bars");
            document.getElementById("toggle-icon").classList.remove("fa-x");
        }

    };
</script>
<div class = "sticky-top">
    <nav class="navbar navbar-expand-lg bg-green-main" id = "navbar">
        <div class="container-fluid p-0">
        <div class="navbar-header ms-4 float-left">
            <img style = "width: 35px;" src = {prefix+"1uaN1SFx65Ws2EC3n5IpsjJ3RMvOM3-4l"} alt="Pigeon Bot Logo">
            <span class="navbar-brand text-light fs-5 ms-1">#18792</span>
        </div>
        
        <ul class="nav navbar-nav">
            {#if windowWidth <= smallestSize}
                    <button bind:this = {button} on:click = {handleClick} id = "collapseButton" class = "btn text-light py-3 px-4 fs-5" data-bs-toggle = "collapse" data-bs-target = "#collapseNav">
                        <i id = "toggle-icon" class="fa-solid fa-bars"></i>       
                    </button>
            {/if}
            <div class = "navbar-nav fs-6" id = "nonCollapseNav">
                <!-- Is this bad programming? (a <a> element without a href) yes. -->
                <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
                <li><a id = "home_btn" on:click = {() => pageOn.set("Home")}>Home</a></li>
                <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
                <li><a id = "outreach_btn" on:click = {() => pageOn.set("Outreach")} >Outreach</a></li>
                <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
                <li><a id = "achievements_btn" on:click = {() => pageOn.set("Achievements")}>Achievements</a></li>
                <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
                <li><a id = "members_btn" on:click = {() => pageOn.set("Members")}>Members</a></li>
                <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
                <li><a id = "robot_history_btn" on:click = {() => pageOn.set("Robot History")}>Robot History</a></li>
                <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
                <li><a id = "contact_us_btn" on:click = {() => pageOn.set("Contact Us")} class = "bg-purple-main">Contact Us</a></li>
            </div>  
            
            
        </ul>
        </div>
        
    </nav>
<div class = "container-fluid row">
    <!-- Collapsible navbar (when screen is too small) -->
    <div class = "navbar-nav collapse ps-4 bg-green-main-90 position-absolute w-100 m-0" style = "overflow-y:scroll;" id = "collapseNav" >
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
            <li><a id = "home_btn_col" on:click = {() => setPageCollapse("Home")}>Home</a></li>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
            <li><a id = "outreach_btn_col" on:click = {() => setPageCollapse("Outreach")}>Outreach</a></li>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
            <li><a id = "achievements_btn_col" on:click = {() => setPageCollapse("Achievements")}>Achievements</a></li>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
            <li><a id = "members_btn_col" on:click = {() => setPageCollapse("Members")}>Members</a></li>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
            <li><a id = "robot_history_btn_col" on:click = {() => setPageCollapse("Robot History")}>Robot History</a></li>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-missing-attribute -->
            <li><a id = "contact_us_btn_col" on:click = {() => setPageCollapse("Contact Us")}>Contact Us</a></li>
        </div> 
    </div>
</div>
  <style>
    #collapseNav > li >a {
        width: 100vw;
        text-decoration: underline 0.15em rgba(0,0,0,0);
        transition: text-decoration-color 200ms;
    }
    #collapseNav > li >a:hover {
        background-color: unset;
        color: white !important;
        text-decoration: underline 0.15em rgba(255,255,255,1) !important;
        cursor: pointer;
    }

    a {
        color: white;
        height: 100%;
        padding: 1.5em 1.45em 1.5em 1.45em;
        /*width: 175px;*/

        transition: 0.35s;
    }
    @media only screen and (min-width: 991px){
        a {
            width: fit-content !important;
        }
    }
    a:hover {
        background-color: white;
        color: #217F7E !important;
        cursor: pointer;
    }
    .bg-purple-main:hover {
        color: #685A8F;
    }

    li a {
        display: inline-block;
    }

    .navbar {
        padding: 0;
        width: 100%;
        float:right;
    }

    #collapseNav::-webkit-scrollbar {
        display: none;
    }
    #collapseNav {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

  </style>