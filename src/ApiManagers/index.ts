import { App, Plugin } from 'vue';
import  axios  from 'axios';
import { apiManagerOptions } from './types/apiOptions';
import { apiManager } from './types/apiManager';
import { languagesRoute } from './routes/languagesRoute';
import { pageRoute } from './routes/pageRoute';
import { authenticationRoute } from './routes/authenticationRoute';

const createApiManager = (apiOptions: apiManagerOptions): apiManager => {

    const axiosInstance = axios.create({
        baseURL: apiOptions.hostname + ':' + apiOptions.port + '/api/be',
        timeout: 10000,
    })

    return {
        hostname: apiOptions.hostname,
        port: apiOptions.port,
        lang: new languagesRoute(axiosInstance),
        page: new pageRoute(axiosInstance),
        authentication: new authenticationRoute(axiosInstance)
    }
}

// The Install function used by Vue to register the plugin
export const ApiManagerPlugin: Plugin = {
    install(app: App, options: apiManagerOptions) {
        // makes ColoredText available in your Vue.js app as either "$this.coloredText" (in your Source) or "{{ $coloredText }}" in your templates
        app.config.globalProperties.$apiManager = createApiManager(options)
        
        // register Headline as a global component, so you can use it wherever you want in your app
        //app.component('Headline', Headline)
    }
}

export default ApiManagerPlugin.install;