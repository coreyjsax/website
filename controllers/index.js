const tools = require('../util/tools')

exports.getRoot = (req, res) => {
    let date = tools.dateTime()
    let welcome = {
        message: 'Corey Sax API',
        date: date,
        ip: req.header('x-forwarded-for'),
        language: req.header('accept-language'),
        software: req.header('user-agent')
    }

    res.json(welcome)
}