import { useRef } from "react";
import Button from "./ui/button";

function SearchInspection(props) {
  const searchInput = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const selectedSearch = searchInput.current.value;
    props.onSearch(selectedSearch);
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="locations">Search By Location</label>
        <input type="text" id="locations" ref={searchInput} />
        <br />
        <br />
      </div>
      <Button>Search</Button>
    </form>
  );
}

export default SearchInspection;
