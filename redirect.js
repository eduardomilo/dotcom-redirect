function buildBlogUrl(uri, querystring) {
  var urlParts = uri.split('/').filter(Boolean);
  var slug = urlParts[urlParts.length - 1];
  var locale = urlParts.length > 1 ? urlParts[0] : (querystring['lang'] || {}).value;
  var urlNewParts = ['blog', slug];
  if (locale) {
      urlNewParts.unshift(locale);
  }
  var newurl = `/${urlNewParts.join('/')}/`.replace('//','/');
  return newurl;
}

function buildDomainUrl(uri) {
  var newurl = uri.replace('milocredit.com','milo.io')
  return newurl;
}

function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var host = headers.host.value;
  var uri = request.uri;  
  var querystring = request.querystring;
  
  //console.log(request);
  
  if (host.startsWith('blog')) {
      var newUri = buildBlogUrl(uri, querystring)
      var newurl = `https://${host.replace('blog','www')}${newUri}`
      var response = {
          statusCode: 301,
          statusDescription: 'Found',
          headers:
              { "location": { "value": newurl } }
          }
      return response;
  }
  
  if (host.startsWith('test')) {
      var newUri = buildBlogUrl(uri, querystring)
      var newurl = `https://${host.replace('test','dev')}${newUri}`
      var response = {
          statusCode: 301,
          statusDescription: 'Found',
          headers:
              { "location": { "value": newurl } }
          }
      return response;
  }

  if (!host.startsWith('www') && !host.startsWith('dev')) {
      var newurl = `https://www.${host}${uri}`
      var response = {
          statusCode: 301,
          statusDescription: 'Found',
          headers:
              { "location": { "value": newurl } }
          }
      return response;
  }
  return request;
}

module.exports = handler;