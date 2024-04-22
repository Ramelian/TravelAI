import Link from 'next/link';
const TourCard = ({ tour }: {tour: mbTour}) => {
  const { city, title, _id, country } = tour;

  return (
    <Link
      href={`/tours/${_id}`}
      className='card card-compact rounded-xl bg-base-100'
    >
      <div className='card-body items-center text-center text-base-content'>
        <h2 className='card-title text-center'>
          {city}, {country}
        </h2>
      </div>
    </Link>
  );
};
export default TourCard;