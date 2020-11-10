import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Colors, KEYWORDS_URL, sample,
} from '../common';
import Keywords from '../Keywords/Keywords';

function Tile({ color, onHover }) {
  return (
    <div
      className={`asi-tile asi-tile-${color}`}
      onFocus={() => onHover(Date.now())}
      onMouseOver={() => onHover(Date.now())}
    />
  );
}

Tile.propTypes = {
  color: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default function RubiksCube({ initWords }) {
  const [words, setWords] = useState(initWords);
  const [timestamp, setTimestamp] = useState(Date.now());
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let timeoutId = null;
    (async () => {
      try {
        setWords(
          words.map((word) => ({
            ...word,
            loading: true,
            flash: false,
          })),
        );
        const response = await fetch(`${KEYWORDS_URL}?howmany=${initWords.length}&timestamp=${timestamp}`, { signal });
        const newWords = await response.json();
        setWords(
          newWords.map((word) => ({
            word,
            color: sample(Object.values(Colors)),
            loading: false,
            flash: true,
          })),
        );
        timeoutId = setTimeout(() => {
          setWords(
            newWords.map((word, idx) => ({
              ...words[idx],
              word,
              loading: false,
              flash: false,
            })),
          );
        }, 100);
      } catch (err) {
        clearTimeout(timeoutId);
        setWords(
          words.map((word) => ({
            ...word,
            loading: false,
            flash: false,
          })),
        );
      }
    })();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [timestamp]);

  return (
    <>
      <Keywords words={words} />
      <div className="asi-cube-ex">
        <div className="asi-cube-ex-parts">
          <div className="asi-cube-ex-part asi-cube-ex-roof">
            <div className="asi-layer">
              <div className="asi-layer-face asi-layer-face-top">
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
                <Tile color={Colors.Orange} onHover={setTimestamp} />
              </div>
              <div className="asi-layer-face asi-layer-face-right">
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
              </div>
              <div className="asi-layer-face asi-layer-face-left">
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
              </div>
            </div>
          </div>
          <div className="asi-cube-ex-part asi-cube-ex-base">
            <div className="asi-layer">
              <div className="asi-layer-face asi-layer-face-top">
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
                <Tile color={Colors.Green} onHover={setTimestamp} />
              </div>
              <div className="asi-layer-face asi-layer-face-right">
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
                <Tile color={Colors.Red} onHover={setTimestamp} />
              </div>
              <div className="asi-layer-face asi-layer-face-left">
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
                <Tile color={Colors.Blue} onHover={setTimestamp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RubiksCube.propTypes = {
  initWords: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      color: PropTypes.string,
      loading: PropTypes.bool,
      flash: PropTypes.bool,
    }),
  ),
};

RubiksCube.defaultProps = {
  initWords: [],
};
