import { FormEvent, useRef, useState } from "react";
import Modal from "./Modal";

type ButtonProps = {
  type: string;
  handler: (currentValue: string) => void;
};

function PinButton({ type, handler }: ButtonProps) {
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    const enterPin = formValues.get("customerInput") as string;
    handler(enterPin);
    if (ref.current) {
      ref.current.value = "";
    }
    setModal(false);
  };

  return (
    <>
      <button onClick={() => setModal(true)}>{""}</button>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <form onSubmit={handleSubmit}>
          <input
            name="customerInput"
            type={type}
            maxLength={4}
            pattern="[0-9]+"
            placeholder=""
            ref={ref}
          />
          <div className="center">
            <button onClick={() => setModal(false)}>Cancel</button>
            <button type="submit" style={{ marginTop: "15px" }}>
              OK
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PinButton;
