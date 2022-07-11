const puppeteer = require("puppeteer");
const fs = require("fs");
const contentDisposition = require("content-disposition");
const currencyFormatter = require("../helpers/formatter");
const { getUserTicket } = require("../models/transaction");
const groupWithCinema = require("../helpers/groupWithCinema");

const exportTransaction = async (req, res) => {
  try {
    const { trans_id } = req.params;
    const { data } = await getUserTicket(req.userPayload.id, trans_id);
    const group = groupWithCinema(data, "transaction_id");
    const seat = Object.entries(group).map((item) => {
      return { id: item[0], detail: item[1] };
    });

    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    const html = `<html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>PDF Downloader</title>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700&display=swap");
            @import url("https://fonts.googleapis.com/css2?family=Mulish:wght@400;700;900&display=swap");
      
            html,
            body {
              box-sizing: border-box;
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              font-family: "Mulish", sans-serif;
            }
      
            a {
              color: inherit;
              text-decoration: none;
            }
      
            * {
              box-sizing: border-box;
              padding: 0;
              margin: 0;
              font-family: "Mulish", sans-serif;
            }
      
            @keyframes ldio-si81yxhtrka {
              0% {
                transform: rotate(0);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .ldio-si81yxhtrka div {
              box-sizing: border-box !important;
            }
            .ldio-si81yxhtrka > div {
              position: absolute;
              width: 144px;
              height: 144px;
              top: 28px;
              left: 28px;
              border-radius: 50%;
              border: 16px solid #000;
              border-color: #5f2eea transparent #5f2eea transparent;
              animation: ldio-si81yxhtrka 1s linear infinite;
            }
            .ldio-si81yxhtrka > div:nth-child(2) {
              border-color: transparent;
            }
            .ldio-si81yxhtrka > div:nth-child(2) div {
              position: absolute;
              width: 100%;
              height: 100%;
              transform: rotate(45deg);
            }
            .ldio-si81yxhtrka > div:nth-child(2) div:before,
            .ldio-si81yxhtrka > div:nth-child(2) div:after {
              content: "";
              display: block;
              position: absolute;
              width: 16px;
              height: 16px;
              top: -16px;
              left: 48px;
              background: #5f2eea;
              border-radius: 50%;
              box-shadow: 0 128px 0 0 #5f2eea;
            }
            .ldio-si81yxhtrka > div:nth-child(2) div:after {
              left: -16px;
              top: 48px;
              box-shadow: 128px 0 0 0 #5f2eea;
            }
            .loadingio-spinner-dual-ring-90hxh4txrkc {
              width: 200px;
              height: 200px;
              display: inline-block;
              overflow: hidden;
              background: none;
            }
            .ldio-si81yxhtrka {
              width: 100%;
              height: 100%;
              position: relative;
              transform: translateZ(0) scale(1);
              backface-visibility: hidden;
              transform-origin: 0 0; /* see note above */
            }
            .ldio-si81yxhtrka div {
              box-sizing: content-box;
            }
            .container {
              background: rgba(245, 246, 248, 1);
              padding: 60px 15%;
            }
            .main {
              background-color: white;
              border-radius: 8px;
              display: flex;
              flex-direction: column;
            }
            .title {
              font-family: "Mulish", sans-serif;
              font-style: normal;
              font-weight: 700;
              font-size: 24px;
              line-height: 30px;
              letter-spacing: 0.25px;
              color: #14142b;
              text-align: center;
              margin: 5%;
            }
            .ticket {
              display: flex;
              flex-direction: column;
              background: #ffffff;
              border: 1px solid #dedede;
              border-radius: 16px;
              margin: 0 5% 5% 5%;
            }
            .tickethead {
              background: #5f2eea;
              border-top-right-radius: 16px;
              border-top-left-radius: 16px;
              display: flex;
              flex-direction: row;
              height: 20%;
            }
            .lefthead {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: left;
              align-items: center;
              /* padding: 20px 0px; */
            }
            .righthead {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              border-left: 2px dashed #dedede;
              position: relative;
            }
            .midhead {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
              font-family: "Mulish", sans-serif;
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 34px;
              text-align: right;
              letter-spacing: 0.75px;
              color: #ffffff;
              /* padding: 20px 0px; */
              position: relative;
              right: 30px;
            }
            .body {
              display: flex;
              flex-direction: row;
            }
            .details {
              flex: 2;
              padding: 30px 0px;
              display: flex;
              flex-direction: column;
            }
            .key {
              font-family: "Mulish", sans-serif;
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 24px;
              letter-spacing: 0.75px;
              color: #aaaaaa;
            }
            .seatValue {
              display: flex;
              flex-direction: row;
             
            }
      
            .value {
              font-family: "Mulish";
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 38px;
              letter-spacing: 0.75px;
              color: #14142b;
            }
            .mainrow {
              display: flex;
              flex-direction: column;
              padding: 0px 50px;
            }
            .row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 20px;
              padding: 0px 50px;
            }
            .barcode {
              flex: 1;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              border-left: 2px dashed #585757;
            }
            .buttons {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: flex-start;
              column-gap: 20px;
              margin-bottom: 40px;
            }
            .button {
              border: 1px solid #4e4b66;
              border-radius: 4px;
              padding: 10px 40px;
              cursor: pointer;
              display: flex;
              column-gap: 10px;
              align-items: center;
            }
            .button:hover {
              background-color: rgb(92, 92, 92);
              color: white;
            }
      
            .button:active {
              background-color: rgb(0, 0, 0);
              color: white;
            }
            .round1 {
              position: absolute;
              background-color: white;
              border-bottom: 1px solid #dedede;
              border-radius: 25px;
              width: 45px;
              height: 45px;
              bottom: 40px;
              right: 260px;
            }
      
            .round2 {
              position: absolute;
              background-color: white;
              border-top: 1px solid #dedede;
              border-radius: 25px;
              width: 45px;
              height: 45px;
              bottom: -20px;
              right: 260px;
            }
      
            @media (max-width: 1024px) {
              .round1,
              .round2 {
                display: none;
              }
            }
      
            @media (max-width: 768px) {
              .container {
                background: rgba(245, 246, 248, 1);
                padding: 60px 5%;
              }
              .round1,
              .round2 {
                display: none;
              }
              .ticket {
                display: flex;
                flex-direction: column;
                background: #ffffff;
                border: 1px solid #dedede;
                border-radius: 16px;
                margin: 0 5% 5% 5%;
              }
              .mainrow {
                display: flex;
                flex-direction: column;
                padding: 0px 50px;
              }
              .row {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 20px;
                padding: 0px 50px;
              }
              .body {
                display: flex;
                flex-direction: column;
              }
              .details {
                flex: 2;
                padding: 30px 0px;
                display: flex;
                flex-direction: column;
              }
              .righthead {
                display: none;
              }
              .barcode::before {
                content: url("../../assets/tickitz-mini.png");
                background-color: #5f2eea;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0 0 20px 20px;
              }
              .barcode {
                flex: 1;
                position: relative;
                display: flex;
                flex-direction: column-reverse;
                justify-content: center;
                align-items: center;
                border-top: 2px dashed #585757;
                border-left: none;
                margin: 2% 0;
              }
            }
      
            @media (max-width: 426px) {
              .seatValue {
                flex-direction: column;
                gap: unset;
              }
            }
          </style>
        </head>
        <body>
          <div class="main">
            <div class="title">Proof of Payment</div>
            <div class="ticket">
              <div class="tickethead">
                <div class="lefthead"> <img src="data:image/jpeg;base64,${fs.readFileSync("./public/img/tickitz.png").toString("base64")}" alt="alt text" /></div>
                <div class="midhead">${req.userPayload.email}</div>
                <div class="righthead">
                <img src="data:image/jpeg;base64,${fs.readFileSync("./public/img/tickitz.png").toString("base64")}" alt="alt text" />
                  <div class="round1"></div>
                </div>
              </div>
              <div class="body">
              ${seat.map(
                (ticket) =>
                  `<div class="details">
                  <div class="mainrow">
                    <div class="key">Movie</div>
                    <div>${ticket.detail[0].movie}</div>
                  </div>
                  <div class="row">
                    <div>
                      <div class="key">Date</div>
                      <div class="value">${ticket.detail[0].movie_date.toString().split(":")[0].split("00")[0]}</div>
                    </div>
                    <div>
                      <div class="key">Time</div>
                      <div class="value">${ticket.detail[0].movie_time}</div>
                    </div>
                    <div>
                      <div class="key">Ticket ID</div>
                      <div class="seatValue">
                      ${ticket.detail.map((item) => `<div class="value">${item.ticket_id}</div>`)}
                      
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div>
                      <div class="key">Count</div>
                      <div class="value">${ticket.detail[0].count}</div>
                    </div>
                    <div>
                      <div class="key">Seats</div>
                      <div class="seatValue">
                      ${ticket.detail.map((item) => `<div class="value">${item.seat}</div>`)}
                      </div>
                    </div>
                    <div>
                      <div class="key">Price</div>
                      <div class="value">${currencyFormatter.format(ticket.detail[0].total_price)}</div>
                    </div>
                  </div>
                </div>`
              )}
           
      
                <div class="barcode">
                <img src="data:image/jpeg;base64,${fs.readFileSync("./public/img/qrc.png").toString("base64")}" alt="alt text" />
                  <div class="round2"></div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `;

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    await page.pdf({
      format: "A3",
      path: `./public/pdf/ticket${seat[0].id}.pdf`,
      printBackground: true,
    });
    res.status(200).json({
      url: `http://localhost:5000/export/generate/pdf/transaction-${trans_id}`,
    });
    await browser.close();
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

const generatePdf = async (req, res) => {
  const { trans_id } = req.params;
  const filePath = `./public/pdf/ticket${trans_id.split("transaction-")[1]}.pdf`;

  const disposition = contentDisposition.parse("inline; filename='ticket'; filename*=UTF-8''ticket");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", disposition);

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
};

module.exports = { exportTransaction, generatePdf };
