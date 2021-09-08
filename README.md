# Model package

A simple package that contains all the models that are used in conjunction with MongoDB. This package should only be used with the back end micro-service architecture and not be included in front end or consumer facing packages or websites.

## ENV variables

```js
AUTH_ENABLED
```
When set to true, this enables authentication via JWT token and the role mapping fields. Must be explicitly set to false if not in use.

```js
ROLE_MAPPING_GET
ROLE_MAPPING_POST
ROLE_MAPPING_PATCH
ROLE_MAPPING_DELETE
```
Allows for very simple role mapping based on the given HTTP actions. Only setup the HTTP actions that are supported by the app.

```js
CORS_ALLOWED_METHODS
```
A list of methods that are allowed, for example `POST, OPTIONS`. Do not ecapsulate the string in quotations as this will have odd effects when run in lambda.

```js
CORS_ALLOWED_ORIGIN
```
A list of origins that are allowed, for example `example.com`. Do not ecapsulate the string in quotations as this will have odd effects when run in lambda.

```js
JWT_SHARED_SECRET
```
Secret used to encrypt and decrypt the JWT signature.

```js
DB_CONNECTION_STRING
```
Your DB connection string that will be used to connect the service to the given app.
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/creative-owl/nimbus/tags).
