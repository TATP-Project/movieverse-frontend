                
import React, { useEffect } from "react";
import { useState } from "react";
import {getFoods}  from "../../api/foods";
import { Col, Row, Card, Button } from 'antd';

import FoodCard from "./FoodCard";
import "./FoodList.css"

export default function FoodPage(){
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        getFoods().then((response)=>{
            setFoods(response.data);
        })
    }, []);

    
    return (
        <>
            <Card className="foodMainList" >
                    <Row gutter={[16,26]} >
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
                                return  <Col>
                                            <FoodCard food={food} key={index} />
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
                                return  <>
                                            
                                            <FoodCard food={food} key={index}/>
                                        </>  
                            }
                        })}
                    </Row>
                    <Row>
                        <div className="foodSubTitle">drink</div>
                    </Row>
                    <Row>
                        {foods.map((food,index)=>{
                            if(food.type==="drink"){
                                return  <>
                                            
                                            <FoodCard food={food} key={index}/>
                                        </>  
                                    }
                        })}
                    </Row>

                    <Button>Dummy Confirm Button</Button>
            </Card>
        </>
    )
}