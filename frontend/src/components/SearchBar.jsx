import { useState, useEffect, useRef } from 'react';

function SearchBar({ onSearch, placeholder = 'Search notes…' }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  /* Debounce: wait 350ms after last keystroke before firing */
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(query.trim());
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  const clear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-sm" id="search-bar-wrapper">
      {/* Search icon */}
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>

      <input
        id="search-notes-input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input pl-10 pr-9 text-sm"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={clear}
          id="search-clear-btn"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
