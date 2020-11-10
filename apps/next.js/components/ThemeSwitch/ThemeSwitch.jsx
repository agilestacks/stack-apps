import React from 'react';
import PropTypes from 'prop-types';

import { Themes } from '../Context';

export function ThemeSwitch({ changeTheme }) {
  return (
    <div className="asi-theme-switch">
      <div
        className="asi-theme-toggle asi-theme-toggle-dark"
        title="Switch to light theme"
        data-theme={Themes.Light}
        role="button"
        aria-hidden="true"
        onClick={() => changeTheme(Themes.Light)}
      >
        <span
          role="img"
          aria-label="moon"
          className="asi-theme-toggle-icon"
        >
          🌙
        </span>
      </div>
      <div
        className="asi-theme-toggle asi-theme-toggle-light"
        title="Switch to dark theme"
        data-theme={Themes.Dark}
        role="button"
        aria-hidden="true"
        onClick={() => changeTheme(Themes.Dark)}
      >
        <span
          role="img"
          aria-label="sun"
          className="asi-theme-toggle-icon"
        >
          ☀️
        </span>
      </div>
      <div className="asi-theme-switch-button" />
    </div>
  );
}

ThemeSwitch.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default ThemeSwitch;
