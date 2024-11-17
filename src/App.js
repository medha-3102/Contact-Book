import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CssBaseline } from "@mui/material";
import ContactsTable from "./Components/ContactsTable";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d32f2f", 
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      color: "#1976d2", 
      fontSize: "2rem", 
      textAlign: "center",
    },
    body1: {
      fontWeight: 400,
      color: "#333", 
      fontSize: "1rem", 
      textAlign: "center",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", 
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: "8px", 
        },
      },
    },
  },
});

const App = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/contacts");
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
   
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Project Name */}
          <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", sm: "2rem" } }}>
            Contact Book
          </Typography>
          {/* Quote */}
          <Typography
            variant="body1"
            sx={{
              marginTop: "1rem",
              fontStyle: "italic",
              color: "#555",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            "Manage your contacts with ease"
          </Typography>
        </Box>

        {/* Contacts Table */}
        <ContactsTable fetchContacts={fetchContacts} contacts={contacts} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
