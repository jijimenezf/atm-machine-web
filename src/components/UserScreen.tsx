export type Customer = {
  id: string;
  name: string;
  institution: string;
  account_number: string;
  balance: number;
  currency: string;
  account_type: string;
  account_status: string;
  card_type: string;
  created_at: string;
  updated_at: string;
};

function UserScreen({
  customer,
  showBalance,
}: {
  customer: Customer;
  showBalance: boolean;
}) {
  return (
    <>
      <div style={{ marginBottom: '60px', paddingTop: '25px'}}>Hi {customer.name}!</div>
      {showBalance ? (
        <div>
          <div>
            <section className="check-pin">
              {`The balance of your account `}
              <strong>{`${customer.account_number.substring(
                customer.account_number.length - 4
              )} `}</strong>
              is:
            </section>
            <section className="check-pin">
              <strong>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: customer.currency,
                }).format(customer.balance)}
              </strong>
            </section>
          </div>
          <div>
            <section className="check-pin-r">{""}</section>
            <section className="check-pin-r">{""}</section>
            <section className="check-pin-r">Back</section>
          </div>
        </div>
      ) : (
        <>
          <span>Please make a choice...</span>
          <div className="user-options">
            <div>
              <section className="check-pin">Withdraw</section>
              <section className="check-pin">Deposit</section>
            </div>
            <div>
              <section className="check-pin-r">Exit</section>
              <section className="check-pin-r">Balance</section>
              <section className="check-pin-r">Re-Enter Pin</section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserScreen;
