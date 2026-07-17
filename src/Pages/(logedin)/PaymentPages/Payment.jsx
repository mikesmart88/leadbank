import { useTranslation } from "../../../auto-il8n";
import { useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import { BaseUrl } from "../../../../env.config";
import PaymentCard from "../../../Components/Cards/PaymentCard";
export default function Payments() {
  const {
    t
  } = useTranslation();
  const billpayment = [{
    imgsrc: "https://app.grey.co/assets/airtime-BpXByl_V.svg",
    label: "Buy Airtime",
    description: "Stay connected with your family and friends with instant top-ups"
  }, {
    imgsrc: "https://app.grey.co/assets/internet-C9ZcEmQP.svg",
    label: "Buy Data",
    description: "Enjoy uninterupted internet access with ease and convenient mobile data top-ups"
  }, {
    imgsrc: "https://app.grey.co/assets/bill-DBhwlwXL.svg",
    label: "Pay Bills",
    description: "pay for your internet, cable subscription and other utility bills all in one place"
  }, {
    imgsrc: "data:image/webp;base64,UklGRvIEAABXRUJQVlA4WAoAAAAQAAAALwAAJQAAQUxQSB0CAAANkGVte9pG3ydbDpUPM3N716th5lnPrGQuZwG4AGZmZp4ykzOpY+kfKGoFETEBWDnRWk4TLc0sxFYEghVJKl1cng6Y/TwvWLPffaJGxVE4NT05PjQ0HRn5T0Rsfn4qGwlJQlYjUwM5IFFQ1VmX8CiLQ8PToaVHKkV6BD1SoqlFu4IuaihJx1gxKK2sqysNaEUIgBASACi03y9NCwDVeLzw95ysBIJeUX19edqzRsRaWCMQY4Fk4Y0PMQB/W6+xWDtJpbCBdTL8X9ArcJQ6LwB0MZxRsALojDN6sPDpNOgXurOvb/Q0oAucYVnL4Ckg5TsDsmgOKAndgX2VBMvmHYrvabAudOm5Aspz7pixkGBB5E58owjwao07S3cDoLBcnJGpOQU0GzhrPlQT6nDWndyDDFC017gzNuSD3ctwdzhQ4K6cQ2FAeAdihyKf8FuMSx7B61s0nVnWhDlZe0w7k1dA/vnIAd+ZZQ1YUxjSFckmASD24Wq8VAhA3qlGvRJBAUCSGyFm5HcSAN5dhNYMfIApPw/Qz1RWFgSK65CvX780qf+WLnwxWJ0ABCpR0tpV4im1lvj8jwqN/20uivKSjwGby3uAxNmJiSWrS6obGwoUuYIdehsQqwsgACBY0Zrc/JePc0alappry5MEYO41EZsqJjc78WMoCy/V2F2R9mbfFGGdidZymmhpZiG2IhAAsCYc+TY0Oj4ZxraghKsAAFZQOCCuAgAAMA4AnQEqMAAmAD6RPJlJpaMiISq1XACwEglqAJ0yhHtciKuNgyMHDA28m4Y3ij0AP1V61T/GecBc801IacdzLfpz2B/43/TN8W/V0HBxvtHFGaTdpJP9bDfpevX0D0Lui2m3TBpI9X5X2NUPerqClPJvlpT1rIReXIAA/vslNlz6sIJZM75ZMLOaAftxnbvf/zY4Jf8NshVHA+GHv5mEs85NovurFqE7nsAn5i152iTyt1Qg6vAG1CKJxFK+uqI1V7+fm2vAWdKrh+vwYZxMtM1pv9O/XVvzqU3Krr1u/6P0zMEyLJVLyrZ/daLxCzOPlONViNAWzTl7wHIDKg5LTOoh16TQeRBC71X/rxFVaAwBdPaCO35lqTurSGe8aSULL3137M6ga2ot1lTH3UZ/vixoSEezVLhz6iOCwWYqX2laPkAsqfVdc/gXwxi67u2pHTlNyGISXP6Yptt2bQw5d+RMXut8gETHRMDvT0DwnFPYthnSPpWJu1aRSH/2MToJFLGMmGR04fWxm7wq058DhoY885WKmMc+qLcdpHP1KzFAFl65E0WLklc+c9L80v1e0Wz3FH22elI/Lo/RFptd/LPehrMf9h7F7xeMbQwvevtm9znpGPHV/z8X/+XcVpTSZn336e0rDnxSZRDH1kFaXb1Xpgeevfn/ECsB6bxCjPsgiwx03tnLPLmLeNNksj+IaA7R9jPwIO53E4Fn1eHi1G+hXR3NjcSCZoNIwVwHJQpS1TnSeMaGUoU4W6JAv6TLHCR4xQvF8sipvSX1RRmpNnQ5MxeTZ5FvQ3d6eZLTVYTTz20YNJNFpL4vpSZn12ri3wQ1/EMSP/DngG2yNjHYKK9m+edgytw8/J6/uC+HoFt+O3+Sy5hMYwJkLQ7Gjo2zd6GhaRjiIq7sPoAAAAA=",
    label: "Gift Cards",
    description: "Buy gift cards for your self or your loved onces"
  }];
  const sendRecieve = [{
    imgsrc: "data:image/webp;base64,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",
    label: "Send Money",
    description: "Send money to 100+ countries instantly",
    to: "/dashboard/funds/send/"
  }, {
    imgsrc: "data:image/webp;base64,UklGRsoDAABXRUJQVlA4WAoAAAAQAAAAIwAAJwAAQUxQSI8BAAABkHRrmyHJ4r/IbNu2ubVtj23b9qxs28bWtm3bnilGLHIizhcZERPgMPXlX4Ow0WSljBmvdrIDwVorw6VncwTUZQz7x3Rbnu0ZNOs6T579C7w9UTyHr2j0eIbAX7wbDQJmvJc9CMeRorEvwxQew/81wUYHhhl2OrDMctTDPFc9LPLQw1JvnlXCcl+ekVG0tcEch0+PDn9Dsm6O5K1uE77oC9LOeI5tmKokHEA6kMohAOA1E+lgGkfrPh7pTKGQ61AcerdLVEp6QXaAonHqjcP+Pr5y4879O8dyCQDYd0DiWi74AIBNg1kKM3QBALXshxzLVgAgma/k0BsAAKnn5bAXmsitkj5ovGdI+qxx6GqQ80VDsq7oALyHPKeG97demaWQoFbD+rev3PAT6fN/AIhKQJn6BYN++PuaoyUjP4iYDIw+3PuKfuo16ZJYvzeMMsbebaH08ciZ375PjJ/xarK3V5pYy0db23xmf/Ljdnyb7x4ybFQY8Uz1IqCIJa1Nsa14N1AlgSUeQOztCQABAAAAVlA4IBQCAABwCwCdASokACgAPok2lUelIqIhNVVdUKARCWwAnTLoPHeycobin3ANxt9ueuyADphv+GNwAC7UyrH82as5Wg3giW5w9ouvu8KojSnz6xYia9DvehkDP+m7kVke+YtwE5F7seoAAP3ABAJGbP7eFeo72zn2wiY09OBgaFx0svAclkJvDVvoYg5gGdS/14sKcX0J+NmxQuiY0o6/9LND1KzCMF/RL0LZ8USIBS1QkJ2TL7rMq/26ZltORycQpsjsbxjAQI1EAWsvoit5WcKSJGZyYiMp1LfgyPEqd57yXBHhVM7BvS7feV1J7Bkii8WAAdRG/NQSIAmN/r/YnLShEOp5+rBgfnV5uViW6B+aOQLjdkGlatI2ZEzSoJnOn6BTc8jZQxYngMqpZ1u+Zrhcb//TPOf/ALrEBkaap4FDR16myliFKV0JGo1L8SBcX45R0GtbUoUBbPyJSDHX3j+l1BEi8ln+S/m3l9mjb+xWPE2a/QrEjEErMtH3mjegE/HwsehATMgXCWFEsNU2fT/wE0AJCmzTez55UQnNxCZCGdwnnaB6f9G9zC01/hHYEoRuTX7Urn7KK498nVQD2Ecu/WeZSEPr7E6n2SUp1unOln0f7/aZ+v/o1Rkq09v602sQCK9RxMSDEqBl/pT7239pE9UQkzW7qs//ULqjr5h5yscyxWC/D22rQQ5j8Ma2Wi+WThQAAAAA",
    label: "Invoice",
    description: "Create and send invoice to get paid for work done or for your business",
    to: "/transactions/"
  }];
  return <main className="dashboard-main-content account-dashboard">
      <h2>{t("payments")}</h2>
      <p>{t("manage_bill_paymemnts_fast_and_easy_juts_once_click_way")}</p>

      <section className="payments-link-section">
        <h4>{t("bills_airtime_gift_cards")}</h4>
        <div className="payment-link-holder">
          {billpayment.map((payment, index) => <PaymentCard key={index} className="payment-card" imgscr={payment.imgsrc} label={payment.label} description={payment.description} />)}
        </div>
      </section>

      <section className="payments-link-section send-recieve">
        <h4>{t("send_receive")}</h4>
        <div className="payment-link-holder">
          {sendRecieve.map((payment, index) => <PaymentCard key={index} className="payment-card avaliable-card" imgscr={payment.imgsrc} label={payment.label} description={payment.description} to={payment.to} />)}
        </div>
      </section>
    </main>;
}