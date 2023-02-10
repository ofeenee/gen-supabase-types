#!/usr/bin/env node

import { execSync } from 'node:child_process';
import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env);

const [first, second, third, forth, fifth] = process.argv;
console.log({ first, second, third, forth, fifth });

const DatabaseURLVariableName = third;
const DatabaseURL = third === '--db-url' ? forth : process.env[DatabaseURLVariableName || 'SUPABASE_DATABASE_URL'];
// console.log(`Database URL variable name: ${DatabaseURL}`);

if (!DatabaseURL) {
  console.error(`Database URL not found in environment variable ${DatabaseURLVariableName}`);
  process.exit(1);
}

execSync(`supabase gen types typescript --db-url ${DatabaseURL} > ./supabase.types.ts --debug`, {
  stdio: 'inherit',
});
