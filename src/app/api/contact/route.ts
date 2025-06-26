import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, message } = data;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    // Configure your SMTP transporter here
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL, // your email address to receive messages
      subject: `New contact form message from ${firstName} ${lastName}`,
      text: `
        You have a new message from your website contact form.

        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Message: ${message}
      `,
      html: `
        <p>You have a new message from your website contact form.</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}