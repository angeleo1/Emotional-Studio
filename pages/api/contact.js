import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  // 이메일 전송 설정
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    // 이메일 전송
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `[시현하다] 새로운 문의: ${name}`,
      text: `
이름: ${name}
이메일: ${email}

메시지:
${message}
      `,
      html: `
<h2>새로운 문의가 도착했습니다</h2>
<p><strong>이름:</strong> ${name}</p>
<p><strong>이메일:</strong> ${email}</p>
<p><strong>메시지:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    res.status(200).json({ message: '이메일이 성공적으로 전송되었습니다.' })
  } catch (error) {
    console.error('이메일 전송 오류:', error)
    res.status(500).json({ message: '이메일 전송 중 오류가 발생했습니다.' })
  }
} 