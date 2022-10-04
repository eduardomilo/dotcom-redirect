const handler = require('./redirect');

test('blog should redirect to /blog/', () => {

  const event = {
    "request": {
      "method": "GET",
      "uri": "/hello-milo-digital-banking-solution",
      "querystring": {},
      "headers": {
        "host": {
          "value": "blog.milocredit.com"
        },
      },
    }
  }

  const response = {
    "headers": {
      "location": {
        "value": "https://www.milo.io/blog/hello-milo-digital-banking-solution/"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});

test('blog lang=es should redirect to /es/blog/', () => {

  const event = {
    "request": {
      "method": "GET",
      "uri": "/hello-milo-digital-banking-solution",
      "querystring": { 
        "lang": {
          "value": "es"
        } 
      },
      "headers": {
        "host": {
          "value": "blog.milocredit.com"
        },
      },
    }
  }

  const response = {
    "headers": {
      "location": {
        "value": "https://www.milo.io/es/blog/hello-milo-digital-banking-solution/"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});

test('non WWW should -> WWWW', () => {

  const event = {
    "request": {
      "method": "GET",
      "uri": "",
      "headers": {
        "host": {
          "value": "milocredit.com"
        },
      },
    }
  }

  const response = {
    "headers": {
      "location": {
        "value": "https://www.milo.io"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});


test('milocredit.com -> www.milo.io', () => {

  const event = {
    "request": {
      "method": "GET",
      "uri": "",
      "headers": {
        "host": {
          "value": "milocredit.com"
        },
      },
    }
  }

  const response = {
    "headers": {
      "location": {
        "value": "https://www.milo.io"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});

test('www.milocredit.com -> www.milo.io', () => {

  const event = {
    "request": {
      "method": "GET",
      "uri": "",
      "headers": {
        "host": {
          "value": "www.milocredit.com"
        },
      },
    }
  }

  const response = {
    "headers": {
      "location": {
        "value": "https://www.milo.io"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});

test('dev.milocredit.com -> dev.milo.io', () => {

  const event = {
    "request": {
      "method": "GET",
      "uri": "",
      "headers": {
        "host": {
          "value": "dev.milocredit.com"
        },
      },
    }
  }

  const response = {
    "headers": {
      "location": {
        "value": "https://dev.milo.io"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});