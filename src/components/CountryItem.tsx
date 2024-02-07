import { type Country, useGContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

function CountryItem() {
  const { tempC } = useGContext();
  const router = useRouter();
  const handleDetailCountry = (info: Country) => {
    router.push(`/${info.name.common}`);
    localStorage.setItem("currentCountry", JSON.stringify(info));
  };
  return (
    <>
      {tempC.map((country: Country) => {
        return (
          <div
            key={country.name.common}
            className="shadow-xl grid grid-rows-2 h-[340px] max-w-[320px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleDetailCountry(country)}
          >
            <div>
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-full"
                height={500}
                width={500}
              />
            </div>
            <div className="mt-4 p-4">
              <p className="font-bold text-xl">{country.name.common}</p>
              <ul className="mt-2">
                <li>
                  <span className="font-semibold text-veryDarkBlueL">
                    Population :
                  </span>
                  <span className="text-darkBlue font-medium">
                    {country.population}
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-veryDarkBlueL">
                    Region :
                  </span>
                  <span className="text-darkBlue font-medium">
                    {country.region}
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-veryDarkBlueL">
                    Capital :
                  </span>
                  <span className="text-darkBlue font-medium">
                    {country.capital}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CountryItem;
