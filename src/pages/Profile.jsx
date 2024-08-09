import Account from "../components/Account";

function Profile() {
  return (
    <>
      <main className="main dark-background">
        <div className="header">
          <h1>Welcome back</h1>
          <button className="edit-button">Edit Name</button>
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
