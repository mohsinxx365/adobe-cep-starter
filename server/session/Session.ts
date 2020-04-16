import scriptLoader from './ScriptLoader';
import DataManagers from './managers/DataManager';

class Session {
    _managers = new DataManagers();

    constructor() {
        this.init()
    }

    log(val: string) {
        console.log(`${this.name} ${val}`);
    }
    get name() {
        return "Session:: ";
    }

    get managers() {
        return this._managers
    }

    scriptLoader() {
        return scriptLoader
    }

    init() {
        this._managers.init();
        this.log("session has initiated");
    }
}

let session = new Session();

export default session;