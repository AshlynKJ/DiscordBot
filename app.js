import 'dotenv/config';
import express from 'express';
import {yesno, d6, rightleft, randomcommand, rcutil, showDitto, showimage} from './functions.js';
import {
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';

/*
*Create an express app and desginate port, defult is 3000.
*/
const app = express();
const PORT = process.env.PORT || 3000;

/*
 * For sending and verifying requests.
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  const { id, type, data } = req.body;

  /*
   * For the varification requests.
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * For slash command requests.
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "hi" command
    if (name === 'hi') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `Hi there!`
            }
          ]
        },
      });
    }

    // "shouldi" command
    if (name === 'shouldi') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `${yesno()}`
            }
          ]
        },
      });
    }

    // "rolld6" command
    if (name === 'rolld6') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `${d6()}`
            }
          ]
        },
      });
    }

    // "rightorleft" command
    if (name === 'rightorleft') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `${rightleft()}`
            }
          ]
        },
      });
    }

    // "idk" command
    if (name === 'idk') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `Use /${randomcommand()}`
            }
          ]
        },
      });
    }

    // "idkspecial" command
    if (name === 'idkspecial') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `${rcutil()}`
            }
          ]
        },
      });
    }

    // "ditto" command
    if (name === 'ditto') {
      return async function() {
        const dittoData = await showDitto();
        const safeContent = dittoData.slice(0, 1900); 
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: safeContent
          },
        });
      }();
    }

    // "test" command
    if (name === 'test') {
      const userInput = req.body.data.options?.find(opt => opt.name === 'input')?.value || 'No input provided';
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: `You said: ${userInput}`
            }
          ]
        },
      });
    }
    
    // "image" command
    if (name === 'image') {
      const userInput = req.body.data.options?.find(opt => opt.name === 'pkmn')?.value
      return async function() {
        const imageData = await showimage(userInput);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: imageData
          },
        });
      }();
    }


    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});