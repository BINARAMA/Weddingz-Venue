import WishlistModel from '../models/wishlist.js';
export const addItemToWishlist = async (req, res) => {
    try {
        const { userId, itemId, itemType } = req.body;
        const existingItem = await WishlistModel.find({
            userId,
            'items.itemId': itemId,
            'items.itemType': itemType
        });
        if (existingItem) {
            return res.status(400).json({ message: 'Item already exists in the wishlist' });
        }
        await WishlistModel.findOneAndUpdate({ userId }, { $: { items: { itemId, itemType, selected: true } } }, { upsert: true });
        return res.status(201).json({ message: 'Item added to wishlist successfully' });
    }
    catch (error) {
        console.error('Error adding item to wishlist:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const removeItemFromWishlist = async (req, res) => {
    try {
        const { userId, itemId, itemType } = req.body;
        await WishlistModel.findOneAndUpdate({ userId }, { $: { items: { itemId, itemType } } });
        return res.status(200).json({ message: 'Item removed from wishlist successfully' });
    }
    catch (error) {
        console.error('Error removing item from wishlist:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const getUserWishlist = async (req, res) => {
    try {
        const userId = req.param;
        const wishlist = await WishlistModel.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        return res.status(200).json({ wishlist });
    }
    catch (error) {
        console.error('Error fetching user wishlist:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
