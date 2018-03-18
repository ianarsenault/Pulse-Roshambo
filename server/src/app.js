const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/test', (req, res) => {
    res.send([{
        title: 'Hello, World!',
        description: 'This is a server test! Bleep Bloop!'
    }])
})

// app.listen(process.env.PORT || 8081)

require('express-debug')(app);

module.exports = app;