var assert = require('assert');
var Queue = require('./index');

var c;
var from = [];
for(var i=0; i<100; i++) {
  from[i] = i;
}

var q = new Queue(10);

c = 0;
q.run(function (x, cb) {
  c++;
  console.log(x);
  setTimeout(function () {
    cb();
  }, 10);
});

q.on('empty', function () {
  assert.equal(c, 100);
});

q.start(from);