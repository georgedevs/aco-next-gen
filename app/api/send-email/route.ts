import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

export async function POST(request: NextRequest) {
  try {
    const { to, subject, firstName, lastName, recommendation, rationale } = await request.json()

    // Validate required fields
    if (!to || !firstName || !lastName || !recommendation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Tech Career Match</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #064155 0%, #029C9C 50%, #16D3C1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .recommendation { background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #F47A45; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: linear-gradient(135deg, #F47A45 0%, #FF8A65 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1> Your Perfect Tech Career Match!</h1>
              <p>Congratulations ${firstName}! We've found your ideal tech path.</p>
            </div>
            
            <div class="content">
              <h2>Hello ${firstName} ${lastName}!</h2>
              
              <p>Thank you for taking our career discovery quiz. Based on your responses, we've identified the perfect tech career path for you:</p>
              
              <div class="recommendation">
                <h3 style="color: #F47A45; margin-top: 0;">${recommendation}</h3>
                <p>${rationale}</p>
              </div>
              
              <h3>What's Next?</h3>
              <ul>
                <li><strong>Apply for the Aco NextGen Scholarship</strong> - Get free training in your recommended field</li>
                <li><strong>Join our community</strong> - Connect with other learners and mentors</li>
                <li><strong>Start learning</strong> - Begin your tech journey with our curated resources</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://aconextgen.com" class="button">Apply for Scholarship</a>
              </div>
              
              <p><strong>Ready to transform your career?</strong> The 4th industrial revolution is here, and we're here to help you thrive in it.</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Aco NextGen Scholarship Program</p>
              <p>Empowering the next generation with tech skills for global opportunities</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email using Gmail SMTP
    const mailOptions = {
      from: 'Aco NextGen <aconextgenscholarship@gmail.com>',
      to: to,
      subject: subject,
      html: emailHtml,
    }

    const data = await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      data: data 
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}