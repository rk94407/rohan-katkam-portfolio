import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env.local
const envPath = path.join(__dirname, '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const [key, ...rest] = line.split('=')
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
    })
}

const PORT = 3000
const RESEND_API_KEY = process.env.RESEND_API_KEY
const TO_EMAIL = process.env.EMAIL_ADDRESS
const EMAIL_FROM = process.env.EMAIL_FROM

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  // Contact form endpoint
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', async () => {
      try {
        const { name, email, message } = JSON.parse(body)
        if (!name || !email || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'All fields are required.' }))
        }

        const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New message from ${name}</title>
</head>
<body style="margin:0;padding:0;background:#f0eeea;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeea;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0d0d0d;border-radius:16px 16px 0 0;padding:28px 36px;text-align:left;">
            <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;font-weight:800;letter-spacing:-0.02em;color:#f2f1ec;text-transform:uppercase;letter-spacing:0.06em;">ROHAN KATKAM</span>
          </td>
        </tr>

        <!-- Hero band -->
        <tr>
          <td style="background:#1a1a18;padding:36px 36px 28px;border-left:1px solid #2a2a28;border-right:1px solid #2a2a28;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#6a6964;">New portfolio message</p>
            <h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#f2f1ec;line-height:1.15;">You've got a new message</h1>
          </td>
        </tr>

        <!-- Sender card -->
        <tr>
          <td style="background:#ffffff;padding:28px 36px 0;border-left:1px solid #e8e6e2;border-right:1px solid #e8e6e2;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#f7f6f3;border-radius:10px;padding:20px 22px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0 0 2px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a3a19b;">From</p>
                        <p style="margin:0;font-size:17px;font-weight:700;color:#0d0d0d;">${name}</p>
                      </td>
                      <td align="right">
                        <p style="margin:0 0 2px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a3a19b;">Reply to</p>
                        <a href="mailto:${email}" style="font-size:14px;color:#0d0d0d;text-decoration:underline;text-underline-offset:3px;">${email}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message body -->
        <tr>
          <td style="background:#ffffff;padding:24px 36px 0;border-left:1px solid #e8e6e2;border-right:1px solid #e8e6e2;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a3a19b;">Message</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#3a3a38;white-space:pre-line;">${message}</p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#ffffff;padding:28px 36px;border-left:1px solid #e8e6e2;border-right:1px solid #e8e6e2;">
            <a href="mailto:${email}?subject=Re: Your message&body=Hi ${name},%0A%0A"
               style="display:inline-block;background:#0d0d0d;color:#f2f1ec;font-size:13px;font-weight:600;letter-spacing:0.04em;text-decoration:none;padding:13px 26px;border-radius:999px;">
              Reply to ${name} ↗
            </a>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="background:#ffffff;padding:0 36px;border-left:1px solid #e8e6e2;border-right:1px solid #e8e6e2;">
            <hr style="border:none;border-top:1px solid #ebe9e5;margin:0;"/>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#ffffff;border-radius:0 0 16px 16px;padding:22px 36px 28px;border:1px solid #e8e6e2;border-top:none;">
            <p style="margin:0;font-size:11.5px;color:#a3a19b;line-height:1.6;">
              This message was sent via the contact form on
              <a href="https://rohan-katkam-portfolio.vercel.app/" style="color:#6b6a66;text-decoration:underline;text-underline-offset:2px;">rohan-katkam-portfolio.vercel.app</a>.
              Reply directly to this email to respond to ${name}.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `Portfolio Contact <${EMAIL_FROM}>`,
            to: [TO_EMAIL],
            reply_to: email,
            subject: `New message from ${name} — Portfolio`,
            text: `New portfolio message\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via rohan-katkam-portfolio.vercel.app`,
            html: emailHtml,
          }),
        })

        const data = await r.json()
        res.writeHead(r.ok ? 200 : 500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      }
    })
    return
  }

  // Static file serving
  let urlPath = req.url.split('?')[0]
  if (urlPath === '/') urlPath = '/Portfolio.html'

  const filePath = path.join(__dirname, decodeURIComponent(urlPath))

  if (!filePath.startsWith(__dirname + path.sep) && filePath !== __dirname) {
    res.writeHead(403)
    return res.end('Forbidden')
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      return res.end('Not found')
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio → http://localhost:${PORT}`)
  if (!RESEND_API_KEY) {
    console.log('⚠  RESEND_API_KEY not set in .env.local — email delivery disabled')
  } else {
    console.log(`Contact form → ${EMAIL_FROM} → ${TO_EMAIL}`)
  }
})
