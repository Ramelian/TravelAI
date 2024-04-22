"use server";

import { OpenAI } from "openai";
import axios from "axios";

// Create an instance of OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import Tour, { ITour } from "@/database/models/Tour";
import { connectToDatabase } from "@/database/mongoose";

export const generateChatResponse = async (
  query: Query
): Promise<Query | undefined> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        query,
      ],
    });

    if (completion.choices.length > 0 && completion.choices[0].message) {
      return completion.choices[0].message; // Correctly accessing the message content if available
    }
    throw new Error(
      "No choices available or the message structure is incorrect."
    );
  } catch (error) {
    console.error(error);
  }
};

export const generateTour = async (
  city: string,
  country: string
): Promise<mbTour | null> => {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "currency": "only a full name of the currency, e.g. US Dollar, Euro, etc.",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide." },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
    });

    if (!completion.choices[0].message.content) {
      return null;
    }
    const response: tour = JSON.parse(completion.choices[0].message.content);
    if (!response.tour) return null;
    return response.tour;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getExistingTour = async (
  city: string,
  country: string
): Promise<mbTour | null> => {
  await connectToDatabase();
  try {
    const tour = await Tour.findOne({ city, country }).exec();
    return JSON.parse(JSON.stringify(tour));
  } catch (error) {
    console.error("Error retrieving tour:", error);
    return null;
  }
};

export const createNewTour = async (tourData: Tour): Promise<Tour> => {
  await connectToDatabase();
  try {
    const tour = new Tour(tourData);
    await tour.save();
    return JSON.parse(JSON.stringify(tour));
  } catch (error) {
    console.error("Error creating new tour:", error);
    throw error;
  }
};

export const getAllTours = async (searchTerm?: string ): Promise<mbTour[]> => {
  await connectToDatabase();
  if (!searchTerm) {
    const tours = await Tour.find().sort({ city: "asc" }).exec();
    return tours;
  }

  const tours: mbTour[] = await Tour.find ({
    $or: [
      { city: { $regex: searchTerm, $options: "i" } },
      { country: { $regex: searchTerm, $options: "i" } },
    ],
  }).sort({ city: "asc" }).exec();
  

  return JSON.parse(JSON.stringify(tours));
};

export const getSingleTour = async (id: string) => {
  await connectToDatabase();
  return await Tour.findById(id).exec();
};

function getCurrentTimeWithOffsetFormatted(offsetSeconds: number) {
  const now = new Date();
  const currentTimeMillis = now.getTime();

  const offsetMillis = offsetSeconds * 1000;
  const newTimeMillis = currentTimeMillis + offsetMillis;

  const newTime = new Date(newTimeMillis);
  const formattedTime = newTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedTime;
}

export const getShortInfo = async (city: string):Promise<shortInfo> => {
  const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;
  const { data:imageData } = await axios.get(url + city);
  const image = imageData?.results[0]?.urls?.raw;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.WEATHER_API_KEY}`;
  const { data } = await axios.get(BASE_URL);
  const { timezone, main } = data;
  const { temp } = main;
  const time = getCurrentTimeWithOffsetFormatted(timezone)
  return {image, temperature: temp, time};
}