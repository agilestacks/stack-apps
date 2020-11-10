export const Colors = {
  Orange: 'orange',
  Red: 'red',
  Blue: 'blue',
  Green: 'green',
};

export const KEYWORDS_URL = '/api/gimme';

export const MAX_HISTORY_LENGTH = 7;

function random(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}

export function sample(values) {
  return values[random(values.length - 1)];
}
