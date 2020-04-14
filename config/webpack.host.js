const path = require('path');

module.exports = ({
    entry: {
        main: path.resolve(__dirname, '../host')
    },
    output: {
        path: path.resolve(__dirname, '../build')
    },
    resolve: {
        extensions: [".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,

                loader: ['ts-loader']
            }
        ]
    }
})