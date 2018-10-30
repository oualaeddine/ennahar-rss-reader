const Parser = require('rss-parser');
const admin = require('firebase-admin');

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ultimatefacebookhackerv2372017.firebaseio.com"
});

let parser = new Parser();
(async () => {

    let feed = await parser.parseURL('https://www.ennaharonline.com/feed/');
    feed.items.forEach(item => {
        saveItem(item);
    });

})();

const db = admin.database();
function saveItem(item) {
    let myDate = new Date(item.isoDate);
    let ref = db.ref("rss/" + myDate.getTime());
    ref.set(item);
}