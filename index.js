const { Client } = require("replit-test123");
const express = require("express");
const app = express();
const config = require("./config.json");

const data = process.env.TOKEN;
if (!data) throw new Error(`Unable to find your tokens.`);
const tokensAndSpamIds = data.split(/\s+/);
config.tokens = [];

for (let i = 0; i < tokensAndSpamIds.length; i += 3) {
  if (tokensAndSpamIds[i + 1]) {
    const token = tokensAndSpamIds[i].trim();
    const spamId = tokensAndSpamIds[i + 1].trim();
    const spamId1 = tokensAndSpamIds[i + 2].trim();

    if (token && spamId && spamId1) {
      config.tokens.push({ token, spamId, spamId1 });
    }
  }
}

app.get("/", async function (req, res) {
  res.send(`Currently running on ${config.tokens.length} account(s)!`);
});

app.listen(20040, async () => {
  console.log(`Server Status: ONLINE`);
});

async function Login(token, Client, spamId, spamId1) {
  if (!token) console.log(`You must specify a (valid) token. ${token} is invalid.`);
  if (!spamId) console.log(`You must specify a (valid) spam ID for your ${token}`);

  const client = new Client({ checkUpdate: false, readyStatus: false });

  client.on("ready", async () => {
    console.log(`Logged in to ${client.user.tag} !`);
    client.user.setStatus("online");
    accountCheck = client.user.username;

    async function interval(intervals) {
      const randomDigits = Array(7).fill().map(() => Math.floor(Math.random() * 10));
      const message = randomDigits.join('') + randomDigits.join('') + randomDigits.join('');
      
      await spamChannel.send(message);
      await spamChannel1.send(message);
    }

    const spamChannel = client.channels.cache.get(spamId);
    await sleep(1000)
    const spamChannel1 = client.channels.cache.get(spamId1);
    if (spamChannel.size === 0) throw new Error(`Couldn't find a channel called 'spam' in the server for ${client.user.username}. Please create one.`);

    intervals = 4000
    setInterval(() => interval(intervals), intervals);

    setInterval(() => {
      intervals = 4000
    }, 30000);
  });

  client.on('messageCreate', async (message) => {
    if (message.channel.name.includes('incense')) return;
    if (message.guild.name.includes('Boost') && message.content.includes('Rare Ping') || message.content.includes('Shiny Hunt Ping') || message.content.includes('Shiny hunt pings') || message.content.includes('Collection Ping') || message.content.includes('Collection pings') || message.content.includes('Quest Pings') || message.content.includes('Quest pings') || message.content.includes('Regional Ping') || message.content.includes('Rare Ping') || message.content.includes('Type pings')) {
      await message.channel.send("!lock")
    }
  });

  client.login(token).catch((err) => {
    console.log(`[ERROR] Invalid token ${token}`)
  });
}

start()

async function start() {
  for (var i = 0; i < config.tokens.length; i++) {
    await Login(config.tokens[i].token, Client, config.tokens[i].spamId);
  }
}

process.on("unhandledRejection", (reason, p) => {
  const ignoreErrors = [
    "MESSAGE_ID_NOT_FOUND",
    "INTERACTION_TIMEOUT",
    "BUTTON_NOT_FOUND",
  ];
  if (ignoreErrors.includes(reason.code || reason.message)) return;
  console.log(" [Anti Crash] >>  Unhandled Rejection/Catch");
  console.log(reason, p);
});

process.on("uncaughtException", (e, o) => {
  console.log(" [Anti Crash] >>  Uncaught Exception/Catch");
  console.log(e, o);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [AntiCrash] >>  Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});

process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [AntiCrash] >>  Multiple Resolves");
  console.log(type, promise, reason);
});

function sleep(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
};
