import { useTranslation } from "../../auto-il8n";
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
import Fdicpop from "../../Components/Cards/fdicpop";
import ImageSequence from "../../Components/Cards/imageEffect";
export default function HomePage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const img = [{
    src: "https://plus.unsplash.com/premium_photo-1661301075857-63868ae88c00?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }, {
    src: "https://images.unsplash.com/photo-1713947506242-8fcae733d158?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }, {
    src: "https://images.unsplash.com/photo-1616803140344-6682afb13cda?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }];
  const cards = [{
    title: "Multi-Currency Accounts",
    description: "Get a bank account in just minutes. Receive and access your global payments whenever you want to.",
    iconName: "FcGlobe",
    btnLabel: "Create Account",
    onclick: () => {
      navigate("signup/country/");
    },
    bgcolor: `linear-gradient(
    139deg,
    rgb(255, 175, 119) 2.33%,
    rgb(255, 241, 119) 96.28%
  )`,
    imgsrc: "https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/69a70100528af36702450e52_foreign-account.avif"
  }, {
    title: "Currency Exchange",
    description: "Effortlessly exchange major world currencies at the best rates. Convert money from local to foreign and back in a flash.",
    iconName: "FcCurrencyExchange",
    btnLabel: "Exchange Now",
    onclick: () => {},
    bgcolor: `linear-gradient(
    139deg,
    rgb(146, 171, 252) 2.33%,
    rgb(146, 214, 252) 96.28% 96.28%
  )`,
    imgsrc: "https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/6881ef2c276af2be12614d49_convert-money.avif"
  }, {
    title: "Money Transfer",
    description: "Foreign or local payments? We’ll deliver it right on time.",
    iconName: "FcMoneyTransfer",
    btnLabel: "Transfer Now",
    onclick: () => {},
    bgcolor: `linear-gradient(139deg, rgb(186, 128, 230) 2.33%, rgb(230, 128, 220) 96.28%)`,
    imgsrc: "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/storefront-card"
  }, {
    title: "Vitual Cards",
    description: "Make international payments with a virtual debit card that just works.",
    iconName: "FcDebt",
    btnLabel: "Get Card",
    onclick: () => {},
    bgcolor: `linear-gradient(153deg, #d3f1a7, #f1f8e5 48%, #f6faff 56%)`,
    imgsrc: "https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/683ebb4a552463589e61ce75_0974207bb656f20ca75a64de5b2e0b99_hand-with-card.avif"
  }];
  const banking_cards = [{
    title: "Invoicing",
    description: "Send professional invoices and accelerate your global payments from your clients.",
    iconName: "FcDocument",
    btnLabel: "Create Invoice",
    onclick: () => {},
    bgcolor: `linear-gradient(63deg, #4e0d8e 33%, #0000002f 75%)`,
    imgsrc: "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/invoicing-card"
  }, {
    title: "Expense Management",
    description: "Track your expenses to better understand your spending habits.",
    iconName: "FcPlanner",
    btnLabel: "View Expense",
    onclick: () => {},
    bgcolor: `linear-gradient(139deg, rgb(255, 119, 119) 2.33%, rgb(255, 119, 168) 96.28%)`,
    imgsrc: "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/courses-card"
  }, {
    title: "Bill Payment",
    description: "Pay the important bills before they are due.",
    iconName: "FcPaid",
    btnLabel: "Pay bill",
    onclick: () => {},
    bgcolor: `inear-gradient(139deg, rgb(255, 175, 119) 2.33%, rgb(255, 241, 119) 96.28%)`,
    imgsrc: "https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/subscription-card"
  }];
  const Features = [{
    imgsrc: currency_svg,
    label: "Competitve exchange rates"
  }, {
    imgsrc: iban_svg,
    label: "An IBAN for your business needs"
  }, {
    imgsrc: p2p_svg,
    label: "P2P for free and faster payments"
  }];
  return <main className="main-content">
      <Fdicpop />
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-text">
          <h1>{t("grow_your_finance_business_without_limits")}</h1>
          <p>{t("take_control_of_your_finances_with_seamless_banking_services_built_for_everyday_life_and_longterm_success")}</p>
          <CustomButton onClick={() => {
          navigate("/signup/country/");
        }}>{t("get_started_for_free")}</CustomButton>
          <div className="partners">
            <small>{t("as_seen_on")}</small>{" "}
            <div>
              <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/yahoo-fin" altText="Yahoo Finance" />
              <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/us-insider" altText="US Insider" />
            </div>
          </div>
        </div>

       <ImageSequence className="globe-img" images={img} />
        <CustomImage className="payment-gif" source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//home-assets/hero" altText="image-gif" />
      </section>
      <section className="banking-tool-section">
        <section className="header-section">
          <small>{t("banking_tools")}</small>
          <h2>{t("experience_smarter_banking_with_innovative_tools_built_to_streamline_transactions")}<span>{t("track_finances_and_support_your_goals")}</span>
          </h2>
        </section>
        <ScrollEffectList className="scroll-effect-list" cards={cards} />
      </section>
      <section className="true-account">
        <div className="true-account-header">
          <div className="true-account-text">
            <h2>{t("a_truly_global_foreign_account")}</h2>
            <p>{t("get_a_global_foreign_account_that_puts_you_in_total_control_of_your_money")}</p>
            <CustomButton onClick={() => {
            navigate("/signup/country/");
          }}>{t("create_an_account")}</CustomButton>
          </div>
          <CustomImage source="https://cdn.prod.website-files.com/6360022338a81bd6fdbb1145/67f8f68b6a43a328b669a59c_4632949cb6e5e84e75bc4b053891115f_handWithPhone.avif" altText="handing holding phone image" />
        </div>
        <div className="true-account-features-holder">
          {Features.map((feature, index) => <FeatureCard key={index} className="feature-card" imgsrc={feature.imgsrc} cardnum={index + 1} label={feature.label} />)}
        </div>
      </section>
      <section className="image-content-section">
        <ImageContentcard className="image-content" imgsrc="https://mainstack.com/landingpage/section2_bg.svg" text="No matter where your customers, clients, or fans are, Leadbank makes it easy to showcase and get paid." />
      </section>
      <section className="than-banking-section">
        <h3>{t("more_than_just_banking")}</h3>
        <ScrollEffectList className="scroll-effect-list" cards={banking_cards} />
      </section>
      <section className="review-section">
        <div className="large-texthead">
          <h2>{t("quality_product_and_services")}</h2>
          <h2>{t("quality_product_and_services")}</h2>
          <h2>{t("quality_product_and_services")}</h2>
        </div>
        <h3>{t("we_asked_our_customers_how_likely_they_were_to_recommend_leadbank_to_their_network")}</h3>
        <section className="review-box-section">
          <div className="review-card">
            <CustomImage source="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" />
            <div className="text">
              <p>{t("i_find_leadbanks_usability_and_interface_easy_to_use_its_simple_and_straightforward_i_previously_struggled_with_receiving_payments_for_my_work_but_leadbank_has_made_it_faster_and_cheaper_to_do_this_now")}</p>
              <small>{t("sarah_guiano")}</small>
            </div>
          </div>
        </section>
      </section>
    </main>;
}