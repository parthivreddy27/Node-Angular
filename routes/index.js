var express = require('express');
var router = express.Router();
var path = require('path');
var reviewsCrawler = require('amazon-reviews-crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/data', function(req,res){
	var asin = req.query.asin;
	console.log("asin :"+asin)
	//used amazon-review-cralwer to fetch details
	reviewsCrawler(asin)
		.then(function(results){
			res.json(results)
		})
		.catch(function(err){
			console.error(err)
	})
});

module.exports = router;
