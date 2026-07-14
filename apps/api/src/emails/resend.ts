import { Resend } from "resend";
import { createElement } from "react";
import { WelcomeEmail } from "@/emails/templates/welcome";
import { MagicLinkEmail } from "@/emails/templates/magic-link";
import { ResetPasswordEmail } from "@/emails/templates/reset-password";
import { InvoiceEmail } from "@/emails/templates/invoice";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.EMAIL_FROM ?? "noreply@yourdomain.com";

/** Raw HTML email — used by the newsletter sender. Throws on Resend errors
 * (the SDK returns { error } rather than throwing) so delivery counts are honest. */
export async function sendRawEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const res = await resend.emails.send({ from: FROM, to, subject, html });
  if ((res as any)?.error) throw new Error((res as any).error?.message || "Resend error");
  return res;
}

export async function sendWelcomeEmail({
  to,
  name,
  verifyUrl,
}: {
  to: string;
  name: string;
  verifyUrl?: string;
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome! Verify your email",
    react: createElement(WelcomeEmail, { name, verifyUrl }),
  });
}

export async function sendMagicLinkEmail({
  to,
  link,
}: {
  to: string;
  link: string;
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Your sign-in link",
    react: createElement(MagicLinkEmail, { link }),
  });
}

export async function sendResetPasswordEmail({
  to,
  link,
}: {
  to: string;
  link: string;
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your password",
    react: createElement(ResetPasswordEmail, { link }),
  });
}

export async function sendInvoiceEmail({
  to,
  name,
  amount,
  invoiceUrl,
  date,
}: {
  to: string;
  name: string;
  amount: string;
  invoiceUrl: string;
  date: string;
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Your invoice",
    react: createElement(InvoiceEmail, { name, amount, invoiceUrl, date }),
  });
}
