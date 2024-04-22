import Image from "next/image";

interface ShortInfoProps extends shortInfo {
  currency: string;
}

const ShortInfo = async ({
  image,
  temperature,
  time,
  currency,
}: ShortInfoProps) => {
  return (
    <>
      {image ? (
        <div>
          <Image
            src={image}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-4 h-96 w-96 object-cover"
            alt="City Image"
            priority
          />
        </div>
      ) : null}
      <div className="flex justify-between max-w-lg mb-8">
        <div className="bg-primary rounded-lg p-3">
          <p className="text-2xl font-semibold text-white">{temperature}°C</p>
          <p className="text-sm text-sky-100">Temperature</p>
        </div>
        <div className="bg-primary rounded-lg p-3">
          <p className="text-2xl font-semibold text-white">{time}</p>
          <p className="text-sm text-sky-100">Time</p>
        </div>
        <div className="bg-primary rounded-lg p-3">
          <p className="text-2xl font-semibold text-white">{currency}</p>
          <p className="text-sm text-sky-100">Currency</p>
        </div>
      </div>
    </>
  );
};

export default ShortInfo;
