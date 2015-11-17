module.exports = {
  'Test addition 10 + 10': function(browser) {
    browser
      .url('http://localhost:9001')
      .waitForElementVisible('body', 1000)
      .setValue('input[id=sumA]', '10')
      .setValue('input[id=sumB]', '10')
      .click('button[id=btnSum]').pause(1000)
      //.pause(10000)
      .assert.attributeEquals('#resultSum', 'value', '20')
      .end();
  }
};
