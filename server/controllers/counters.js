var	Counter = require('../models/counter');
var	Count = require('../models/count');

exports.all = function(req, res) {
	Counter.all(function (err, counters) {
		if (err) {
			res.json(500, err);
		}
		res.json(counters);
	});

};

exports.create= function(req, res) {

	var counter = new Counter(req.body);

	counter.save(function(err) {
		if (err) {
		  res.json(500, err);
		} else {
			var doc = {counter_id:counter._id, date:req.body.date};
			Count.create(doc, function(err, newCount) {
				if (err) {
		  			res.json(500, err);
				} else {
					res.json(counter);
				}
	        
     		});
		  
		}
	});

};

exports.updateCounter = function(req, res) {

	var counterId = req.params.counterId;
	Counter.update({_id:counterId},
		{
			name:req.body.name,
			unit:req.body.unit,
			color:req.body.color,
		}, function (err) {
  		
  		if (err){
			return res.json(500, err);	
		}else{
			res.send(200);	
		} 
	});
};



exports.today = function(req, res) {
	var counter_id = req.params.counterId;
	var date = req.query["date"]==undefined?new Date():new Date(req.query["date"]);
	
	var doc = {counter_id:counter_id,date:date};
	Count.today(doc, function(err, count) {
		if (err){
			return res.json(500, err);	
		}else{
			res.json(count);	
		} 
	});

};

exports.updateCount = function(req, res) {

	var countId = req.params.countId;
	Count.update({
		_id:countId ,
		 }, {count:req.body.count}, function (err) {
  		
  		if (err){
			return res.json(500, err);	
		}else{
			res.send(200);	
		} 
	});
};

exports.deleteCounter = function(req, res) {
	/*
		We're using remove on the instance instead on the Counter class because
		Middlewares (pre) only work on instances of Models (i.e. documents).
	*/
	Counter.findById(req.params.counterId, function(err, counter) {
		if (err){
			return res.json(500, err);	
		}else{
			counter.remove();
			res.send(200);	
		} 
	})
};

function numberOfDays(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}

function getLookup(array,key){
	var lookup = {};
	for (var i = 0, l = array.length; i < l; i++) {
	    lookup[array[i][key]] = array[i];
	}
	return lookup;
}

var weekday = new Array(7);
weekday[0]="Sun ";
weekday[1]="Mon ";
weekday[2]="Tue ";
weekday[3]="Wed ";
weekday[4]="Thu ";
weekday[5]="Fri ";
weekday[6]="Sat ";

exports.counterHistory = function(req, res) {

	var counter_id = req.params.counterId;
	var date_array = (req.query["month"]).split("-");
	var year = parseInt(date_array[0]);
	var month = parseInt(date_array[1]);
	var monthStart = new Date(year,month-1,1);
	var monthEnd = new Date(year,month-1,31);

	var today_array = (req.query["today"]).split("-");
	var todayYear = parseInt(today_array[0]);
	var todayMonth = parseInt(today_array[1])-1;
	var todayDay = parseInt(today_array[2]);
	var today = new Date(todayYear,todayMonth,todayDay);

	var history = [];
	var monthLength = numberOfDays(year,month);
	var s  = new Date(year,month-1,1);
	for (var i = 1; i <= monthLength; i++) {
		history[i-1] = {
			id:i,
			day : weekday[s.getDay()]+s.getDate(),
			count:-1
		}

		s.setDate(s.getDate()+1);
	};

	var next = true,
	previous = true;


	Count.find()
	.where('counter_id').equals(counter_id)
	.where('date').gte(monthStart).lte(monthEnd)
	.select('date day count')
	.exec(function (err, counts) {
		if (err) {res.json(500, err);}


		Count.findOne()
		.where('counter_id').equals(counter_id)
		.sort('date')
		.exec(function (err, start) {
			if (err) {res.json(500, err);}
			var counterStart = new Date(start.date);
			var from = 1;
			if (  (monthStart.getTime() <= counterStart.getTime()) && (counterStart.getTime() <= monthEnd.getTime()) )  {
				from = counterStart.getDate();
				previous = false;
			}

			var to = monthLength;
			if (  (monthStart.getTime() <= today.getTime()) && (today.getTime() <= monthEnd.getTime()) ) {
				to = today.getDate();
				next = false;
			}

			var countsLookup = getLookup(counts,'day');
			var historyLookup = getLookup(history,'id');

			for (var i = from; i <= to; i++) {

				if(countsLookup[i]){
					historyLookup[i].count = countsLookup[i].count;
				}else{
					historyLookup[i].count = 0;
				}

			};	
			
			for (var i = 0; i < history.length; i++) {
				delete history[i].id;
			};

			var result = {
				previous:previous,
				next:next,
				history:history
			};

			res.json(result);

		});
		
	});

};