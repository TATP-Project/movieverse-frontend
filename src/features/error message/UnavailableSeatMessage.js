import React, { createContext } from 'react';
import { Button, Modal} from 'antd';
import ConfirmButton from '../button/ConfirmButton';
import "./UnavailableSeatMessage.css";
const ReachableContext = createContext(null);

export default function UnavailableSeatMessage(props) {
  // const {seats} = props;
  const seats = [{
    row: 1,
    column: 1
  },{
    row: 2,
    column: 1 
  }];
  const config = (seatsInLetter) =>{
    modal.error({title: 'Seat Not Available',
            content: (
              <>
                Seat {seatsInLetter} become unavailable when you selecting the seats. 
                <br/>
                Please select other seat.
              </>
            ),});

  }
  
  const [modal, contextHolder] = Modal.useModal();
  
  var seatsInLetter = seats.map(seat => {
    var rowLetter = String.fromCharCode(64 + parseInt(seat.row));
    var seatsStr = rowLetter + seat.column;
    return seatsStr;
  }).join(", ")

  return (
    <div> 
        
        <ReachableContext.Provider value="Light">
        <ConfirmButton className="message-box"
          onClick={() => {
            modal.error({title: 'Seat Not Available',
            content: (
              <>
                Seat {seatsInLetter} become unavailable when you selecting the seats. 
                <br/>
                Please select other seat.
              </>
            ),});
          }}
        />
        {contextHolder}
        </ReachableContext.Provider>
  </div>
  )
}
