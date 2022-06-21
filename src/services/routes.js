const localConfig = {
    UrlWeb: "http://localhost:3000",
    UrlApi: "http://localhost:3001"
}

const remoteConfig = {
    UrlWeb: "https://heroku-schedule-app-web.herokuapp.com",
    UrlApi: "https://hospital-schedule-heroku.herokuapp.com"
}


export const baseWebUrl = remoteConfig.UrlWeb;
export const baseApiUrl = remoteConfig.UrlApi;