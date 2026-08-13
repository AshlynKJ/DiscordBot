import 'dotenv/config';

/*
 * For the discord API.
 */
export async function DiscordRequest(endpoint, options) {
  const url = 'https://discord.com/api/v10/' + endpoint;
  if (options.body) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/AshlynKJ/DiscordBot, 1.0.0)',
    },
    ...options
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return res;
}

/*
 * For the pokemon API.
 */
async function PokeRequest(endpoint) {
  const url = 'https://pokeapi.co/api/v2/' + endpoint;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return await res.json();
}

/*
*Funct for the yesNo command, returns yes or no randomly.
*/
export function yesno() {
  return Math.random() < 0.5 ? 'Yes' : 'No';
}

/*
*Funct for the rightLeft command, returns right or left randomly.
*/
export function rightleft() {
  return Math.random() < 0.5 ? 'Right' : 'Left';
}

/*
*Funct for the rollD6 command, returns a random number between 1 and 6.
*/
export function d6() {
  return Math.floor(Math.random() * 6) + 1;
}

/*
*Funct for the idk command, returns a random command from the list.
*/
export function randomcommand() {
  const commands = ['hi', 'shouldi', 'rolld6', 'rightorleft', 'idk'];
  return commands[Math.floor(Math.random() * commands.length)];
}

/*
*Funct for the random command utility, returns a random command and its response.
*/
function rc() {
  const commands = ['hi', 'shouldi', 'rolld6', 'rightorleft', 'idk'];
  return commands[Math.floor(Math.random() * commands.length)];
}

/*
*Funct for the idk special command, returns a random command's response.
*/
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

export async function showDitto() {
  const data = await PokeRequest('pokemon/ditto');
  
  return(data.sprites.front_default); 
}

export async function showimage(input) {
  const safeInput = String(input).toLowerCase();
  const data = await PokeRequest(`pokemon/${safeInput}`);
  return(data.sprites.front_default);
}


/*
* Uses Put to overwrite the global comand list with provided commands.
 */
export async function GlobalCommands(appId, commands) {
  const endpoint = `applications/${appId}/commands`;

  try {
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}
