import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// メール送信の設定
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// 汎用的なSMTP設定を使用する場合
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json();

    // 入力値の検証
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メール設定の検証
    if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
      console.error('環境変数が設定されていません');
      return NextResponse.json(
        { error: 'メール送信設定に問題があります' },
        { status: 500 }
      );
    }

    // メールオプションの設定
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: 'mktr087@gmail.com', // 受信先メールアドレス
      subject: `【お問い合わせ】${name}様より`,
      html: `
        <h3>新しいお問い合わせがあります</h3>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        ${company ? `<p><strong>会社名:</strong> ${company}</p>` : ''}
        <p><strong>メッセージ:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        新しいお問い合わせがあります
        
        お名前: ${name}
        メールアドレス: ${email}
        ${company ? `会社名: ${company}` : ''}
        
        メッセージ:
        ${message}
      `,
    };

    // 自動返信メールの設定
    const autoReplyOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'お問い合わせありがとうございます',
      html: `
        <p>${name}様</p>
        <p>この度はお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを承りました。</p>
        
        <hr>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        ${company ? `<p><strong>会社名:</strong> ${company}</p>` : ''}
        <p><strong>メッセージ:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        
        <p>3営業日以内にご返信させていただきます。</p>
        <p>今しばらくお待ちください。</p>
        
        <p>FromB</p>
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'メールが正常に送信されました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    );
  }
}