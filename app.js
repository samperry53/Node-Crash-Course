// const express = require('express');

// // express app
// const app = express();

// // register view engine
// app.set('view engine', 'ejs');
// // app.set('views', 'myviews');

// // listen for requests
// app.listen(3000);

// app.get('/', (req, res) => {
//     // res.send('<p>home page</p>');
//     // res.sendFile('./views/index.html', { root: __dirname});

// });

// app.get('/about', (req, res) => {
//     // res.send('<p>about page</p>');
//     res.sendFile('./views/about.html', { root: __dirname});
// });

// // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });



// // 404 page
// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', { root: __dirname})
// });

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// connect to mongodb
const dbURI = 'mongodb+srv://sperry53:help@nodetuts.nsjxewe.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// express app
const app = express();

// listen for requests


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('index', { title: 'Home', blogs });
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
      console.log(err);
    })
})




app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});