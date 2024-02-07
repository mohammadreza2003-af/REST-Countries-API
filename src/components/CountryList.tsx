import React from "react";
import CountryItem from "./CountryItem";
import Search from "./Search";
import { useGContext } from "@/contexts/GlobalContext";
import Loading from "./Loading";

function CountryList() {
  const { loading } = useGContext();
  return (
    <div className="my-24">
      <Search />
      {loading && <Loading />}
      <div className="w-full grid grid-cols-4 gap-8 mx-auto">
        <CountryItem />
      </div>
    </div>
  );
}

export default CountryList;
