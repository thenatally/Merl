import { Client, GatewayIntentBits, Partials, Events } from "discord.js";

const token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

const strings = [
    "Your last message contains language that violates our content policy. Please reword your response.",
    "I don't know.",
]
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (!message.guild) {
    await message.reply(strings[Math.floor(Math.random() * strings.length)]);
    return;
  }

  if (message.mentions.has(client.user as any)) {
    await message.reply(strings[Math.floor(Math.random() * strings.length)]);
  }
});

client.login(token).catch((err) => {
  console.error("Failed to login:", err);
});
