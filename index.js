#!/usr/bin/env node

import { execSync } from 'node:child_process';
import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env);

const [first, second, ...rest] = process.argv;

// console.log(rest);

// console.log({ first, second, third, forth, fifth });

// const DatabaseURLVariableName = third;

const defaultConfig = {
  '--env-var': 'SUPABASE_DATABASE_URL',
  '--db-url': '',
  '--save-path': './supabase.types.ts',
  '--debug': true,
};

const overwriteConfig = getConfigFromEnv(rest);


const config = { ...defaultConfig, ...overwriteConfig };

// console.log({ default: defaultConfig, overwrite: overwriteConfig, current: config });

const DatabaseURL = process.env[config['--db-url'] || config['--env-var']];
const debug = config['--debug'];

// console.log(`Database URL variable name: ${DatabaseURL}`);

if (!DatabaseURL) {
  console.error(`Database URL not found: ${DatabaseURLVariableName}`);
  process.exit(1);
}

execSync(`supabase gen types typescript --db-url ${DatabaseURL} > ${config['--save-path']} ${debug ? '--debug' : ''}`, {
  stdio: 'inherit',
});


function getConfigFromEnv(cmdFlags = []) {
  const config = {};
  if (!cmdFlags.length) return;

  for (const flag of Object.keys(defaultConfig)) {
    if (cmdFlags.includes(flag)) {
      const index = cmdFlags.indexOf(flag);
      config[flag] = cmdFlags[index + 1];
      if (config[flag] === 'true' || config[flag] === 'false') {
        config[flag] = config[flag] === 'true';
      }
    }
  }

  return config;
}
