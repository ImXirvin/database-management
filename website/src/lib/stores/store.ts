import { writable } from "svelte/store";
import type { Writable } from "svelte/store";


export const CURRENT_TAB = writable<number>(-1);