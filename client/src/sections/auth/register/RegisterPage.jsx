import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Logo from "../../../components/logo";
import RegisterForm from "./RegisterForm";

// ----------------------------------------------------------------------
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.isAdmin ? "/dashboard" : "/books"} replace />;
  }

  const registerUser = (userData) => {
    const { name, email, dob, phone, photoUrl, isAdmin, password } = userData;
    if (!name || !email || !photoUrl || !password) {
      toast.error("Please fill all required fields!");
    } else {
      axios.post(`${baseUrl}/api/auth/register`, userData)
        .then((response) => {
          if (response.status === 201) {
            toast.success("User registered successfully!");
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Something went wrong!");
        });
    }
  };

  return (
    <>
      <Helmet>
        <title> Register | Library</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 }
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" sx={{ color: "#666666", fontWeight: "600" }} textAlign="center" gutterBottom>
              Library System
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom>
              Sign Up
            </Typography>

            <RegisterForm registerUser={registerUser} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
