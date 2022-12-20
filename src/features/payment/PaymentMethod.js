import {React,useState} from 'react'
import ConfirmButton from '../button/ConfirmButton'
import './PaymentMethod.css'
import PaymentMethodItem from './PaymentMethodItem';
import { Radio } from 'antd';
export default function PaymentMethod() {
    var weChatPay = require("./wechatpay.png");
    var applePay = require("./apple_pay.png");
    var alipay = require("./alipay.png");
    const [value, setValue] = useState(1);
    const onChange = (e) => {
    setValue(e.target.value);
    }
  return (
    <div>
        <h2 className="payment-title">Payment</h2>
        <div className="payment-method">
        <Radio.Group onChange={onChange} value={value} className="radio">
            <div>
            <Radio value={"wecahatPay"}></Radio>
            <PaymentMethodItem
            logo={weChatPay}
            />
            </div>
            <div>
            <Radio value={"alipay"}></Radio>
            <PaymentMethodItem
            logo={alipay}
            />
            </div>
            <div>
            <Radio value={"applePay"}></Radio>
            <PaymentMethodItem
            logo={applePay}
            />
            </div>
        </Radio.Group>
        
        </div>
        
    </div>
  )
}

