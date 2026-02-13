# Email Setup Guide

## Quick Setup with Ethereal Email 

Ethereal Email is a fake SMTP service for testing email functionality without sending real emails.

### Steps:

1. Visit https://ethereal.email/

2. Click the "Create Ethereal Account" button

3. You'll see a page with SMTP credentials like this:
   ```
   Host: smtp.ethereal.email
   Port: 587
   Username: example.user123@ethereal.email
   Password: AbCdEfGhIjKlMnOp
   ```

4. Open `backend\.env` file and update these lines:
   ```env
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=example.user123@ethereal.email
   SMTP_PASS=AbCdEfGhIjKlMnOp
   ```

5. Save the file

6. When you create a calendar entry, the email will be sent to Ethereal

7. To view sent emails, visit https://ethereal.email/messages and login with your Ethereal credentials

### Testing the Email Feature:

1. Start the application
2. Register and login
3. Click "Create" button
4. Fill in the form with any email address
5. Click "Submit"
6. Go to https://ethereal.email/messages
7. You'll see the email with subject "Hi Salam kenal - New Calendar Entry Created"

## Alternative: Real Email with Gmail

If you want to send real emails:

1. Enable 2-factor authentication on your Gmail account

2. Generate an app password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the 16-character password

3. Update `backend\.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=your_16_char_app_password
   EMAIL_FROM=your.email@gmail.com
   ```

4. Restart the backend server

Note: Gmail has sending limits for free accounts (500 emails/day).
