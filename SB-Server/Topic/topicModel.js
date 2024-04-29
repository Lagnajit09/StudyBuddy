const mongoose = require('mongoose')
const Schema=mongoose.Schema

const topicSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    folders:[{
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    }],
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note' 
    }]
})

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;