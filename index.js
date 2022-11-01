const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
   res.send('node server is running')
});

app.use(cors())
app.use(express.json())

//username: dbuser1-module-64
//pass: J5zRdUliLFAN3mjl


const uri = "mongodb+srv://dbuser1-module-64:J5zRdUliLFAN3mjl@cluster0.drcwic2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
   try {
      const userCollection = client.db('module-64-node').collection('users');
      const user = { name: 'Saifulla Jubair', email: 'saif@gmail.com' }
      // const result = await userCollection.insertOne(user)
      // console.log(result)
      app.post('/users', async (req, res) => {
         const user = req.body
         // users.push(user)
         // console.log(user);
         const result = await userCollection.insertOne(user)
         user.id = result.insertedId;
         res.send(user);
      })
   }
   finally {
      // awit client.close
   }
}
run().catch(err => console.log(err))

const users = [
   { id: 1, name: 'shaban', email: 'shabana@gmail.com' },
   { id: 2, name: 'habib', email: 'shabana1@gmail.com' },
   { id: 3, name: 'Rana', email: 'shabana03@gmail.com' },
];

app.get('/users', (req, res) => {
   if (req.query.name) {
      const search = req.query.name;
      const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
      res.send(filtered)
   }
   console.log(req.query)
   res.send(users);
});


// app.post('/users', (req, res) => {
//    const user = req.body
//    user.id = users.length + 1
//    users.push(user)
//    console.log(user);
//    res.send(user);
// })

app.listen(port, () => {
   console.log(`port running on ${port}`)
})