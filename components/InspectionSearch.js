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
      <div style={{paddingTop: 250}}>
        <label style={{fontSize: 45}}htmlFor="locations">Search By Location</label>
        <input style={{width: 250,fontSize:30, marginLeft: 10 }}type="text" id="locations" ref={searchInput} />
        <br />
        <br />
      </div>
      <Button>Search</Button>
    </form>
  );
}

export default SearchInspection;
