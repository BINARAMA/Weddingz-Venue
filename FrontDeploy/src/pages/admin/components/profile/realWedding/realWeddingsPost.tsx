import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRealWeddingsPostByIdQuery, useUpdateRealWeddingsPostMutation } from '../../../../../redux/api/realWeddings';
import NavBar from '../../baar/navbar';
// import Footer from '../../../../../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface RealWeddingPostInterface {
  id: string;
  title: string;
  images: string[];
  content: string;
}

const RealWeddingsPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: realWeddingData, error, isLoading, refetch } = useGetRealWeddingsPostByIdQuery(id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [updateRealWedding] = useUpdateRealWeddingsPostMutation();
  const [formData, setFormData] = useState<RealWeddingPostInterface>({
    id: '',
    title: '',
    images: [],
    content: ''
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    if (realWeddingData?.data) {
      setFormData({
        id: realWeddingData.data.realWeddings._id,
        title: realWeddingData.data.realWeddings.title || '',
        images: realWeddingData.data.realWeddings.images || [],
        content: realWeddingData.data.realWeddings.content || ''
      });
    }
  }, [realWeddingData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !realWeddingData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Real Wedding post not found</div>
      </div>
    );
  }

  const realWedding = realWeddingData?.data.realWeddings;

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      id: realWedding._id,
      title: realWedding.title || '',
      images: realWedding.images || [],
      content: realWedding.content || '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('content', formData.content);
    selectedImages.forEach(image => {
      formDataToSubmit.append('images', image);
    });

    try {
      await updateRealWedding({ id: formData.id, realWeddingsFormData: formDataToSubmit });
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Failed to update real wedding:', error);
    }
  };

  return (
    <>
    <NavBar />
    <div className="min-h-screen flex flex-col">``
      <main className="flex-grow container mx-auto py-8">
        {!isEditing ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-[#173445]">
              {realWedding?.title}
            </h1>
            {realWedding?.images && realWedding?.images.length > 0 && (
              <div className="mb-8">
                <Carousel
                  showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={5000}
                  transitionTime={500}
                >
                  {realWedding.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Real Wedding Image ${index + 1}`}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
            <div className="prose max-w-none mx-auto text-gray-700 leading-relaxed mb-8">
              {realWedding?.content}
            </div>
            <div className="text-center">
              <button
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={8}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="images">
                  Images
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      {/* <Footer /> */}
    </div>
    </>
  );
};

export default RealWeddingsPost;