//fetch('https://gnews.io/api/v4/{endpoint}?token=API-Token');

const fetch = require("node-fetch"); // node fetch api
require('dotenv').config();
const aws = require('./write');


//--------- Get current and two days back date time string in ISO ------------
let toDate = new Date().toISOString();
let fromDate = new Date();
fromDate.setDate(fromDate.getDate()-2);
fromDate.toISOString();



//-------- Build the URL with encoding as per the api requirements -----------
let url = `https://gnews.io/api/v4/search?token=${process.env.ApiKey}`;
const params = {q:'covid', lang:'en', country:'ca', page: 2, from:fromDate, to:toDate};
const encodeGetParams = p => 
  Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
url = url +'&'+ encodeGetParams(params);
//console.log(aws.save);


// aws.save({
//     "title": "test save"
// })

//---------- async fn to fetch data from the news api ---------------

const fetchData = async (endpoint)=>{
    try {    
        const data = await fetch(endpoint);
        const news = await data.json();
        console.log(typeof news.articles);

        //let awsInput = [];

        news.articles.forEach((article) => {
            let inp = {
                title: article.title,
                url : article.url,
                date : article.publishedAt,
                publicationName: article.source.name
            }
            //inp = JSON.stringify(inp);
            //console.log(inp);
            aws.save(inp)
        });

    } catch (error) {
        console.log(error);
        allNewsArticles = error;
    }
}
//------------ fetch and write to AWS DB -------------
fetchData(url);



