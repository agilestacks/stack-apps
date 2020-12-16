import { Client } from 'pg';

const MAX_HISTORY_LENGTH = 7;
const keywordsHistory = [];

function random(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}

function sample(values, howmany = 1) {
  const res = [];
  let tries = 0;
  while (res.length < howmany && tries < values.length) {
    const word = values[random(values.length - 1)];
    if (!keywordsHistory.includes(word)) {
      keywordsHistory.unshift(word);
      keywordsHistory.splice(MAX_HISTORY_LENGTH, keywordsHistory.length);

      res.push(word);
      tries = 0;
    }
    tries += 1;
  }

  return res.length > 0 ? res : keywordsHistory.slice(0, 3);
}

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '5432',
  DB_USER = 'root',
  DB_PASSWORD = 'secret',
  DB_NAME = 'postgres',
} = process.env;

export async function gimme(howmany) {
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  await client.connect();
  const { rows: words } = await client.query('SELECT * FROM words;');
  await client.end();

  return sample(words.map(({ word }) => word), howmany);
}

export default gimme;
