import { postLanguagePL } from "@/payloads/postLanguagePL";
import { AxiosError, AxiosInstance } from "axios"
import { useUserInfoStore } from "@/store";
import { StoreDefinition } from "pinia";
import { lang } from "@/dbTables";

export class languagesRoute {

    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async postLanguage(data: lang): Promise<boolean | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.post('/lang', data);
            if(resp.status == 200) {
                return true;
            }
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        }
    }
    
    public async getLanguage(count: number, pageIndex: number, pageSize: number): Promise<lang[] | AxiosError> {
        try{
            const resp = await this.axiosInstance.get('/lang?=count' + count + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize);
            if(resp.status == 200) {
                return resp.data;
            }
            
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        }
    }

    public async getSingleLanguageByID(id: string): Promise<lang | AxiosError> {
        try{
            const resp = await this.axiosInstance.get('/lang/' + id);
            
            if(resp.status == 200) {
                return resp.data;
            }
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }

    public async updateLanguage(data: postLanguagePL): Promise<boolean | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.put('/lang/' + data.id, data);
            if(resp.status == 200) {
                return true;
            }
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }

    public async deleteLanguageById(id: string): Promise<boolean | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.delete('/lang/' + id);
            if(resp.status == 200) {
                return true;
            }
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }
    
}