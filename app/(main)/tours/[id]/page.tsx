import Link from "next/link";
import { getSingleTour } from "@/app/utils/actions";
import TourInfo from "@/components/TourInfo";
import Image from "next/image";
import axios from "axios";
import ShortInfo from "@/components/ShortInfo";

const SingleTourPage = async ({ params }: { params: { id: string } }) => {
  const tour = await getSingleTour(params.id);

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
