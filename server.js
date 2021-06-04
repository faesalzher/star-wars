const express = require('express');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs')
app.listen(3000, function () {
    console.log('listening on 3000')
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
// app.post('/quotes', (req, res) => {
//     console.log(req.body);
//   })
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//     // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//     // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })

const uri = "mongodb+srv://faesalzher:ba05f497faesal@cluster0.ifg05.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        // ...
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))
            // ...
        })
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        app.put('/quotes', (req, res) => {
            console.log(req.body)
        })

    })
    .catch(console.error);