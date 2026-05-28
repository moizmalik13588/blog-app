import { Resend } from "resend";
import { RESEND_API_KEY, FROM_EMAIL } from "../config/config.js";

const resend = new Resend(RESEND_API_KEY);

export const sendLoginAlertEmail = async (
  email: string,
  ipAddress: string,
  userAgent: string,
) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: "moizm12348@gmail.com",
    subject: "New Login Detected",
    html: `
      <h2>New Login Detected</h2>
      <p>A new login was detected on your account:</p>
      <ul>
        <li><b>IP Address:</b> ${ipAddress}</li>
        <li><b>Device:</b> ${userAgent}</li>
        <li><b>Time:</b> ${new Date().toLocaleString()}</li>
      </ul>
      <p>If this was not you, please <b>logout all devices</b> immediately.</p>
    `,
  });
};

export const sendOTPEmail = async (email: string, otp: string) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: "moizm12348@gmail.com",
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP Code</h2>
      <p>Your OTP code is: <b>${otp}</b></p>
      <p>This code will expire in <b>10 minutes</b>.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
};
