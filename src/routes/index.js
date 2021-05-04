const loginrouter = require('./login')
const signuprouter = require('./signup');
const publicrouter = require('./homepublic');
const homeprivate = require('./homeprivate');
function route(app)
{
             
    app.use('/login',loginrouter);
    app.use('/signup',signuprouter);
    app.use('/homeprivate',homeprivate);
    app.use('/',publicrouter);
}

module.exports = route;