

Как использовать сервис $http в Angular 1.3.15?
--------------------
https://code.angularjs.org/1.3.15/docs/api/ng/service/$http


Штатное использование:
--------------------

```javascript
$http.get('/someUrl')
  .success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
  })
  .error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
```


На основе промисов:
--------------------

```javascript
$http.get('/someUrl')
  .then(function(res) {
	var data = res.data, status = res.status, headers = res.headers, config = res.config;
    // this callback will be called asynchronously
    // when the response is available
  })
  .catch(function(err) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
```