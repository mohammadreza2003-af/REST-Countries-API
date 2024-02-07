import { useGContext } from "@/contexts/GlobalContext";
import React from "react";

function Search() {
  const { setSearchText } = useGContext();

  const handleFiltering = (target: string) => {
    setSearchText(target);
  };

  return (
    <div className={`flex px-2 py-4 rounded-md shadow-md gap-2 w-[256px] mb-8`}>
      <p>🔍</p>
      <input
        className=""
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => handleFiltering(e.target.value)}
      />
    </div>
  );
}

export default Search;
