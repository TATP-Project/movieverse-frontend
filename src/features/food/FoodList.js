import React, { useEffect } from "react";
import { useState } from "react";
import { getFoods } from "../../api/foods";
import { Col, Row, Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { setSelectedFood } from "./foodSlice";
import { useNavigate } from "react-router-dom";

import FoodCard from "./FoodCard";
import "./FoodList.css";

export default function FoodPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [selectedFood, setCurrentSelectedFood] = useState({});
    useEffect(() => {
        getFoods().then((response) => {
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
        });
    }, []);

    const updateSelectedFood = (id, amount) => {
        let holder = selectedFood;
        console.log(holder, id, amount);
        holder[id]["count"] = amount;
        setCurrentSelectedFood(holder);
    };

    const onSubmitFoods = () => {
        dispatch(setSelectedFood(selectedFood));
        navigate("/ticketinfo");
    };

    return (
        <>
            <Card className="foodMainList">
                <Row gutter={[16, 26]}>
                    <Col span={24}>
                        <div className="foodtitle">YOU MAY ALSO LIKE</div>
                    </Col>
                </Row>
                <Row>
                    <div className="foodSubTitle">Hog Dogs</div>
                </Row>
                <Row>
                    {foods.map((food, index) => {
                        if (food.type === "hotdog") {
                            return (
                                <Col>
                                    <FoodCard
                                        food={food}
                                        key={food.id}
                                        updateSelectedFood={updateSelectedFood}
                                    />
                                </Col>
                            );
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
                                <>
                                    <FoodCard
                                        food={food}
                                        key={food.id}
                                        updateSelectedFood={updateSelectedFood}
                                    />
                                </>
                            );
                        }
                    })}
                </Row>
                <Row>
                    <div className="foodSubTitle">drink</div>
                </Row>
                <Row>
                    {foods.map((food, index) => {
                        if (food.type === "drink") {
                            return (
                                <>
                                    <FoodCard
                                        food={food}
                                        key={food.id}
                                        updateSelectedFood={updateSelectedFood}
                                    />
                                </>
                            );
                        }
                    })}
                </Row>

                <Button onClick={onSubmitFoods}>Dummy Confirm Button</Button>
            </Card>
        </>
    );
}
