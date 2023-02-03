import React from "react";
import Checkbox from "../Checkbox";

function Select(props) {
    let handleClick = props.handleClick
    let isCheck = props.isCheck
  return (
    <div className="container" >
      <div className="row">
        <div className="col-md-12" >
          <table className="table" style={{ textAlign: "left", marginBottom: 10 }}>
            <thead>
              <tr>
                <th scope="col">
                  <Checkbox 
                    type="checkbox"
                    className="form-check-input"
                    name="selectAll"
                    id="selectAll"
                    handleClick={props.handleSelectAll}
                    isChecked={props.isCheckAll}
                  />
                </th>
                
                <th scope="col">Insection Location</th>
               
              </tr>
            </thead>
            <tbody>
                {props.list.map(({id, name}) =>(
                    <tr key={id}>
                       <th scope="row" >
                       <Checkbox
                          type="checkbox"
                          name={name}
                          id={id}
                          handleClick={handleClick}
                          isChecked={isCheck.includes(id)}
                          />
                       </th>
                       <td>{name}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Select;
