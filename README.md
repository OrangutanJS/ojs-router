# OrantuganJS - oRouter
### Library for Routing in SPA (Single Page Applications).

---
check also **ojs-core** library - https://www.npmjs.com/package/ojs-core
## Quick start
### 1) Setting list of paths and callback functions
```js
oRouter.routingTable = {
    ['/path1']: callbackFunction
}
```
Callback function can return html, or load view on its own.
#### Paths with parameters
```js
oRouter.routingTable = {
    ['/path1/:id']: callbackFunction,
}
```
**:id** parameter is recognized from path and given in object as argument of callback function given to routingTable.
For example: <br/>
Path given: **https://example.com/path1/3** :
```js
function callbackFunction(routingParameters){ //routingParameters.id = 3
    (...)
}
```
#### Default view
You can set default view by setting oRouter.defaultView parameter. 
Default view is called when path is **"/"** (Substitute of: ['/'] in *oRouter.routingTable*).
```js
oRouter.defaultView = someCallbackFunction;
```
#### 404 - not found page
You can set *404 - not found* page for all unrecognized paths.
```js

oRouter.routingTable = {
  ['404-notFound']: notFoundCallbackFunction
}
```
### 2) Turn on routing
To recognize path and route to correct callback function use *oRouter.route* method:
```js
oRouter.routingTable = {
    ['/path1/:id']: callbackFunction1,
}
(...)
oRouter.route();
```
Path given: **example.com/path1/3** -> calls *callbackFunction1* with parameter *id=3* 
###!!! Remember:
You must adjust settings in your app to redirect all 404 fallbacks to main JavaScript *.js* or TypeScript *.ts* file (this one where you are using *oRouter.route* method).
Otherwise routing will NOT work properly.

## Redirect - path changing
You can change path without reloading your app using *oRouter.redirect* method:
.redirect( **path** :string, **params** :object, **replaceCurrentState** :boolean = false )
```js
oRouter.routingTable = {
    ['/path1']: callbackFunction,
}
(...)

// path before: example.com/
oRouter.redirect('/path1', { exampleParameter: "example value" });
// path after: example.com/path1
```
```js
function callbackFunction(routingParameters){ //routingParameters.exampleParameter = "example value"
    (...)
}
```
*replaceCurrentState* flag - default value = false. If true replace current history state instead of pushing new to window history object.

## Search parameters / GET parameters API
In oRouter there are 3 methods to manage GET parameters: <br/>
All search parameters also available in *oRouter.routingParameters.searchParameters*
- .setSearchParameter( **key** :string, **value** :string, **replaceCurrentState** :boolean = false ):
  <br/>&#9;- add/replace(when parameter with the key already is in search parameters) search parameter:
    ```js
    oRouter.setSearchParameters(key, value) // example.com?key=value
    ```
*replaceCurrentState* flag - default value = false. If true replace current history state instead of pushing new to window history object.

- .setSearchParameters( **parameters** :object, **replaceCurrentState** :boolean = false ): 
  <br/>&#9;- add/replace(when parameter with the key already is in search parameters) multiple search parameters:
    ```js
    oRouter.setSearchParameters({
        key1: 'value1',
        key2: 'value2'    
    }) 
  //example.com?key1=value1&key1=value2
    ```
*replaceCurrentState* flag - default value = false. If true replace current history state instead of pushing new to window history object.

- .unsetSearchParameter( **key** :string, **replaceCurrentState** :boolean = false)
  <br/>&#9;- unset search parameter with given key:
  ```js
  //before: example.com?key=value&key2=value2
  oRouter.unsetSearchParameters('key');
  //after example.com?key2=value 
    ```
*replaceCurrentState* flag - default value = false. If true replace current history state instead of pushing new to window history object.

## Hash API
In oRouter there are 2 methods to manage hashes in URL: <br/>
All hashes also available in *oRouter.routingParameters.hash*
- .setHash( **hash** :string, **replaceCurrentState** :boolean = false )
  <br/>&#9;- just add hash to URL :)
    ```js
    oRouter.setHash('hash1') // example.com#hash1
    ```
*replaceCurrentState* flag - default value = false. If true replace current history state instead of pushing new to window history object.

- .unsetHash( **hash** :string, **replaceCurrentState** :boolean = false )
  <br/>&#9;- just remove hash from URL :)
    ```js
    //before: example.com#hash1
    oRouter.unsetHash('hash1');
  //after: example.com
    ```
*replaceCurrentState* flag - default value = false. If true replace current history state instead of pushing new to window history object.

- .isSetHash( **hash** :string ) :boolean
  <br/>&#9;- check if hash is already added
    ```js
    //for: example.com#hash1
    oRouter.isSetHash('hash1') // true
    ```
