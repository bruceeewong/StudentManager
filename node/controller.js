const fs = require('fs');
const koaRouter = require('koa-router')();

function addMapping(router, mapping) {
    for (let url in mapping) {
        
        if (url.startsWith('GET ')) {
            let path = url.substring(4);

            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);

        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);

            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);

        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    
    var files = fs.readdirSync(dir);

    var jsFiles = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (let f of jsFiles) {
        console.log(`process controller: ${f}...`);

        let mapping = require(dir + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllersDir = dir || './controllers/';

    addControllers(koaRouter, controllersDir);
    return koaRouter.routes();
};

