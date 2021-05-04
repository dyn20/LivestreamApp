const express = require('express');
const morgan = require('morgan');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');
const port = 3001;
const { Cookie } = require('express-session');
const cookieParser = require('cookie-parser');

db.connect();

app.use(express.static(path.join(__dirname,'public')));
app.engine('hbs', handlebars(
  {extname: '.hbs'}
));
app.set('view engine', 'hbs');  
app.set('views', path.join(__dirname, 'resources','views'));
app.use(morgan('combined'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());

route(app);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })

