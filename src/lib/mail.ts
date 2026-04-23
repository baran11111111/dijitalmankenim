import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetPasswordEmail = async (email: string, resetLink: string) => {
  // Eger test ortamindaysak veya gercek mail kurulmamissa konsola basip gecer.
  if (!process.env.SMTP_USER || process.env.SMTP_USER === "sirketiniz@gmail.com") {
    console.log("-----------------------------------------");
    console.log("MOCK E-POSTA GONDERIMI");
    console.log(`Alici: ${email}`);
    console.log(`Konu: Dijital Mankenim Sifre Sifirlama`);
    console.log(`Sifirlama Linki: ${resetLink}`);
    console.log("-----------------------------------------");
    // Throw etmiyoruz ki kullanici test asamasinda islem yapabilsin
    return;
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || "Dijital Mankenim <noreply@dijitalmankenim.com>",
    to: email,
    subject: "Şifre Sıfırlama Talebi - Dijital Mankenim",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Şifrenizi Sıfırlayın</h2>
        <p>Merhaba,</p>
        <p>Hesabınızın şifresini sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #CC9933; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Şifremi Değiştir</a>
        </div>
        <p>Eğer böyle bir talepte bulunmadıysanız bu e-postayı dikkate almayabilirsiniz.</p>
        <br/>
        <p>İyi çalışmalar,<br/><strong>Dijital Mankenim Ekibi</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("E-Posta gonderme hatasi:", error);
    throw new Error("E-Posta gönderilemedi. Lütfen sistem yöneticisiyle iletişime geçin.");
  }
};
