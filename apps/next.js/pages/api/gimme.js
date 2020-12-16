import { gimme } from '../../lib/gimme';

export default async (req, res) => {
  const { query: { howmany } } = req;
  try {
    const words = await gimme(Number.parseInt(howmany, 10));
    res.status(200).json(words);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
