const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userApiLimitSchema = new Schema({

    userId: Schema.Types.String,
    count: Schema.Types.Number,

}, {
    timestamps: true
});

const UserApiLimit = mongoose.models.UserApiLimit || mongoose.model("UserApiLimit", userApiLimitSchema);

export default UserApiLimit;

