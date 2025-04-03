const EmailPasswordResetTemplatev = (resetUrl) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .email-container {
            width: 100%;
            background-color: #f4f4f9;
            padding: 20px 0;
          }
          .email-content {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .email-header h1 {
            color: #3a7bfd;
            font-size: 24px;
          }
          .email-body {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            margin-bottom: 20px;
          }
          .email-footer {
            font-size: 14px;
            text-align: center;
            color: #888;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3a7bfd;
            color: #fff;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #2c64d6;
          }
          .footer-text {
            color: #aaa;
            font-size: 12px;
            text-align: center;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-content">
            <div class="email-header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="email-body">
              <p>Hi there,</p>
              <p>We received a request to reset your password for your account. If you didn't request a password reset, please ignore this email.</p>
              <p>To reset your password, click the button below:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p>If you have any questions or need assistance, feel free to <a href="mailto:support@notetakingapp.com">contact our support team</a>.</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2025 Note Taking App. All rights reserved.</p>
              <p class="footer-text">If you didn't request this, please disregard this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
};
