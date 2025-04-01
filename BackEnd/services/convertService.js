const soap = require('soap');
const config = require('../config');

exports.convertFiles = async (base64Files, fileNames, token) => {
    const client = await soap.createClientAsync(config.soapUrl);
    const args = { base64Files, fileNames, userToken: token };
    const [result] = await client.convertOfficeFilesAsync(args);
    return result.return;
};

exports.convertUrls = async (urls, token) => {
    const client = await soap.createClientAsync(config.soapUrl);
    const args = { urls, userToken: token };
    const [result] = await client.convertUrlsAsync(args);
    return result.return;
};
