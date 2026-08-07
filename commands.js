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

const ALL_COMMANDS = [HI_COMMAND, SHOULDI_COMMAND];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);