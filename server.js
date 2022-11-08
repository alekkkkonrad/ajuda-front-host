const express = require('express')
const path = require('path')
const {resolve} = require('path')
const app = express()

app.use('/', express.static(resolve(__dirname, './build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'), (err) => {
        if(err) res.status(500).send(err)
    })
})

app.listen(process.env.PORT || 3000, (err) => {
    if(err) { return console.log(err)}

    console.log('everything is okay')
})