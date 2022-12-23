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
import BackToHomeButton from "../features/button/BackToHomeButton";

import Orders from "../features/ticketInfo/Orders";
export default function CompletePage() {
    const ticketid = useSelector((state) => state.ticketId);
    const ticketIdError = "no-ticket-id-not-found";

    const session = useSelector((state) => state.movieSession);
    const seats = useSelector((state) => state.seatSelection.seats);
    const food = useSelector((state) => state.foodSelection);

    const printDocument = () => {
        const input = document.getElementById("divToPrintWrapper");
        html2canvas(input, { useCORS: true }).then((canvas) => {
            var imgData = canvas.toDataURL("image/png");
            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF("p", "mm");
            var position = 0; // give some top padding to first page

            doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            position += heightLeft - imgHeight; // top padding for other pages
            doc.addPage();
            doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            doc.save("ticket.pdf");
        });
    };
    const COMPLETE_PAGE_ID = "complete";
    useEffect(() => {
        const url = new URL(window.location);
        const urlString = `${url.href}#${COMPLETE_PAGE_ID}`;
        window.history.pushState({}, "", urlString);
        window.onpopstate = () => {
            if (window.confirm("Are you going back?")) {
                window.history.back();
            } else {
                window.history.pushState({}, "", urlString);
            }
        };
        return () => {
            window.onpopstate = null;
        };
    }, []);

    const history = useSelector((state) => state.history);

    return history === "/complete" ? (
        <>
            <StatusBar stage={4} id={COMPLETE_PAGE_ID} />
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
                    <div id="divToPrintWrapper">
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
                        <div id="secondPage">
                            <Orders
                                food={food}
                                seats={seats}
                                session={session}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <BackToHomeButton />
    );
}
