const fs = require("fs-extra");
const path = require("path");
const zxpSignCmd = require("zxp-sign-cmd");
const utils = require("./utils");
const pluginConfig = require("../../pluginrc.js");
const isWindows = utils.resolveWindows();
const buildFolder = pluginConfig.destinationFolder;
const extensionBundleId = pluginConfig.extensionBundleId;
const pluginFolder = path.join(buildFolder, extensionBundleId);
const certificate_options = pluginConfig.certificate;
const zxpFile = path.join(buildFolder, extensionBundleId + ".zxp");
const chalk = require("chalk");
const ora = require("ora");

const startTime = Date.now();
archive();

function archive() {
  console.log(chalk.hex("6bb9f0")(`\nARCHIVE`));
  prepareCert()
    .then(signPackage)
    .then((res) => {
      const endTime = Date.now();
      let timeDiff = endTime - startTime;
      timeDiff /= 1000;
      console.log(chalk.hex("f7ca18")(`Package is signed: ${zxpFile}`));
      console.log(chalk.hex("23D18B")(`Time: ${timeDiff}s`));
    })
    .catch((err) => {
      utils.log_error(err);
    });
}

function prepareCert() {
  const options_custom_cert = certificate_options.customCert;
  const options_self_sign = certificate_options.selfSign;
  const isCustom =
    options_custom_cert && options_custom_cert.path.trim() !== "";
  var path = "",
    password = "";

  if (isCustom) {
    path = options_custom_cert.path;
    password = options_custom_cert.password;
  } else if (options_self_sign) {
    path = options_self_sign.output;
    password = options_self_sign.password;
  }

  const isValid = path !== undefined && path.trim() !== "";
  const data = { path, password };

  // on non windows, we need to change the permissions
  if (!isWindows) {
    var provider = require("zxp-provider").osx;
    // for some reason the path returns quoted, so I un-quote
    var unquote = provider.substring(1, provider.length - 1);
    fs.chmodSync(unquote, "755");
  }

  return new Promise((resolve, reject) => {
    if (!isValid) {
      reject("no valid cert info");
      return;
    }
    if (isCustom) {
      utils.log_progress("found a custom certificate");
      spinner.start();
      resolve(data);
    } else {
      let spinner = ora("Generate self signed certificate").start();
      zxpSignCmd.selfSignedCert(options_self_sign, function (error, result) {
        if (error) reject(error);
        else resolve(data);
      });
      spinner.succeed();
    }
  });
}

function signPackage(cert) {
  const options = {
    input: pluginFolder,
    output: zxpFile,
    cert: cert.path,
    password: cert.password,
  };

  return new Promise((resolve, reject) => {
    zxpSignCmd.sign(options, function (error, result) {
      if (error) reject(error);
      else resolve(result);
    });
  });
}
