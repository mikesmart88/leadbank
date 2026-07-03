import { useState, useRef } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link, useNavigate } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import { BaseUrl } from "../../../../env.config";
import PaymentCard from "../../../Components/Cards/PaymentCard";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { MediaUrl } from "../../../../env.config";
import CustomImage from "../../../Components/Images/CustomImage";
import Input from "../../../Components/Inputs/Input";
import { uploadimage } from "../../../services/AuthServices";
import BackButton from "../../../Components/Buttons/BackButton";

export default function PersonalDetails() {
  const { userdata } = useData();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Show preview immediately
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);

    try {

        const formData = new FormData();
        formData.append("avatar", file);

        const data = await uploadimage(formData);

        console.log(data);

        // If your API returns the updated user
        // setUserData(data.user);

        // If you use Redux, dispatch an action here instead.

    } catch (error) {
        console.error(error);

        // Remove preview if upload failed
        URL.revokeObjectURL(preview);
        setPreviewImage(null);

    } finally {
        
      console.log("uploaded")
    }
};

  return (
    <main className="dashboard-main-content account-dashboard">
      <h2> <BackButton /> Profile</h2>
      <p>View and update profile details</p>

      <div className="pinfo">
        <div className="cover-proimage">
          {previewImage ? (
              <CustomImage source={previewImage} alt="Preview" />
          ) : userdata?.avatarUrl ? (
            <CustomImage source={`${MediaUrl}${userdata.avatarUrl}`} />
          ) : userdata?.first_name && userdata?.last_name ? (
            <span className="profile-text">
              {getInitials(userdata.first_name, userdata.last_name)}
            </span>
          ) : (
            <CustomImage source="https://i.near.social/magic/large/https://near.social/magic/img/account/null" />
          )}
          
        </div>
        
        <div className="prof-image" onClick={() => fileInputRef.current.click()} >
          {previewImage ? (
            <CustomImage source={previewImage} alt="Preview" />
          ) : userdata?.avatarUrl ? (
            <CustomImage source={`${MediaUrl}${userdata.avatarUrl}`} />
          ) : userdata?.first_name && userdata?.last_name ? (
            <span className="profile-text">
              {getInitials(userdata.first_name, userdata.last_name)}
            </span>
          ) : (
            <CustomImage source="https://i.near.social/magic/large/https://near.social/magic/img/account/null" />
          )}

          <div className="upload-div">
            <Icon name="IoAdd" />
          </div>

          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
        />
          
        </div>
      </div>
      <div className="more-section p-section">
        <h3>PERSONAL INFOMATION</h3>
        <span>
          <small>First name</small>
          <small>{userdata.first_name}</small>
        </span>
        <span>
          <small>Middle name</small>
          <small>{userdata.middleName}</small>
        </span>
        <span>
          <small>last name</small>
          <small>{userdata.last_name}</small>
        </span>
        <span>
          <small>Email address</small>
          <small>{userdata.email}</small>
        </span>
        <span>
          <small>Phone Number</small>
          <small>{userdata.phoneNumber}</small>
        </span>
        <span>
          <small>Date of birth</small>
          <small>{userdata.dateOfBirth}</small>
        </span>
      </div>
    </main>
  );
}
