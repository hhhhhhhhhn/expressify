const express = require('express');

function expressify({functions = [()=>{return "test"}], run= true, port= process.env.PORT || 8080}={}){
    const app = express()
    var newFunctions = {}
    app.use(express.json())
    if(Array.isArray(functions)){
        for(var foo of functions){
            newFunctions[foo.name] = foo
        }
    }else if(typeof functions == "object"){
        newFunctions = functions
    };

    for(const [endpoint, foo] of Object.entries(newFunctions)){
        if(foo.constructor.name != "AsyncFunction"){
            app.post("/" + endpoint, function(req, res){return res.json(foo(req.body))})
        }else{
            app.post("/" + endpoint, async function(req, res){return res.json(await foo(req.body))})
        }
    }
    if(run){
        app.listen(port, () => {console.log("Listening on port " + port)})
    }
    return app
}

module.exports = expressify