# expressifier
Make an express API for your node application with two lines.

## Installation
```
npm install expressifier
```

## Usage
```node
function foo({a=2, b=3, c=4}={}){
    return (a + b) * c
}

function bar(){
    return "test"
}

expressify = require("expressifier")
expressify({functions = [foo, bar], run = true, port = 8080})
```

## Functions

### `expressify`

#### Args

- functions: Object in `{endpoint: function}` format or list of function (endpoint will be the function's name)
- run: Whether to run or not the api directly, or just return the app. (Default is true)
- port: Which port to run the api on (Default is 8080)

#### Result

Will either return or run an API in which you can access your functions in `/endpoint`, giving the arguments in JSON as the body of your POST request.

## Limitations

- Currently, the function arguments can only have object notation due to ES's problems with unwrapping function arguments.
- Endpoints cannot be changed from POST