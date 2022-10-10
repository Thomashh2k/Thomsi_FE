import { pageRoute } from '@/ApiManagers/routes/pageRoute'
import { createTestingPinia } from '@pinia/testing'
import { page } from '@/dbTables'
import useUserInfoStore from '@/store'
import { AxiosError } from 'axios'
import { postPagePL } from '@/payloads/postPagePL'

const axios = require('axios')
const pinia = createTestingPinia()
jest.mock('axios')

const pageRouteInstance = new pageRoute(axios, pinia)

describe('pageRoute.ts', () => {
  describe('postPage', () => {
    const mockedDataPL = {
      id: undefined,
      title: 'TestTitle',
      route: '/testtitle',
      body: '<p>Test body</p>',
      langId: '{GUID From lang}'
    } as postPagePL

    test('Successfuly post gives a boolean true', async () => {
      axios.post.mockResolvedValue({
        status: 200
      })

      expect(await pageRouteInstance.postPage(mockedDataPL)).toBe(true)
    })

    test('Failed post gives a boolean false on HTTP 401', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_UNAUTHORIZED'
      axios.post.mockRejectedValueOnce(mockedErr)

      expect(await pageRouteInstance.postPage(mockedDataPL)).toBe(mockedErr)
    })
  })
  describe('getPagesWithoutBody', () => {
    test('Successfully get pages without body', async () => {
      const mockedRespData = [
        {
          id: '{GUID}',
          title: 'TestTitle',
          route: '/testtitle',
          body: '<p>Test body</p>',
          lang: { id: '{GUID}', languageName: 'German', languageIdentifier: 'de-DE' }
        },
        {
          id: '{GUID}',
          title: 'TestTitle',
          route: '/testtitle',
          body: '<p>Test body</p>',
          lang: { id: '{GUID}', languageName: 'German', languageIdentifier: 'de-DE' }
        },
        {
          id: '{GUID}',
          title: 'TestTitle',
          route: '/testtitle',
          body: '<p>Test body</p>',
          lang: { id: '{GUID}', languageName: 'German', languageIdentifier: 'de-DE' }
        },
        {
          id: '{GUID}',
          title: 'TestTitle',
          route: '/testtitle',
          body: '<p>Test body</p>',
          lang: { id: '{GUID}', languageName: 'German', languageIdentifier: 'de-DE' }
        }
      ] as page[]

      axios.get.mockResolvedValue({
        status: 200,
        data: mockedRespData
      })

      expect(await pageRouteInstance.getPagesWithoutBody(1, 1, 10)).toBe(mockedRespData)
    })

    test('Failed get pages without body on HTTP 400', async () => {
      const mockedErr = new AxiosError()
      mockedErr.code = 'ERR_BAD_REQUEST'
      axios.get.mockRejectedValueOnce(mockedErr)
      expect(await pageRouteInstance.getPagesWithoutBody(1, 1, 10)).toBe(mockedErr)
    })

    describe('getSinglePageByID', () => {
      const mockedRespData = {
        id: '{GUID}',
        title: 'TestTitle',
        route: '/testtitle',
        body: '<p>Test body</p>',
        lang: { id: '{GUID}', languageName: 'German', languageIdentifier: 'de-DE' }
      } as page

      test('Successfully get a page by id', async () => {
        axios.get.mockResolvedValue({
          status: 200,
          data: mockedRespData
        })
        expect(await pageRouteInstance.getSinglePageByID('GUID')).toBe(mockedRespData)
      })

      test('Failed get a page with id on HTTP 400', async () => {
        const mockedErr = new AxiosError()
        mockedErr.code = 'ERR_BAD_REQUEST'
        axios.get.mockRejectedValueOnce(mockedErr)
        expect(await pageRouteInstance.getSinglePageByID('{GUID}')).toBe(mockedErr)
      })
    })

    describe('updatePage', () => {
      const mockedDataPL = {
        id: '{GUID}',
        title: 'updated test title',
        route: '/testtitle',
        body: '<p>Updated test body</p>',
        langId: '{GUID from lang}'

      } as postPagePL

      test('Successfully update a language', async () => {
        axios.put.mockResolvedValue({
          status: 200,
          data: mockedDataPL
        })
        expect(await pageRouteInstance.updatePage(mockedDataPL)).toBe(true)
      })

      test('Failed deleting a language on HTTP 400', async () => {
        const mockedErr = new AxiosError()
        mockedErr.code = 'ERR_BAD_REQUEST'
        axios.delete.mockRejectedValueOnce(mockedErr)
        expect(await pageRouteInstance.deletePageById('GUID')).toBe(mockedErr)
      })
    })

    describe('deletePageById', () => {
      test('Successfully deleted a language', async () => {
        axios.delete.mockResolvedValue({
          status: 200
        })
        expect(await pageRouteInstance.deletePageById('GUID')).toBe(true)
      })

      test('Failed deleting a language on HTTP 400', async () => {
        const mockedErr = new AxiosError()
        mockedErr.code = 'ERR_BAD_REQUEST'
        axios.delete.mockRejectedValueOnce(mockedErr)
        expect(await pageRouteInstance.deletePageById('GUID')).toBe(mockedErr)
      })
    })
  })
})
