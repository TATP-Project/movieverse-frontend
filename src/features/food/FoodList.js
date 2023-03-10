import React, { useEffect } from "react";
import { useState } from "react";
import { getFoods } from "../../api/foods";
import { Col, Row, Card, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFood } from "./foodSlice";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../counter/CountdownTimer";
import TotalAmount from "../ticketInfo/TotalAmount";
import ConfirmButton from "../button/ConfirmButton";
import FoodCard from "./FoodCard";
import "./FoodList.css";
import { toggleLoading } from "../loading/loadingSlice";
import { pushHistory } from "../history/historySlice";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FoodPage() {
    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [selectedFood, setCurrentSelectedFood] = useState({});
    const timer = useSelector((state) => state.countdownTimer);
    const targetDate = timer.targetDate;
    const isExpired = timer.isExpired;

    useEffect(() => {
        dispatch(toggleLoading(1));
        getFoods()
            .then((response) => {
                setFoods(response.data);
                let templateSelectedFood = {};
                response.data.forEach((food) => {
                    templateSelectedFood[food.id] = {
                        name: food.name,
                        price: food.price,
                        count: 0,
                    };
                });
                setCurrentSelectedFood(templateSelectedFood);
            })
            .finally(() => dispatch(toggleLoading(-1)));
    }, [dispatch]);

    const updateSelectedFood = (id, amount) => {
        let holder = selectedFood;
        holder[id]["count"] = amount;
        setCurrentSelectedFood(holder);

        let countingPrice = 0;
        Object.keys(selectedFood).forEach((id) => {
            let item = selectedFood[id];
            countingPrice += item["count"] * item["price"];
        });
        setPrice(countingPrice);
    };

    const onSubmitFoods = () => {
        dispatch(setSelectedFood(selectedFood));
        dispatch(pushHistory("/ticketinfo"));
        navigate("/ticketinfo");
    };

    const error = {
        title: "Session Expired",
        context: "Your session has been expired",
    };
    return (
        <>
            <Card className="foodMainList" style={{ top: "50px" }}>
                <Space
                    direction="vertical"
                    size="large"
                    style={{ display: "flex" }}
                >
                    <Row>
                        <Col span={12}>
                            <div className="foodtitle">YOU MAY ALSO LIKE</div>
                        </Col>
                        <Col span={12}>
                            <CountdownTimer targetDate={targetDate} />
                            {isExpired && (
                                <ErrorMessage
                                    error={error}
                                    ok={() => {
                                        navigate("/");
                                        navigate(0);
                                    }}
                                />
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <div className="foodSubTitle">Hog Dogs</div>
                    </Row>
                    <Row>
                        {foods.map((food, index) => {
                            if (food.type === "hotdog") {
                                return (
                                    <Col span={8} key={index}>
                                        <Row justify="end">
                                            <FoodCard
                                                food={food}
                                                key={food.id}
                                                updateSelectedFood={
                                                    updateSelectedFood
                                                }
                                            />
                                        </Row>
                                    </Col>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Row>
                    <Row>
                        <div className="foodSubTitle">Popcorn</div>
                    </Row>
                    <Row>
                        {foods.map((food, index) => {
                            if (food.type === "popcorn") {
                                return (
                                    <Col span={8} key={index}>
                                        <Row justify="end">
                                            <FoodCard
                                                food={food}
                                                key={food.id}
                                                updateSelectedFood={
                                                    updateSelectedFood
                                                }
                                            />
                                        </Row>
                                    </Col>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Row>
                    <Row>
                        <div className="foodSubTitle">Drink</div>
                    </Row>
                    <Row>
                        {foods.map((food, index) => {
                            if (food.type === "drink") {
                                return (
                                    <Col span={8} key={index}>
                                        <Row justify="end">
                                            <FoodCard
                                                food={food}
                                                key={food.id}
                                                updateSelectedFood={
                                                    updateSelectedFood
                                                }
                                            />
                                        </Row>
                                    </Col>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Row>

                    <TotalAmount amount={price} />
                </Space>
            </Card>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >
                <ConfirmButton onClick={onSubmitFoods} />
            </div>
        </>
    );
}
