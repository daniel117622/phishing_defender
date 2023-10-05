const express = require('express');
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


const app = express();
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    
    // Fetching the malicious website. In practice this is done by the frontend.
    const fishing_url = "https://freebitco.in/signup/?op=s"
    axios.get("https://freebitco.in/signup/?op=s").then(r=>{
      const $ = cheerio.load(r.data);
      const hasForms = $("form").length > 0 ? true : false;
      const specificWord = "win";
      const isWordPresent = $(`*:contains("${specificWord}")`).length > 0 ? true : false;
      
      // Calling the AI
      const prompt =`
      
        Website characteristics: 
          has_a_form = true
          has_dangerous_words = true
          asks_for_creditcard = true
          asks_for_login_details = true
        
        According to the registered website characteristics return a json specifying wheter the website is dangerous. The permitted values are only numbers from 0 to 100 which define a percentage.  You are only allowed to respond with the format specified below. 
        Format your response as follows: {'phising':'some_number','defacing':'some_number','scam':'some_number'}`

      openai.completions
      .create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 50,
        temperature: 0,
      })
      .then((response) => res.send(response.choices[0].text));
    });
  });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
