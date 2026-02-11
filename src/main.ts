import express from 'express';
import mongoose from 'mongoose';
import { config } from './configs/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const dbConnection = async ()=> {
  let dbCon = false
  while (!dbCon) {
    try {
      console.log('Connecting to DB...')
      await mongoose.connect(config.MONGO_URI)
      dbCon=true
      console.log('Connected to DB!')
    } catch (e) {
      console.log(e)
      console.log('Database unavailable, trying to reconnect in 3 seconds...')
      await new Promise(res=>setTimeout(res,3000))
    }
  }
}

const start = async () => {
  try {
    await dbConnection()
    app.listen(config.PORT, () => {
      console.log(`Server running on ${config.PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
