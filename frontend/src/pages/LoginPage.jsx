import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/user";
import {
  Button,
  TextInput,
  Paper,
  Title,
  Tooltip,
  ActionIcon,
  CopyButton,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { LuCopy, LuCopyCheck, LuEye, LuEyeClosed } from "react-icons/lu";
import SEO from "./SEO";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { refetch } = useAuthContext();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      refetch();
      toast.success("Login successful");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.message || "Login failed");
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutation.mutate(form);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <SEO title="Login Page" description="Login to your account" />
      <Paper className="max-w-md w-full p-8" shadow="md" radius="md" withBorder>
        <Title
          order={2}
          className="mb-6 text-center"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          Login
        </Title>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
            styles={{
              input: { fontFamily: "Josefin Sans, sans-serif" },
              label: { fontFamily: "Josefin Sans, sans-serif" },
            }}
          />
          <TextInput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
            rightSection={
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <LuEyeClosed size={18} /> : <LuEye size={18} />}
              </div>
            }
            styles={{
              input: { fontFamily: "Josefin Sans, sans-serif" },
              label: { fontFamily: "Josefin Sans, sans-serif" },
            }}
          />

          {/*  */}

          <Button
            type="submit"
            fullWidth
            loading={mutation.isPending}
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Login
          </Button>
          <Divider label="or" labelPosition="center" mt="lg" />
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              setForm({ email: "admin@kata.io", password: "Admin123@" });
              mutation.mutate({ email: "admin@kata.io", password: "Admin123@" });
            }}
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Login as Admin
          </Button>
          <p className="text-sm text-gray-500 text-center">for testing purposes</p>
        </form>
      </Paper>
    </div>
  );
}
