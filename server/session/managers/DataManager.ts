import LogManager from "./LogManager";

class DataManagers {
    _manager_log: any = undefined

    constructor() { }

    init() {
        this._manager_log = new LogManager();
        this._manager_log.init();
    }

    get log() {
        return this._manager_log;
    }
}

export default DataManagers