var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'rohjan',
    database: 'rohjan',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
/*
var articles = {
    'article-one': {
        title:'Article-One | Thiagarajan Thangavelu',
        heading:'Article One',
        date:'February 6 2017',
        content:`
            <p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
            </p>`
    },    
    'article-two': {
        title:'Article-Two | Thiagarajan Thangavelu',
        heading:'Article Two',
        date:'February 7 2017',
        content:`
            <p>
                This is the content for my second article.
           </p>`
    },    
    'article-three': {
        title:'Article-Three | Thiagarajan Thangavelu',
        heading:'Article Three',
        date:'February 8 2017',
        content:`
            <p>
                This is the content for my third article. 
            </p>`
    }    
};
*/

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    //how do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

//var salt = 'this-is-some-random-string';
app.get('/hash/:input', function(req,res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

/*
app.post('/create-user', function(req,res) {
   // username, password
   // {"username": "rohjan", "password": "password"}
   //JSON
   var username=req.body.username;
   var passworkd=req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES($1, $2)', [username, dbString], function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        }
        else {
            res.send('User successfully created' + username);
        }
       
   });
});
*/
var pool = new Pool(config);
app.get('/test-db', function (req, res) { 
    // make a select request
    //return & response with results
    pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        }
        else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter', function(req,res) {
   counter +=1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) { //URL: /submit-name?name=xxxx
    //get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
    
});

app.get('/articles/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName] == {} content for article one
    //var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName], function(err,result) {
        if (err) {
            res.status(500).send(err.toString());
        }
        else {
            if (result.rows.length === 0) {
                res.status(404).send('Article not found');
            }
            else {
                var articleData = result.rows[0];
                //res.send(createTemplate(articles[articleName]));
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
