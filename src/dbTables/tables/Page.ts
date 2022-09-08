import { lang } from "./Lang";

export interface page {
    id: string,
    title: string,
    route: string
    body: string,
    lang: lang
}