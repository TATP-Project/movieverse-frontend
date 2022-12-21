import React from 'react'
import StatusBar from '../features/movie/StatusBar'
import CompleteLogo from '../icons/CompleteLogo.png'
import DownloadButton from "../features/button/ReceiptButton";
import './completePage.css'
import * as html2canvas from "html2canvas"
import { jsPDF } from 'jspdf';
import TicketInfo from '../features/ticketInfo/TicketInfo';
import { useSelector } from "react-redux";

export default function CompletePage() {

    const ticketid = useSelector((state) => state.ticketId)
    const ticketIdError='no-ticket-id-not-found'

    const printDocument = () => {
        let input = document.getElementById('divToPrint')
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.output('dataurlnewwindow');
                pdf.save("ticket.pdf");
            })
            ;
    }
    return (
        <>
            <StatusBar stage={3} />
            <div style={{
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "marginTop": "50px"
            }}>
                <img src={CompleteLogo} alt={"Ticket Reservated"} />
                <h1>Completed</h1>
                <p className="ticketid">Your Ticket ID: {ticketid||ticketIdError}</p>
                <DownloadButton onClick={printDocument} />

                <div id="hideDivToPrint" style={
                    {
                        "dislay": "none",
                        "height": "0px",
                        "position": "absolute",
                        "top": "100%",
                        "overflow": "hidden"
                    }
                }>
                    <div id="divToPrint" style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "alignItems": "center",
                        "marginTop": "50px",
                    }}>
                        <TicketInfo />
                        <p className="ticketid">Your Ticket ID: {ticketid||ticketIdError}</p>
                    </div>
                </div>

            </div>
        </>
    )
}
