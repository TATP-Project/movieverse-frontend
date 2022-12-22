import React from 'react'
import { Button } from 'antd';
import './BackToHomeButton.css'
import { useNavigate } from 'react-router-dom';

export default function BackToHomeButton() {
    const navigate = useNavigate()
    return (
        <div className="sessionExpired">
            <p>Session Not Found/Expired</p>
            <Button className={"button"} onClick={() => { navigate('/'); navigate(0); }}>
                Back To Home
            </Button>
        </div> 
  )
}
