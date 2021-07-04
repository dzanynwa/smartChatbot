import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import UserDataDAO from './dao/userDataDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.USERDATA_DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500, 
        useNewUrlParser: true
    }
).catch(err => {
    console.log(err.stack)
    process.exit(1)
}).then(async client => {
    await UserDataDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})