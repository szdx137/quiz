import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./Profile.scss";
import axiosInstance from "../../axios";

interface UserDetails {
  id: number;
  email: string;
  first_name?: string;
  last_name: number;
  role: string;
  password?: string;
}

function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  console.log(userDetails);
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<UserDetails>(
        "/auth/user-detail/"
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatehUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put<UserDetails>(
        "/auth/user-detail/",
        {
          userDetails,
        }
      );

      setUserDetails(response.data);
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    updatehUserDetails();
    console.log(userDetails);
    setEditing(false);
    // Save changes logic here
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userDetails) return; // Check if userDetails is defined
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  return (
    <div className="profile-page">
      <Navbar></Navbar>

      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-form">
          <div className="form-group">
            <label>First Name:</label>
            {editing ? (
              <input
                type="text"
                name="first_name"
                value={userDetails?.first_name}
                onChange={(e) => handleOnChange(e)}
              />
            ) : (
              <span>{userDetails?.first_name}</span>
            )}
            {/* {editing && <button className="edit-btn">Edit</button>} */}
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            {editing ? (
              <input
                type="text"
                name="last_name"
                value={userDetails?.last_name}
                onChange={(e) => handleOnChange(e)}
              />
            ) : (
              <span>{userDetails?.last_name}</span>
            )}
            {/* {editing && <button className="edit-btn">Edit</button>} */}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <span>{userDetails?.email}</span>
          </div>
          <div className="form-group">
            <label>Password:</label>
            {editing ? (
              <input
                type="password"
                name="password"
                value={userDetails?.password}
                onChange={(e) => handleOnChange(e)}
              />
            ) : (
              <span>********</span>
            )}
            {/* {editing && <button className="edit-btn">Edit</button>} */}
          </div>

          {editing && (
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}
          {editing && (
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          )}
          {!editing && (
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
