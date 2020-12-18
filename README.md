# Lazy I18n

[![version](https://img.shields.io/npm/v/lazy-i18n.svg)](https://www.npmjs.com/package/lazy-i18n)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/lazy-i18n.svg)](https://www.npmjs.com/package/lazy-i18n)
[![downloads](https://img.shields.io/npm/dt/lazy-i18n.svg)](https://www.npmjs.com/package/lazy-i18n)

Lazy i18n is a collection of React components and hooks that support
internationalization for multiple languages by asynchronously loading key-value
pair translation files.

## Install

- `npm install lazy-i18n` or
- `yarn add lazy-i18n`

## Use

Wrap your application in the `I18nProvider` component. The `locale` prop
determines which translations should be used. Other props specify the
translations for each locale. In the following example, the `en` locale is
eagerly loaded while the `es` locale is lazily loaded.

```javascript
import { I18nProvider } from 'lazy-i18n';
import en from './path/to/en.json';

function App() {
  return (
    <I18nProvider en={en} es={() => import('./path/to/es.json')} locale="en">
      <Main />
    </I18nProvider>
  );
}
```

To use your translation files, you can import the `I18n` component, passing the
translation key as a child and translation variables as props.

```javascript
import I18n from 'lazy-i18n';

function Main() {
  return <I18n user="world">Hello $user!</I18n>;
}
```

You can also import the `useTranslate` hook, where the first parameter is the
translation key and the second parameter is the translation variables. This is
useful when you need to translate props for a component that only accepts
strings.

```javascript
import { useTranslate } from 'lazy-i18n';

function Main() {
  const translate = useTranslate();
  return <>{translate('Hello $user!', { user: 'world' })}</>;
}
```

When a lazy-loaded translation has not yet loaded, the `useTranslate` hook's
function will return `null`. You can use this to render placeholder text.

```javascript
import { useTranslate } from 'lazy-i18n';

function Title() {
  const translate = useTranslate();
  return <h1>{translate('My website') || '...'}</h1>;
}
```
