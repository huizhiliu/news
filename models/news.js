var mongodb = require('./db');

function News(title, content, pic) {
	this.title = title;
	this.content = content;
	this.pic = pic;
}

module.exports = News;

News.prototype.save = function(callback) {
	var date = new Date();
    var time = {
      date: date,
      year: date.getFullYear(),
      month: date.getFullYear() + "-" + (date.getMonth() + 1),
      day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };

    var news = {
    	title: this.title,
    	content: this.content,
    	pic: this.pic,
    	time: time
    };

    mongodb.open(function(err,db) {
    	if (err) {
    		mongodb.close();
    		return callback(err);
    	};
    	db.collection('news', function (err, collection) {
    		if (err) {
    			mongodb.close();
    			return callback(err);
    		};
    		collection.insert(news, { safe: true }, function(err,news) {
    			if (err) {
    				mongodb.close();
    				callback(err);
    			};
    			callback(null,news[0]);
    		})
    	})
    })
}

News.prototype.get = function(callback) {
	mongodb.open(function(err,db) {
		if (err) {
			callback(err);
		};
		db.collection('news', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.find().sort({ date: -1}).toArray(function(err, data) {
				if (err) {
					mongodb.close();
					return callback(err)
				};
				callback(null,data);
			})
		})

	})
}

News.prototype.remove = function(id, callback) {
	mongodb.open(function(err,db) {
		if (err) {
			mongodb.close();
			return callback(err);
		};
		db.collection('news', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.remove({_id: id},function(err) {
				if (err) {
					mongodb.close();
					return callback(err);
				};
				callback(null);
			})
		})
	})
}