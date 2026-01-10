import { createContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import type { WebAthenaSession } from './types';

export const [getWebathena, setWebathena] = createContext<Writable<WebAthenaSession[] | null>>();
export const [getTicket, setTicket] = createContext<Readable<string | null>>();
export const [getEmailToken, setEmailToken] = createContext<Readable<string | null>>();
export const [getUsername, setUsername] = createContext<Readable<string | null>>();
