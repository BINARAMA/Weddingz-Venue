
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../redux/api/blog';
import NavBar from '../components/navbar';


const BlogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogData, error, isLoading } = useGetBlogByIdQuery(id || '');
 
 

 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <div className="text-xl">Blog post not found</div>
      </div>
    );
  }

  const blog = blogData?.data.blog;
  
 
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-8 font-roboto">
  
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              {blog?.title}
            </h1>
            {blog?.images && blog?.images[0] && (
              <div className="flex justify-center mb-8">
                <img
                  src={blog?.images[2]}
                  alt={blog?.title}
                  className="w-full md:w-2/3 lg:w-1/2 h-80 object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            <div className="prose max-w-none mx-auto text-gray-700 leading-loose">
              {blog?.content}
            </div>
  
          </>
       
      </div>
    </>
  );
};

export default BlogView;
