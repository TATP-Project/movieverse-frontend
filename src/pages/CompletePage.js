import React from 'react'
import StatusBar from '../features/movie/StatusBar'
import CompleteLogo from '../icons/CompleteLogo.png'
export default function CompletePage() {

    return (
        <>
            <div>
                <StatusBar stage={2} />
                <div style={{
                    "display": "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "margin-top": "50px"
                }}>
                    <img src={CompleteLogo} alt={"Ticket Reservated"} />
                    <h1>Completed</h1>
                </div>
            </div>
        </>
    )
}
