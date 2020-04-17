const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    key: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    value: {
        type: Mongoose.Schema.Types.Mixed,
        trim: true,
        required: true
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('setting', UserSchema)
