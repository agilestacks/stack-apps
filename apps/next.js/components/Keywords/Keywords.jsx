import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Keyword({
  word, color, loading, flash, last,
}) {
  return (
    <>
      <span
        className={classNames(
          'asi-teaser-keyword',
          `asi-teaser-keyword-${color}`,
          {
            'asi-teaser-keyword-loading': loading,
            'asi-teaser-keyword-flash': flash,
          },
        )}
      >
        {word}
      </span>
      {!last && '+'}
    </>
  );
}

Keyword.propTypes = {
  word: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  flash: PropTypes.bool,
  last: PropTypes.bool,
};

Keyword.defaultProps = {
  loading: false,
  flash: false,
  last: false,
};

export default function Keywords({ words }) {
  return (
    <>
      <h2 className="asi-teaser-keywords">
        {
                    words.map(({
                      word, loading, color, flash,
                    }, idx) => (
                      <Keyword
                        key={word}
                        word={word}
                        color={color}
                        loading={loading}
                        flash={flash}
                        last={idx === words.length - 1}
                      />
                    ))
                }
      </h2>
      <div>with no pain</div>
    </>
  );
}

Keywords.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      loading: PropTypes.bool,
      flash: PropTypes.bool,
    }),
  ),
};

Keywords.defaultProps = {
  words: [],
};
