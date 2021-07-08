# Customize Default UI

## Enable Dark Theme

In quasar.config.js, add:

```js
...
framework: {
      config: {
        dark: true
      }
    }
...
```

## Setup Custom Color Scheme

File location css/quasar.variables.scss.

## Choose Nice Font Pairing

File location css/app.scss.

## Enable pug in Vue Templates

Write less and keep your templates more readable :-)

See [pug](https://pugjs.org/api/getting-started.html).

In ui directory

```bash
$ npm install --save-dev pug pug-plain-loader

```

Enable pug in quasar.conf.js

```js
...
module.exports = configure(function (ctx) {
  return {
      ...
      extendWebpack (cfg) {
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
      }
...

```

Now you can use pug in your Vue Templates like this:

```html
<template lang="pug">
p Hello pug!
</template>

```

## Setup Layout and Pages

### Layout

See "[https://quasar.dev/layout/layout#understanding-the-view-prop](https://quasar.dev/layout/layout#understanding-the-view-prop)"

We choose for this layout in file layouts/MainLayout.vue:

```html
<template lang="pug">
q-layout(view='hHh LpR lFf')
...

```

### Initial File Structure for our Chat App

See:

* layouts/MainLayout.vue
  * pages/Chat.vue
* pages/Login.vue
* pages/Error404.vue

Update file router/router.js to match new file structure

## Custom Favicon

See directory public/icons
