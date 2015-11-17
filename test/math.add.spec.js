'use strict';

describe('Maths function: add : ', function () {

  //should fails
  it("adds 100 and 5 as numbers", function() {
    expect(add(100,5)).toEqual(105);
  });

  it("adds 100 and 5 as strings", function() {
    expect(add("100","5")).toEqual(105);
  });

  it("adds 001 and 005", function() {
    expect(add("00100","005")).toEqual(105);
  });

  it("adds a and b", function() {
    expect(add("a","b")).toEqual(NaN);
  });

});
