const fs = require('fs').promises;
const Comments = require('parse-comments');
const comments = new Comments();

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const botStart = `
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const logs = require("../");
logs(client);

client.on("ready", () => {
    console.log("Ready. Logged as "+client.user.tag+" in "+client.guilds.cache.size+" servers.");
});
`;
const botEnd = `
client.login(process.env.TOKEN);
`;
let botContent = '';

(async () => {
    const handlersFiles = await fs.readdir('./handlers');
    await asyncForEach(
        handlersFiles.filter((f) => f.split('.')[0] !== 'index'),
        async (handler) => {
            const handlerContent = await fs.readFile(`./handlers/${handler}`, 'utf-8');
            const parsedComments = comments.parse(handlerContent);
            const handlerTitle = parsedComments[0].tags.find((tag) => tag.title === 'handler').description;
            const handlerDescription = `Events related to the ${
                parsedComments[0].tags.find((tag) => tag.title === 'related').description
            } event.`;
            botContent += `\n/* ${handlerTitle} */\n// ${handlerDescription}`;
            parsedComments.forEach((blockComment) => {
                botContent += '\n' + (blockComment.examples[0] ? blockComment.examples[0].value.slice(1) : '');
            });
        },
    );
    fs.writeFile('./tests/test.js', `${botStart}${botContent}${botEnd}`, 'utf-8');
})();
