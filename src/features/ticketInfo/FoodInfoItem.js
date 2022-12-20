import React from "react";
import "./TicketInfo.css";

export default function FoodInfoItem(props) {
    return (
        <div className="ticketInfoItem">
            <div className={"ticketTableHeader"}>{props.header}</div>
            <div>
                {Object.keys(props.food).map((id) => {
                    var food = props.food[id];
                    return food.count !== 0 ? (
                        <div class="multipleRow">
                            {food.name + " x" + food.count}
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
}
