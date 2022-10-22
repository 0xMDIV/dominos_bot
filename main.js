const telegram = require('telegraf');
const cron = require("node-cron");
const rp = require('request-promise');
const cheerio = require('cheerio');
const config = require('./config.json');
const url = config.dominos_url;
const coupon = {'code': ""};

function get_coupon() {
    rp(url)
    .then(function(html) {
        const $ = cheerio.load(html);
        test = [];
        code = $('#wrapper > div.de > div > div.umb-grid > div > div:nth-child(3) > div > div > div > div > h1 > a', html)[0].attribs.href;
        coupon.code = code.split("=")[1];
        console.log(`Last coupon code: ${coupon.code}`);
    })
    .catch(e=>{
        // handle error
        console.error(e);
    })
}


if(config.bot.token === undefined) {
    throw new Error("Bot Token must be provided");
}
const bot = new telegram.Telegraf(config.bot.token);

// run every 8 hours: https://crontab.guru/every-8-hours
cron.schedule(
    `0 */8 * * *`,
    function () {
        get_coupon();
    },
    {
        timezone: "Europe/Berlin",
    }
);


bot.command("code", (ctx) => ctx.reply(`Source Code: https://github.com/0xMDIV/dominos_bot`));
bot.command("coupon", (ctx) => ctx.reply(`Current Code: ${coupon.code}`));

bot.launch().then(get_coupon());
console.log("Bot started");

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));