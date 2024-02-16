import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';

const environment: {[key: string]: 'development' | 'production'} = {
  development: 'development',
  production: 'production',
};

dotenvConfig();

const envFile = dotenvConfig().parsed;
const envJsonPath = './env.json';
const isProduction = process.argv.slice(2)[0] === environment.production ?? false;
const { development, production } = environment;

const env: { [key: string]: string } = {
  ENV: isProduction ? production : development,
  ...envFile,
};

try {
  fs.writeFileSync(envJsonPath, JSON.stringify(env, null, 2));
} catch (error) {
  console.error('Something went wrong during env.json build', { error });
}