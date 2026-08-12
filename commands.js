import 'dotenv/config';
import {GlobalCommands} from './functions.js';

// "hi" command
const HI_COMMAND = {
  name: 'hi',
  description: 'Basic hello command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// "shouldi" command
const SHOULDI_COMMAND = {
  name: 'shouldi',
  description: 'Randomly answer yes or no to a question',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// "rolld6" command
const ROLL_D6_COMMAND = {
  name: 'rolld6',
  description: 'Roll a six-sided die',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// "rightorleft" command
const RIGHTORLEFT_COMMAND = {
  name: 'rightorleft',
  description: 'Direct the user to go right or left', 
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// "idk" command
const IDK_COMMAND = {
  name: 'idk',
  description: 'For when you don\'t know what command to use',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// "idkspecial" command
const IDKSPECIAL_COMMAND = {
  name: 'idkspecial',
  description: 'For when you don\'t know what command to use but special',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


const ALL_COMMANDS = [HI_COMMAND, SHOULDI_COMMAND, ROLL_D6_COMMAND, RIGHTORLEFT_COMMAND, IDK_COMMAND, IDKSPECIAL_COMMAND];
GlobalCommands(process.env.APP_ID, ALL_COMMANDS);