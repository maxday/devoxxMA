module.exports = {
  'Test division 100 by 5': function(browser) {
    browser
      .url('http://localhost:9001')
      .waitForElementVisible('body', 1000)
      .setValue('input[id=divA]', '100')
      .setValue('input[id=divB]', '5')
      .click('button[id=btnDiv]').pause(1000)
      //.pause(10000)
      .assert.attributeEquals('#resultDiv', 'value', '20')
      .end();
  }
};
