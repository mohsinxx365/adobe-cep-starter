class LogManager {
	_logs: any = [];

	constructor() {}

	init() {
		this.log('initiating...');
		let log = console.log;

		if (console === undefined) return;
		let that = this;

		console.log = function() {
			log.call(this, ...arguments);
			//saving the logs internally
			that.addRawLog({ ...arguments });
		};
	}

	addRawLog(val: Object) {
		this._logs.push(val);
	}

	log(val: string) {
		return `${this.name} ${val}`;
	}

	get rawLogs() {
		return this._logs;
	}

	get name() {
		return 'LogManager:: ';
	}
}

export default LogManager;
