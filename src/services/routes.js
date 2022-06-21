const localConfig = {
    UrlWeb: "http://localhost:3000",
    UrlApi: "http://localhost:3001"
}

const remoteConfig = {
    UrlWeb: "https://hospital-schedule-web.herokuapp.com",
    UrlApi: "https://hospital-schedule-heroku.herokuapp.com"
}


export const baseWebUrl = localConfig.UrlWeb;
export const baseApiUrl = localConfig.UrlApi;