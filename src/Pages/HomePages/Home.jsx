import { useState } from "react";
import CustomImage from "../../Components/Images/CustomImage";
import CustomButton from "../../Components/Buttons/CustomButtons";
import ScrollEffectList from "../../Components/Lists/scrollEffectList";
import FeatureCard from "../../Components/Cards/FeatureCard";
import ImageContentcard from "../../Components/Cards/ImageContentCard";

import globe_svg from "../../assets/images/globe.svg";
import currency_svg from "../../assets/images/exchange.svg";
import iban_svg from "../../assets/images/iban.svg";
import p2p_svg from "../../assets/images/p2p2.svg";
import pay_bill from "../../assets/images/payment.png";
import { useData } from "../../hooks/UseData";
import { useNavigate } from "react-router";


export default function HomePage() {

  const navigate = useNavigate()

  const cards = [
    {
      title: "Multi-Currency Accounts",
      description:
        "Get a bank account in just minutes. Receive and access your global payments whenever you want to.",
      iconName: "FcGlobe",
      btnLabel: "Create Account",
      onclick: () => {navigate("signup/country/")},
      bgcolor: `linear-gradient(
    139deg,
    rgb(255, 175, 119) 2.33%,
    rgb(255, 241, 119) 96.28%
  )`,
      imgsrc:
        "https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/69a70100528af36702450e52_foreign-account.avif",
    },
    {
      title: "Currency Exchange",
      description:
        "Effortlessly exchange major world currencies at the best rates. Convert money from local to foreign and back in a flash.",
      iconName: "FcCurrencyExchange",
      btnLabel: "Exchange Now",
      onclick: () => {},
      bgcolor: `linear-gradient(
    139deg,
    rgb(146, 171, 252) 2.33%,
    rgb(146, 214, 252) 96.28% 96.28%
  )`,
      imgsrc:
        "https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/6881ef2c276af2be12614d49_convert-money.avif",
    },
    {
      title: "Money Transfer",
      description: "Foreign or local payments? We’ll deliver it right on time.",
      iconName: "FcMoneyTransfer",
      btnLabel: "Transfer Now",
      onclick: () => {},
      bgcolor: `linear-gradient(139deg, rgb(186, 128, 230) 2.33%, rgb(230, 128, 220) 96.28%)`,
      imgsrc:
        "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/storefront-card",
    },
    {
      title: "Vitual Cards",
      description:
        "Make international payments with a virtual debit card that just works.",
      iconName: "FcDebt",
      btnLabel: "Get Card",
      onclick: () => {},
      bgcolor: `linear-gradient(153deg, #d3f1a7, #f1f8e5 48%, #f6faff 56%)`,
      imgsrc:
        "https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/683ebb4a552463589e61ce75_0974207bb656f20ca75a64de5b2e0b99_hand-with-card.avif",
    },
  ];

  const banking_cards = [
    {
      title: "Invoicing",
      description:
        "Send professional invoices and accelerate your global payments from your clients.",
      iconName: "FcDocument",
      btnLabel: "Create Invoice",
      onclick: () => {},
      bgcolor: `linear-gradient(63deg, #4e0d8e 33%, #0000002f 75%)`,
      imgsrc:
        "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/invoicing-card",
    },
    {
      title: "Expense Management",
      description:
        "Track your expenses to better understand your spending habits.",
      iconName: "FcPlanner",
      btnLabel: "View Expense",
      onclick: () => {},
      bgcolor: `linear-gradient(139deg, rgb(255, 119, 119) 2.33%, rgb(255, 119, 168) 96.28%)`,
      imgsrc:
        "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/courses-card",
    },
    {
      title: "Bill Payment",
      description: "Pay the important bills before they are due.",
      iconName: "FcPaid",
      btnLabel: "Pay bill",
      onclick: () => {},
      bgcolor: `inear-gradient(139deg, rgb(255, 175, 119) 2.33%, rgb(255, 241, 119) 96.28%)`,
      imgsrc: "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/subscription-card",
    },
  ];

  const Features = [
    {
      imgsrc: currency_svg,
      label: "Competitve exchange rates",
    },
    {
      imgsrc: iban_svg,
      label: "An IBAN for your business needs",
    },
    {
      imgsrc: p2p_svg,
      label: "P2P for free and faster payments",
    },
  ];

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-text">
          <h1>Grow your finance, business without limits</h1>
          <p>
            Take control of your finances with seamless banking services built
            for everyday life and long-term success.
          </p>
          <CustomButton onClick={() => {navigate("/signup/country/")}} >Get started for free</CustomButton>
          <div className="partners">
            <small>as seen on</small>{" "}
            <div>
              <CustomImage
                source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/yahoo-fin"
                altText="Yahoo Finance"
              />
              <CustomImage
                source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/us-insider"
                altText="US Insider"
              />
            </div>
          </div>
        </div>

        <CustomImage
          className="globe-img"
          source={globe_svg}
          altText="hero-img"
        />
        <CustomImage
          className="payment-gif"
          source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/hero"
          altText="image-gif"
        />
      </section>
      <section className="banking-tool-section">
        <section className="header-section">
          <small>Banking Tools</small>
          <h2>
            Experience smarter banking with innovative tools built to streamline
            transactions,<span> track finances, and support your goals.</span>
          </h2>
        </section>
        <ScrollEffectList className="scroll-effect-list" cards={cards} />
      </section>
      <section className="true-account">
        <div className="true-account-header">
          <div className="true-account-text">
            <h2>A truly global foreign account.</h2>
            <p>
              Get a global foreign account that puts you in total control of
              your money.
            </p>
            <CustomButton onClick={() => {navigate("/signup/country/")}}>Create an account</CustomButton>
          </div>
          <CustomImage
            source="https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/67f8f68b6a43a328b669a59c_4632949cb6e5e84e75bc4b053891115f_handWithPhone.avif"
            altText="handing holding phone image"
          />
        </div>
        <div className="true-account-features-holder">
          {Features.map((feature, index) => (
            <FeatureCard
              key={index}
              className="feature-card"
              imgsrc={feature.imgsrc}
              cardnum={index + 1}
              label={feature.label}
            />
          ))}
        </div>
      </section>
      <section className="image-content-section">
        <ImageContentcard
          className="image-content"
          imgsrc="https://mainstack.com/landingpage/section2_bg.svg"
          text="No matter where your customers, clients, or fans are, Leadbank makes it easy to showcase and get paid."
        />
      </section>
      <section className="than-banking-section">
        <h3>More Than just banking</h3>
        <ScrollEffectList
          className="scroll-effect-list"
          cards={banking_cards}
        />
      </section>
      <section className="review-section">
        <div className="large-texthead">
          <h2>Quality Product and services</h2>
          <h2>Quality Product and services</h2>
          <h2>Quality Product and services</h2>
        </div>
        <h3>
          We asked our customers how likely they were to recommend Leadbank to
          their network.
        </h3>
        <section className="review-box-section">
          <div className="review-card">
            <CustomImage source="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" />
            <div className="text">
              <p>
                I find Leadbank’s usability and interface easy to use. It’s
                simple and straightforward. I previously struggled with
                receiving payments for my work, but Leadbank has made it faster
                and cheaper to do this now.
              </p>
              <small>Sarah guiano</small>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
