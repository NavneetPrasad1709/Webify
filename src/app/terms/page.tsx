import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/pages/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "How Webify engagements work: fixed written quotes, two revision rounds, 30-day post-launch support, and full ownership of everything we build for you.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL" title="Terms of Service" updated="12 July 2026">
      <LegalSection title="Who we are">
        <p>
          Webify is a senior-led design and engineering company founded by
          Navneet Prasad, at Tech Zone IV, Greater Noida, Uttar Pradesh 201318,
          working remotely with clients worldwide. These terms describe how
          our engagements work. The written quote for your project is the
          binding document; where it differs from this page, the quote wins.
        </p>
      </LegalSection>

      <LegalSection title="How engagements work">
        <p>
          Every project starts with a fixed quote, scoped in writing before
          any work begins. The quote states the deliverables, the timeline,
          the price, and the payment schedule. Each deliverable includes two
          structured revision rounds. Work beyond the written scope is quoted
          separately before it starts, never billed as a surprise.
        </p>
      </LegalSection>

      <LegalSection title="Ownership">
        <p>
          On final payment, everything we build for you is yours: code, design
          files, and the accounts created for the project are handed over
          completely. No lock-in, no hostage assets. Until final payment, the
          work remains ours.
        </p>
      </LegalSection>

      <LegalSection title="After launch">
        <p>
          Every project includes a 30-day post-launch window for fixes and
          refinements at no extra cost. Ongoing work after that window is
          available as a light care retainer, agreed in writing like
          everything else.
        </p>
      </LegalSection>

      <LegalSection title="Portfolio and confidentiality">
        <p>
          Concept builds on this site are self-initiated in-house work and are
          labeled as such. Client work is shown publicly only with the
          client&apos;s permission. Anything you share with us during a
          project stays confidential.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          We carry out every engagement with reasonable skill and care. Our
          total liability for any project is limited to the fees you paid for
          it, and we are not liable for indirect or consequential losses.
          Nothing here limits liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection title="Governing law and contact">
        <p>
          These terms are governed by the laws of India. Questions about
          them:{" "}
          <a
            href="mailto:contact@webify.org.in?subject=Terms"
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
