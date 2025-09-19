import { AiFillHome } from "react-icons/ai";
import { FaCookie, FaPowerOff } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Group, Button, Loader, Avatar, Text, Tooltip } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api/user";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    user: authUser,
    isLoading: isAuthLoading,
    isAuthenticated,
    isAdmin,
    tokens,
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
      show: !isAuthLoading && !isAuthenticated,
      icon: <FaUserCheck className="mr-2 w-5 h-5" />,
    },
    {
      to: "/register",
      label: "Register",
      show: !isAuthLoading && !isAuthenticated,
      icon: <FaUserPlus className="mr-2 w-5 h-5" />,
    },
    {
      to: "/sweets",
      label: "Sweets",
      show: isAuthenticated,
      icon: <AiFillHome className="mr-2 w-5 h-5" />,
    },
    {
      to: "/inventory",
      label: "Inventory",
      show: isAuthenticated && isAdmin,
      icon: <AiFillHome className="mr-2 w-5 h-5" />,
    },
    {
      to: "/add-sweet",
      label: "Add Sweet",
      show: isAuthenticated && isAdmin,
      icon: <MdOutlineAddCircle className="mr-2 w-5 h-5" />,
    },
  ];

  return (
    <nav className="w-full fixed h-16 px-6 py-3 flex items-center justify-between backdrop-blur-md shadow-md z-50 josefin bg-white">
      <Link
        to="/"
        className="text-xl font-bold tracking-wide flex items-center cursive"
      >
        {/* <img src="/logo.png" alt="" className="w-6 h-auto inline-block mr-2" /> */}
        <p> Kata Sweets</p>
      </Link>
      <Group>
        {navLinks
          .filter((l) => l.show)
          .map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant={location.pathname === link.to ? "filled" : "light"}
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
              variant="light"
              color="orange"
            >
              <p className=""> {authUser.username.charAt(0).toUpperCase()}</p>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-semibold">@ {authUser.username}</p>
              <p className="text-xs">{authUser.email}</p>
            </div>
            <Tooltip
              label={`${tokens} Tokens | 1 token = ₹ 100`}
              
              withArrow
              multiline
            >
              <div className="ml-4 flex items-center bg-pink-200 rounded-md px-3 gap-1 py-2 text-pink-600 cursor-pointer">
                <FaCookie />
                <p className="text-sm font-semibold">{tokens}</p>
              </div>
            </Tooltip>
          </div>
        )}
        {authUser && (
          <Button
            color="red.7"
            variant="filled"
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
