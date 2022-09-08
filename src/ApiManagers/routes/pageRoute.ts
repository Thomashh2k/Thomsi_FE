import { AxiosInstance } from "axios";
import { postPagePL } from "@/payloads/postPagePL";
import { page } from "@/dbTables";
import { useUserInfoStore } from "@/store";
import { Store } from "pinia";

export class pageRoute {

    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async postPage(data: postPagePL): Promise<boolean> {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
        const resp = await this.axiosInstance.post('/pages', data);

        if(resp.status == 200) {
            return true;
        }
        else {
            return false;
        }
    }

    public async getPagesWithoutBody(count: number, pageIndex: number, pageSize: number): Promise<page[]> {
        const resp = await this.axiosInstance.get('/pages/nobody?=count' + count + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize);
        if(resp.status == 200) {
            return resp.data as page[];
        }
        else {
            return [];
        }
    }

    public async getSinglePageByID(id: string): Promise<page> {
        const resp = await this.axiosInstance.get('/pages/' + id);
        if(resp.status == 200) {
            return resp.data;
        }
        else {
            return undefined;
        }
    }

    public async updatePage(data: postPagePL): Promise<boolean> {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
        const resp = await this.axiosInstance.put('/pages/' + data.id, data);
        if(resp.status == 200) {
            return true;
        }
        else {
            return false;
        }
    }

    public async deletePageById(id: string): Promise<boolean> {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
        const resp = await this.axiosInstance.delete('/pages/' + id);
        if(resp.status == 200) {
            return resp.data.deleted;
        }
        else {
            return undefined;
        }
    }
    
}