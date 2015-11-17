'use strict';

describe('Maths function: div : ', function () {

  it("divides 10 and 2 as numbers", function() {
    expect(div(10,2)).toEqual(5);
  });

  it("divides 10 and 2 as strings", function() {
    expect(div("10","2")).toEqual(5);
  });

  it("divides 010 and 02", function() {
    expect(div("010","02")).toEqual(5);
  });

  it("divides a and b", function() {
    expect(div("a","b")).toEqual(NaN);
  });

  it("divides 10 by zero", function() {
    expect(function() { div(10, 0) }).toThrow(new Error("Impossible to divide by zero"));;
  });

});
