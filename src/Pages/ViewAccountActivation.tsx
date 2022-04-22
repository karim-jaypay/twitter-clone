import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActivateUserMutation } from "../redux/auth";

const ViewAccountActivation = () => {
  const navigate = useNavigate();
  // get token from params
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let activation_code = params.get("activation_code");

  const [activateUser, { data, error }] = useActivateUserMutation();

  const activate = async () => {
    const token = activation_code?.split("-X-X-")[0];
    const user_id = activation_code?.split("-X-X-")[1];
    await activateUser({
      user_id: user_id,
      token: activation_code ?? undefined,
    });
  };

  useEffect(() => {
    activate();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      {data && <div>Account Activated Successfully!</div>}
      {error?.data && <div>{error?.data}</div>}
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default ViewAccountActivation;
