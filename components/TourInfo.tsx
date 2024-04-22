"use client";
import { getShortInfo } from "@/app/utils/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ShortInfo from "./ShortInfo";

const TourInfo = async ({ tour }: { tour: mbTour }) => {
  const { title, description, stops, currency, city } = tour;
  const { data, error, isPending } = useQuery<shortInfo, Error, shortInfo>({
    queryKey: ['cityInfo', city],
    queryFn: () => getShortInfo(city),
  });
  
  const {temperature, time, image} = data || {};

  if(isPending) return <span className="loading"></span>
  return (
    <>
    {image && temperature && time && <ShortInfo image={image} temperature={temperature} time={time} currency={currency}/>}
      <div className="max-w-2xl text-base-content">
        <h1 className="text-4xl font-semibold mb-4">{title}</h1>
        <p className="leading-loose mb-6">{description}</p>
        <ul>
          {stops.map((stop) => {
            return (
              <li key={stop} className="mb-4 bg-base-100 p-4 rounded-xl">
                <p className="text">{stop}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TourInfo;
