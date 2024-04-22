import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>AI Helper and Travel Guide</h1>
          <p className='py-6 text-lg leading-loose'>
            TravelAI is a chatbot that helps you plan your next vacation. It can
            provide you with information about different cities, countries, and
            tourist attractions. Also you can check current time, weather and currency of the city.
          </p>
          <Link href='/chat' className='btn btn-primary '>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;