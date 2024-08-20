import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../redux/actions";
import Account from "../components/Account";

function Profile() {
  // Accéder aux informations de l'utilisateur depuis le store Redux
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(user.userName);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await dispatch(updateUserName(newUserName)).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update username: ", error);
    }
  };

  return (
    <>
      <main className="main dark-background">
        <div className="header">
          {isEditing ? (
            <div>
              <h2>Edit user info</h2>
              <div>
                <label htmlFor="username">User name:</label>
                <input
                  type="text"
                  id="username"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="firstname">First name:</label>
                <input
                  type="text"
                  id="firstname"
                  value={user.firstName}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="lastname">Last name:</label>
                <input
                  type="text"
                  id="lastname"
                  value={user.lastName}
                  disabled
                />
              </div>
              <div className="button-container">
                <button className="edit-button" onClick={handleSaveClick}>
                  Save
                </button>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1>
                Welcome back <br />
                {user.firstName} {user.lastName}!
              </h1>
              <br />
              <button onClick={handleEditClick} className="edit-button">
                Edit Name
              </button>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking"
          amount="2,082.79"
          description="Available Balance"
          accountNumber="8349"
        />
        <Account
          title="Argent Bank Savings"
          amount="10,928.42"
          description="Available Balance"
          accountNumber="6712"
        />
        <Account
          title="Argent Bank Credit Card"
          amount="184.30"
          description="Current Balance"
          accountNumber="8349"
        />
      </main>
    </>
  );
}

export default Profile;
