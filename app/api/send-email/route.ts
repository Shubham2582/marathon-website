import { EmailUserData } from "@/types/mail";
import { otpMail, successMail, teamSuccessMail } from "@/utils/mail-template";
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

const BIB_RANGES = {
  OPEN_MALE: { start: 1000, end: 1500 },
  OPEN_FEMALE: { start: 1501, end: 2000 },
  BASTAR_MALE: { start: 2100, end: 6000 },
  BASTAR_FEMALE: { start: 6001, end: 9000 },
  NARAYANPUR_MALE: { start: 11000, end: 17000 },
  NARAYANPUR_FEMALE: { start: 17001, end: 21000 },
};

const getCategoryFromBib = (bibNumber: number) => {
  for (const [category, range] of Object.entries(BIB_RANGES)) {
    if (bibNumber >= range.start && bibNumber <= range.end) {
      return category;
    }
  }
  return "Unknown";
};

const getEmailTemplate = (userData: EmailUserData) => {
  if (userData.marathon_details.teamId) {
    return teamSuccessMail(userData);
  }
  if (userData.marathon_details.otp) {
    return otpMail(userData);
  }
  return successMail(userData);
};

export async function POST(request: Request) {
  try {
    const { userData }: { userData: EmailUserData } = await request.json();

    if (userData.bibNumber) {
      userData.marathon_details.mainCategory = getCategoryFromBib(
        Number(userData.bibNumber),
      );
    }

    const mailOptions = {
      from: `"Abujhmad Marathon" <${process.env.SMTP_USER}>`,
      to: userData.personal_info.email,
      subject: userData.marathon_details.otp
        ? "OTP Verification - Abujhmad Marathon 2025"
        : "Registration Confirmation - Abujhmad Marathon 2025",
      html: getEmailTemplate(userData),
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 },
    );
  }
}
