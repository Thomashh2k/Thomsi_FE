import { postLanguagePL } from "@/payloads/postLanguagePL";
import { AxiosInstance } from "axios"
import { useUserInfoStore } from "@/store";
import { StoreDefinition } from "pinia";
import { lang } from "@/dbTables";

export class languagesRoute {

    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async postLanguage(data: lang): Promise<boolean> {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
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

    public async getSingleLanguageByID(id: string): Promise<lang> {
        const resp = await this.axiosInstance.get('/lang/' + id);
        if(resp.status == 200) {
            return resp.data;
        }
        else {
            return undefined;
        }
    }

    public async updateLanguage(data: postLanguagePL): Promise<lang> {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
        const resp = await this.axiosInstance.put('/lang/' + data.id, data);
        if(resp.status == 200) {
            return resp.data;
        }
        else {
            return undefined;
        }
    }

    public async deleteLanguageById(id: string): Promise<boolean> {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
        const resp = await this.axiosInstance.delete('/lang/' + id);
        if(resp.status == 200) {
            return resp.data.deleted;
        }
        else {
            return undefined;
        }
    }
    
}