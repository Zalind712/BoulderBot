const Discord = require('discord.js');
const FileSystem = require('fs');
const Boulder = require('./boulder.js');
const TrackingItem = require('./trackingItem.js');
const client = new Discord.Client();
const boulder = new Boulder();

/**
 * The symbol used to determine which message is a command for the bot
 */
const Prefix = '!';

var guildList = [], userList = [];

/**
 * Checks folder for guild files and loads them if any exist.
 */
async function loadGuildFiles() {
    const files = await FileSystem.promises.readdir('./guilds');
    
    for (const file of files) {
        FileSystem.readFile(`./guilds/${file}`, 'utf-8',  (err, data) => {
            if (err){
                console.log(err);
            } 
            let jsonData = JSON.parse(data.toString()),
                guild = new TrackingItem(jsonData.ID, jsonData.type);

            guild.loadData(jsonData);
            guildList[guild.ID] = guild;
            console.log(`Loaded guild ${guild.ID}`);
        });
    }
}

/**
 * Checks folder for user files and loads them if any exist
 */
async function loadUserFiles() {
    const files = await FileSystem.promises.readdir('./users');
    
    for (let file of files) {
        FileSystem.readFile(`./users/${file}`, 'utf-8',  (err, data) => {
            if (err){
                console.log(err);
            } 
            let jsonData = JSON.parse(data.toString())
                user = new TrackingItem(jsonData.ID, jsonData.type);

            user.loadData(jsonData);
            userList[user.ID] = user;
            console.log(`Loaded user ${user.ID}`);
        });
    }
}

/**
 * Login was successful
 */
client.once('ready', () => {
    console.log('Connected to Discord Servers');
    console.log('Fetching guild files...');
    loadGuildFiles();
    console.log('Fetching user files...');
    loadUserFiles();
    console.log('===Ready to Recieve Commands===');
});

/**
 * A message was sent to the bot or in a channel that the bot is a part of
 */
client.on('message', msg => {
    let guild = new TrackingItem(), 
    user = new TrackingItem();

    // skip bot messages
    if (msg.member.id == {BOT_MEMBER_ID_HERE}) return;

    // if this is the first time this server had a message create new guild
    if (!guildList[msg.channel.guild.id]){
        guild = new TrackingItem(msg.channel.guild.id, 'guild');
        guildList[guild.ID] = guild;
        guild.save()
    }
    guild = guildList[msg.channel.guild.id];

    // if this is the first time this user sent a message create new user
    if (!userList[msg.member.id]) {
        user = new TrackingItem(msg.member.id, 'user');
        userList[user.ID] = user;
        user.save()
    }
    user = userList[msg.member.id];

    // keeps track of people being left in the rain
    if (msg.content.includes(':feelsrainman:')) {
        if (!user.rainCount) user.rainCount = 0;
        if (!guild.rainCount) guild.rainCount = 0;
        user.rainCount++;
        guild.rainCount++;
    }

    // check if the bot feels like mocking the user
    let mocked = boulder.mockMessage(msg.content, user.ID);
    if (mocked.message) msg.channel.send(mocked.message);

    // filter out bot commands
    if (msg.content[0] == Prefix && msg.content.length > 1){
        //seperate command from prefix
        let command = msg.content.split(Prefix)[1],
            params, package;

        // check if command came with parameters
        if (command.split(' ')[1]) {
            params = command.split(' ')[1];
            command = command.split(' ')[0];
        }

        // check what command
        switch (command.toLowerCase()) {
            case 'realunits':
                package = boulder.realUnits(params);
                msg.channel.send(package.message);
                break;

            case 'freedomunits':
                package = boulder.freedomUnits(params);
                msg.channel.send(package.message);
                break;

            case 'freedom':
                package = boulder.freedomUnits(params);
                msg.channel.send(package.message);
                break;

            case 'uhc':
                package = boulder.uhcDay();
                msg.channel.send(package.message, {files:[package.image]});
                break;

            case 'stephenmeme': 
                package = boulder.stephenMeme();
                msg.channel.send(client.emojis.cache.find(emoji => emoji.name === 'stephenW'), {files:[package.image]});
                break;

            case 'getin':
                package = boulder.getIn();
                msg.channel.send({files:[package.image]});
                break;

            case 'vibecheck':
                package = boulder.vibeCheck();
                msg.channel.send(package.message);
                guild.updateVibes(package.level);
                user.updateVibes(package.level);
                user.vibeLevel = package.level;
                break;

            case 'guildstats':
                if (params.toLowerCase() == 'vibecheck') msg.channel.send(`This servers vibecheck stats\n${guild.vibeCheckStats()}`);
                else if (params.toLowerCase() == 'raincount') msg.channel.send(`${guild.rainCheckStats()} ${client.emojis.cache.find(emoji => emoji.name === 'feelsrainman')}`);
                else msg.channel.send(`No guild stats for command ${params}`);
                break;

            case 'userstats':
                let target; 

                if (msg.mentions.members.first()){
                    target = userList[msg.mentions.members.first().id];

                    if (!target) {
                        target = new TrackingItem(msg.mentions.members.first().id, 'user');
                    }
                } else {
                    target = user;
                }

                if (params.toLowerCase() == 'vibecheck') msg.channel.send(`<@${target.ID}>\'s vibecheck stats\n${target.vibeCheckStats()}`);
                else if (params.toLowerCase() == 'raincount') msg.channel.send(`${target.rainCheckStats()} ${client.emojis.cache.find(emoji => emoji.name === 'feelsrainman')}`);
                else msg.channel.send(`No user stats for command ${params}`);
                break;

            case 'badchoices':
                msg.channel.send({files:[boulder.badDecisions().image]});
                break;
            
            // rythm bot command
            case 'play':
                break;
            
            // rythm bot command
            case 'skip':
                break;

            default:
                msg.channel.send('Command not found');
                break;
        }
    }
    user.save();
    guild.save();
});

// provide bot token here
client.login({TOKEN_PLACEHOLDER});