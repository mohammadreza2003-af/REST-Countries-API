"use client";

import { fetchData } from "@/constants/fetchData";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

type flag = {
  png: string;
  alt: string;
  svg: string;
};
type name = {
  common: string;
};
type cat = {
  official: string;
  common: string;
};
type nativeName = {
  cat: cat;
};
export type Country = {
  flags: flag;
  capital: string[];
  population: number;
  region: string;
  name: name;
  nativeName: nativeName;
  subregion: string;
  currencies: any;
  languages: {
    cat: string;
  };
  borders: string[];
};

type PropsType = {
  children: ReactNode;
};

type ValueType = {
  test: string;
  tempCountry: Country[];
  tempC: Country[];
  setSearchText: Dispatch<SetStateAction<string>>;
  loading: boolean;
};

const URL_ALL = "https://restcountries.com/v3.1/all";

const globalContext = createContext<ValueType | null>(null);

function GlobalProvider({ children }: PropsType) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //   const URL_REG = useMemo(
  //     () => `https://restcountries.com/v3.1/region/${searchText}`,
  //     [searchText]
  //   );

  const URL_NAME = useMemo(
    () => `https://restcountries.com/v3.1/name/${searchText}`,
    [searchText]
  );

  // console.log(countries);

  useEffect(() => {
    const fetchDataAndUpdateState = async (url: string) => {
      try {
        setLoading(true);
        const data = await fetchData(url);
        if (!data) {
          throw new Error("Country not found");
        }
        setCountries(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setCountries([]);
      }
    };

    if (searchText.length > 0) {
      fetchDataAndUpdateState(URL_NAME);
    } else {
      fetchDataAndUpdateState(URL_ALL);
    }
  }, [searchText, URL_NAME]);

  const tempCountry: Country[] = useMemo(
    () =>
      Array.isArray(countries)
        ? countries.map(
            ({
              flags,
              nativeName,
              languages,
              subregion,
              borders,
              currencies,
              population,
              region,
              capital,
              name,
            }) => ({
              flags,
              population,
              region,
              capital,
              name,
              nativeName,
              languages,
              subregion,
              borders,
              currencies,
            })
          )
        : [],
    [countries]
  );

  const tempC: Country[] = useMemo(
    () => [...tempCountry].sort(() => Math.random() - 0.5).slice(0, 8),
    [tempCountry]
  );

  const values: ValueType = {
    test: "Ali",
    tempCountry,
    tempC,
    setSearchText,
    loading,
  };

  return (
    <globalContext.Provider value={values}>{children}</globalContext.Provider>
  );
}

const useGContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};

export { GlobalProvider, useGContext };
