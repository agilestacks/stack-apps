exports.up = (db) => db.createTable('words', {
  id: {
    type: 'int',
    unsigned: true,
    primaryKey: true,
    autoIncrement: true,
  },
  word: {
    type: 'string',
    notNull: true,
  },
});

exports.down = (db) => db.dropTable('words');

// eslint-disable-next-line no-underscore-dangle
exports._meta = {
  version: 1,
};
