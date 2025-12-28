# Nodemailer Setup Instructions

## Email Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
```

## Gmail Setup (Recommended)

1. **Enable 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Copy the 16-character password generated

3. **Update .env.local**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop  # The 16-character app password
   ```

## Other Email Providers

### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```
Update `route.ts` to use `service: 'hotmail'`

### Yahoo
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```
Update `route.ts` to use `service: 'yahoo'`

### Custom SMTP
Update `route.ts` transporter configuration:
```typescript
const transporter = nodemailer.createTransporter({
    host: 'smtp.your-provider.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
```

## Testing

1. Start the dev server: `npm run dev`
2. Navigate to the ACCESS module
3. Fill out the contact form
4. Check your email inbox for the message

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of regular passwords
- The `.env.local` file is already in `.gitignore`
