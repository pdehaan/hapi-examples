# hapi-validate

Simple Hapi API server w/ parameter validation (via Joi).


## Usage
```sh
$ npm install
$ npm start
```

## Routes
- http://localhost:3000/api/poc/active/2
- http://localhost:3000/api/poc/inactive

## Sample output
```json
[
  {
    "active": true,
    "id": "6dfdd6dc-0dbc-ce0d-20c2-f0d098aa9f85",
    "test": "hyper.LoopTest.test_some.5",
    "startDate": "2014-09-25T22:41:55.000Z",
    "endDate": null,
    "diff": null,
    "success": null
  },
  {
    "active": true,
    "id": "45cbcfcf-c25f-48db-6b8b-7dd7c0b588e0",
    "test": "turbo.StressTest.test_storage_session.8",
    "startDate": "2014-09-25T22:56:38.000Z",
    "endDate": null,
    "diff": null,
    "success": null
  }
]
```
&mdash; http://localhost:3000/api/poc/active/2



```json
[
  {
    "active": false,
    "id": "efd414ae-fea4-9587-492c-ea13faf91d18",
    "test": "hadouken.StressTest.test_storage_session.2",
    "startDate": "2014-09-25T10:06:44.000Z",
    "endDate": "2014-09-25T17:43:14.000Z",
    "diff": "7 hours, 36 minutes, 30 seconds",
    "success": true
  },
  {
    "active": false,
    "id": "6ebbbe88-d136-d63b-9f75-0f6c59fac2d6",
    "test": "load.LoopTest.test_some.2",
    "startDate": "2014-09-25T16:58:01.000Z",
    "endDate": "2014-09-25T20:09:14.000Z",
    "diff": "3 hours, 11 minutes, 13 seconds",
    "success": true
  },
  {
    "active": false,
    "id": "eb4ffa1f-90d7-99b4-b725-80d27b553ada",
    "test": "champion.LoopTest.test_all.1",
    "startDate": "2014-09-25T21:25:15.000Z",
    "endDate": "2014-09-25T22:50:03.000Z",
    "diff": "1 hour, 24 minutes, 48 seconds",
    "success": true
  }
]
```
&mdash; http://localhost:3000/api/poc/inactive/
