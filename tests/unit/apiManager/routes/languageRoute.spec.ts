import { languagesRoute } from "@/ApiManagers/routes/languagesRoute";
import { createTestingPinia } from '@pinia/testing'
import { lang } from "@/dbTables";
import useUserInfoStore from "@/store";
import { AxiosError } from "axios";

const axios = require("axios");
const pinia = createTestingPinia()
jest.mock('axios');

const languageRouteInstance = new languagesRoute(axios)
languageRouteInstance["userInfoStore"] = useUserInfoStore(pinia);

describe("languageRoute.ts", () =>{
    describe("postLanguage", () =>{
        test('Successfuly post gives a boolean true', async () => {
            axios.post.mockResolvedValue({
                status: 200
            });
            let testDataPL = {
                id: undefined,
                languageName: "German",
                languageIdentifier: "de-DE"
            } as lang
        
            expect(await languageRouteInstance.postLanguage(testDataPL)).toBe(true);
        });
        
        test('Failed post gives a boolean false on HTTP 401', async () => {
            let mockedErr = new AxiosError();
            mockedErr.code = "ERR_BAD_REQUEST"; 
    
            axios.post.mockRejectedValueOnce(mockedErr)
           
            var testDataPL = {
                id: undefined,
                languageName: "German",
                languageIdentifier: "de-DE"
            } as lang

            expect(await languageRouteInstance.postLanguage(testDataPL)).toBe(mockedErr);
        });
    })
    describe("getLanguage", () => {
        test('Successfuly gets a list of languages', async () => {
            let mockedRespData = [
                {
                    id: "{GUID}",
                    languageName: "German",
                    languageIdentifier: "de-DE"
                },
                {
                    id: "{GUID}",
                    languageName: "English",
                    languageIdentifier: "en-GB"
                },
                {
                    id: "{GUID}",
                    languageName: "Russian",
                    languageIdentifier: "ru-RU"
                },
                {
                    id: "{GUID}",
                    languageName: "Austrian",
                    languageIdentifier: "de-AT"
                },
            ] as lang[];
        
            axios.get.mockResolvedValue({
                status: 200,
                data: mockedRespData
            });
        
        
            expect(await languageRouteInstance.getLanguage(1, 1, 10)).toBe(mockedRespData);
        });
        
        test('Failed get a list of languages on HTTP 400', async () => {
        
            let mockedErr = new AxiosError();
            mockedErr.code = "ERR_BAD_REQUEST"; 
            axios.get.mockRejectedValueOnce(mockedErr)

            expect(await languageRouteInstance.getLanguage(1, 1, 10)).toBe(mockedErr);
        });
    })
    describe("getLanguageById", () => {

        test("Successfully get a language by id", async () => {

            let mockedRes = {
                id: "GUID",
                languageName: "German",
                languageIdentifier: "de-DE"
            };

            axios.get.mockResolvedValue({
                status: 200,
                data: mockedRes 
            });
            expect(await languageRouteInstance.getSingleLanguageByID("GUID")).toBe(mockedRes)
        });

        test('Failed get a languages by id on HTTP 400', async () => {
        
            let mockedErr = new AxiosError();
            mockedErr.code = "ERR_BAD_REQUEST"; 
            axios.get.mockRejectedValueOnce(mockedErr)
            expect(await languageRouteInstance.getSingleLanguageByID("GUID")).toBe(mockedErr);
        })

    })
    describe("updateLanguage", () => {
        test("Successfully update a language", async () => {
            let mockedPL = {
                id: "GUID",
                languageName: "German",
                languageIdentifier: "de-DE"
            };
            axios.put.mockResolvedValue({
                status: 200,
                data: mockedPL
            });
            expect(await languageRouteInstance.updateLanguage(mockedPL)).toBe(true)
        });

        test('Failed update a language on HTTP 400', async () => {
            let mockedPL = {
                id: "GUID",
                languageName: "German",
                languageIdentifier: "de-DE"
            };
            let mockedErr = new AxiosError();
            mockedErr.code = "ERR_BAD_REQUEST"; 
            axios.put.mockRejectedValueOnce(mockedErr)
            expect(await languageRouteInstance.updateLanguage(mockedPL)).toBe(mockedErr);
        })
    });

    describe("deleteLanguageById", () => {

        test("Successfully deleted a language", async () => {
            axios.delete.mockResolvedValue({
                status: 200
            });
            expect(await languageRouteInstance.deleteLanguageById("GUID")).toBe(true);
        })

        test("Failed deleting a language on HTTP 400", async () => {
            let mockedErr = new AxiosError();
            mockedErr.code = "ERR_BAD_REQUEST"; 
            axios.delete.mockRejectedValueOnce(mockedErr)

            expect(await languageRouteInstance.deleteLanguageById("GUID")).toBe(mockedErr);
        })

    });
})
