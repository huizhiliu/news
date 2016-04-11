var express = require('express');
var router = express.Router();
var News = require('../models/news.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
	res.render('add', { title:'addNews' })
});

router.post('/add', function(req, res, next) {
	  var title = req.body.title;
	  var content = req.body.content;
	  var pic = req.body.pic;
	  var news = new News(title, content, pic)
	  console.log(title,content);
	  news.save(function (err, data) {
	    res.send(data);
	  })
	res.send('<a href="./">请求成功，返回首页</a>')
})

router.get('/delete/:id', function(req, res, next) {
	var news = new News();
	news.remove(req.param.id,function(err, user) {
		if (err) {
			console.log(err);
			return res.redirect('back');
		};
		console.log('success');
		res.redirect('/');
	});
});

router.get('/view', function(req, res, next) {
	var news = new News();
	news.get(function(err, user) {
		if (err) {
			return res.redirect('/');
		};
		res.render('view', { title:'viewNews', data: user});
	});
});

router.get('/update', function(req, res, next) {
	
});

module.exports = router;
