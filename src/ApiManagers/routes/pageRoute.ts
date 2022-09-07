import { AxiosInstance } from "axios";
import { postPagePL } from "@/payloads/postPagePL";
import { page } from "@/dbTables";
import { useUserInfoStore } from "@/store";

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
    
}