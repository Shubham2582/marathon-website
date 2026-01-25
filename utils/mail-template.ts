import { EmailUserData } from "@/types/mail";

export const successMail = (userData: EmailUserData) => `
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); overflow: hidden;">
        <!-- Header Banner with Marathon Theme -->
        <div style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); color: white; padding: 40px 20px; text-align: center; position: relative;">
          <div style="position: relative; z-index: 2;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Abujhmad Marathon 2026</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Registration Confirmed! 🎉</p>
          </div>
          <!-- Decorative running icon -->
          <div style="position: absolute; bottom: 10px; right: 20px; opacity: 0.2;">
            🏃‍♂️
          </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; color: #333;">Dear ${userData.personal_info.firstName} ${userData.personal_info.lastName},</p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Congratulations! You're officially registered for the Abujhmad Marathon 2026. Get ready for an incredible journey ahead!
          </p>

          <!-- Registration Details Card -->
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 30px 0; border-left: 4px solid #0d47a1;">
            <h2 style="margin: 0 0 20px 0; color: #0d47a1; font-size: 20px;">Your Registration Details</h2>

            <!-- Registration ID -->
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #1565c0;">Registration ID</p>
              <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #0d47a1; font-family: monospace;">${userData.identificationNumber}</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Please save this ID for future reference</p>
            </div>

            <!-- Registration ID -->
            <!-- <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #1565c0;">Bib Number</p>
              <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #0d47a1; font-family: monospace;">${userData.bibNumber}</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Please save this ID for future reference</p>
            </div> -->

            <!-- Other Details -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 0; font-size: 14px; color: #666;">Race Category</p>
                <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #333;">${userData.marathon_details.mainCategory} 21KM</p>

              </div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #666;">T-Shirt Size</p>
                <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #333;">${userData.marathon_details.tShirtSize}</p>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div style="margin-top: 30px;">
            <h3 style="color: #0d47a1; font-size: 18px; margin-bottom: 15px;">What's Next?</h3>
            <ul style="list-style-type: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; top: 2px;">✓</span>
                Start your training schedule
              </li>
              <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; top: 2px;">✓</span>
                Watch for our upcoming emails with race day details
              </li>
              <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; top: 2px;">✓</span>
                Join our community on social media using #AbujhmadMarathon2026
              </li>
            </ul>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 15px;">
            If you have any questions, our support team is here to help. Just reply to this email!
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            Best regards,<br>
            <strong>Team Abujhmad Marathon 2026</strong>
          </p>

          <!-- Social Media Links -->
          <div style="margin-top: 20px;">
            <a href="https://tinyurl.com/yc8mmmnr" style="text-decoration: none; color: #666; margin: 0 10px;">Facebook</a>
            <a href="https://www.instagram.com/abujhmad_marathon" style="text-decoration: none; color: #666; margin: 0 10px;">Instagram</a>
            <a href="https://tinyurl.com/788x6zjj" style="text-decoration: none; color: #666; margin: 0 10px;">Twitter</a>
          </div>
        </div>
      </div>
    </body>
  `;

export const teamSuccessMail = (userData: EmailUserData) => `
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); overflow: hidden;">
    <!-- Header Banner with Marathon Theme -->
    <div style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); color: white; padding: 40px 20px; text-align: center; position: relative;">
        <div style="position: relative; z-index: 2;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Abujhmad Marathon 2026</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Team Registration Confirmed! 🎉</p>
        </div>
        <!-- Decorative running icon -->
        <div style="position: absolute; bottom: 10px; right: 20px; opacity: 0.2;">
        🏃‍♂️
        </div>
    </div>

    <!-- Main Content -->
    <div style="padding: 40px 30px;">
        <p style="font-size: 16px; color: #333;">Dear ${userData.personal_info.teamName},</p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
        Congratulations! Your team is officially registered for the Abujhmad Marathon 2026. Get ready for an incredible journey ahead!
        </p>

        <!-- Registration Details Card -->
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 30px 0; border-left: 4px solid #0d47a1;">
        <h2 style="margin: 0 0 20px 0; color: #0d47a1; font-size: 20px;">Your Team's Registration Details</h2>

        <!-- Team ID -->
        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #1565c0;">Team ID</p>
            <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #0d47a1; font-family: monospace;">${userData.marathon_details.teamId}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Please save this ID for future reference</p>
        </div>
        </div>

        <!-- Next Steps -->
        <div style="margin-top: 30px;">
        <h3 style="color: #0d47a1; font-size: 18px; margin-bottom: 15px;">What's Next?</h3>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
            <span style="position: absolute; left: 0; top: 2px;">✓</span>
            Start your training schedule
            </li>
            <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
            <span style="position: absolute; left: 0; top: 2px;">✓</span>
            Watch for our upcoming emails with race day details
            </li>
            <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
            <span style="position: absolute; left: 0; top: 2px;">✓</span>
            Join our community on social media using #AbujhmadMarathon2026
            </li>
        </ul>
        </div>

        <p style="margin-top: 30px; color: #666; font-size: 15px;">
        If you have any questions, our support team is here to help. Just reply to this email!
        </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
        <p style="margin: 0; color: #666; font-size: 14px;">
        Best regards,<br>
        <strong>Team Abujhmad Marathon 2026</strong>
        </p>

        <!-- Social Media Links -->
        <div style="margin-top: 20px;">
        <a href="https://tinyurl.com/yc8mmmnr" style="text-decoration: none; color: #666; margin: 0 10px;">Facebook</a>
        <a href="https://www.instagram.com/abujhmad_marathon" style="text-decoration: none; color: #666; margin: 0 10px;">Instagram</a>
        <a href="https://tinyurl.com/788x6zjj" style="text-decoration: none; color: #666; margin: 0 10px;">Twitter</a>
        </div>
    </div>
    </div>
</body>
`;

export const otpMail = (userData: EmailUserData) => `
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); overflow: hidden;">
        <!-- Header Banner with Marathon Theme -->
        <div style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); color: white; padding: 40px 20px; text-align: center; position: relative;">
          <div style="position: relative; z-index: 2;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Abujhmad Marathon 2026</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Email Verification 🔐</p>
          </div>
          <!-- Decorative shield icon -->
          <div style="position: absolute; bottom: 10px; right: 20px; opacity: 0.2;">
            🛡️
          </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; color: #333;">Dear ${userData.personal_info.firstName} ${userData.personal_info.lastName},</p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for starting your registration for the Abujhmad Marathon 2026. To complete your registration, please verify your email address using the OTP below.
          </p>

          <!-- OTP Card -->
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 30px 0; border-left: 4px solid #0d47a1; text-align: center;">
            <h2 style="margin: 0 0 20px 0; color: #0d47a1; font-size: 20px;">Your Verification Code</h2>

            <!-- OTP Display -->
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #0d47a1; font-family: monospace; letter-spacing: 5px;">${userData.marathon_details.otp}</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">This code will expire in 10 minutes</p>
            </div>

            <!-- Security Notice -->
            <div style="margin-top: 20px; padding: 15px; background-color: #fff3e0; border-radius: 6px; text-align: left;">
              <p style="margin: 0; font-size: 14px; color: #e65100;">
                <span style="font-weight: bold;">🔒 Security Notice:</span> Never share this OTP with anyone. Our team will never ask for your OTP.
              </p>
            </div>
          </div>

          <!-- Instructions -->
          <div style="margin-top: 30px;">
            <h3 style="color: #0d47a1; font-size: 18px; margin-bottom: 15px;">Next Steps:</h3>
            <ul style="list-style-type: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; top: 2px;">1️⃣</span>
                Enter this code on the verification page
              </li>
              <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; top: 2px;">2️⃣</span>
                Complete your registration details
              </li>
              <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; top: 2px;">3️⃣</span>
                Get ready for an amazing marathon experience!
              </li>
            </ul>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 15px;">
            If you didn't request this verification code, please ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            Best regards,<br>
            <strong>Team Abujhmad Marathon</strong>
          </p>

          <!-- Social Media Links -->
          <div style="margin-top: 20px;">
            <a href="https://tinyurl.com/yc8mmmnr" style="text-decoration: none; color: #666; margin: 0 10px;">Facebook</a>
            <a href="https://tinyurl.com/6re5awzx" style="text-decoration: none; color: #666; margin: 0 10px;">Instagram</a>
            <a href="https://tinyurl.com/788x6zjj" style="text-decoration: none; color: #666; margin: 0 10px;">Twitter</a>
          </div>
        </div>
      </div>
    </body>
`;
