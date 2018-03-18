const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/players', (req, res) => {
    res.send(
        [
            {
                name: 'Ian A',
                nickname: 'Gorgons Maze',
                chant: 'I WON?!'
            },
            {
                name: 'Jameson A',
                nickname: 'Overlord Gorgonzola',
                chant: 'DERP!'
            }
        ]
    )
})

// app.listen(process.env.PORT || 8081)

require('express-debug')(app);

module.exports = app;