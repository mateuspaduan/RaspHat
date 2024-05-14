var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  accountName: {
    type: String,
    required: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Account = mongoose.model('Accounts', AccountSchema);
module.exports = Account;