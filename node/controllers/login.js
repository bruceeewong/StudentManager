const logout = async (ctx, next) => {
    var
        username = ctx.request.body.username,
        password = ctx.request.body.password;

    console.log(username, password);
    ctx.redirect('/page/login.html');
};

const login = async (ctx, next) => {
    var
        username = ctx.request.body.username,
        password = ctx.request.body.password;

    console.log(username, password);
    ctx.response.body = `Hello, ${name}`;
};

module.exports = {
    'GET /logout': logout,
    'POST /login': login
};