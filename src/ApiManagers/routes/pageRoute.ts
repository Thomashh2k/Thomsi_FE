import { AxiosInstance } from "axios";
import { postPagePL } from "@/payloads/postPagePL";
import { page } from "@/dbTables";

export class pageRoute {

    private axiosInstance: AxiosInstance;

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async postPage(data: postPagePL): Promise<boolean> {
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