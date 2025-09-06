const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
require("dotenv").config();   // Load .env file

const app = express();
app.use(cors());
app.use(express.json());

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Hardcoded OTPs
const otpMapping = {
  "9605702724": "9605",
  "8524099255": "2222",
  "9999999993": "3333",
};

// Send OTP
app.post("/send-otp", async (req, res) => {
  let { mobile } = req.body;
  mobile = mobile.trim();

  const otp = otpMapping[mobile];
  if (!otp) return res.json({ success: false, message: "Number not registered" });

  const formattedMobile = mobile.startsWith("+") ? mobile : "+91" + mobile;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // From env
      to: formattedMobile
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
