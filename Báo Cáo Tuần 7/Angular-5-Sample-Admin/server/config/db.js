var mongoose = require('mongoose');
var open = function() {
mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/TLCN', { useMongoClient: true })
  .then(() =>  console.log('Kết nối thành công!'))
  .catch((err) => console.error(err));
};
module.exports = {
 open : open
}


