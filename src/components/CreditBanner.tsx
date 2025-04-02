import credit from "../assets/creditcard_sprite.png";

export type Company =
  | "star"
  | "pulse"
  | "maestro"
  | "mastercard"
  | "plus"
  | "visa"
  | "";

export default function CreditBanner({ brand }: { brand: Company }) {
  return (
    <div className="icons">
      <img
        className={brand === "star" ? "star" : "star-inactive"}
        src={credit}
        alt=""
      />
      <img
        className={brand === "pulse" ? "pulse" : "pulse-inactive"}
        src={credit}
        alt=""
      />
      <img
        className={brand === "maestro" ? "maestro" : "maestro-inactive"}
        src={credit}
        alt=""
      />
      <img
        className={
          brand === "mastercard" ? "mastercard" : "mastercard-inactive"
        }
        src={credit}
        alt=""
      />
      <img
        className={brand === "plus" ? "plus" : "plus-inactive"}
        src={credit}
        alt=""
      />
      <img
        className={brand === "visa" ? "visa" : "visa-inactive"}
        src={credit}
        alt=""
      />
    </div>
  );
}
