var mongoose = require('mongoose');

// need to improve on this!!
// pre save hook to generate random numbers?
var schema = new mongoose.Schema({
  title: {
    type: String, required: true
  },
  chart_type: {
    type: String, required: true
  },
  data: { 
    type: [ { 
      series: [ [ Date, Number ] ] 
    } ], required: true
  },
  data_min: {
    type: Number, required: true 
  },
  data_max: {
    type: Number, required: true
  }
});

var Graph = mongoose.model('Graph', schema);

module.exports = Graph;