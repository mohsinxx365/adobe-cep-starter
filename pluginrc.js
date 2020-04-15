const path = require("path");
const root = __dirname;
const buildFolder = path.join(root, "build");
const certPath = path.join(buildFolder, "cert.p12");

module.exports = {
    extensionBundleId: "com.starter.demo",
    extensionBundleName: "starter",
    extensionBundleVersion: "1.0.0",
    cepVersion: "7.0",
    panelName: "Starter",
    width: "400",
    height: "600",
    root: root,
    destinationFolder: buildFolder,
    certificate: {
        customCert: {
            path: "",
            password: "password"
        },
        selfSign: {
            country: "US",
            province: "CA",
            org: "org",
            name: "name",
            password: "password",
            locality: "locality",
            orgUnit: "orgUnit",
            email: "starter@gmail.com",
            output: certPath
        }
    }
};
