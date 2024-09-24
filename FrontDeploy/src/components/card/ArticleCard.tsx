import React from 'react';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  id?: string;
  image?: string;
  title?: string;
  description?: string;
  date?: string;
}

const ArticleCard: React.FC<VendorCardProps> = ({
  id,
  image = '/public/delhi.jpg',
  title = 'Kundan Mehandi Art, Delhi',
  description = 'How about hiring a guy with 27 years of experience just in bridal mehandi art? yes that true!',
  date = '12/12/2022'
}) => {
  console.log("idd", id);

  // Truncate title if it's too long
  const maxTitleLength = 22;
  const truncatedTitle = title.length > maxTitleLength ? `${title.slice(0, maxTitleLength)}...` : title;

  return (
    <Link to={`/blogs/${id}`}>
      <div className="relative max-w-sm shadow-md h-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 p-2">
          <img src={image} alt="Article" className="w-full h-full object-cover" />
        </div>
        <div className="pt-2 pl-1 pr-[98px]">
          <h2 className="text-l font-semibold h-6 overflow-hidden">{truncatedTitle}</h2>
          <p className="text-[12px] mt-2 h-14 overflow-hidden">{description}</p>
          <div className="mt-2">
            <p className="text-[13px]">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
