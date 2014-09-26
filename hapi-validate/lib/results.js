'use strict';

var randomBytes = require('crypto').randomBytes;

var Duration = require('duration-js');
var humanize = require('humanize-duration');


/**
 * Converts a duration string (ie: '12h') into milliseconds.
 * @param  {String} str A duration string, ie: '12h' or '90m'.
 * @return {Number} The number of milliseconds in the specified duration string.
 */
function d(str) {
  return new Duration(str).milliseconds();
}


/**
 * Creates a hexadecimal string with the specified length.
 * @param  {Number} len The number of alphanumeric characters to include in the string.
 * @return {String} A hexadecimal string.
 */
function hexStr(len) {
  return randomBytes(len).toString('hex').substr(0, len);
}


/**
 * Returns a random item from the specified array.
 * @param  {Array} arr An array of items.
 * @return {*} A random item from the specified array.
 */
function randomElement(arr) {
  var idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}


/**
 * Creates a random start date, end date, and calculates the duration between the dates.
 * @return {Object} An object containing a `startDate`, `endDate`, and `diff` properties.
 */
function makeDates() {
  // Choose a random duration between 0 and 12 hours.
  var dur = Math.random() * d('12h');
  var endDate = new Date(Date.now() - dur);
  var startDate = new Date(endDate.getTime() - (Math.random() * dur));
  // Zero out those milliseconds.
  startDate.setMilliseconds(0);
  endDate.setMilliseconds(0);

  return {
    startDate: startDate,
    endDate: endDate,
    diff: endDate.getTime() - startDate.getTime()
  };
}


/**
 * Creates a random id string in the format of 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.
 * @return {String} A random test id.
 */
function makeId() {
  var values = [
    hexStr(8),
    hexStr(4),
    hexStr(4),
    hexStr(4),
    hexStr(12)
  ];
  return values.join('-');
}


/**
 * Creates a random test name with the format '{string}.{string}.{number}'.
 * @return {String} A random test name.
 */
function makeTest() {
  var prefixes = [
    'load',
    'stress',
    'alpha',
    'champion',
    'turbo',
    'hyper',
    'hadouken'
  ];
  var suffixes = [
    'StressTest.test_storage_session',
    'LoopTest.test_all',
    'LoopTest.test_some',
    'FindMyDevice.smoke_test'
  ];
  // Get a random number between 0 and 9.
  var version = Math.floor(Math.random() * 9.9) % 10;

  return [
    randomElement(prefixes),
    randomElement(suffixes),
    version
  ].join('.');
}


/**
 * Creates a random result object.
 * @param  {Boolean} active Whether or not the result is 'active'. (Default is false)
 * @return {Object} An object containing the following properties: `active`, `id`, `test`, `startDate`, `endDate`, `diff`, `success`.
 */
function makeResult(active) {
  var test = makeTest();
  var dates = makeDates();
  // If the duration is less than 3 minutes, let's pretend it's a HealthCheck.
  if (dates.diff < d('3m')) {
    test = 'HealthCheck';
  }
  var obj = {
    active: !!active,
    id: makeId(),
    test: test,
    startDate: dates.startDate,
    endDate: dates.endDate,
    diff: humanize(dates.diff),
    // If the number of seconds is divisible by 8, pretend it's a failed run.
    success: dates.endDate.getSeconds() % 8 !== 0
  };
  // If it's an active run, we don't know the `endDate`, `diff`, or `success`.
  if (obj.active) {
    obj.endDate = null;
    obj.diff = null;
    obj.success = null;
  }
  return obj;
}


/**
 * Creates an array (of the specified length) of active or inactive results.
 * @param  {Number} count The number of results to return. (Default is 10)
 * @param  {Boolean} active Whether or not the results are active (true) or completed (false) runs. (Default is false)
 * @return {Array} An array of result objects.
 */
function makeResults(active, count) {
  count = Math.abs(count) || 10;
  var results = [];
  var res;
  var idx;
  for (idx = 0; idx < count; idx += 1) {
    res = makeResult(!!active);
    results.push(res);
  }

  // Sort the results by the start dates, ascending.
  return results.sort(function (itemA, itemB) {
    return itemA.startDate.getTime() - itemB.startDate.getTime();
  });
}


exports.makeResults = makeResults;

/* ***** SAMPLE OUTPUT *****

  // INACTIVE:
  [
    {
      "active": false,
      "id": "68d7843f-b2cb-ce0a-72a7-d7bef9bc3117",
      "test": "hyper.LoopTest.test_some.5",
      "startDate": "2014-09-23T13:38:23.000Z",
      "endDate": "2014-09-23T14:44:15.000Z",
      "diff": "1 hour, 5 minutes, 52 seconds",
      "success": true
    },
    {
      "active": false,
      "id": "2cc55d4e-d762-37a6-17e1-99165b26af0f",
      "test": "hadouken.StressTest.test_storage_session.7",
      "startDate": "2014-09-23T14:51:55.000Z",
      "endDate": "2014-09-23T16:09:38.000Z",
      "diff": "1 hour, 17 minutes, 43 seconds",
      "success": true
    }
  ]

  // ACTIVE:
  [
    {
      "active": true,
      "id": "0c041707-2861-ab64-40a8-1a6e81f32f39",
      "test": "alpha.StressTest.test_storage_session.1",
      "startDate": "2014-09-23T13:37:20.000Z",
      "endDate": null,
      "diff": null,
      "success": null
    }
  ]

 */
