const express = require('express')
var cors = require('cors')
const app = express()
const port = 3001
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/jobdata', (req, res) => {
    res.send([
        { name: "Konuşmacılar ile konuşulacak", priority: "Urgent" }, { name: "Yazılımcılar ile konuşulacak", priority: "Regular" }, { name: "Katılımcılar ile konuşulacak", priority: "Trivial" }
    ])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})