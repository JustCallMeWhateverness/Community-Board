import { useNavigate } from "react-router-dom";
import Account from "./AccountModal";

AccountRoute.route = {
  path: "/account",
  menuLabel: "Account",
  index: 3,
};

export default function AccountRoute() {
  const navigate = useNavigate();

  return (
    <Account
      show={true}
      onHide={() => navigate("/")}
    />
  );
}

