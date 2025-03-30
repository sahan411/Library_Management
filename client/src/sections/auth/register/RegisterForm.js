import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const RegisterForm = ({ registerUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    registerUser({ name, email, dob, phone, photoUrl, isAdmin, password });
  };

  return (
    <>
      <Stack spacing={3} sx={{ mb: 2 }}>
        <TextField
          name="name"
          label="Full Name"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name="email"
          label="Email Address"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="dob"
          label="Date of Birth"
          value={dob}
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setDob(event.target.value)}
        />
        <TextField
          name="phone"
          label="Phone Number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          name="photoUrl"
          label="Photo URL"
          value={photoUrl}
          required
          onChange={(event) => setPhotoUrl(event.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          required
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={isAdmin} onChange={(event) => setIsAdmin(event.target.checked)} />}
          label="Is Admin?"
        />
      </Stack>

      <Typography variant="body2" sx={{ mb: 5, mt: 3 }} textAlign="center">
        Already have an account? {''}
        <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>Sign in</Link>
      </Typography>

      <LoadingButton
        sx={{ mt: 4 }}
        fullWidth
        size="large"
        type="button"
        variant="contained"
        onClick={handleSubmit}
      >
        Register
      </LoadingButton>
    </>
  );
};

RegisterForm.propTypes = {
  registerUser: PropTypes.func,
};

export default RegisterForm;
