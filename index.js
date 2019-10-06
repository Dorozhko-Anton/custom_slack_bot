var SlackBot = require('slackbots');
var request  = require("request")
// var Twit     = require("twit")

const envKey = process.env.CUSTOM_BOT_TOKEN
const interval = process.env.INTERVAL * 1000
const twitter_id = process.env.TWITTER_ID 

// twitter interface 

// const T = new Twit({
//   consumer_key: process.env.CONSUMERKEY,
//   consumer_secret: process.env.CONSUMERSECRET,
//   access_token: process.env.ACCESSTOKEN,
//   access_token_secret: process.env.ACCESSTOKENSECRET,
//   timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
// });

// const getAccountsLastActivity = (id) => {

//   return new Promise( (resolve) => {

//     T.get('statuses/lookup', {
//       id: ids
//     }, (twitterErr, twitterData) => {

//       if (twitterErr) {
//         resolve(twitterErr);
//       } else {
//         resolve(twitterData);
//       }

//   }) 
// }


// create a bot
var bot = new SlackBot({
    token: envKey, // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'Custom bot'
});

bot.on("message", msg => {
    switch (msg.type) {
    case "message":
      if (msg.channel[0] === "D" && msg.bot_id === undefined) {
        getRandomJoke(postMessage, msg.user)
      }
      break
    }
  })

  const getRandomJoke = (callback, user) => {
    return request("https://icanhazdadjoke.com/slack", (error, response) => {
      if (error) {
        console.log("Error: ", error)
      } else {
        let jokeJSON = JSON.parse(response.body)
        let joke = jokeJSON.attachments[0].text
        return callback(joke, user)
      }
    })
  }

  const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
  }

bot.on("start", () => {

  console.log("Start PR bot ...");

  setInterval(() => {
    // check twitter last message 

    // print that information as message to #random channel
    var params = {
      icon_emoji: ':cat:'
    };
  
    bot.postMessageToChannel('random', 'meow!', params);

  }, interval)
})