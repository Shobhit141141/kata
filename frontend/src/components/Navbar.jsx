import { AiFillHome } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Group, Button, Loader, Avatar, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api/user";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar({ user, isLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    user: authUser,
    isLoading: isAuthLoading,
    isAuthenticated,
  } = useAuthContext();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      navigate("/login");
    },
  });
  const navLinks = [
    {
      to: "/login",
      label: "Login",
      show: !user,
      icon: <FaUserCheck className="mr-2 w-5 h-5" />,
    },
    {
      to: "/register",
      label: "Register",
      show: !user,
      icon: <FaUserPlus className="mr-2 w-5 h-5" />,
    },
  ];

  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between shadow">
      <Link
        to="/"
        className="text-xl font-bold tracking-wide flex items-center cursive"
      >
        {/* <img src="/logo.png" alt="" className="w-6 h-auto inline-block mr-2" /> */}
        <Text> Kata Sweets</Text>
      </Link>
      <Group>
        {isLoading ? <Loader size="xs" color="" /> : null}
        {navLinks
          .filter((l) => l.show)
          .map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant={location.pathname === link.to ? "filled" : "subtle"}
              color=""
            >
              {link.icon}
              {link.label}
            </Button>
          ))}
        {!isAuthLoading && isAuthenticated && authUser && (
          <div className=" flex flex-row items-center">
            <Avatar
              src=""
              alt={authUser.username}
              radius="xl"
              className="bg--400/50"
              color=""
            >
              {authUser.username.charAt(0).toUpperCase()}
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-semibold">@ {authUser.username}</p>
              <p className="text-xs">{authUser.email}</p>
            </div>
          </div>
        )}
        {user && (
          <Button
            color="red"
            variant="outline"
            onClick={() => {
              logoutMutation.mutate();
            }}
            loading={logoutMutation.isPending}
          >
            <FaPowerOff className="mr-2" />
            Logout
          </Button>
        )}
      </Group>
    </nav>
  );
}
