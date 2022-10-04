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
        "value": "https://www.milocredit.com/blog/hello-milo-digital-banking-solution/"
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
        "value": "https://www.milocredit.com/es/blog/hello-milo-digital-banking-solution/"
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
        "value": "https://www.milocredit.com"
      }
    }, 
    "statusCode": 301, 
    "statusDescription": "Found"
  }

  expect(handler(event)).toEqual(response);
});