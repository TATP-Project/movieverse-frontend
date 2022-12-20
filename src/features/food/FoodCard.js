import React,{useState} from "react";
import "./FoodCard.css";
import { Col, Row, Card, Button, Input, Space } from 'antd';
import { UpOutlined, DownOutlined} from '@ant-design/icons';

export default function FoodCard(props){
    const {food, updateSelectedFood} = props;
    const [amount, setAmount] = useState(0);

    const addAmount =()=>{
        let newAmount = amount+1;
        if (newAmount < 0){ newAmount=0;}
        setAmount(newAmount);
        updateSelectedFood(food.id,newAmount);
    }

    const minusAmount =()=>{
        let newAmount = amount-1
        if (newAmount < 0){ newAmount=0;}
        setAmount(newAmount);
        updateSelectedFood(food.id,newAmount);
    }

    const changeAmount =(event)=>{
        let newAmount = event.target.value
        if (newAmount < 0){ newAmount=0;}
        setAmount(newAmount);
        updateSelectedFood(food.id,newAmount);
    }


    return (

        <Card className="foodCard">
            <Space direction="vertical" size="small" style={{display:"flex"}}>
                <div className="foodName">{food.name}</div>
                <Row justify="center">
                    <div className="foodImage">
                        <img
                                src={"data:image/png;base64," + food.image}
                                alt={food.name + " stretched"}
                            />
                    </div>
                </Row>
                <Row justify="center" align="middle">
                    <Col span={2} > 
                    </Col>
                    <Col span={12} >
                        <Row justify="left">
                            <div className="foodPrice">
                                ${food.price}
                            </div>
                        </Row>
                    </Col>
                    <Col span = {5} >
                        <Row justify ="center">
                            <Input
                                className="foodAmount"
                                onChange={changeAmount}
                                value = {amount}
                                size="large"
                            >
                            </Input>
                        </Row>
                    </Col>
                    <Col span = {5}>
                        <Row justify="start">
                            <Button type="text" className="buttonNoAnimate" value="small" onClick={addAmount}  style={{bottom: "-4px"}} >
                                <UpOutlined style={{color:"#FFFFFF"}} />
                            </Button>
                        </Row>
                        <Row justify="start">
                            <Button type="text" className="buttonNoAnimate" value="small" onClick={minusAmount} style={{top: "-4px"}}>
                                <DownOutlined style={{color:"#FFFFFF"}} />
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Space>
        </Card>
    )
}