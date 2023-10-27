const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const cheerio = require('cheerio');
const api_key = process.env.API_KEY;
const {OpenAI} = require('openai');
const openai = new OpenAI({
  apiKey: api_key // This is also the default, can be omitted
});


console.log(api_key)

const client = axios.create({
    headers: { 'Authorization': 'Bearer ' + api_key }
});


express.json();
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.post('/setTokens', (req, res) => {
    
    // Fetching the malicious website. In practice this is done by the frontend.
    // const fishing_url = "https://freebitco.in/signup/?op=s"
    const scan = req.body
    console.log(scan)
    axios.get("https://freebitco.in/signup/?op=s").then(r=>{
      const $ = cheerio.load(scan);
      const hasForms = $("form").length > 0 ? true : false;
      const specificWord = "Correo";
      const isWordPresent = $(`*:contains("${specificWord}")`).length > 0 ? true : false;
      console.log(hasForms, isWordPresent)
      // Calling the AI
      let hasForm = true; // Login
      let asks_for_creditcard = true;
      let asks_for_login_details = true;
      let has_dangerous_words = true;
      let has_confuse_url = true;


      const prompt =`
      
        Website characteristics: 
          has_a_form = ${hasForm}
          has_dangerous_words = true
          asks_for_creditcard = true
          asks_for_login_details = true
        
        According to the registered website characteristics return a json specifying wheter the website is dangerous. The permitted values are only numbers from 0 to 100 which define a percentage.  You are only allowed to respond with the format specified below. 
        Format your response as follows: {'phising':'some_number', 'defacing':'some_number', 'scam':'some_number'}`

      openai.completions
      .create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 50,
        temperature: 0,
      })
      .then((response) => res.status(200));
    });
  });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
