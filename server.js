
var express    = require('express'); 
var app        = express();                 
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var router = require('./routes/routes');
var posts = require('./routes/posts');
var path = require('path');
mongoose.connect('mongodb://localhost/petstore');

conn = mongoose.connection;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req, res){
	res.render('index');
});
app.use('/', router);
app.use('/posts', posts);

app.listen(port);
var document = require('./petsDatabaase')
conn.collection('pets').insert(document, function(err, records) {
	if (err) throw err;
	console.log("Record Insert");
});
console.log('Go to www.localhost:' + port);