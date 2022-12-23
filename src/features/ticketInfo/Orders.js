import React from "react";
import { Col, Row } from "antd";
import SeatsInfoItem from "./SeatsInfoItem";
import FoodInfoItem from "./FoodInfoItem";
import TotalAmount from "./TotalAmount";

export default function Orders(props) {
    const { food, session, seats } = props;
    const calculateTotalAmount = () => {
        var foodTotal = Object.keys(food).reduce((total, id) => {
            var thisFood = food[id];
            total += parseInt(thisFood.count) * parseInt(thisFood.price);
            return total;
        }, 0);

        var seatTotal =
            parseInt(session.price) * parseInt(Object.keys(seats).length);
        return foodTotal + seatTotal;
    };
    return (
        <>
            <div className="orders-title">Orders</div>
            <div className="orders-component">
                <Col>
                    <Row justify="start" className="ordersInfoItem">
                        <SeatsInfoItem
                            header="Seats"
                            seats={seats}
                            price={session.price}
                        />
                    </Row>

                    <Row justify="start" className="ordersInfoItem">
                        <FoodInfoItem
                            header="F&amp;B"
                            food={food}
                            price={session.price}
                        />
                    </Row>
                </Col>
            </div>
            <TotalAmount amount={calculateTotalAmount()} />
        </>
    );
}
