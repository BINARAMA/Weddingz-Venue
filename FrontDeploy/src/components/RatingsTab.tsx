
const RatingsTab = () => {
    // Dummy ratings data
    const ratings = [
        { stars: 5, review: "Excellent service!" },
        { stars: 4, review: "Very good experience." },
        { stars: 3, review: "Average service." },
        { stars: 2, review: "Needs improvement." },
        { stars: 1, review: "Poor service." },
    ];

    // Function to render stars based on rating
    const renderStars = (rating: number) => { // Explicitly define type for 'rating'
        const starArray = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starArray.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
            } else {
                starArray.push(<i key={i} className="far fa-star text-gray-400"></i>);
            }
        }
        return starArray;
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
            {ratings.map((rating, index) => (
                <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                        <div className="mr-2">{renderStars(rating.stars)}</div>
                        <span className="text-gray-600">{rating.stars} stars</span>
                    </div>
                    <p className="text-gray-800">{rating.review}</p>
                </div>
            ))}
        </div>
    );
};

export default RatingsTab;
