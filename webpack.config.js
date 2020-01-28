const path = require('path');

module.export = {
    entry: './src/index.js',
    output:{
       path: path.join(__dirname, '/dist')
    }
}