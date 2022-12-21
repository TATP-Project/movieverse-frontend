                
import React, { useEffect } from "react";
import { useState } from "react";
import {getFoods}  from "../../api/foods";
import { Col, Row, Card, Button, Space } from 'antd';
import { useDispatch } from "react-redux";
import { setSelectedFood } from "./foodSlice";

import FoodCard from "./FoodCard";
import "./FoodList.css"

export default function FoodPage(){
    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const [foods, setFoods] = useState([]);
    const [selectedFood,setCurrentSelectedFood] = useState({})
    useEffect(() => {
        getFoods().then((response)=>{
            console.log(response)
            setFoods(response.data);
            let templateSelectedFood = {}
            response.data.forEach(food => {
                templateSelectedFood[food.id] = {
                    "name": food.name,
                    "price": food.price,
                    "count": 0
                } 
            });
            setCurrentSelectedFood(templateSelectedFood)
        })
    }, []);
    
    const updateSelectedFood = (id,amount) =>{
        
        let holder = selectedFood;
        holder[id]["count"] = amount
        setCurrentSelectedFood(holder)

        let countingPrice = 0;
        Object.keys(selectedFood).forEach((id) => {
            let item = selectedFood[id]
            countingPrice += item["count"] * item["price"]
        });
        setPrice(countingPrice)
    }

    const onSubmitFoods = ()=>{
        dispatch(setSelectedFood(selectedFood))
    }

    return (
        <>
            <Card className="foodMainList" >
                <Space direction="vertical" size="large" style={{display:"flex"}}>
                    <Row >
                        <Col span={24}>
                            <div className="foodtitle">YOU MAY ALSO LIKE</div>
                        </Col>
                    </Row>
                    
                    <Row >
                        <div className="foodSubTitle">Hog Dogs</div>
                    </Row>
                    <Row>
                        {foods.map((food,index) => {
                            if(food.type==="hotdog"){
                                return  <Col span={8}>
                                            <Row justify="end">
                                                <FoodCard food={food} key={food.id} updateSelectedFood={updateSelectedFood}/>
                                            </Row>
                                        </Col>  
                            }
                        })}
                    </Row>
                    <Row>
                        <div className="foodSubTitle">Popcorn</div>
                    </Row>
                    <Row>
                        {foods.map((food,index)=>{
                            if(food.type==="popcorn"){
                                return  <Col span={8}>
                                            <Row justify="end">
                                                <FoodCard food={food} key={food.id} updateSelectedFood={updateSelectedFood}/>
                                            </Row>
                                        </Col> 
                            }
                        })}
                    </Row>
                    <Row>
                        <div className="foodSubTitle">Drink</div>
                    </Row>
                    <Row>
                        {foods.map((food,index)=>{
                            if(food.type==="drink"){
                                return  <Col span={8}>
                                            <Row justify="end">
                                                <FoodCard food={food} key={food.id} updateSelectedFood={updateSelectedFood}/>
                                            </Row>
                                        </Col> 
                                }
                        })}
                    </Row>
                    <div className="foodtitle">Total Price: {price}</div>
                    <Button onClick={onSubmitFoods}>Dummy Confirm Button</Button>
                </Space>
            </Card>
        </>
    )
}