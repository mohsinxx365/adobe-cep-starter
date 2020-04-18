const chalk = require('chalk');

const log = () => {
	console.log(val);
};

const log_error = (val) => {
	log_progress(val, 'red');
};

const log_progress = (val, color) => {
	if (color) {
		console.log(chalk[color](val));
	} else {
		console.log(chalk.hex('ffff7e')(val));
	}
};

const resolveWindows = () => {
	return process.platform.startsWith('win');
};

const resolveEnv = () => {
	let env = 'development';
	var script = process.argv[2];

	return script.length >= 1 ? script : env;
};

module.exports = {
	log,
	log_error,
	log_progress,
	resolveWindows,
	resolveEnv
};
