const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const api_key = process.env.API_KEY;

console.log(api_key)

const client = axios.create({
    headers: { 'Authorization': 'Bearer ' + api_key }
});


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    
    const params = {
      "prompt": "Once upon a time", 
      "max_tokens": 10
    };
    
    client.post('https://api.openai.com/v1/engines/davinci/completions', params)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
  });
  
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
