const WORDS = [
  'helm', 'kustomize', 'kubernetes', 'aws', 'gcp', 'azure',
  'terraform', 'docker', 'shell', 'vault', 'istio',
];

const MAX_HISTORY_LENGTH = 7;
const keywordsHistory = [];

function random(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}

function sample(values, howmany = 1) {
  const res = [];
  while (res.length < howmany) {
    const word = values[random(values.length - 1)];
    if (!keywordsHistory.includes(word)) {
      keywordsHistory.unshift(word);
      keywordsHistory.splice(MAX_HISTORY_LENGTH, keywordsHistory.length);

      res.push(word);
    }
  }

  return res;
}

export function gimme(howmany) {
  return sample(WORDS, howmany);
}

export default gimme;
