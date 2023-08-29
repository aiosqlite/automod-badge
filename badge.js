const { exec } = require('child_process');
exec('npm list discord.js', (error, stdout, stderr) => {
    if (error) {
        exec('npm install discord.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            const Discord = require('discord.js');
            const { Client, GatewayIntentBits } = require('discord.js');
            const client = new Client({
                intents: [Object.values(GatewayIntentBits)],
            });
            const readline = require('readline');

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            async function login() {
                console.clear();
                console.log(` ██ ▄█▀▓█████  ██▀███   ▒█████   ███▄    █ `);
                console.log(` ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒▒██▒  ██▒ ██ ▀█   █ `);
                console.log(`▓███▄░ ▒███   ▓██ ░▄█ ▒▒██░  ██▒▓██  ▀█ ██▒`);
                console.log(`▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  ▒██   ██░▓██▒  ▐▌██▒`);
                console.log(`▒██▒ █▄░▒████▒░██▓ ▒██▒░ ████▓▒░▒██░   ▓██░`);
                console.log(`▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒░   ▒ ▒ `);
                console.log(`░ ░ ░ ░ ░  ░  ░ ░░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░   `);
                console.log(`░ ░░ ░    ░     ░░   ░ ░ ░ ░      ░   `);
                console.log(`░  ░      ░  ░   ░         ░ ░           ░   `);
                
                rl.question('\nEnter Discord Bot Token: ', async (token) => {
                    try {
                        await client.login(token);
                        console.log(`${client.user.tag} is now up cuh`);
                        for (const guild of client.guilds.cache.values()) {
                            try {
                                const created = await createRules(guild);
                                console.log(`${created} rules have been created in ${guild.name}`);
                            } catch (e) {
                                if (e instanceof Discord.DiscordAPIError && e.code === 50013) {
                                    console.log(`lack of permissions in ${guild.name}`);
                                } else {
                                    console.error(e);
                                }
                            }
                        }
                    } catch (e) {
                        if (e instanceof Discord.DiscordAPIError && e.code === 4004) {
                            console.log('Invalid Discord Bot Token, restarting script...');
                            setTimeout(() => login(), 1000);
                        } else {
                            console.error(e);
                            setTimeout(() => login(), 1000);
                        }
                    }
                });
            }

            try {
                login();
            } catch (e) {
                console.error(e);
                setTimeout(() => login(), 1000);
            }
        });
    } else {
        const Discord = require('discord.js');
        const { Client, GatewayIntentBits } = require('discord.js');
        const client = new Client({
            intents: [Object.values(GatewayIntentBits)],
        });
        const readline = require('readline');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        async function login() {
            console.clear();
            console.log(` ██ ▄█▀▓█████  ██▀███   ▒█████   ███▄    █ `);
            console.log(` ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒▒██▒  ██▒ ██ ▀█   █ `);
            console.log(`▓███▄░ ▒███   ▓██ ░▄█ ▒▒██░  ██▒▓██  ▀█ ██▒`);
            console.log(`▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  ▒██   ██░▓██▒  ▐▌██▒`);
            console.log(`▒██▒ █▄░▒████▒░██▓ ▒██▒░ ████▓▒░▒██░   ▓██░`);
            console.log(`▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒░   ▒ ▒ `);
            console.log(`░ ░ ░ ░ ░  ░  ░ ░░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░   `);
            console.log(`░ ░░ ░    ░     ░░   ░ ░ ░ ░      ░   `);
            console.log(`░  ░      ░  ░   ░         ░ ░           ░   `);
            
            rl.question('\nEnter Discord Bot Token: ', async (token) => {
                try {
                    await client.login(token);
                    console.log(`${client.user.tag} is now up cuh`);
                    for (const guild of client.guilds.cache.values()) {
                        try {
                            const created = await createRules(guild);
                            console.log(`${created} rules have been created in ${guild.name}`);
                        } catch (e) {
                            if (e instanceof Discord.DiscordAPIError && e.code === 50013) {
                                console.log(`lack of permissions in ${guild.name}`);
                            } else {
                                console.error(e);
                            }
                        }
                    }
                } catch (e) {
                    if (e instanceof Discord.DiscordAPIError && e.code === 4004) {
                        console.log('Invalid Discord Bot Token, restarting script...');
                        setTimeout(() => login(), 1000);
                    } else {
                        console.error(e);
                        setTimeout(() => login(), 1000);
                    }
                }
            });
        }

        try {
            login();
        } catch (e) {
            console.error(e);
            setTimeout(() => login(), 1000);
        }
    }
});
async function createRules(guild) {
    let autorules = await guild.autoModerationRules.fetch();
    let created = 0;
    let type1 = autorules.filter(rule => rule.triggerType === 1);
    let type3 = autorules.filter(rule => rule.triggerType === 3);
    let type4 = autorules.filter(rule => rule.triggerType === 4);
    let type5 = autorules.filter(rule => rule.triggerType === 5);
    let type = 1;
    for (let i = 0; i < 6 - type1.size; i++) {
        await guild.autoModerationRules.create({
            name: 'lavish',
            enabled: false,
            actions: [{type: 1}],
            eventType: 1,
            triggerType: type,
            triggerMetadata: {
                mentionTotalLimit: 3,
                mentionRaidProtectionEnabled: 1,
            },
            reason: 'automod system test'
        });
        created++;
    }
    type = 3;
    if (!type3.size) {
        await guild.autoModerationRules.create({
            name: 'lavish',
            enabled: false,
            actions: [{type: 1}],
            eventType: 1,
            triggerType: type,
            triggerMetadata: {
                mentionTotalLimit: 1,
                mentionRaidProtectionEnabled: 1,
            },
            reason: 'automod system test'
        });
        created++;
    }
    type = 4;
    if (!type4.size) {
        await guild.autoModerationRules.create({
            name: 'lavish',
            enabled: false,
            actions: [{type: 1}],
            eventType: 1,
            triggerType: type,
            triggerMetadata: {
                mentionTotalLimit: 1,
                mentionRaidProtectionEnabled: 1,
            },
            reason: 'automod system test'
        });
        created++;
    }
    type = 5;
    if (!type5.size) {
        await guild.autoModerationRules.create({
            name: 'lavish',
            enabled: false,
            actions: [{type: 1}],
            eventType: 1,
            triggerType: type,
            triggerMetadata: {
                mentionTotalLimit: 1,
                mentionRaidProtectionEnabled: 1,
            },
            reason: 'automod system test'
        });
        created++;
    }
    return created;
}
