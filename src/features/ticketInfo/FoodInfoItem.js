import React from "react";
import "./TicketInfo.css";

import { Col, Row } from 'antd';

export default function FoodInfoItem(props) {
    var noFoodSelected = Object.keys(props.food)
        .map((id) => props.food[id].count)
        .every((item) => item === 0);
    return (
        <>
            <Col span={8} >
                <Row justify="start">
                    <div className={"ticketTableHeader"}>{props.header}</div>
                </Row>
            </Col>
            <Col span={8}>
                   {!noFoodSelected
                    ? Object.keys(props.food).map((id) => {
                          var food = props.food[id];
                          return food.count !== 0 ? (
                            <Row>
                              <div class="multipleRow">
                                  {food.name + " x" + food.count}
                              </div>
                            </Row>
                          ) : null;
                      })
                    : "-"}
            </Col>
            <Col span={8}>
                {!noFoodSelected
                    ? Object.keys(props.food).map((id) => {
                          var food = props.food[id];
                          var subPrice = food.count * food.price
                          return food.count !== 0 ? (
                            <Row justify="end">
                              <div class="multipleRow">
                                  {"$"+subPrice}
                              </div>
                            </Row>
                          ) : null;
                      })
                    : "-"}
            </Col>
        </>
        // <div className="ticketInfoItem">
        //     <div className={"ticketTableHeader"}>{props.header}</div>
        //     <div>
        //         {!noFoodSelected
        //             ? Object.keys(props.food).map((id) => {
        //                   var food = props.food[id];
        //                   return food.count !== 0 ? (
        //                       <div class="multipleRow">
        //                           {food.name + " x" + food.count}
        //                       </div>
        //                   ) : null;
        //               })
        //             : "-"}
        //     </div>
        // </div>
    );
}
