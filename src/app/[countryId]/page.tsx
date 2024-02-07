"use client";
import { fetchData } from "@/constants/fetchData";
import { type Country, useGContext } from "@/contexts/GlobalContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

function CountryDetail() {
  const router = useRouter();
  const { countryId }: any = useParams();
  const [currentCountry, setCurrentCountry] = useState<Country[]>([]);
  const tempId = countryId.includes("%20")
    ? countryId.split("%20").join(" ")
    : countryId;
  const URL_NAME = useMemo(
    () => `https://restcountries.com/v3.1/name/${tempId}`,

    [tempId]
  );
  console.log(tempId);
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    const fetchDataAndUpdateState = async (url: string) => {
      try {
        const data = await fetchData(url);

        if (!data) {
          throw new Error("Country not found");
        }
        setCurrentCountry(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataAndUpdateState(URL_NAME);
  }, [URL_NAME]);

  const tempData = currentCountry?.filter(
    (cur) => cur.name.common.toLowerCase() === tempId.toLowerCase()
  )[0];

  return (
    <div className="w-full h-[60vh] justify-center items-center max-w-[1200px] mx-auto">
      <button
        onClick={() => handleBack()}
        className="mt-10 flex justify-center items-center px-8 rounded-lg py-2 bg-white shadow-xl"
      >
        ⬅Back
      </button>
      {tempData && (
        <div className="flex gap-16 justify-center mt-28 items-center">
          <div>
            <Image
              src={tempData.flags.svg}
              alt={tempData.name.common}
              width={512}
              height={512}
              className="shadow-md"
            />
          </div>
          <div className="mt-4 p-4">
            <p className="font-bold text-xl">{tempData.name.common}</p>
            <ul className="mt-2">
              <li>
                <span className="font-semibold text-veryDarkBlueL">
                  Population :
                </span>
                <span className="text-darkBlue font-medium">
                  {tempData.population}
                </span>
              </li>
              <li>
                <span className="font-semibold text-veryDarkBlueL">
                  Region :
                </span>
                <span className="text-darkBlue font-medium">
                  {tempData.region}
                </span>
              </li>
              <li>
                <span className="font-semibold text-veryDarkBlueL">
                  Capital :
                </span>
                <span className="text-darkBlue font-medium">
                  {tempData.capital}
                </span>
              </li>
            </ul>
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default CountryDetail;
