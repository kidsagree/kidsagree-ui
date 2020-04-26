# Kidsagree UI

Kidsagree UI is the interface toolkit used by Kidsagree and its related projects.

## How to import

Kidsagree UI is a library that comes with some assets, like fonts or images. These
need to be copied where Kidsagree UI can access them.

This emplacement can then be communicated to Kidsagree UI using the global
component `<KidsagreeApp />`:

```jsx
import { KidsagreeApp } from '@kidsagree/ui'

const App = () => (
  <KidsagreeApp publicUrl="/">
    {/* Your app goes here */}
  </KidsagreeApp>
)
```

To get the path of the directory from where the assets need to be copied, use
`path.dirname(require.resolve('@kidsagree/ui'))`.

### `create-react-app`

If you're using [`create-react-app`](https://github.com/facebookincubator/create-react-app)
or [`react-scripts`](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts),
you can copy over the contents of module's `dist/` folder (i.e.
`path.dirname(require.resolve('@kidsagree/ui'))`) to
a [`public/kidsagree-ui`](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-assets-outside-of-the-module-system)
folder in your app and then use `publicUrl="/kidsagree-ui/`.

You may also want to add this sync step to your build scripts, in case you
later upgrade this package (make sure to `npm i -D sync-assets first):

```json
"scripts": {
    "sync-assets": "sync-files $(dirname $(node -p 'require.resolve(\"@kidsagree/ui\")')) public/kidsagree-ui",
    "build": "npm run sync-assets && react-scripts build",
    "start": "npm run sync-assets && react-scripts start"
}
```

### Copy Webpack Plugin

If you have your own webpack configuration, a way to copy this package's assets
is to use the [Copy Webpack Plugin](https://github.com/webpack-contrib/copy-webpack-plugin):

```js
module.exports = {
  /* … */

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.dirname(require.resolve('@kidsagree/ui')),
        to: path.resolve(
          path.join(__dirname, 'dist/public')
        ),
      },
    ]),
  ]
}
```

### webpack DevServer

For [webpack DevServer](https://webpack.js.org/configuration/dev-server/), add
the Kidsagree UI directory to the `contentBase` array, without having to copy it:

```js
module.exports = {
  /* … */

  devServer: {
    contentBase: [
      path.dirname(require.resolve('@kidsagree/ui')),
      path.join(__dirname, 'public'),
    ],
  },
}
```

## Develop

Install the dependencies:

```sh
npm install
```

Build Kidsagree UI:

```sh
npm run build # or "npm run dev" to rebuild when a file has changed
```


Run the gallery:

```sh
npm start
```

Open <http://localhost:8080/> in your web browser.
