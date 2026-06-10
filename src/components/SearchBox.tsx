import React, { FormEvent, ChangeEvent, MouseEvent } from "react";
import { Search, X } from "lucide-react";
import "../styles/SearchBox.css";

interface SearchOverlayProps {
  showSearch: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  doSearch: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  showSearch,
  query,
  setQuery,
  setShowSearch,
  doSearch,
}) => {
  if (!showSearch) return null;

  const handleOverlayClick = (): void => {
    setShowSearch(false);
  };

  const handleContentClick = (
    e: MouseEvent<HTMLDivElement>
  ): void => {
    e.stopPropagation();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setQuery(e.target.value);
  };

  return (
    <div
      className="search-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="search-container"
        onClick={handleContentClick}
      >
        <form
          onSubmit={doSearch}
          className="search-form"
        >
          <Search className="search-icon" />

          <input
            autoFocus
            value={query}
            onChange={handleInputChange}
            placeholder="Search for products..."
            className="search-input"
          />

          <button
            type="button"
            onClick={() => setShowSearch(false)}
            className="search-close-btn"
          >
            <X className="search-close-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchOverlay;