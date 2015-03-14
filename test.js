var assert = require('assert');
var Queue = require('./index');

// Tests
var c;
var from = [];
for(var i=0; i<100; i++) {
  from[i] = i;
}

var q = new Queue(10);
assert(q);

c = 0;
q.run(function (x, cb) {
  c++;
  console.log(x);
  setTimeout(function () {
    cb();
  }, 100);
});

q.start(from);
q.start(['a', 'b']);