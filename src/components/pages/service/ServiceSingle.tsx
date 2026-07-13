"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import { single, type ServiceEntry } from "@/lib/pages/service";

/* Process-card badge icons (traced from the source SVGs) */
function ProcessIcon({ name }: { name: "flask" | "orbit" | "cube" }) {
  if (name === "flask") {
    return (
      <svg viewBox="0 0 26 26" fill="none" className="h-[26px] w-[26px]">
        <path
          d="M21.6668 9.02017C21.6668 10.803 17.7866 12.2483 13.0002 12.2483C8.21369 12.2483 4.3335 10.803 4.3335 9.02017M21.6668 9.02017C21.6668 13.0844 19.4263 16.5639 16.2502 18.0005V20.6025C16.2502 21.4177 15.7865 22.1629 15.0525 22.5274L12.8858 23.6034C11.4452 24.3189 9.75016 23.2784 9.75016 21.6786V18.0005C6.57401 16.5639 4.3335 13.0844 4.3335 9.02017M21.6668 9.02017C21.6668 8.00074 20.3982 7.09168 18.4168 6.50008M4.3335 9.02017C4.3335 8.00074 5.60216 7.09168 7.5835 6.50008M15.1668 5.41675V7.58341M10.8335 7.58341V8.66675M10.8335 2.16675V4.33341"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "orbit") {
    return (
      <svg viewBox="0 0 26 26" fill="none" className="h-[26px] w-[26px]">
        <path
          d="M17.1776 17.1776C22.0417 12.3136 24.1144 6.50011 21.8071 4.19288C19.4999 1.88564 13.6864 3.95833 8.82237 8.82237C3.95836 13.6864 1.88563 19.4999 4.19287 21.8071C6.5001 24.1144 12.3136 22.0416 17.1776 17.1776Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.82236 17.1776C3.95832 12.3136 1.88565 6.50011 4.19287 4.19288C6.50012 1.88564 12.3136 3.95833 17.1776 8.82237C22.0416 13.6864 24.1144 19.4999 21.8071 21.8071C19.4999 24.1144 13.6864 22.0416 8.82236 17.1776Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.1668 12.9999C15.1668 11.8033 14.1968 10.8333 13.0002 10.8333C11.8035 10.8333 10.8335 11.8033 10.8335 12.9999C10.8335 14.1965 11.8035 15.1666 13.0002 15.1666C14.1968 15.1666 15.1668 14.1965 15.1668 12.9999Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 26 26" fill="none" className="h-[26px] w-[26px]">
      <path
        d="M18.9582 10.2917L12.9998 13.0001L7.0415 10.2917M18.33 8.93123L13.83 6.8786C13.3028 6.63812 12.6972 6.63812 12.17 6.8786L7.66999 8.93123C6.9573 9.25632 6.5 9.96754 6.5 10.7509V16.3325C6.5 17.1158 6.9573 17.827 7.66999 18.1521L12.17 20.2047C12.6972 20.4452 13.3028 20.4452 13.83 20.2047L18.33 18.1521C19.0427 17.827 19.5 17.1158 19.5 16.3325V10.7509C19.5 9.96754 19.0427 9.25632 18.33 8.93123ZM13 13V19.5M13 2.16675V3.25008M13 22.75V23.8333M21.7437 4.25635L20.9776 5.02238M5.02246 20.9775L4.25643 21.7436M23.8335 13L22.7502 13M3.25 13L2.16667 13M21.7437 21.7437L20.9776 20.9776M5.02246 5.02246L4.25643 4.25643"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Blue forward arrow shown in each process-card header */
function BlueArrow() {
  return (
    <svg viewBox="0 0 30 30" fill="none" className="h-[30px] w-[30px]">
      <path
        d="M17.5 20L22.5 15M22.5 15L17.5 10M22.5 15L7.5 15"
        stroke="#0051FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceSingle({ service }: { service: ServiceEntry }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Load reveal for the page header
      gsap.fromTo(
        "[data-ss-head]",
        revealFrom,
        { ...revealTo, stagger: 0.12, delay: 0.1 }
      );

      // Scroll reveals (source: y 40px / blur 5px per block)
      gsap.utils.toArray<HTMLElement>("[data-ss-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, filter: "blur(5px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      // Image parallax
      gsap.utils.toArray<HTMLElement>("[data-ss-parallax]").forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Commitment counters: count up to the value, keep its unit suffix
      gsap.utils.toArray<HTMLElement>("[data-ss-counter]").forEach((el) => {
        const end = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white pb-16 pt-32 text-ink md:pb-24 md:pt-40"
    >
      <div className="mx-auto w-[min(94%,1320px)]">
        {/* ------------------------------------------------ header */}
        <div className="flex flex-col items-center text-center">
          <p data-ss-head className="eyebrow text-gray-deep">
            {single.tag}
          </p>
          <h1 data-ss-head className="display-2 mt-3">
            {service.title}
          </h1>
          <div
            data-ss-head
            data-ss-parallax
            className="mt-10 h-[42vh] w-full overflow-hidden rounded-2xl md:mt-[50px] md:h-[80vh]"
          >
            <img
              src={service.heroImage}
              alt={service.title}
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
        </div>

        {/* ------------------------------------------------ overview */}
        <div className="mx-auto mt-14 max-w-[1112px] md:mt-[60px]">
          <h2 data-ss-reveal className="text-[26px] font-semibold text-gray-mid md:text-[30px]">
            {single.overviewLabel}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr] md:gap-x-[80px]">
            <div
              data-ss-reveal
              data-ss-parallax
              className="h-[400px] overflow-hidden rounded-2xl md:h-auto"
            >
              <img
                src={single.overviewImage}
                alt={`${service.title} overview`}
                className="h-full w-full object-cover will-change-transform"
              />
            </div>
            <div className="flex flex-col justify-between gap-10">
              <div data-ss-reveal>
                <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[24px]">
                  {single.overviewHeading}
                </h3>
                {single.overviewParagraphs.map((p, i) => (
                  <p key={i} className="mt-4 leading-[1.3] text-ink">
                    {p}
                  </p>
                ))}
              </div>
              <div
                data-ss-reveal
                className="flex max-w-[284px] flex-col gap-10 rounded-2xl bg-fill-light p-5"
              >
                <p className="leading-[1.3] text-ink">{single.overviewBoxText}</p>
                <PillButton tone="blue" href="/contact" className="w-max">
                  Start a Project
                </PillButton>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ process */}
        <div className="mt-14 md:mt-[60px]">
          <div className="rounded-2xl bg-fill-light p-[26px]">
            <h2
              data-ss-reveal
              className="max-w-[293px] text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[30px]"
            >
              {`Our ${service.title} Process`}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-[1fr_1fr_1fr_1.8fr]">
              {single.processCards.map((card) => (
                <div
                  key={card.label}
                  data-ss-reveal
                  className="flex flex-col items-center gap-14 rounded-[10px] bg-white px-[22px] pb-[42px] pt-[22px]"
                >
                  <div className="flex w-full items-center justify-between">
                    <p className="font-semibold text-ink">{card.label}</p>
                    <BlueArrow />
                  </div>
                  <div className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full border border-fill-light border-l-border-soft pb-[30px] xl:h-[224px] xl:w-[224px]">
                    <p className="whitespace-pre-line text-center text-[20px] font-semibold leading-[1.3] text-ink">
                      {card.label === "Project Timeline"
                        ? service.timeline ?? card.value
                        : card.value}
                    </p>
                    <span className="absolute -bottom-[23px] left-1/2 flex h-[62px] w-[62px] -translate-x-1/2 items-center justify-center rounded-full bg-ink">
                      <ProcessIcon name={card.icon} />
                    </span>
                  </div>
                </div>
              ))}
              <div
                data-ss-reveal
                className="flex flex-col items-start justify-end gap-6 sm:col-span-2 lg:col-span-1 lg:pl-5"
              >
                <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] md:text-[28px]">
                  {single.processNote}
                </p>
                <PillButton tone="blue" href="/contact">
                  Start a Project
                </PillButton>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ what is */}
        <div className="my-14 flex flex-col gap-6 md:my-[60px] md:flex-row md:items-start md:justify-between">
          <h2
            data-ss-reveal
            className="max-w-[323px] text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[28px]"
          >
            {`What Is ${service.title}?`}
          </h2>
          <p data-ss-reveal className="max-w-[662px] leading-[1.3] text-ink">
            {service.whatIs ?? single.whatIsBody}
          </p>
        </div>

        {/* ------------------------------------------------ deliverables */}
        <div className="grid grid-cols-1 gap-8 rounded-2xl bg-fill-light p-6 md:p-[30px] lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="flex flex-col justify-between">
            <div data-ss-reveal>
              <p className="mb-6 text-gray-deep md:mb-[30px]">
                {single.deliverablesTag}
              </p>
              <h2 className="max-w-[480px] text-[28px] font-bold leading-none tracking-[-0.02em] md:text-[36px]">
                {single.deliverablesTitle}
              </h2>
            </div>
            <div data-ss-reveal className="mt-10 rounded-2xl bg-white p-6">
              <p className="font-medium text-ink">{single.deliverablesLabel}</p>
              <ul className="mt-5 flex list-disc flex-col gap-4 pl-[30px]">
                {(service.deliverables ?? single.deliverablesItems).map(
                  (item, i) => (
                    <li key={i} className="font-medium leading-[1.3] text-ink">
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div
            data-ss-reveal
            data-ss-parallax
            className="h-[300px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-auto lg:min-h-full"
          >
            <img
              src={single.packageImage}
              alt="Service package deliverables"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
        </div>

        {/* ------------------------------------------------ priorities */}
        <div className="mt-14 flex flex-col items-start gap-10 md:mt-[60px] lg:flex-row lg:justify-between">
          <h2
            data-ss-reveal
            className="max-w-[339px] text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[28px]"
          >
            {single.prioritiesTitle}
          </h2>
          <div className="grid w-full max-w-[875px] flex-1 grid-cols-1 gap-10 sm:grid-cols-3">
            {single.priorities.map((p) => (
              <div
                key={p.title}
                data-ss-reveal
                className="flex flex-col justify-between gap-14 border-l border-border-soft pl-4 md:gap-[100px]"
              >
                <p
                  data-ss-counter
                  data-count={p.value}
                  data-suffix={p.suffix}
                  className="text-[48px] font-semibold leading-none tracking-[-0.02em]"
                >
                  {p.value}
                  {p.suffix}
                </p>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-ink">{p.title}</p>
                  <p className="leading-[1.3] text-black font-medium">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
