import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({
  children,
  authentication = true,
}: {
  children: any;
  authentication: boolean;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state: any) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  // if loading then show loading if not then load the childrens passed to the protected component
  return loading ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
