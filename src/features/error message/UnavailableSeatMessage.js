import React, { createContext } from 'react';
import { Button, Modal} from 'antd';
const ReachableContext = createContext(null);

export default function UnavailableSeatMessage(props) {
  const seats = [{
    row: 1,
    column: 1
  },{
    row: 2,
    column: 1 
  }];
  const [modal, contextHolder] = Modal.useModal();
  
  var seatsInLetter = seats.map(seat => {
    var rowLetter = String.fromCharCode(64 + parseInt(seat.row));
    var seatsStr = rowLetter + seat.column;
    return seatsStr;
  }).join(", ")

  return (
    <div> 
        
        <ReachableContext.Provider value="Light">
        <Button
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
        >Error</Button>
        {contextHolder}
        </ReachableContext.Provider>
  </div>
  )
}
