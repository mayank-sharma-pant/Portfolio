import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Your email where you want to receive messages
            subject: `Portfolio Contact: ${name}`,
            html: `
                <div style="font-family: monospace; background: #020617; color: #f8fafc; padding: 20px;">
                    <h2 style="color: #06b6d4; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="margin-top: 20px;">
                        <p><strong style="color: #06b6d4;">Name:</strong> ${name}</p>
                        <p><strong style="color: #06b6d4;">Email:</strong> ${email}</p>
                        <p><strong style="color: #06b6d4;">Message:</strong></p>
                        <div style="background: #0f172a; padding: 15px; border-left: 3px solid #06b6d4; margin-top: 10px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
                        <p>Sent from your portfolio contact form</p>
                        <p>Reply to: ${email}</p>
                    </div>
                </div>
            `,
            replyTo: email,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error sending email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
        });

        // Check if env variables are loaded
        console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
        console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

        return NextResponse.json(
            {
                error: 'Failed to send email',
                details: error.message || 'Unknown error'
            },
            { status: 500 }
        );
    }
}
