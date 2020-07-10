var SETHOSTNAME = window.location.hostname;
var HOST_NAME = ''
if (SETHOSTNAME === "app-stage.watercooler.live") {
    // HOST_NAME = 'https://api-stage.watercooler.live/'
}
else if (SETHOSTNAME === 'app.watercooler.live' || SETHOSTNAME === 'watercooler.live') {
    // HOST_NAME = 'https://api.watercooler.live/'
}
else if (SETHOSTNAME === 'localhost') {
    HOST_NAME = 'http://localhost:3001/'
}
export class WebAPI {

    // HOST_NAME = "http://localhost:3000/"
    //   HOST_NAME="https://api-stage.watercooler.live/"
    //create seesion
    _LOGIN = "login?email=";
    _LOGIN_2 = '&password=';

    _CREATE_SESSION = 'create-session?token=';
    _CREATE_SESSION_2 = '&roomName=';
    _CREATE_SESSION_3 = '&userName=';
    _CREATE_SESSION_4 = '&password=';

    _CREATE_ROOM = "create-room?token=";
    _CREATE_ROOM_2 = '&password=';
    _CREATE_ROOM_3 = '&roomName=';

    _GET_ROOM = "get-room?token=";

    _CHECK_SETTINGS = 'check-settings?token='
    _CHECK_SETTINGS_2 = '&roomName='

    _UPDATE_PASSWORD = 'update-password?roomName='
    _UPDATE_PASSWORD_2 = "&password="
    _SIGN_UP = 'create-signup?roomName='
    _SIGNUP_2 = '&email='
    _REMOVE_SLACK_INTEGRATION = 'remove-slack-integration?roomName='
    _RECOVER_ACCOUNT = 'recover-account?email='

    _CHECK_ROOM = 'check-room?roomName='
    _CHECK_ROOM_2 = '&uuid='



    async sendRequest(url, request) {
        try {
            let response = await fetch(url, request);
            console.log(response);
            let responseJson = await response.json();
            console.log("responseeeeee", responseJson);
            return responseJson;
        } catch (error) {
            console.log(url);
            console.log("errorrrrrrr", error);
            let err = [];
            err.error = error;
            err.no_result = true;
            return err;
        }
    }
    login(loginObj) {
        let url = `${HOST_NAME}${this._LOGIN}${loginObj.email}${this._LOGIN_2}${loginObj.password}`;
        console.log('hy beru: 123 login ', url);
        let request = {
            method: 'GET'
        };
        return this.sendRequest(url, request);

    }
    createRoom(roomObj) {
        let url = `${HOST_NAME}${this._CREATE_ROOM}${roomObj.token}${this._CREATE_ROOM_2}${roomObj.password}${this._CREATE_ROOM_3}${roomObj.roomName}`;
        console.log('hy beru: 123 create room ', url);
        let request = {
            method: 'GET'
        };
        return this.sendRequest(url, request);
    }
    getRoom(token) {
        let url = `${HOST_NAME}${this._GET_ROOM}${token}`;
        console.log('hy beru: 123 get room ', url);
        let request = {
            method: 'GET'
        };
        return this.sendRequest(url, request);
    }
    getSessionId(sessionObj) {
        if (sessionObj.roomName) {
            let url = `${HOST_NAME}${this._CREATE_SESSION}${sessionObj.token}${this._CREATE_SESSION_2}${sessionObj.roomName}${this._CREATE_SESSION_3}${sessionObj.userName}${this._CREATE_SESSION_4}${sessionObj.password}`;
            console.log('hy beru: 123 create session ', url);
            let request = {
                method: 'GET'
            };
            return this.sendRequest(url, request);
        }
    }
    checkSettings(settingsObj) {
        let url = `${HOST_NAME}${this._CHECK_SETTINGS}${settingsObj.token}${this._CHECK_SETTINGS_2}${settingsObj.roomName}`;
        console.log('hy beru: 123 checkSettings ', url);
        let request = {
            method: 'GET'
        };
        return this.sendRequest(url, request);
    }

}
