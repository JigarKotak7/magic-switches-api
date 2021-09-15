const mongoose = require('mongoose');

const switchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    switchId: {type: String, required: true},
    switchName: {type: String, required: true},
    switchGenericName: {type: String, required: true},
    switchIcon: {type: String, required: true}, 
    switchStatus: {type: String, required: true},
    auth: {type: String, required: true},
    hostName: {type: String, required: true},
    deviceId: {type: String, required: true}
});

module.exports = mongoose.model('Switch', switchSchema);