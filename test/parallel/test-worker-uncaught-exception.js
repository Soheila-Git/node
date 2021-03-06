// Flags: --experimental-worker
'use strict';
const common = require('../common');
const assert = require('assert');
const { Worker } = require('worker_threads');

// Do not use isMainThread so that this test itself can be run inside a Worker.
if (!process.env.HAS_STARTED_WORKER) {
  process.env.HAS_STARTED_WORKER = 1;
  const w = new Worker(__filename);
  w.on('message', common.mustNotCall());
  w.on('error', common.mustCall((err) => {
    assert(/^Error: foo$/.test(err));
  }));
  w.on('exit', common.mustCall((code) => {
    // uncaughtException is code 1
    assert.strictEqual(code, 1);
  }));
} else {
  throw new Error('foo');
}
