import { useTranslation } from "../../auto-il8n";
import React from "react";
import { Document, Page, Image, View, Text, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import header_img from '../../assets/images/bg_image.jpg';
import icon from '../../assets/images/leadbank-icon.png';
const COLORS = {
  background: "#ffffff",
  card: "#ffffff",
  border: "#ECEEF5",
  stripe: "#F8F9FD",
  text: "#141414",
  subText: "#8E97A8",
  success: "#2BB673",
  danger: "#EF4444",
  pending: "#F59E0B",
  primary: "#27364B"
};
const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.background,
    // paddingVertical: 45,
    // paddingHorizontal: 35,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: COLORS.text
  },
  container: {
    width: "100%",
    alignItems: "center"
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    overflow: "hidden"
  },
  body: {
    padding: "30px 50px"
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  title: {
    fontSize: 10,
    color: COLORS.subText,
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 0.8
  },
  amount: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8
  },
  date: {
    fontSize: 10,
    color: COLORS.subText
  },
  table: {
    marginTop: 25,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  alternateRow: {
    backgroundColor: COLORS.stripe
  },
  label: {
    color: COLORS.subText,
    fontSize: 10.5,
    width: "48%"
  },
  value: {
    width: "48%",
    textAlign: "right",
    fontSize: 10.5,
    color: COLORS.primary
  },
  footer: {
    marginTop: 35,
    alignItems: "center",
    paddingHorizontal: 30
  },
  footerText: {
    color: COLORS.subText,
    textAlign: "center",
    fontSize: 9,
    lineHeight: 1.6
  },
  support: {
    color: "#4F46E5",
    marginTop: 2,
    fontSize: 9
  },
  statusSuccess: {
    color: COLORS.success,
    fontWeight: "bold"
  },
  statusFailed: {
    color: COLORS.danger,
    fontWeight: "bold"
  },
  statusPending: {
    color: COLORS.pending,
    fontWeight: "bold"
  },
  logo: {
    width: 70,
    marginBottom: 18
  },
  divider: {
    height: 25
  },
  iheader: {
    width: "100%",
    alignItems: "center"
  },
  bgImage: {
    position: "absolute",
    minHeight: 100
  },
  headerText: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "20px 40px"
  },
  logo: {
    flexDirection: "row",
    color: "#fff",
    alignItems: "center",
    gap: 2
  }
});
const formatMoney = (amount, currency) => {
  if (amount === null || amount === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/^/, currency);
};
const getStatusStyle = status => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "success":
    case "successful":
      return styles.statusSuccess;
    case "failed":
      return styles.statusFailed;
    default:
      return styles.statusPending;
  }
};
const Row = ({
  label,
  value,
  stripe = false,
  status = false
}) => <View style={[styles.row, stripe && styles.alternateRow]}>
    <Text style={styles.label}>
      {label}
    </Text>

    <Text style={[styles.value, status && getStatusStyle(value)]}>
      {value}
    </Text>
  </View>;
export const TransactionReceipt = ({
  transaction
}) => {
  return <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
               <View style={styles.iheader}>
          <Image style={styles.bgImage} source={header_img} />
          <View style={styles.headerText}>
          <Text style={{
              color: "#fff",
              fontSize: 28,
              width: "35%",
              fontWeight: "500"
            }}>{t("transaction_reciept")}</Text>
          <View style={styles.logo}>
            <Image style={{
                width: 30,
                height: 30
              }} source={icon} />
            <Text style={{
                fontSize: 20,
                fontWeight: 500
              }}>{t("leadbank")}</Text>
          </View>
        </View>
        </View>

        <View style={styles.body}>
              <View style={styles.card}>

            {/* HEADER */}

            <View style={styles.header}>

              <Text style={styles.title}>{t("transaction")}{transaction.status}
              </Text>

              <Text style={styles.amount}>
                {transaction.currency}
                {Number(transaction.amount || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Text>

              <Text style={styles.date}>
                {transaction.created_at}
              </Text>

            </View>

            {/* TABLE */}

            <View style={styles.table}>

              <Row stripe label="Transaction Date & Time" value={transaction.created_at} />

              <Row label="Account" value={transaction.account} />

              <Row stripe label="Transaction Type" value={transaction.type} />

              <Row label="Currency" value={transaction.currency} />

              {transaction.type == "withdraw" ? <Row stripe label="Transaction Fee" value={formatMoney(0.20, transaction.currency)} /> : null}

              <Row label="Transaction Reference" value={transaction.reference} stripe={transaction.type !== "withdraw"} />

                <Row label="Status" value={transaction.status} status stripe={transaction.type === "withdraw"} />

                <Row label="Narration" value={transaction.narration} stripe={transaction.type !== "withdraw"} />

            </View>

          </View>

          {/* FOOTER */}

          <View style={styles.footer}>

            <Text style={styles.footerText}>{t("for_complaints_regarding_this_transaction")}</Text>

            <Text style={styles.footerText}>{t("kindly_contact_our_support_team")}</Text>

            <Text style={styles.support}>{t("support_leadbankuniversal_com")}</Text>

          </View>

        </View>
        </View>
      </Page>
    </Document>;
};
export default function ReceiptPreview() {
  const {
    t
  } = useTranslation();
  return <PDFViewer style={{
    width: "100%",
    height: "100vh",
    border: "none"
  }}>
      <TransactionReceipt transaction={{}} />
    </PDFViewer>;
}