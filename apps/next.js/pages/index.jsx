import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ThemeSwitch } from '../components/ThemeSwitch/ThemeSwitch';
import { ThemeContext, Themes } from '../components/Context';
import { sample, Colors } from '../components/common';
import RubiksCube from '../components/RubiksCube/RubiksCube';
import { gimme } from '../lib/gimme';

const ThemeLocalStorageKey = 'asi-demo-app-theme';

function useStateWithLocalStorage(initialValue, itemKey) {
  const [value, setValue] = useState(undefined);
  const [key] = useState(itemKey);
  useEffect(() => {
    if (!value) {
      if (window.localStorage) {
        setValue(window.localStorage.getItem(key) || initialValue);
      }
    }
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
}

export default function Home({ initWords }) {
  const [theme, setTheme] = useStateWithLocalStorage(Themes.Light, ThemeLocalStorageKey);

  return (
    <div className={`App asi-theme-${theme}`}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <link rel="shortcut icon" href="/favicon.ico" />

        <title>Create Next App</title>
      </Head>

      <header className="App-header">
        <ThemeContext.Provider value={theme}>
          <ThemeSwitch changeTheme={setTheme} />
        </ThemeContext.Provider>
        <div className="asi-teaser">
          <h1 className="asi-teaser-title">
            <a
              className="asi-teaser-title-content"
              href="https://www.agilestacks.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Agile
              <span className="asi-teaser-stacks">Stacks</span>
            </a>
          </h1>
          <RubiksCube initWords={initWords} />
        </div>
      </header>
    </div>
  );
}

Home.propTypes = {
  initWords: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      color: PropTypes.string,
      loading: PropTypes.bool,
      flash: PropTypes.bool,
    }),
  ),
};

Home.defaultProps = {
  initWords: [],
};

export async function getServerSideProps() {
  const words = await gimme(3);
  return {
    props: {
      initWords: words.map((word) => ({
        word,
        color: sample(Object.values(Colors)),
        loading: false,
        flash: false,
      })),
    },
  };
}
