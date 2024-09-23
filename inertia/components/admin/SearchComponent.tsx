type Props = {
  query: string
  setQuery: Function
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void
}

function SearchComponent({ query, setQuery, handleSearch }: Props) {
  return (
    <div className="mb-5">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          name="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search categories..."
        />
        <button className="bg-blue-300 p-2 rounded-md ml-2 text-white" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchComponent
