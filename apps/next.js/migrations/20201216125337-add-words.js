const data = [
  'helm',
  'kustomize',
  'kubernetes',
  'aws',
  'gcp',
  'azure',
  'terraform',
  'docker',
  'shell',
  'vault',
  'istio',
];

exports.up = (db) => Promise.all(
  data.map((word) => db.insert('words', ['word'], [word], null)),
);

// eslint-disable-next-line no-underscore-dangle
exports._meta = {
  version: 1,
};
