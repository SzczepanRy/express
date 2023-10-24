
const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: './static/db/kolekcja.db',
    autoload: true
});

const doc = {
    a: "a",
    b: "b"
};
//daoawanie
coll1.insert(doc, function (err, newDoc) {
    console.log("dodano dokument (obiekt):")
    console.log(newDoc)
    console.log("losowe id dokumentu: " + newDoc._id)
});
//znajoowanie

coll1.findOne({ _id: "5zQ70JHeOwEmUjhj" }, function (err, doc) {
    console.log("----- obiekt pobrany z bazy: ", doc)
    console.log("----- formatowanie obiektu js na format JSON: ")
    console.log(JSON.stringify(doc, null, 5))
});
//znajdowanie wielu 
coll1.find({ a: "a" }, function (err, docs) {
    console.log(JSON.stringify({ "docsy": docs }, null, 5))
});

//wszystkie

coll1.find({}, function (err, docs) {
    //zwracam dane w postaci JSON
    console.log("----- tablica obiektów pobrana z bazy: \n")
    //  console.log(docs)
    console.log("----- sformatowany z wcięciami obiekt JSON: \n")
    //  console.log(JSON.stringify({ "docsy": docs }, null, 5))
});
//liczba jsonów
coll1.count({}, function (err, count) {
    console.log("dokumentów jest: ", count)
});
coll1.count({ a: "a1" }, function (err, count) {
    console.log("dokumentów jest: ", count)
});
//usuwanie pierwszego
coll1.remove({ a: "a2" }, {}, function (err, numRemoved) {
    console.log("usunięto dokumentów: ", numRemoved)
});

//usuwanie wszystkich spelniających
coll1.remove({ a: "a1" }, { multi: true }, function (err, numRemoved) {
    console.log("usunięto dokumentów: ", numRemoved)
});

//wszystkich

// coll1.remove({}, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto wszystkie dokumenty: ",numRemoved)
// });