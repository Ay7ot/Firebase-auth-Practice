import { countriesType } from "../types/types";
import { nanoid } from "nanoid";

export const countries: countriesType[] = [
    {
        name: 'Nigeria',
        flag: 'Nigeria.png',
        id: nanoid(),
        number: '+234'
    },
    {
        name: 'Ghana',
        flag: 'Ghana.png',
        id: nanoid(),
        number: '+233'
    },
    {
        name: 'Tanzania',
        flag: 'Tanzania.png',
        id: nanoid(),
        number: '+255'
    },
    {
        name: 'Uganda',
        flag: 'Uganda.png',
        id: nanoid(),
        number: '+256'
    },
    {
        name: 'Zambia',
        flag: 'Zambia.png',
        id: nanoid(),
        number: '+260'
    }
]