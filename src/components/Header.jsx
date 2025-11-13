import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./User.jsx";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";
import { useSocket } from "../contexts/SocketIOContext.jsx";

export function Header() {
  const [token, setToken] = useAuth();
  const { socket } = useSocket();
  const handleLogout = () => {
    socket.disconnect();
    setToken(null);
  };
  const { sub } = token ? jwtDecode(token) : {};
  const userInfoQuery = useQuery({
    queryKey: ["users", sub],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  });
  const userInfo = userInfoQuery.data;
  if (token && userInfo) {
    return (
      <nav>
        Logged in as <User {...userInfo} />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </nav>
    );
  }
  return (
    <div>
      <Link to="/login">Log In</Link> |<Link to="/signup">Sign Up</Link>
    </div>
  );
}
