const MongoClient = require('mongodb').MongoClient

let mongoUri = process.env.MONGO_URI
let _db

function getConnection() {
  return new Promise((resolve, reject) => {
    if (_db) resolve (_db)
    return MongoClient.connect(mongoUri, (err, db) => {
      if (err) return reject(err)
      _db = db
      return resolve(_db)
    })
  })
}

function create() {}

function readAll() {}

function update() {}

function destroy() {}

function readOne() {}

export default {
  create,
  readAll,
  update,
  destroy,
  readOne
}