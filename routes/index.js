var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/assistant', function(req, res) {
	console.log(req.connection);
	res.send("got !");
});
module.exports = router;
