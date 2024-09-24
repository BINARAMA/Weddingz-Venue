import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/navbar';

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: 'ABDUL KAREEM',
      role: 'Founder & CEO',
      imageUrl: '/founderandCEO.jpg',
    },
    // {
    //   name: 'Raziya Kareem',
    //   role: 'Senior Event Consultant',
    //   imageUrl: '/SeniorEventConsultant.jpg',
    // },
    // {
    //   name: 'Azra Akram ali khan',
    //   role: 'Senior Event Director',
    //   imageUrl: '/SeniorEventDirector.jpg',
    // },
  ];

  const localVideos = [
    '/aboutus1',
    '/aboutus2',
  ];

  return (
    <div>
      <NavBar />
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">About Us</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Welcome to our wedding planning and vendor services website. We are dedicated to helping you create the wedding of your dreams by connecting you with the best venues and vendors in the industry.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Mission</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our mission is to provide the best wedding vendor services to couples and make their special day truly memorable. We believe that every couple deserves a wedding that reflects their unique love story, and we are committed to making that vision a reality through exceptional service and attention to detail.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Story</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our journey began in 2015 with a passion for creating unforgettable wedding experiences. Founded by ABDUL KAREEM, our company has grown from a small startup into a leading provider of wedding vendor services. With a dedicated team of professionals and a network of top-tier vendors, we have helped hundreds of couples bring their dream weddings to life. Our commitment to excellence and personalized service sets us apart, and we are proud to be a trusted partner in one of life's most important moments.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Our Team</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8 justify-items-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    alt={member.name}
                    className="mx-auto rounded-full w-32 h-32 mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Videos</h3>
            <div className="mt-6  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {localVideos.map((videoPath, index) => (
                <div key={index} className="rounded-lg shadow-md overflow-hidden h-[400px] flex justify-center">
                  <video
                    width="100%"
                    height="315"
                  >
                    <source src={videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
