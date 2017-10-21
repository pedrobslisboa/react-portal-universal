# React Portal Universal

React Portals Universal is a library providing a wrapper for React `createPortal`. The goal of the
library is to render portals also on the server. React's DOM `creactePortal` requires a DOM node
which isn't suitable for the NodeJS environment.

## Why?

Thanks to React Portal Universal you can now render portals on the server. But why would I like to do that in the first place? That's a great question!

* Render elements into `<head>`. You can now manage your title, meta description or Open Graph meta data (Facebook doesn't run JavaScript) in the same way as you'd do that in [react-helmet]() only you don't need a specialized library. Client-side of React Portal Universal is just under 1KB!
* Aiming to make your page working also without JavaScript enabled.
* If your JavaScript-powered components (e.g. modals) contain crucial information you would like to be easily indexed by different search engines.

## Install

```commandline
  npm install react-portal-universal
```

## Usage

Render article's title and meta description into the `<head>`

```jsx
// CLIENT

import { createUniversalPortal, removeUniversalPortals } from "react-portal-universal";

const Head = (props) => {
  const { children } = props;
  // pass selector for a document.querySelector
  // instead of a DOM node like in createPortal
  return createUniversalPortal(children, "head");
};

class App extends React.Component {
  componentDidMount() {
    // remove static markup and allow React
    // to render only actual components
    removeUniversalPortals();
  }

  render() {
    return (
      <article>
        <Head>
          <title>Hello, World!</title>
          <meta name="description" content="Lorem ipsum..." />
        </Head>
        <h1>Hello, World!</h1>
        <p>
          Lorem ipsum sit doloret um.
        </p>
      </article>
    );
  }
}

ReactDOM.hydrate(<App />, document.querySelector("#root"));
```

```js
// SERVER

const { appendUniversalPortals } = require("react-portal-universal/lib/server");

const body     = ReactDOMServer.renderToString(<App />));
const template = fs.readFileSync(path.resolve("build/index.html"), "utf8");
const html     = template.replace("<div id=\"root\"></div>", `<div id="root">${body}</div>`);
const markup   = appendUniversalPortals(html);

res.status(200).send(markup);
```
