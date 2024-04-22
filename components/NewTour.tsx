"use client";

import { generateTour, createNewTour, getExistingTour } from "@/app/utils/actions";
import TourInfo from "@/components/TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import toast from 'react-hot-toast';

const NewTour = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation<mbTour | null, unknown, { city: string; country: string }>({
    mutationFn: async ({city, country}) => {
      const existingTour = await getExistingTour(city, country);
      if (existingTour) return existingTour;
      const newTour = await generateTour(city, country);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ['tours'] });
        return newTour;
      }
      toast.error('No matching city found...');
      return null;
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error("An error occurred");
        return;
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      city: { value: string };
      country: { value: string };
    };
    mutate({ city: target.city.value, country: target.country.value });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4 text-base-content" >Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="city"
            name="city"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
            required
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "generate tour"}
          </button>
        </div>
      </form>
      <div className="mt-16 text-base-content">
        {tour ? <TourInfo tour={tour} /> : <h1>Create Your First Tour!</h1>}
      </div>
    </>
  );
};

export default NewTour;
