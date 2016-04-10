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
	var pic = null;
	for (var i in req.files) {
	    if (req.files[i] == 0) {
	      fs.unlinkSync(req.files[i].path);
	      console.log('success removed an empty file');
	    } else {
	      var path = './public/images/' + req.files[i].name;
	      fs.renameSync(req.files[i].path, path);
	      console.log('sunccess renamed a file');
	    }
	    pic = req.files[i].name;
    }
	var title = req.body.title;
	var content = req.body.content;
	var news = new News(title, content, pic);
	news.save(function(err, data){
		res.send(data)
	})
	res.send('<a href="./">请求成功，返回首页</a>')
})

router.get('/delete', function(req, res, next) {
	res.send('delete')
});

router.get('/view', function(req, res, next) {
	var news = new News();
	news.get(function(err, user) {
		if (err) {
			return res.redirect('/');
		};
		res.render('view', { title:'viewNews', data: user});
	});

	// res.render('view', { title:'viewNews'})
});

router.get('/update', function(req, res, next) {
	res.send('update')
});

module.exports = router;
