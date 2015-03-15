'use strict';
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Queue = module.exports = function (max) {
  this.max = max;
  this.from = [];
  this.exec = [];

  this.on('available', function () {

    if (this.from.length) {
      this.exec.push(this.from.shift());
    } else if (!this.exec.length) {
      this.emit('empty');
    }
    if (!this.exec.length) return;

    this.runFn(this.exec.shift(), function () {
      setImmediate(function () {
       this.emit('available');
      }.bind(this));
    }.bind(this));
  });
};

util.inherits(Queue, EventEmitter);

Queue.prototype.run = function (fn) {
  this.runFn = fn;

  return this;
};

Queue.prototype.start = function (from) {
  this.from = this.from.concat(from);
  while (this.from.length > 0 && this.exec.length < this.max) {
    this.exec.push(this.from.shift());
  }
  if (this.exec.length <= this.max) {
    this.emit('available');
  }
};