const loginrouter = require('./login')
const signuprouter = require('./signup');
const publicrouter = require('./homepublic');
const homeprivate = require('./homeprivate');
const logoutrouter = require('./logout')
const Livestreamrouter = require('./Livestream')
function route(app)
{
          
    app.use('/login',loginrouter);
    app.use('/signup',signuprouter);
    app.use('/home',homeprivate);
    app.use('/logout',logoutrouter);
    app.use('/Livestream',Livestreamrouter);
    app.use('/',publicrouter);
}

module.exports = route;