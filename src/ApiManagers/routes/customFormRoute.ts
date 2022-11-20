import { AxiosError, AxiosInstance } from 'axios'
import { useUserInfoStore } from '@/store'
import { Pinia } from "pinia"
import { customFormPL, inputPL } from '@/payloads/customFormPL';
import { customForm } from '@/dbTables';

export class customFormRoute {
    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor (axios: AxiosInstance, pinia: Pinia = null) {
      this.axiosInstance = axios
      if(pinia != null) {
        this.userInfoStore = useUserInfoStore(pinia)
      }
    }

    public async postCustomForm(data: customFormPL): Promise<boolean | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.post("/customforms", data);
            if(resp.status == 200) {
                return true
            }
        } catch(error){
            const err = error as AxiosError
            return err
        }
    }

    public async getCustomForms(): Promise<customForm[] | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.get('/customforms');
            if(resp.status == 200){
                return resp.data
            }
        } catch(error){
            const err = error as AxiosError
            return err
        }
    }
    
    public async getCustomFormData(id: string): Promise<any[] | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.get('/customforms/' + id + '/data');
            for(let i = 0; i < resp.data.length; i++) {
                resp.data[i] = JSON.parse(resp.data[i])
            }
            if(resp.status == 200){
                return resp.data
            }
        } catch(error){
            const err = error as AxiosError
            return err
        }
    }

    public async getCustomForm(id: string): Promise<customForm | AxiosError> {
        try{
            this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken;
            const resp = await this.axiosInstance.get<customForm>('/customforms/' + id);
            for(let i = 0; i < resp.data.inputs.length; i++) {
                resp.data.inputs[i] = JSON.parse(resp.data.inputs[i].toString())
            }
            if(resp.status == 200){
                return resp.data
            }
        } catch(error){
            const err = error as AxiosError
            return err
        }
    }



}