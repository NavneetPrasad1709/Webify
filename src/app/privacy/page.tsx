import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/pages/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Webify collects, how it is used, and your rights. Short version: your contact details go to our inbox so we can reply, and nowhere else.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL" title="Privacy Policy" updated="12 July 2026">
      <LegalSection title="The short version">
        <p>
          The only personal data this site collects is what you type into the
          contact form. It goes to our inbox so we can reply to you, and
          nowhere else. We do not sell it, share it, or use it for anything
          except the conversation you started.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>
          When you submit the contact form we receive the details you provide:
          your name, company name, email address, what you need, and your
          message. Nothing is collected without you pressing send. This site
          has no user accounts.
        </p>
      </LegalSection>

      <LegalSection title="No cookies, minimal measurement">
        <p>
          This site sets no cookies and runs no advertising trackers, which is
          why you do not see a cookie banner. We use Vercel Analytics, a
          cookieless, privacy-friendly tool that counts page views and form
          submissions in aggregate. It does not identify you, store personal
          data, or follow you across other sites.
        </p>
      </LegalSection>

      <LegalSection title="How your details are used">
        <p>
          Your inquiry is delivered to our team inbox and used only to reply
          to you and to run the project conversation you asked for. We never
          sell or rent personal data, and we never add you to a mailing list
          you did not ask for.
        </p>
      </LegalSection>

      <LegalSection title="Retention and your rights">
        <p>
          Inquiries stay in our inbox for as long as the conversation or
          engagement needs them. You can ask us at any time to show you what
          we hold about you, correct it, or delete it entirely: email{" "}
          <a
            href="mailto:contact@webify.org.in?subject=Privacy%20request"
            className="underline underline-offset-2"
          >
            contact@webify.org.in
          </a>{" "}
          and we will act on it within a reasonable time. This applies to
          everyone, including visitors covered by the GDPR and India&apos;s
          DPDP Act.
        </p>
      </LegalSection>

      <LegalSection title="Who we are">
        <p>
          Webify is a senior-led design and engineering studio founded by
          Navneet Prasad, at Tech Zone IV, Greater Noida, Uttar Pradesh 201318,
          working with clients worldwide. For anything about this policy,
          email{" "}
          <a
            href="mailto:contact@webify.org.in?subject=Privacy%20policy"
            className="underline underline-offset-2"
          >
            contact@webify.org.in
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
