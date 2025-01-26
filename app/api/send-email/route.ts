import { EmailUserData } from "@/types/mail";
import { otpMail, successMail } from "@/utils/mail-template";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const getEmailTemplate = (userData: EmailUserData) => {
  if (userData.marathon_details.otp) {
    return otpMail(userData);
  }

  return successMail(userData);
};

export async function POST(request: Request) {
  try {
    const { userData }: { userData: EmailUserData } = await request.json();

    const mailOptions = {
      from: `"Abujhmad Marathon" <${process.env.SMTP_USER}>`,
      to: userData.personal_info.email,
      subject: userData.marathon_details.otp ? "OTP Verification - Abujhmad Marathon 2025" : "Registration Confirmation - Abujhmad Marathon 2025",
      html: getEmailTemplate(userData),
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
  }
}
