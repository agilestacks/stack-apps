import { gimme } from '../lib/gimme';

export default (req, res) => {
  const { query: { howmany } } = req;
  res.status(200).json(gimme(Number.parseInt(howmany, 10)));
};
