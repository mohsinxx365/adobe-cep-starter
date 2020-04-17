const { execSync } = require("child_process");
const fs = require("fs-extra");
const os = require('os');
const path = require("path");
const chalk = require('chalk');
const utils = require('./utils.js');
const pluginConfig = require('../../pluginrc.js');
const buildFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId);
const env = utils.resolveEnv();
const isDev = env === "development";
const isWindows = utils.resolveWindows();
const extensionBundleId = pluginConfig.extensionBundleId;
const resolvedTargetFolder = resolveDeploymentFolder();


const startTime = Date.now();
deploy();

function deploy() {
    console.log(chalk.hex('6bb9f0')(`DEPLOY FOR ${env.toUpperCase()}`));
    cleanTarget(resolvedTargetFolder);

    if (isDev)
        deployDevMode()
    else
        deployProdMode()

    printDeploymentFolder()

    const endTime = Date.now();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    console.log(chalk.hex('23D18B')(`DONE IN ${timeDiff}s`))
}

function printDeploymentFolder() {
    console.log(chalk.hex('f7ca18')(`Deployed to folder ${resolvedTargetFolder}`));
}

function resolveDeploymentFolder() {
    return path.join(resolveExtensionFolder(), extensionBundleId)
}

function resolveExtensionFolder() {
    if (isWindows) {
        const extensionsPath = os.userInfo().homedir + '\\AppData\\Roaming\\Adobe\\CEP\\extensions'
        if (!fs.existsSync(extensionsPath))
            fs.mkdirSync(extensionsPath, { recursive: true })

        return extensionsPath;
    } else {
        return path.join(os.homedir(), 'Library/Application Support/Adobe/CEP/extensions')
    }
}


function cleanTarget(target) {
    utils.log_progress('cleaning target...');
    try {
        if (fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink())
            fs.unlinkSync(target)
        fs.removeSync(target)
    } catch (err) {
        utils.log_error(err)
    }
}

function deployDevMode() {
    try {
        utils.log_progress('patching...')
        if (isWindows) {
            execSync('REG ADD HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.8 /v PlayerDebugMode /t REG_SZ /d 1 /f') // CC 2018
            execSync('REG ADD HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.9 /v PlayerDebugMode /t REG_SZ /d 1 /f') // CC 2019 & 2020
        } else {
            execSync('defaults write com.adobe.CSXS.8 PlayerDebugMode 1', { stdio: [0, 1, 2] }) // CC 2018
            execSync('defaults write com.adobe.CSXS.9 PlayerDebugMode 1', { stdio: [0, 1, 2] }) // CC 2019 & 2020
        }
    } catch (err) {
        utils.log_error(err)
    }

    utils.log_progress('creating symlink into extensions folder...');

    try {
        var type = isWindows ? 'junction' : 'dir'

        fs.symlinkSync(buildFolder, resolvedTargetFolder, type)
    } catch (err) {
        utils.log_error(err)
    }

}

function deployProdMode() {
    utils.log_progress('copying into extensions folder...')
    try {
        fs.copySync(buildFolder, resolvedTargetFolder)
    } catch (err) {
        utils.log_error(err)
    }
}
