import { writable } from "svelte/store";


export let text_green = "#126F6E";
export let bg_green = "#217F7E";

export let text_purple = "#685A8F";

export let prefix = 'https://drive.google.com/uc?export=view&id=';
export let pageOn = writable("Home");

export let title_class_def = "title d-flex justify-content-center text-green";
export let title_secondary_class_def = "text-purple d-flex justify-content-center text-decoration-underline";

export let carousel_id = writable(0);

export let localStorageKey = "pigeonBotPageOn";