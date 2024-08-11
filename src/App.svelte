<script>
    import { onMount } from 'svelte';
    import Outreach from './lib/Pages/Outreach.svelte';
    import Achievements from './lib/Pages/Achievements.svelte';
    import Topbar from './lib/General/Topbar.svelte';
    import Home from './lib/Pages/Home.svelte';
    import Footer from './lib/General/Footer.svelte';
    import { localStorageKey, pageOn } from './lib/globalVars';
    import ContactUs from './lib/Pages/ContactUs.svelte';
    import RobotHistory from './lib/Pages/RobotHistory.svelte';
    import Members from './lib/Pages/Members.svelte';
    import AdminHome from './lib/Admin/AdminHome.svelte';

    // const changePadding = () => {
    //   if (window.innerWidth <= 576){
    //     document.getElementById("Content").classList.remove("px-5");
    //     document.getElementById("Content").classList.add("px-4");
    //   } else {
    //     document.getElementById("Content").classList.remove("px-4");
    //     document.getElementById("Content").classList.add("px-5");

    //   }
    // };
    // onMount(() => {
    //   changePadding();
    //   pageOn.set("");
    //   pageOn.set("Home");
    // });
    // addEventListener("resize", changePadding);

    // $: if (document.getElementById("Home") != null && $pageOn != "") {
    //   const page_ids = ["Home", "Outreach", "Achievements", "Members", "Robot History", "Contact Us"];

    //   page_ids.forEach((page_id) => {
    //     document.getElementById(page_id).style.display = "none";
    //   });
    //   if (page_ids.indexOf($pageOn) != -1){
    //     document.getElementById($pageOn).style.display = "block";
    //     window.scrollTo(0,0);
    //   } else {
    //     document.getElementById("Home").style.display = "block";
    //   }
    // }

    let scrollYPos = 0;

    jQuery(window).on("scroll", () => {
      scrollYPos = window.scrollY;
    });

</script>

<div id = "AdminHome" class = 'p-4'>
  <AdminHome />
</div>

<!-- <Topbar/>

<div class = "d-flex justify-content-center" >
  <div id = "Content" style = "padding-top: 2em;">
    <div id = "Home">
      <Home />
    </div>
    <div id = "Outreach">
      <Outreach />
    </div>
    <div id = "Achievements">
      <Achievements />
    </div>
    <div id = "Members">
      <Members />
    </div>
    <div id = "Robot History">
      <RobotHistory />
    </div>
    <div id = "Contact Us">
      <ContactUs />
    </div>

  </div>
</div> -->

{#if scrollYPos > 100}
  <button class = "btn position-fixed rounded rounded-circle" id = "top-btn" on:click = {() => {window.scrollTo(0,0)}}>
    <i class="fa-solid fa-angle-up fs-1 text-light"></i>
  </button>
{/if}
<!-- <Footer /> -->

<style>
  #top-btn {
    right: 1.5em;
    bottom: 1.5em;
    height: 4em;
    width: 4em;
    background-color: rgba(0, 0, 0, 0.35);
  }
  #top-btn:hover {
    color: black !important;
  }

  #Content {
    max-width: 85%;
  }
  @media only screen and (max-width: 800px){
    #Content {
    max-width: 95%;
  }
  }
</style>
