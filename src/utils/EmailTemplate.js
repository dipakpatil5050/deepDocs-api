export const EmailPasswordResetTemplate = (resetUrl) => {
  return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f6f8;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            padding: 40px;
            color: #2c3e50;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #1a202c;
          }
          .logo {
            width: 50px;
            height: 50px;
            margin-bottom: 12px;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            color: #4a5568;
          }
          .button-wrapper {
            text-align: center;
            margin: 30px 0;
          }
          .button {
            padding: 12px 30px;
            background-color: #3a7bfd;
            color: #fff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
            display: inline-block;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #255efc;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #a0aec0;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
          <h4>DeepDocs</h4>
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>We received a request to reset your password for your <strong>Deepdocs App</strong> account powered by AI.</p>
            <p>If you made this request, click the button below to reset your password. If not, feel free to ignore this email — your password will remain unchanged.</p>
          </div>
          <div class="button-wrapper">
            <a href="${resetUrl}" class="button">Reset My Password</a>
          </div>
          <div class="content">
            <p>This link will expire in 24 hours. For security reasons, do not share this email with anyone.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Deepdocs — Take Management App Powered by AI.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
