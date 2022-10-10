import { authenticationRoute } from '@/ApiManagers/routes/authenticationRoute'
import { createTestingPinia } from '@pinia/testing'
import useUserInfoStore from '@/store'
import { AxiosError } from 'axios'
import { loginPL } from '@/payloads/loginPL'
import { registerUserPL } from '@/payloads/registerUserPL'
import { loginResult } from '@/payloads/loginResult'

const pinia = createTestingPinia()
const axios = require('axios')
jest.mock('axios')

const authenticationRouteInstance = new authenticationRoute(axios, pinia)

describe('authenticationRoute.ts', () => {
  describe('register', () => {
    const mockedDataPL = {
      username: 'TestUser',
      email: 'testuser@example.com',
      password: 'TestPassword123'
    } as registerUserPL

    test('Successfuly register gives a boolean true', async () => {
      axios.post.mockResolvedValue({
        status: 200
      })

      expect(await authenticationRouteInstance.register(mockedDataPL)).toBe(true)
    })

    test('Failed register gives a boolean false on HTTP 401', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_UNAUTHORIZED'
      axios.post.mockRejectedValueOnce(mockedErr)
      expect(await authenticationRouteInstance.register(mockedDataPL)).toBe(mockedErr)
    })
  })

  describe('login', () => {
    const mockedDataPL = {
      username: 'TestUser',
      password: 'TestPassword123'
    } as loginPL

    test('Successfully login gives a boolean true', async () => {
      axios.post.mockResolvedValue({
        status: 200,
        data: {
          token: 'JWT Token'
        }
      })

      expect(await authenticationRouteInstance.login(mockedDataPL)).toBe(true)
    })

    test('Failed login gives a boolean false on HTTP 401', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_UNAUTHORIZED'
      axios.post.mockRejectedValueOnce(mockedErr)
      expect(await authenticationRouteInstance.login(mockedDataPL)).toBe(mockedErr)
    })
  })

  describe('logout', () => {
    test('Successfully login gives a boolean true', async () => {
      // axios.delete.mockResolvedValue({
      //    status: 200
      // });

      expect(await authenticationRouteInstance.logout()).toBe(true)
    })

    // Cant mock a fail because the function doesnt depend on extneral function
  })
  // Tests for isValidToken is currently not needed
  // Probably this function will be removed in the future
  // describe("isValidToken", () =>{
  //    test("Successfully login gives a boolean true", async () => {
  //        axios.post.mockResolvedValue({
  //            status: 200
  //        });
  //
  //        expect(await authenticationRouteInstance.login(mockedDataPL)).toBe(true);
  //    });
  // });
})
