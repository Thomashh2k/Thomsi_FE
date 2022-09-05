import { languagesRoute } from "../routes/languagesRoute"
import { pageRoute } from "../routes/pageRoute"
import { authenticationRoute } from "../routes/authenticationRoute"

export interface apiManager {
    hostname: string
    port: string
    lang: languagesRoute
    page: pageRoute
    authentication: authenticationRoute
}