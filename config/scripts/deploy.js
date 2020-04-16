const { execSync } = require("child_process");
const fs = require("fs-extra");
const os = require('os');
const path = require("path");
const utils = require('./utils.js');
const pluginConfig = require('../../pluginrc.js');
const buildFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId);
const env = utils.resolveEnv();
const isDev = env === "development";
const isWindows = utils.resolveWindows();
const extensionBundleId = pluginConfig.extensionBundleId;
const resolvedTargetFolder = resolveDeploymentFolder();


const resolveDeploymentFolder = () => {
    return path.join(resolveExtensionFolder(), extensionBundleId)
}

const resolveExtensionFolder = () => {
    if (isWindows) {
        const extensionsPath = os.userInfo().homedir + '\\AppData\\Roaming\\Adobe\\CEP\\extensions'
        if (!fs.existsSync(extensionsPath))
            fs.mkdirSync(extensionsPath, { recursive: true })

        return extensionsPath;
    } else {
        return path.join(os.homedir(), 'Library/Application Support/Adobe/CEP/extensions')
    }
}


const cleanTarget = (target) => {
    utils.log_progress('cleaning target...');

    try {
        if (fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink())
            fs.unlinkSync(target)
        fs.removeSync(target)
    } catch (err) {
        utils.log_error(err)
    }
}

const deployDevMode = () => {
    try {
        utils.log_progress('patching')
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
}

const deployProdMode = () => {
    utils.log_progress('copying into extensions folder')
    try {
        fs.copySync(buildFolder, resolvedTargetFolder)

    } catch (err) {
        utils.log_error(err)
    }
}

const printDeploymentFolder = () => {
    utils.log_progress(`deployed to folder ${resolvedTargetFolder}`, 'green')
    console.log(chalk.hex('23D18B')(`deployed to folder ${resolvedTargetFolder}`));
}

const deploy = () => {
    console.log(chalk.hex('6bb9f0')(`DEPLOY FOR ${env}`));
    cleanTarget(resolvedTargetFolder);

    if (isDev) deployDevMode()
    else deployProdMode();

    printDeploymentFolder()
    console.log(chalk.hex('23D18B')(`DONE`));
}
