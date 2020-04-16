const chalk = require('chalk');

const log = () => {
    console.log(val)
}

const log_error = (val) => {
    log_progress(val, 'red');
}

const log_progress = (val, color) => {
    if (color) {
        console.log(chalk[color](val))
    } else {
        console.log(chalk.hex("ffff7e")(val));
    }
}

const resolveWindows = () => {
    return process.platform.startsWith('win');
}

const resolveEnv = () => {
    let env = 'development';
    let args = process.argv;

    if (args.lenght >= 3) {
        env = args[3];
    }
    return env
}

module.exports = {
    log, log_error, log_progress, resolveWindows, resolveEnv
}
