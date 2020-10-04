const prettyJson = require('prettyjson');
const apickli = require('apickli');
const {Before, Given, When, Then} = require('cucumber');
const stepContext = {};

const callbackWithAssertion = function(callback, assertion) {
    if (assertion.success) {
      callback();
    } else {
      callback(prettyPrintJson(assertion));
    }
  };

  const getAssertionResult = function(success, expected, actual, apickliInstance) {
    return {
      success,
      expected,
      actual,
      response: {
        statusCode: apickliInstance.getResponseObject().statusCode,
        headers: apickliInstance.getResponseObject().headers,
        body: apickliInstance.getResponseObject().body,
      },
    };
  };

  const prettyPrintJson = function(json) {
    const output = {
      stepContext,
      testOutput: json,
    };
  
    return prettyJson.render(output, {
      noColor: true,
    });
  };

Given(/^setting body qr payment request$/, function() {
    var bodyValue = '{\
        "partnerTxnUid": "PTR202003051007",\
        "partnerId": "PTR0000001",\
        "partnerSecret": "JGCm8fVXDpQimnVNQJBxCqvq259dx77o",\
        "requestDt": "2020-01-08T13:00:00+07:00",\
        "merchantId": "KB000001588975",\
        "terminalId": "09000107",\
        "qrType": "3",\
        "txnAmount": 100.5,\
        "txnCurrencyCode": "THB",\
        "reference1": "INV001",\
        "reference2": null,\
        "reference3": null,\
        "reference4": null,\
        "metadata": ""\
      }';
    this.apickli.setRequestBody(bodyValue);
    //callback();
  });

  Then(/^validate qr response body$/, function( callback) {
    //const assertion = this.apickli.assertResponseBodyContainsExpression(expression);
    //callbackWithAssertion(callback, true);
    var body = JSON.parse(this.apickli.getResponseObject().body);
    
    if(body && body.partnerId === "PTR0000001"){
        callback();
    } else {
        var assertion = getAssertionResult(false, true, false, this.apickli);
        
        callbackWithAssertion(callback, assertion);
    }
  });

  //const success = regex.test(this.getResponseObject().body);