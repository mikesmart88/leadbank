import { useEffect, useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link, useNavigate } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import AccountCard from "../../../Components/Cards/AccountCard";
import CustomImage from "../../../Components/Images/CustomImage";
import CardDetailsCard from "../../../Components/Cards/CardDetailsCard";
import { UpdateCardFreeze, DeleteCard, CreateCard } from "../../../services/CardServices";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import ConfamationAlert from "../../../Components/Alerts/ConfarmAlert";

import icon from "../../../assets/images/leadbank-icon.png";
import master_icon from "../../../assets/images/master.png";
import visa_icon from "../../../assets/images/visa.png";
import verve_icon from "../../../assets/images/verve.png";

export default function Card() {
  const { cardData, cardTransactions, userdata } = useData();

  const maskCardNumber = (cardNumber) => {
    const number = String(cardNumber);
    return `**** **** **** ${number.slice(-4)}`;
  };

  // console.log(cardTransactions);
  const [currentTransaction, setCurrentTransaction] = useState();
  const [transactionType, setTransactionType] = useState("all");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState({});
  const [showdetails, setShowDetails] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [carddata, setCardData] = useState();

  const expiryDate = new Date(cardData?.expiryDate);

  const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
  const year = String(expiryDate.getFullYear()).slice(-2);

  const formattedExpiry = `${month}/${year}`;

  const [cardFrozen, setCardFrozen] = useState(false);

  useEffect(() => {
    if (cardData) {
      setCardFrozen(cardData.frozen);
      setCardData(cardData);
    }
  }, [cardData]);

  useEffect(() => {
    if (cardTransactions) {
      setCurrentTransaction(cardTransactions);
    }
  }, [cardTransactions]);

  const handleFilter = (status) => {
    setTransactionType(status);

    if (status === "all") {
      setCurrentTransaction(cardTransactions);
    } else {
      const filtered = cardTransactions.filter((tx) => tx.status === status);

      setCurrentTransaction(filtered);
    }
  };

  const [closeClass, setcloseClass] = useState(false);

  const handleclose = () => {
    setcloseClass(true);
    setTimeout(() => {
      setShowDetails(false);
    }, 500);
  };

  // console.log(carddata == null)
  // console.log(carddata)

  const handleCardFreeze = async () => {
    try {
      const formData = new FormData();
      if (cardFrozen == false) {
        formData.append("frozen", true);
        setCardFrozen(true);
      } else {
        formData.append("frozen", false);
        setCardFrozen(false);
      }

      const data = await UpdateCardFreeze(formData);
      console.log(data);

      if (data?.message) {
        showAlert({
          type: "success",
          message: data?.message || "Card action completed",
        });
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Action failed, please try again later",
      });
    }
  };

  const handleCardDeleteConfirm = (data = null) => {
    if (!showConfirm) {
      setShowConfirm(true);
      setConfirm(data);
    } else {
      setShowConfirm(false);
      setConfirm(data);
    }
  };

  // console.log(showConfirm)

  const deleteCallback = async () => {
    try {
      const data = await DeleteCard();
      console.log(data);

      if (data?.message) {
        handleCardDeleteConfirm();
        setCardData(null);
        showAlert({
          type: "success",
          message: data?.message || "Card deleted succesfull",
        });
      }
    } catch (error) {
      hideLoader();
      handleCardDeleteConfirm()
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error occured while deleting card",
      });
    }
  };

  const createCallback = async () => {
    showLoader()
    try{
      const data = await CreateCard();
      console.log(data)

    if (data) {
        hideLoader()
        handleCardDeleteConfirm();
        setCardData(data);
        showAlert({
          type: "success",
          message: data?.message || "Card created succesfull",
        });
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error occured while creating card",
      });
    }
  }

  return (
    <main className="dashboard-main-content account-dashboard">
      {Object.keys(carddata || {}).length === 0 ? (
        <>
        {showConfirm && (
            <ConfamationAlert
              className={`confirm-alert card-details-show creat-card-alert`}
              titleText={confirm.title}
              information={confirm.info}
              closeText={confirm.close_text}
              onClose={() => handleCardDeleteConfirm()}
              confirmText={confirm.text}
              Callback={() => createCallback()}
            />
          )}
          <h2>Card</h2>
          <p>Create new card and manage in one place</p>
          <div className="null-table">
            <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//affiliate-program/no_product.svg" />
            <h4>No Card Yet</h4>
            <p>There is no Card available for this current account yet.</p>
            <CustomButton
              onClick={() =>
                handleCardDeleteConfirm({
                  title: "Create New Card",
                  info: "Creating a new card you will be charged a total of $3.00 and you must have a UK account avalable in your list of accounts, Thank You. ",
                  close_text: "Cancle",
                  text: "Create card",
                })
              }
            >
              get Virtual Card
            </CustomButton>
          </div>
        </>
      ) : (
        <>
          {showdetails && (
            <CardDetailsCard
              className={`card-details-show ${closeClass && "close-details-show"}`}
              name={`${userdata?.first_name} ${userdata?.last_name}`}
              number={carddata?.cardNumber}
              cvv={carddata?.cvv}
              expiry={formattedExpiry}
              billing={carddata?.billingAddress}
              zipcode={carddata?.zipcode}
              isopen={true}
              onclose={() => handleclose()}
            />
          )}
          {showConfirm && (
            <ConfamationAlert
              className={`confirm-alert card-details-show`}
              titleText={confirm.title}
              information={confirm.info}
              closeText={confirm.close_text}
              onClose={() => handleCardDeleteConfirm()}
              confirmText={confirm.text}
              Callback={() => deleteCallback()}
            />
          )}
          <section className="card-content-section">
            <div className="card-content">
              <div className="card-holder">
                <div
                  className={`virtual-card ${cardFrozen == true ? "disabled" : ""}`}
                >
                  <CustomImage className="card-logo" source={icon} />
                  <h3>{maskCardNumber(carddata?.cardNumber)}</h3>
                  <div className="balance-card-type">
                    {carddata?.balance !== undefined ? (
                      <strong>
                        $
                        {Number(carddata?.balance || 0)
                          .toFixed(2)
                          .toLocaleString()}
                      </strong>
                    ) : (
                      <strong>$0.00</strong>
                    )}
                    {carddata?.type == "mastercard" ? (
                      <CustomImage source={master_icon} />
                    ) : carddata?.type == "visa" ? (
                      <CustomImage source={visa_icon} />
                    ) : (
                      <CustomImage source={verve_icon} />
                    )}
                  </div>
                </div>
                <div className="card-buttons">
                  <CustomButton
                    onClick={() => setShowDetails(true)}
                    className="info-button"
                  >
                    <span>
                      <Icon name="IoInformation" />
                    </span>
                    <small>Details</small>
                  </CustomButton>
                  <CustomButton onClick={() => navigate("top-up/")}>
                    <span>
                      <Icon name="IoAddSharp" />
                    </span>
                    <small>Add Money</small>
                  </CustomButton>
                  <CustomButton onClick={handleCardFreeze}>
                    <span>
                      <Icon name="IoSnowSharp" />
                    </span>
                    <small>{cardFrozen ? "UnFreeze" : "Freeze"}</small>
                  </CustomButton>
                </div>
              </div>

              <div className="card-manager">
                <h3>Manage card</h3>
                <Link>
                  {" "}
                  <span>
                    <span>
                      <Icon name="IoArrowRedoOutline" />
                    </span>
                    Withdraw funds
                  </span>{" "}
                  <Icon name="LuChevronRight" />
                </Link>
                <Link to="statement/">
                  {" "}
                  <span>
                    <span>
                      <Icon name="LuFileText" />
                    </span>
                    Card satement
                  </span>{" "}
                  <Icon name="LuChevronRight" />
                </Link>
                <span
                  className="delete-link"
                  onClick={() =>
                    handleCardDeleteConfirm({
                      title: "Delete Card",
                      info: "Are you sure you want to delete this card?, Once deleted it can not be retrived. ",
                      close_text: "Cancle",
                      text: "Delete",
                    })
                  }
                >
                  {" "}
                  <span style={{ color: "#ff0a0a" }}>
                    <span
                      style={{ backgroundColor: "#ff2a2a46", color: "#ff0a0a" }}
                      className="failed"
                    >
                      <Icon name="IoTrashOutline" />
                    </span>
                    Delete card
                  </span>{" "}
                </span>
              </div>
            </div>
          </section>

          <section className="change-card-holder">
            <h2>Change card Data and Information.</h2>
            <p>
              Your card will not be disconnected or deleted, Change card to
              renew infomation.
            </p>
            <CustomButton>
              Change card <Icon name="LuArrowRight" />
            </CustomButton>
          </section>
          <section className="transaction-for">
            <h3>Card Transaction</h3>
            <div className="account-section-nav">
              <CustomButton
                className={transactionType == "all" ? "button-active" : ""}
                onClick={() => handleFilter("all")}
              >
                All
              </CustomButton>
              <CustomButton
                className={transactionType == "success" ? "button-active" : ""}
                onClick={() => handleFilter("success")}
              >
                Success
              </CustomButton>
              <CustomButton
                className={transactionType == "pending" ? "button-active" : ""}
                onClick={() => handleFilter("pending")}
              >
                Pending
              </CustomButton>
              <CustomButton
                className={transactionType == "failed" ? "button-active" : ""}
                onClick={() => handleFilter("failed")}
              >
                failed
              </CustomButton>
            </div>
            {currentTransaction?.length > 0 ? (
              <TransactionTable
                className="transaction-table"
                tableData={currentTransaction}
              />
            ) : (
              <div className="null-table">
                <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//affiliate-program/no_product.svg" />
                <h4>No Transaction Yet</h4>
                <p>
                  There is no transaction available for this current filter yet.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
