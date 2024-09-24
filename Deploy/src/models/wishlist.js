import mongoose, { Schema } from 'mongoose';

const wishlistItemSchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ['vendor', 'venue'] },
    selected: { type: Boolean, default: false } 
});

const wishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: { type: [wishlistItemSchema], default: [] }
});

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);
export default WishlistModel;
