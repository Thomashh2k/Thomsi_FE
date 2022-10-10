import { languagesRoute } from '../routes/languagesRoute'
import { pageRoute } from '../routes/pageRoute'
import { authenticationRoute } from '../routes/authenticationRoute'
import { customFormRoute } from '../routes/customFormRoute'

export interface apiManager {
    hostname: string
    port: string
    lang: languagesRoute
    page: pageRoute
    customform: customFormRoute
    authentication: authenticationRoute
}
