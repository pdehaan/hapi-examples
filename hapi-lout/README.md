# hapi-lout

The following examplee shows how you can use the [lout](https://github.com/hapijs/lout) API documentation generator with [hapi.js](http://hapijs.com/) to generate a human-readable guide for every endpoint using the route configuration.

## Usage

```sh
$ npm install
$ npm start
```

Once the hapi server is started, open a browser and go to http://localhost:3000/docs to see the generated route documentation.

## Excluding routes

To exclude a route from the lout generated documentation, set `lout` to `false` in the route configuration. For example,

```js
{
  method: 'GET',
  path: '/private',
  handler: function (req, reply) {
    reply('private route');
  },
  config: {
    description: '/private route',
    notes: 'Note for the `/private` route. This documentation should not appear in /docs.',
    tags: ['private', 'undocumented'],
    plugins: {
      lout: false
    }
  }
}
```