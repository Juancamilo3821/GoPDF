const convertService = require('../services/convertService');

exports.convertFiles = async (req, res) => {
    try {
        const { files, fileNames, token } = req.body;
        const result = await convertService.convertFiles(files, fileNames, token);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.convertUrls = async (req, res) => {
    try {
        const { urls, token } = req.body;
        const result = await convertService.convertUrls(urls, token);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
