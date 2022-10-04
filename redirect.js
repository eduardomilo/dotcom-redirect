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

function redirectTo(newurl) {
  var response = {
    statusCode: 301,
    statusDescription: 'Found',
    headers:
        { "location": { "value": buildDomainUrl(newurl) } }
    }
  return response;
}

function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var host = headers.host.value;
  var uri = request.uri;  
  var querystring = request.querystring;

  if (host === 'www.milocredit.com' || host === 'dev.milocredit.com') {
    var newurl = `https://${host}${uri}`
    return redirectTo(newurl);
  }
  
  if (host.startsWith('blog')) {
      var newUri = buildBlogUrl(uri, querystring)
      var newurl = `https://${host.replace('blog','www')}${newUri}`
      return redirectTo(newurl);
  }
  
  if (host.startsWith('test')) {
      var newUri = buildBlogUrl(uri, querystring)
      var newurl = `https://${host.replace('test','dev')}${newUri}`
      return redirectTo(newurl);
  }

  if (!host.startsWith('www') && !host.startsWith('dev')) {
      var newurl = `https://www.${host}${uri}`
      return redirectTo(newurl);
  }

  return request;
}

(module || {}).exports = handler;