# hapi-views example

The following example shows how you can use partials and views in [Hapi](http://hapijs.com/) using [Handlebars](http://handlebarsjs.com/).

Within our [/views/index.html](/hapi-views/views/index.html) file, we include our [/views/partials/header.html](/hapi-views/views/partials/header.html) partial using the `{{> header }}` syntax. We also display the `name` parameter that we passed in from the "/" route definition in our [server.js](/hapi-views/server.js#L21-L24) file:
```js
reply.view('index', {
  title: 'Nice site',
  name: 'Roger'
});
```

```html
<!-- /views/index.html -->
<div class="container">
  {{> header }}

  <header class="page-header">
    <h1>Hello {{ name }}, <small>Welcome back</small></h1>
  </header>

  <!-- ... -->
</div>
```

## Getting started

```sh
$ git clone git@github.com:pdehaan/hapi-examples.git
$ cd hapi-examples/hapi-views
$ npm install # automatically installs/updates bower dependencies.
$ npm start   # Start the Hapi server on port 3000
$ open http://localhost:3000
```

## Files
```
.
├── .bowerrc
├── .eslintignore
├── .eslintrc
├── bower.json
├── node_modules/
│   └── (...)
├── package.json
├── public/
│   ├── assets/
│   │   └── styles/
│   │       └── app.css
│   └── bower_components/
│       └── (...)
├── server.js
└── views/
    ├── index.html
    └── partials/
        ├── footer.html
        └── header.html

8 directories, 13 files
```
