import React from 'react';

interface Article {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

// Destructure props in function signature
const ArticleCard: React.FC<Article> = ({ title, description, image, url }) => {
    return (
        <div className="max-w-xs mx-4 mb-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Use 'image' and 'title' from props */}
                <img className="w-full h-48 object-cover object-center" src={image} alt={title} />
                <div className="p-4">
                    {/* Use 'title' and 'description' from props */}
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
                <div className="bg-gray-200 px-4 py-2">
                    {/* Use 'url' from props */}
                    <a href=  { `/blogs/${url}`} className="text-blue-500 font-semibold">Read more</a>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
