import { useState } from "react";
import PinButton from "./PinButton";
import UserScreen, { type Customer } from "./UserScreen";
import CreditBanner, { type Company } from "./CreditBanner";
import { getData, updateRecord } from "../utils/Api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Customer() {
  const [customerPin, setCustomerPin] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const isEmptyPin = customerPin.trim().length === 0;
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<Customer>({
    queryKey: ["customerData"],
    queryFn: () => getData(customerPin),
    initialData: {} as Customer,
    enabled: !isEmptyPin,
  });

  const updateUserAccount = useMutation({
    mutationFn: updateRecord,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["customerData"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const exitHandler = () => {
    setShowBalance(false);
    setCustomerPin("");
    queryClient.clear();
  };

  const withDrawHandler = (value: string) => {
    const enteredAmount = parseInt(value, 10);
    if (enteredAmount < data.balance) {
      updateUserAccount.mutate({
        customerPin,
        updated_at: new Date().toISOString(),
        balance: data.balance - enteredAmount,
      });
    }
  };

  const depositHandler = (value: string) => {
    const enteredAmount = parseInt(value, 10);
    if (enteredAmount > 0) {
      updateUserAccount.mutate({
        customerPin,
        updated_at: new Date().toISOString(),
        balance: data.balance + enteredAmount,
      });
    }
  };

  const balanceHandler = () => {
    setShowBalance(true);
  };

  if (error) {
    setTimeout(() => {
      exitHandler();
    }, 5000);
  }

  return (
    <>
      <div className="atm-main-screen">
        <div className="left-section">
          <div className="side-section">
            {(!isEmptyPin && !error && !showBalance) && (
              <>
                <button onClick={() => false}>{""}</button>
                <PinButton type="string" handler={withDrawHandler} />
                <PinButton type="number" handler={depositHandler} />
              </>
            )}
          </div>
        </div>
        <div className="center-section">
          <CreditBanner brand={data.card_type as Company} />
          <div className="atm-container">
            {!isEmptyPin && !error ? (
              <UserScreen customer={data} showBalance={showBalance} />
            ) : (
              <>
                {error && (
                  <>
                    <span className="error-message">Apologies!</span>
                    <p>
                      <span className="error-message">
                        The service is not available
                      </span>
                    </p>
                    <p>
                      <span className="error-message">
                        Please check the pin you entered and try again later
                      </span>
                    </p>
                  </>
                )}
                {!error && (
                  <>
                    <span className="welcome">Welcome to the ATM</span>
                    <section className="check-pin-r">Enter PIN</section>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="right-section">
          <div className="side-section">
            {showBalance ? <button id="balance" onClick={() => setShowBalance(false)}>{""}</button> : 
            !isEmptyPin && !error ? (
              <>
                <button onClick={exitHandler}>{""}</button>
                <button onClick={balanceHandler}>{""}</button>
                <button onClick={() => false}>{""}</button>
              </>
            ) :
            (
              <PinButton type="password" handler={setCustomerPin} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
