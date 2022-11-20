import { AxiosInstance, AxiosError } from 'axios'
import { postPagePL } from '@/payloads/postPagePL'
import { page } from '@/dbTables'
import { useUserInfoStore } from '@/store'
import { Pinia } from 'pinia';

export class pageRoute {
    private axiosInstance: AxiosInstance;
    private userInfoStore = useUserInfoStore();

    public constructor (axios: AxiosInstance, pinia: Pinia = null) {
      this.axiosInstance = axios
      if(pinia != null){
        this.userInfoStore = useUserInfoStore(pinia);
      }
    }

    public async postPage (data: postPagePL): Promise<boolean | AxiosError> {
      try {
        this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken
        const resp = await this.axiosInstance.post('/pages', data)

        if (resp.status == 200) {
          return true
        }
      } catch (error) {
        const err = error as AxiosError
        return err
      }
    }

    public async getPagesWithoutBody (count: number, pageIndex: number, pageSize: number): Promise<page[] | AxiosError> {
      try {
        const resp = await this.axiosInstance.get('/pages/nobody?=count' + count + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize)
        if (resp.status == 200) {
          return resp.data as page[]
        }
      } catch (error) {
        const err = error as AxiosError
        return err
      }
    }

    public async getSinglePageByID (id: string, pageId: string): Promise<page | AxiosError> {
      try {
        const resp = await this.axiosInstance.get('/pages/' + pageId + '/' + id)
        if (resp.status == 200) {
          return resp.data
        }
      } catch (error) {
        const err = error as AxiosError
        return err
      }
    }

    public async updatePage (data: postPagePL): Promise<boolean | AxiosError> {
      try {
        this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken
        const resp = await this.axiosInstance.put('/pages/' + data.id, data)
        if (resp.status == 200) {
          return true
        }
      } catch (error) {
        const err = error as AxiosError
        return err
      }
    }

    public async deletePageById (id: string): Promise<boolean | AxiosError> {
      try {
        this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + this.userInfoStore.getToken
        const resp = await this.axiosInstance.delete('/pages/' + id)
        if (resp.status == 200) {
          return true
        }
      } catch (error) {
        const err = error as AxiosError
        return err
      }
    }
}
