var mongoose = require('mongoose');
var	Count = require('./count');


var schemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true
  },
  toObject: {
    virtuals: true,
  }
};
// define the schema for our counter model
var CounterSchema = mongoose.Schema({

    name        : String,
    unit		: String,
    color		: Number,
    id 		: false

},schemaOptions);

CounterSchema.statics.all = function (callback) {
	var self = this;

	Count.aggregate([
    { $group: {
        _id: "$counter_id",
        sum: { $sum: '$count'}
    }}
    ], function (err, counts) {
    	self.populate(counts, {path: "_id"}, function (err, counters) {
	    	var result = [];
	    	for (var i = 0; i < counters.length; i++) {
	    		result[i] = counters[i]._id.toObject();
	    		result[i].sum = counters[i].sum;
	    	};

	    	callback(err,result);
    	});
    	
	});
};



CounterSchema.pre('remove', function (next) {
	Count.remove({ counter_id: this._id }).exec();
  	next();
});


// create the model for counters and expose it to our app
module.exports = mongoose.model('Counter', CounterSchema);

