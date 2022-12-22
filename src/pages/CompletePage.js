import React, { useEffect } from "react";
import StatusBar from "../features/movie/StatusBar";
// import CompleteLogo from '../icons/CompleteLogo.png'
import DownloadButton from "../features/button/ReceiptButton";
import "./completePage.css";
import * as html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import TicketInfo from "../features/ticketInfo/TicketInfo";
import { useSelector } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import Logo from "../icons/PlainLogo.png";
import { useNavigate } from "react-router-dom";

export default function CompletePage() {

    const ticketid = useSelector((state) => state.ticketId);
    const ticketIdError = "no-ticket-id-not-found";

    const printDocument = () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, "JPEG", 0, 0, width, height);
            // pdf.output('dataurlnewwindow');
            pdf.save("ticket.pdf");
        });
    };

    const history = useSelector((state) => state.history);
    const navigate = useNavigate()
    useEffect(() => {
        console.log(history)
    }, [history])


    return history === "/complete" ?
        (<>
            <StatusBar stage={4} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "50px",
                }}
            >
                {/* <img src={CompleteLogo} alt={"Ticket Reservated"} /> */}
                <h1 id="qrCodeHeader">Ticket QR Code</h1>

                <QRCode
                    logoWidth={28}
                    logoHeight={20}
                    removeQrCodeBehindLogo={true}
                    logoImage={Logo}
                    value={
                        "Movieverse Ticket id: " +
                        (typeof ticketid === "string"
                            ? ticketid
                            : ticketIdError)
                    }
                />
                <p className="ticketid">
                    Please scan this QR code to enter the house.
                </p>

                <DownloadButton onClick={printDocument} />

                <div
                    id="hideDivToPrint"
                    style={{
                        dislay: "none",
                        height: "0px",
                        position: "absolute",
                        top: "100%",
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="divToPrint"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "50px",
                        }}
                    >
                        <TicketInfo />
                        <h1 id="qrCodeHeader">Ticket QR Code</h1>

                        <QRCode
                            logoWidth={28}
                            logoHeight={20}
                            removeQrCodeBehindLogo={true}
                            logoImage={Logo}
                            value={
                                "Movieverse Ticket id: " +
                                (typeof ticketid === "string"
                                    ? ticketid
                                    : ticketIdError)
                            }
                        />
                        <p className="ticketid">
                            Please scan this QR code to enter the house.
                        </p>

                    </div>
                </div>
            </div>
        </>
        )
        : <div className="sessionExpired"><p>Session Not Found/Expired</p><button onClick={() => { navigate('/'); navigate(0); }}>Back To Home</button></div> //incorrect history
}
