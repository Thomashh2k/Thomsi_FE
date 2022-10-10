import { languagesRoute } from '@/ApiManagers/routes/languagesRoute'
import { createTestingPinia } from '@pinia/testing'
import { lang } from '@/dbTables'
import useUserInfoStore from '@/store'
import { AxiosError } from 'axios'

const axios = require('axios')
const pinia = createTestingPinia()
jest.mock('axios')

const languageRouteInstance = new languagesRoute(axios, pinia)

describe('languageRoute.ts', () => {
  describe('postLanguage', () => {
    const mockedDataPL = {
      id: undefined,
      languageName: 'German',
      languageIdentifier: 'de-DE'
    } as lang

    test('Successfuly post gives a boolean true', async () => {
      axios.post.mockResolvedValue({
        status: 200
      })

      expect(await languageRouteInstance.postLanguage(mockedDataPL)).toBe(true)
    })

    test('Failed post gives a boolean false on HTTP 401', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_BAD_REQUEST'

      axios.post.mockRejectedValueOnce(mockedErr)

      expect(await languageRouteInstance.postLanguage(mockedDataPL)).toBe(mockedErr)
    })
  })
  describe('getLanguage', () => {
    test('Successfuly gets a list of languages', async () => {
      const mockedRespData = [
        {
          id: '{GUID}',
          languageName: 'German',
          languageIdentifier: 'de-DE'
        },
        {
          id: '{GUID}',
          languageName: 'English',
          languageIdentifier: 'en-GB'
        },
        {
          id: '{GUID}',
          languageName: 'Russian',
          languageIdentifier: 'ru-RU'
        },
        {
          id: '{GUID}',
          languageName: 'Austrian',
          languageIdentifier: 'de-AT'
        }
      ] as lang[]

      axios.get.mockResolvedValue({
        status: 200,
        data: mockedRespData
      })

      expect(await languageRouteInstance.getLanguage(1, 1, 10)).toBe(mockedRespData)
    })

    test('Failed get a list of languages on HTTP 400', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_BAD_REQUEST'
      axios.get.mockRejectedValueOnce(mockedErr)

      expect(await languageRouteInstance.getLanguage(1, 1, 10)).toBe(mockedErr)
    })
  })
  describe('getLanguageById', () => {
    test('Successfully get a language by id', async () => {
      const mockedRespData = {
        id: 'GUID',
        languageName: 'German',
        languageIdentifier: 'de-DE'
      } as lang

      axios.get.mockResolvedValue({
        status: 200,
        data: mockedRespData
      })
      expect(await languageRouteInstance.getSingleLanguageByID('GUID')).toBe(mockedRespData)
    })

    test('Failed get a languages by id on HTTP 400', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_BAD_REQUEST'
      axios.get.mockRejectedValueOnce(mockedErr)
      expect(await languageRouteInstance.getSingleLanguageByID('GUID')).toBe(mockedErr)
    })
  })
  describe('updateLanguage', () => {
    const mockedDataPL = {
      id: 'GUID',
      languageName: 'German',
      languageIdentifier: 'de-DE'
    } as lang

    test('Successfully update a language', async () => {
      axios.put.mockResolvedValue({
        status: 200,
        data: mockedDataPL
      })
      expect(await languageRouteInstance.updateLanguage(mockedDataPL)).toBe(true)
    })

    test('Failed update a language on HTTP 400', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_BAD_REQUEST'
      axios.put.mockRejectedValueOnce(mockedErr)
      expect(await languageRouteInstance.updateLanguage(mockedDataPL)).toBe(mockedErr)
    })
  })

  describe('deleteLanguageById', () => {
    test('Successfully deleted a language', async () => {
      axios.delete.mockResolvedValue({
        status: 200
      })
      expect(await languageRouteInstance.deleteLanguageById('GUID')).toBe(true)
    })

    test('Failed deleting a language on HTTP 400', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_BAD_REQUEST'
      axios.delete.mockRejectedValueOnce(mockedErr)

      expect(await languageRouteInstance.deleteLanguageById('GUID')).toBe(mockedErr)
    })
  })
})
