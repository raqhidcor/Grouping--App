import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { addEmployee } from "../../services/company";

export default function NewEmployee({ user, company, onSubmitSuccess }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiringDate, setHiringDate] = useState("");
  const [role, setRole] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === true) {
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setHiringDate("");
      setRole("");
      onSubmitSuccess();
    }
  }, [status, onSubmitSuccess]);

  function timer() {
    setTimeout(() => {
      setStatus("");
      handleClose();
    }, 2000);
  }

  async function handleSubmit() {
    const newEmployee = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      hiringDate: hiringDate,
      role: role,
      jobTitle: jobTitle,
    };
    const response = await addEmployee(newEmployee, company._id);
    setStatus(response.status);
    setError(response.errorMessage);
    if (response.status === true) {
      onSubmitSuccess();
      timer();
    }
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" variant="outlined" onClick={handleClickOpen}>
        New Employee
      </Button>
      <form>
        <Dialog open={open} onClose={handleClose} maxWidth="xs">
          <DialogTitle>New Employee Information:</DialogTitle>
          <DialogContent>
            <TextField
              color="secondary"
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="hiringDate"
              name="hiringDate"
              label="Hiring Date"
              type="date"
              fullWidth
              variant="standard"
              value={hiringDate}
              InputLabelProps={{ shrink: true }}
              onChange={(event) => setHiringDate(event.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="role"
              name="role"
              label="Role"
              type="text"
              fullWidth
              select
              variant="standard"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <MenuItem value={"Employee"}>Employee</MenuItem>
              <MenuItem value={"Boss"}>Boss</MenuItem>
            </TextField>
            <TextField
              color="secondary"
              margin="dense"
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              type="text"
              fullWidth
              variant="standard"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleSubmit}>Save</Button>
          </DialogActions>
          {status === true && (
            <Alert severity="success">Employee created succesfully!</Alert>
          )}
          {status === false && <Alert severity="error">{error}</Alert>}
        </Dialog>
      </form>
    </div>
  );
}
