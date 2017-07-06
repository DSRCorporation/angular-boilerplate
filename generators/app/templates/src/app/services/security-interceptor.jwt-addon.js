angular.module('webAppNameWebApp')
  .factory('securityInterceptor', securityInterceptor);

function securityInterceptor(localStorageService, localStorageKeys) {
  const securityInterceptor = {
    request: request,
    response: response,
  };

  function request(config) {
    let authToken = localStorageService.get(localStorageKeys.authToken);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  }

  function response(response) {
    let authorizationHeader = response.headers('Authorization');

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      localStorageService.set(localStorageKeys.authToken, authorizationHeader.replace('Bearer ', ''));
    }

    return response;
  }

  return securityInterceptor;
}
