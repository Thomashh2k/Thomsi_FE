import { registerUserPL } from "@/payloads/registerUserPL";
import { loginPL } from "@/payloads/loginPL";
import { AxiosInstance } from "axios";
import { useUserInfoStore } from '@/store'


export class authenticationRoute {

    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async register(data: registerUserPL): Promise<boolean> {
        const resp = await this.axiosInstance.post('/authentication', data);

        if(resp.status == 200) {
            this.userInfoStore.setUser(resp.data)

            return true;
        }
        else {
            return false;
        }
    }

    public async login(data: loginPL): Promise<boolean> {
        const resp = await this.axiosInstance.post('/authentication/login ', data);

        if(resp.status == 200) {
           this.userInfoStore.setToken(resp.data.token);
           this.userInfoStore.setExpiration(resp.data.expiration);
           return true;
        }
        else {
            return false;
        }
    }

    public async isValidToken(token: string): Promise<any> {
        const resp = await this.axiosInstance.post('/authentication/valid ', { token: token});
        if(resp.status == 200) {
           this.userInfoStore.setToken = resp.data.token;
           this.userInfoStore.setExpiration = resp.data.expiration
           return true;
        }
        else {
            return false;
        }
    }
    
}