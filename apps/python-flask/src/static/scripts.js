const LOADING_KEYWORD_CLASS = 'asi-teaser-keyword-loading';
const FLASH_KEYWORD_CLASS = 'asi-teaser-keyword-flash';
const TILE_SELECTOR = '.asi-tile';
const KEYWORD_SELECTOR = '.asi-teaser-keyword';
const THEME_TOGGLE_SELECTOR = '.asi-theme-toggle';
const APP_SELECTOR = '.App';

const KEYWORD_COLOR_CLASSES = [
    'asi-teaser-keyword-orange',
    'asi-teaser-keyword-red',
    'asi-teaser-keyword-blue',
    'asi-teaser-keyword-green'
];
const THEME_CLASSES = [
    'asi-theme-default',
    'asi-theme-dark',
    'asi-theme-light'
];

const KEYWORDS_URL = '/gimme/1';

const MAX_HISTORY_LENGTH = 7;

function random(maxValue) {
    return Math.floor(Math.random() * (maxValue + 1));
}

function sample(values) {
    return values[random(values.length - 1)];
}

async function getRandomWord() {
    const response = await fetch(KEYWORDS_URL);
    const {
        data: [word]
    } = await response.json();
    return word;
}

function getNodeText({
    innerText,
    textContent = innerText
}) {
    return textContent;
}

function setNodeText(node, text) {
    const prop = 'innerText' in node ? 'innerText' : 'textContent';
    node[prop] = text;
}

const localStorageGet = (name) => window.localStorage && window.localStorage.getItem(name);
const localStorageSet = (name, value) => window.localStorage && window.localStorage.setItem(name,
    value);

const keywordsHistory = [...document.querySelectorAll(KEYWORD_SELECTOR)]
    .map(getNodeText);

async function nextWord() {
    while (true) {
        const word = await getRandomWord();
        if (!keywordsHistory.includes(word)) {
            keywordsHistory.unshift(word);
            keywordsHistory.splice(MAX_HISTORY_LENGTH, keywordsHistory.length);

            return word;
        }
    }
}

function addNodeClassNames(keywordNode, ...classNames) {
    keywordNode.classList.add(...classNames);
}

function removeNodeClassNames(keywordNode, ...classNames) {
    keywordNode.classList.remove(...classNames);
}

async function updateKeyword(keywordNode) {
    // trigger keyword is loading
    addNodeClassNames(keywordNode, LOADING_KEYWORD_CLASS);

    const word = await nextWord();
    setNodeText(keywordNode, word);

    // stop keyword is loading
    removeNodeClassNames(keywordNode, LOADING_KEYWORD_CLASS);

    // switch keyword color
    removeNodeClassNames(keywordNode, ...KEYWORD_COLOR_CLASSES);
    addNodeClassNames(keywordNode, sample(KEYWORD_COLOR_CLASSES));

    // make keyword flash
    addNodeClassNames(keywordNode, FLASH_KEYWORD_CLASS);
    setTimeout(() => {
        removeNodeClassNames(keywordNode, FLASH_KEYWORD_CLASS);
    }, 100);
};

function updateKeywords() {
    const keywordCandidates = document.querySelectorAll(
        `${KEYWORD_SELECTOR}:not(.${LOADING_KEYWORD_CLASS}):not(.${FLASH_KEYWORD_CLASS})`);
    const {
        length
    } = keywordCandidates;
    if (length) {
        const keywordIndex = random(length - 1);
        updateKeyword(keywordCandidates[keywordIndex]);
    }
}

function setTheme(theme) {
    const appNode = document.querySelector(APP_SELECTOR);

    removeNodeClassNames(appNode, ...THEME_CLASSES);
    addNodeClassNames(appNode, `asi-theme-${theme}`);
}

document.body.addEventListener('mouseover', event => {
    if (event.target.matches(TILE_SELECTOR)) {
        updateKeywords();
    }
}, false);

document.body.addEventListener('click', ({
    target
}) => {
    if (target.matches(THEME_TOGGLE_SELECTOR)) {
        const theme = target.getAttribute('data-theme');

        setTheme(theme);

        localStorageSet('theme', theme);
    }
});

(function init() {
    [...document.querySelectorAll(KEYWORD_SELECTOR)]
    .forEach(keywordNode => {
        removeNodeClassNames(keywordNode, ...KEYWORD_COLOR_CLASSES);
        addNodeClassNames(keywordNode, sample(KEYWORD_COLOR_CLASSES));
    });

    const storedTheme = localStorageGet('theme');

    if (storedTheme) {
        setTheme(storedTheme);
    }
})();
