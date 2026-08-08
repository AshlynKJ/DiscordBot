import 'dotenv/config';
import {InstallGlobalCommands} from './utils.js';

const HI_COMMAND = {
  name: 'hi',
  description: 'Basic hello command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const SHOULDI_COMMAND = {
  name: 'shouldi',
  description: 'Randomly answer yes or no to a question',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ROLL_D6_COMMAND = {
  name: 'rolld6',
  description: 'Roll a six-sided die',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const RIGHTORLEFT_COMMAND = {
  name: 'rightorleft',
  description: 'Direct the user to go right or left', 
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const IDK_COMMAND = {
  name: 'idk',
  description: 'For when you don\'t know what command to use',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const IDKSPECIAL_COMMAND = {
  name: 'idkspecial',
  description: 'For when you don\'t know what command to use but special',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


const ALL_COMMANDS = [HI_COMMAND, SHOULDI_COMMAND, ROLL_D6_COMMAND, RIGHTORLEFT_COMMAND, IDK_COMMAND, IDKSPECIAL_COMMAND];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);