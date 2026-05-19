import { Suspense } from "react";

import SearchbarContainer from "./searchbarContainer";
import SearchInput from "./searchInput";
import SearchResult from "./searchResult";

const Searchbar = () => {
  return (
    <SearchbarContainer className="pt-10 flex flex-col gap-10">
      <SearchInput />
      <Suspense>
        <SearchResult />
      </Suspense>
    </SearchbarContainer>
  );
};

export default Searchbar;
