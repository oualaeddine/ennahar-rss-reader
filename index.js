const express = require('express');
const Parser = require('rss-parser');
const admin = require('firebase-admin');

// Initialize Firebase


var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ultimatefacebookhackerv2372017.firebaseio.com"
});


const PORT = process.env.PORT || 5000;


let app = express();

function saveItem(item) {
    // Get a database reference to our blog
    var db = admin.database();

    var myDate = new Date(item.isoDate);

    var ref = db.ref("rss/" + myDate.getTime());
    ref.set(item);
    console.info(item);

}

//app.get('/', (req, res) => {
    let parser = new Parser();

    (async () => {

        let feed = await parser.parseURL('https://www.ennaharonline.com/feed/');
        feed.items.forEach(item => {
            saveItem(item);
        });

    })();
//}).listen(PORT, () => console.log(`Listening on ${PORT}`));