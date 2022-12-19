import Link from "next/link";
import {useState} from "react";
function LocationList(props) {
  let items = [];
  const handleOnChange = (e) => {
    
    let value = e.target.value;
    items.push(value);
  };

  
  

  return (
    <div>
      <div>
        <p>Please Select the project Location you would like to update</p>
        <ul>
          {props.locations.map((items) => (
            <div key={items.id}>
              <input
                type="checkbox"
                id="locationItem"
                name="locationItem"
                value={items.id}
                onChange={handleOnChange}
              />
              <label htmlFor="locationItem">{items.name}</label>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LocationList;
