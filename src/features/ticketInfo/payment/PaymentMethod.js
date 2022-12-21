import { React, useState } from "react";
import "./PaymentMethod.css";
import PaymentMethodItem from "./PaymentMethodItem";
import { Radio } from "antd";
export default function PaymentMethod() {
    var weChatPay = require("./wechatpay.png");
    var applePay = require("./applepay.png");
    var alipay = require("./alipay.png");
    const [paymentMethod, setPaymentMethod] = useState(1);
    const onChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    return (
        <>
            <div className="payment-title">Payment</div>

            <Radio.Group
                onChange={onChange}
                value={paymentMethod}
                className="payment-method"
                size={"large"}
            >
                <div>
                    <Radio value={"wechatPay"} class></Radio>
                </div>
                <div>
                    <Radio value={"alipay"}></Radio>
                </div>
                <div>
                    <Radio value={"applePay"}></Radio>
                </div>
                <PaymentMethodItem logo={weChatPay} />

                <PaymentMethodItem logo={alipay} />

                <PaymentMethodItem logo={applePay} />
            </Radio.Group>
        </>
    );
}
