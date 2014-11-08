var mongoose = require('mongoose');
//var Counter = require('./counter');
Schema = mongoose.Schema;

var schemaOptions = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
};

// define the schema for our count model
var CountSchema = new Schema({
    date        	: Date,
    count			    : {
      type:Number,
      default:0
    },
    counter_id		: {type:Schema.ObjectId, ref: 'Counter' },
    id: false, //http://mongoosejs.com/docs/guide.html#id
    __v:  {type: Number, select: false}

},schemaOptions);


CountSchema
  .virtual('day')
  .get(function () {
    return  this.date.getDate();
  });


CountSchema.statics.today = function (document, callback) {
  var self = this;


  self.findOne(document).populate('counter_id').exec(function (err, count) {
    if (count){
      var result = {};
      result = count.counter_id.toObject();
      result.count = count.count;
      result.countId = count._id;
      callback(err,result);
    }else{
      self.create(document, function(err, newCount) {
        newCount.populate({path: "counter_id"}, function (err, newCountPop) {
          var result = {};
          result = newCountPop.counter_id.toObject();
          result.count = newCountPop.count;
          result.countId = newCountPop._id;
          callback(err,result);
        });
        
      });

    }
    
  });


};



// create the model for count and expose it to our app
module.exports = mongoose.model('Count', CountSchema);

