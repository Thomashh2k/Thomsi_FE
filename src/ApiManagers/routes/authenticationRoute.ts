import { registerUserPL } from "@/payloads/registerUserPL";
import { loginPL } from "@/payloads/loginPL";
import { AxiosInstance, AxiosError } from "axios";
import { useUserInfoStore } from '@/store'
import { Store } from "pinia";


export class authenticationRoute {

    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public async register(data: registerUserPL): Promise<boolean | AxiosError> {
        try{
            const resp = await this.axiosInstance.post('/authentication', data);
            if(resp.status == 200) {
                this.userInfoStore.setUser(resp.data)
                return true;
            }

        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }

    public async login(data: loginPL): Promise<boolean | AxiosError> {
        try {

            const resp = await this.axiosInstance.post('/authentication/login ', data);
            if(resp.status == 200) {
                this.userInfoStore.setToken(resp.data.token);
                this.userInfoStore.setExpiration(resp.data.expiration);
                this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
                return true;
             }
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }

    public async logout(): Promise<boolean | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
            //There is no need to make an API request
            //const resp = await this.axiosInstance.delete('/authentication/logout');
            //if(resp.status == 200) {
                this.userInfoStore.setToken("");
                this.userInfoStore.setExpiration(null);
                this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + this.userInfoStore.getToken;
                return true;
            //}

        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }

    public async isValidToken(token: string): Promise<boolean | AxiosError> {
        try{
            const resp = await this.axiosInstance.post('/authentication/valid ', { token: token});
            if(resp.status == 200) {
                this.userInfoStore.setToken = resp.data.token;
                this.userInfoStore.setExpiration = resp.data.expiration
                return true;
            }
                
        }
        catch(error) {
            const err = error as AxiosError;
            return err;
        } 
    }
    
}