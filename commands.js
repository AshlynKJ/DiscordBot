import 'dotenv/config';
import InstallGlobalCommands from './utils.js';

const HI_COMMAND = {
  name: 'Hi',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [HI_COMMAND];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);