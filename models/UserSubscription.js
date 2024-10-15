const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSubscription = new Schema({

    userId: Schema.Types.String,

    stripeCustomerId: Schema.Types.String,
    stripeSubscriptionId: Schema.Types.String,
    stripePriceId: Schema.Types.String,
    stripeCurrentPeriodEnd: Schema.Types.Date,

}, {
    timestamps: true
});

const UserSubscription = mongoose.models.UserSubscription || mongoose.model("UserSubscription", userSubscription);

export default UserSubscription;

