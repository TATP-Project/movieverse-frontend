import React from "react";
import "./TicketInfo.css";

export default function FoodInfoItem(props) {
    var noFoodSelected = Object.keys(props.food)
        .map((id) => props.food[id].count)
        .every((item) => item === 0);
    console.log(noFoodSelected);
    return (
        <div className="ticketInfoItem">
            <div className={"ticketTableHeader"}>{props.header}</div>
            <div>
                {!noFoodSelected
                    ? Object.keys(props.food).map((id) => {
                          var food = props.food[id];
                          return food.count !== 0 ? (
                              <div class="multipleRow">
                                  {food.name + " x" + food.count}
                              </div>
                          ) : null;
                      })
                    : "-"}
            </div>
        </div>
    );
}
