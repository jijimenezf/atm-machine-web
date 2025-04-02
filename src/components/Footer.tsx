import sticker from "../assets/sticker_graf.png";
import mark from "../assets/systems.png";

export default function Footer() {
  return (
    <div className="footer">
      <img
        style={{ zIndex: "1", marginTop: "-15px", paddingRight: "75px" }}
        src={sticker}
        alt=""
      />
      <img
        style={{ paddingTop: "10px", paddingRight: "75px" }}
        src={mark}
        alt=""
        width="50px"
        height="10px"
      />
    </div>
  );
}
