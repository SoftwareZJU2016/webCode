var express =  require('express');
var session =  require('express-session');
var pug =  require('pug');
var bodyParser =  require('body-parser');
var helmet =  require('helmet');
/* Routes include */
var routes =  require('./routes/index');
var adminRoutes =  require('./routes/admin');
var stuRoutes =  require('./routes/student');
var teaRoutes =  require('./routes/teacher');
var visRoutes =  require('./routes/visitor');
var bbsRoutes = require('./routes/bbs');

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
/* use routes */
app.use('/', routes);
app.use('/admin', adminRoutes);
app.use('/student', stuRoutes);
app.use('/teacher', teaRoutes);
app.use('/visitor', visRoutes);
app.use('/bbs', bbsRoutes);
app.get('*', function(req, res){
  res.status(404).send('404 Not Found');
});

var port = process.argv.length == 3 ? parseInt(process.argv[2], 10) : 3000;
app.listen(port, () => {
    console.log('Example app listening on port '+ port + '!');
});
