var express =  require('express');
var session =  require('express-session');
var pug =  require('pug');
var ejs = require('ejs');
var bodyParser =  require('body-parser');
var helmet =  require('helmet');
var routes =  require('./routes/index');

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.set('trust proxy', 1);

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: '~(>_<)~',
  resave: false,
  saveUninitialized: false
}));
app.use('/', routes);

var port = process.argv.length == 3 ? parseInt(process.argv[2], 10) : 3000;
app.listen(port, () => {
    console.log('Example app listening on port '+ port + '!');
});
