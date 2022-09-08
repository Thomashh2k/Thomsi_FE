import { languagesRoute } from "@/ApiManagers/routes/languagesRoute";
import { createTestingPinia } from '@pinia/testing'
import { lang } from "@/dbTables";
import useUserInfoStore from "@/store";


const axios = require("axios");
const pinia = createTestingPinia()
jest.mock('axios');

const languageRouteInstance = new languagesRoute(axios)


test('Successfuly post gives a boolean true', async () => {
    debugger;
    axios.post.mockResolvedValue({
        status: 200
    });
    languageRouteInstance["userInfoStore"] = useUserInfoStore(createTestingPinia());
    var testDataPL = {
        id: undefined,
        languageName: "German",
        languageIdentifier: "de-DE"
    } as lang

    expect(await languageRouteInstance.postLanguage(testDataPL)).toBe(true);
});

test('Failed post gives a boolean false', async () => {
    debugger;
    axios.post.mockResolvedValue({
        status: 401
    });
    languageRouteInstance["userInfoStore"] = useUserInfoStore(createTestingPinia());
    var testDataPL = {
        id: undefined,
        languageName: "German",
        languageIdentifier: "de-DE"
    } as lang

    expect(await languageRouteInstance.postLanguage(testDataPL)).toBe(false);
});