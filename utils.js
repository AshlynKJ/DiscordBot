import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/AshlynKJ/DiscordBot, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export function yesno() {
  return Math.random() < 0.5 ? 'Yes' : 'No';
}

export function rightleft() {
  return Math.random() < 0.5 ? 'Right' : 'Left';
}

export function d6() {
  return Math.floor(Math.random() * 6) + 1;
}

export function randomcommand() {
  const commands = ['hi', 'shouldi', 'rolld6', 'rightorleft', 'idk'];
  return commands[Math.floor(Math.random() * commands.length)];
}

function rc() {
  const commands = ['hi', 'shouldi', 'rolld6', 'rightorleft', 'idk'];
  return commands[Math.floor(Math.random() * commands.length)];
}

export function rcutil() {
  const command = rc();
  if (command === 'hi') {
    return `Hi there!`;
  } else if (command === 'shouldi') {
    return `${yesno()}`;
  } else if (command === 'rolld6') {
    return `${d6()}`;
  } else if (command === 'rightorleft') {
    return `${rightleft()}`;
  } else {
    return `Use /${rc()}`;
  }
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}
