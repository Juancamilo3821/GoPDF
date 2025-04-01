const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
};

exports.register = (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
};
