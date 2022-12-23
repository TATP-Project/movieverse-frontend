import React from "react";
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

export default function CompletePage() {
    const ticketid = useSelector((state) => state.ticketId);
    const ticketIdError = "no-ticket-id-not-found";
    const movie = useSelector((state) => state.movie);

    const printDocument = () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input,{useCORS:true}).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var heightLeft = imgHeight;
            const pdf = new jsPDF("p", "mm");
            
            var position = 10;
            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

            pdf.addPage();
            var img = document.createElement("img");
            img.src = movie.image;
            pdf.addImage(img, "JPEG", 13, 28, 60, 84);
            pdf.setFillColor(204, 204,204,0);
            pdf.rect(10, 10, 150, 160, "F");
            pdf.save("ticket.pdf");
        });
    };

    return (
        <>
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
                        // dislay: "none",
                        // height: "0px",
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
                        <p class="html2pdf__page-break" />
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
    );
}
