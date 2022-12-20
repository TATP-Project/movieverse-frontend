import React,{useState} from "react";
import "./FoodCard.css";
import { Col, Row, Card, Button, Input } from 'antd';
import { UpOutlined, DownOutlined} from '@ant-design/icons';

export default function FoodCard(props){
    const {food, updateSelectedFood} = props;
    const [amount, setAmount] = useState(0);

    const addAmount =()=>{
        let newAmount = amount+1
        setAmount(newAmount);
        updateSelectedFood(food.id,newAmount);
    }

    const minusAmount =()=>{
        let newAmount = amount-1
        setAmount(newAmount);
        updateSelectedFood(food.id,newAmount);
    }

    const changeAmount =(event)=>{
        let newAmount = event.target.value
        setAmount(newAmount);
        updateSelectedFood(food.id,newAmount);
    }


    return (

        <Card className="foodCard">
            <div className="foodName">{food.name}</div>
            <Row justify="center">
                <div className="foodImage">
                    <img
                            src={"data:image/png;base64," + food.image}
                            alt={food.name + " stretched"}
                        />
                </div>
            </Row>
            <Row justify="center">
                <Col span={14} >
                    <div className="foodPrice">
                        ${food.price}
                    </div>
                </Col>
                <Col span = {4} >
                    
                    <Input
                        className="foodAmount"
                        onChange={changeAmount}
                        value = {amount}
                    >
                    </Input>
                </Col>
                <Col span = {6}>
                    <Row>
                        <Button type="text" onClick={addAmount} >
                            <UpOutlined style={{color:"#FFFFFF"}} />
                        </Button>
                    </Row>
                    <Row>
                        <Button type="text" onClick={minusAmount}>
                            <DownOutlined style={{color:"#FFFFFF"}} />
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}