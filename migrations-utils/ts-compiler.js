const tsNode = require('ts-node');
const tsConfigPaths = require('tsconfig-paths');
module.exports = function() {
    // require("@babel/register")({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
    tsConfigPaths.register();
    return tsNode.register({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
};