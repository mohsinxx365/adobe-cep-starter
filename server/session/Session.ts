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


    init() {
        this._managers.init();
        this.log("session is initiating...");
        this.log("loading the main ")
    }
}