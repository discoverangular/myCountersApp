var express = require('express');
var path = require('path');

// get an instance of the express Router
var router = express.Router();

// User Routes
var counters = require('../controllers/counters');
router.get('/api/counters', counters.all);

// api/counters/ + {name,unit,color}
router.post('/api/counters', counters.create);

// api/counters/:counterId/?date=2014-8-17
router.get('/api/counters/:counterId', counters.today);

// api/counters/:counterId +  {name,unit,color}
router.put('/api/counters/:counterId', counters.updateCounter);

//so the example in the book works
//router.post('/api/counters/:counterId', counters.updateCounter);

// api/counters/:counterId 
router.delete('/api/counters/:counterId', counters.deleteCounter);

// api/counters/:counterId/history?month=2014-08 & today=2014-08-20
router.get('/api/counters/:counterId/history', counters.counterHistory);

// api/counts/:countId +  {count}
router.put('/api/counts/:countId', counters.updateCount);

// Angular Routes
router.get('/partials/*', function(req, res) {
  var requestedView = path.join('./', req.url);
  res.render(requestedView);
});

router.get('/*', function(req, res) {
  res.render('index.html');
});

module.exports = router;