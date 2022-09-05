import { AxiosInstance } from "axios";
import { postLanguagePL } from "@/payloads/postLanguagePL";

export class languagesRoute {

    private axiosInstance: AxiosInstance;

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async postLanguage(data: postLanguagePL): Promise<boolean> {
        const resp = await this.axiosInstance.post('/lang', data);

        if(resp.status == 200) {
            return true;
        }
        else {
            return false;
        }
    }

    public async getLanguage(count: number, pageIndex: number, pageSize: number): Promise<any> {
        const resp = await this.axiosInstance.get('/lang?=count' + count + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize);
        if(resp.status == 200) {
            return resp.data;
        }
        else {
            return false;
        }
    }
    
}