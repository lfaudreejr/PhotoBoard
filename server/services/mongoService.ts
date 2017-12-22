import * as mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const DATABASE = process.env.DATABASE
let mongoUri = process.env.MONGO_URI
let _db: mongodb.Db;

if(_db) {
  _db.on('connection', () => {
    console.log(`connected to Mongo at ${mongoUri}`)
  })
  _db.on('disconnected', () => {
    console.log('mongo disconnected')
  })
}

function getMongoConnection(): Promise<mongodb.Db> {
  return new Promise((resolve, reject) => {
    if (_db) return resolve (_db)
    MongoClient.connect(mongoUri, (err, db) => {
      if (err) return reject(err)
      _db = db.db(DATABASE)
      return resolve(_db)
    })
  })
}

function create(obj: object, collectionName: string) {
  return getMongoConnection().then((db) => {
    const collection = db.collection(collectionName)
    return collection.insertOne(obj).then((doc) => {
      if (doc) return doc
      else return null
    }).catch((err) => {
      throw new Error(err)
    })
  }).catch((err) => {
    throw new Error(err)
  })
}

function readAll(obj, collectionName) {
  return getMongoConnection().then((db) => {
    const collection = db.collection(collectionName)
    return collection.find(obj).toArray((err, docs) => {
      if (err) return err
      else return docs
    })
  }).catch((err) => {
    throw new Error(err)
  })
}

function update(obj, collectionName, config) {
  return getMongoConnection().then((db) => {
    const collection = db.collection(collectionName)
    return collection.findOneAndUpdate(obj, config).then((doc) => {
      if (doc) return doc
      else return null
    }).catch((err) => {
      throw new Error(err)
    })
  }).catch((err) => {
    throw new Error(err)
  })
}

function destroy(obj, collectionName) {
  return getMongoConnection().then((db) => {
    const collection = db.collection(collectionName)
    return collection.findOneAndDelete(obj).then((doc) => {
      if (doc) return doc
      else return null
    }).catch((err) => {
      throw new Error(err)
    })
  }).catch((err) => {
    throw new Error(err)
  })
}

function readOne(obj, collectionName) {
  return getMongoConnection().then((db) => {
    const collection = db.collection(collectionName)
    return collection.findOne(obj).then((doc) => {
      if (doc) return doc
      else return null
    }).catch((err) => {
      throw new Error(err)
    })
  }).catch((err) => {
    throw new Error(err)
  })
}

export default {
  create,
  readAll,
  update,
  destroy,
  readOne
}