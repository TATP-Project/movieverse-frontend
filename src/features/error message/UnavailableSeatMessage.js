import { Alert } from 'antd';
import {React,useSelector} from 'react'


export default function UnavailableSeatMessage(props) {
  const seats = [{
    row: 1,
    column: 1
  },{
    row: 2,
    column: 1 
  }];
  var seatsInLetter = seats.map(seat => {
    var rowLetter = String.fromCharCode(64 + parseInt(seat.row));
    var seatsStr = rowLetter + seat.column;
    return seatsStr;
  }).join(", ")

  return (
    <div> 
        <Alert
        message="Seat Not Available"
        description= {
          <code>
            Seat {seatsInLetter} become unavailable when you selecting the seats. 
            Please select other seat.
          </code>
        }
        type="error"
        showIcon
        />
  </div>
  )
}
