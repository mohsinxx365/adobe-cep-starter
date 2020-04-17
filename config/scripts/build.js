const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const pluginConfig = require('../../pluginrc');
const utils = require('./utils.js');
const env = utils.resolveEnv();
const isDev = env === 'development';
const buildFolder = pluginConfig.destinationFolder;
const pluginFolder = path.join(buildFolder, pluginConfig.extensionBundleId);
const rootFolder = pluginConfig.root;
const templatesFolder = path.join(__dirname, '../assets/templates');
const webpack_client_path = path.join(__dirname, '../webpack.client.js');
const webpack_server_path = path.join(__dirname, '../webpack.server.js');
const host_config_path = path.join(__dirname, '../../host/tsconfig.json');
const webpack = require('webpack')

const startTime = Date.now();

const inBuildPath = (val) => {
    return path.join(pluginFolder, val)
}

const inRootDir = (val) => {
    return path.join(rootFolder, val)
}

console.log(chalk.hex('6bb9f0')(`BUILD FOR ${env.toUpperCase()}`));

build();

function build() {
    try {

        utils.log_progress('build folder....');

        if (!fs.existsSync(buildFolder)) {
            fs.mkdirSync(buildFolder);
        } else {
            fs.emptyDirSync(buildFolder);
            fs.mkdirSync(pluginFolder);
        }

        utils.log_progress('bundeling client...');
        var clientConfig = require('../webpack.client.js')
        webpack(clientConfig, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
        });

        utils.log_progress('bundeling server...')
        var serverConfig = require('../webpack.server.js')
        webpack(serverConfig, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
        });

        execSync(`tsc -p ${host_config_path} --outFile ${pluginFolder}/host/index.jsx`);

        utils.log_progress('copying libs folder...');
        fs.copySync(inRootDir('libs'), inBuildPath('libs'));

        utils.log_progress('copying index.html...');
        fs.copySync(inRootDir('index.html'), inBuildPath('index.html'));

        utils.log_progress('copying adobe assets');
        fs.copySync(path.resolve(__dirname, '../assets/icons'), pluginFolder);

        utils.log_progress('rendering manifest.xml...');
        const manifest_template = require(path.join(templatesFolder, 'manifest.template.xml.js'))
        const rendered_xml = manifest_template(pluginConfig);
        var xml_out_dir = path.join(pluginFolder, 'CSXS')
        const xml_out_file = path.join(pluginFolder, 'CSXS', 'manifest.xml');
        fs.mkdir(xml_out_dir, { recursive: true }, (err) => { if (err) throw err; });
        fs.writeFileSync(xml_out_file, rendered_xml, 'utf-8')

        if (isDev) {
            utils.log_progress('rendering .debug file...');
            const debug_template = require(path.join(templatesFolder, '.debug.template.js'))
            const rendered_debug = debug_template(pluginConfig);
            const debug_out_file = path.join(pluginFolder, '.debug');
            fs.writeFileSync(debug_out_file, rendered_debug, 'utf-8');
        }
        const endTime = Date.now();
        let timeDiff = endTime - startTime;
        timeDiff /= 1000;
        console.log(chalk.hex('23D18B')(`DONE IN ${timeDiff}s`))

    } catch (err) {
        utils.log_error(err)
    }
}
