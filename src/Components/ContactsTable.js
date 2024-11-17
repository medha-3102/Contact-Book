import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TableSortLabel,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import axios from "axios";

const ContactsTable = ({ fetchContacts, contacts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const getComparableValue = (contact, field) => {
    const value = contact[field];
    return value ? value.toString().toLowerCase() : "";
  };

  const sortContacts = (contactsArray) => {
    const stabilizedThis = contactsArray.map((el, index) => [el, index]);
    
    stabilizedThis.sort((a, b) => {
      const valueA = getComparableValue(a[0], orderBy);
      const valueB = getComparableValue(b[0], orderBy);

      if (valueA === valueB) {
        return a[1] - b[1];
      }

      const comparison = valueA < valueB ? -1 : 1;
      return order === "asc" ? comparison : -comparison;
    });

    return stabilizedThis.map((el) => el[0]);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (mode, contact = null) => {
    setDialogMode(mode);
    setContactData(
      mode === "edit"
        ? contact
        : {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            jobTitle: "",
          }
    );
    setEditingContact(contact);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setContactData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const validateContactData = (data) => {
    // Required fields check
    const requiredFields = ["firstName", "lastName", "email", "phone", "company", "jobTitle"];
    for (const field of requiredFields) {
      if (!data[field]?.trim()) {
        return {
          isValid: false,
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        };
      }
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(data.email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address",
      };
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      return {
        isValid: false,
        message: "Please enter a valid 10-digit phone number",
      };
    }

    // Check for duplicates
    const duplicateContact = contacts.find(
      (contact) =>
        contact._id !== editingContact?._id && (
          contact.email.toLowerCase() === data.email.toLowerCase() ||
          contact.phone === data.phone ||
          (contact.firstName.toLowerCase() === data.firstName.toLowerCase() &&
           contact.lastName.toLowerCase() === data.lastName.toLowerCase())
        )
    );

    if (duplicateContact) {
      return {
        isValid: false,
        message: "This email, phone number, or full name is already in use",
      };
    }

    return { isValid: true };
  };

  const handleSaveContact = async () => {
    try {
      const validationResult = validateContactData(contactData);
      if (!validationResult.isValid) {
        setSnackbarMessage(validationResult.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      if (dialogMode === "create") {
        await axios.post("http://localhost:5000/contacts", contactData);
      } else {
        await axios.put(
          `http://localhost:5000/contacts/${editingContact._id}`,
          contactData
        );
      }
      
      fetchContacts();
      handleCloseDialog();
      setSnackbarMessage(
        `Contact ${dialogMode === "create" ? "created" : "updated"} successfully!`
      );
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving contact:", error);
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts();
      setSnackbarMessage("Contact deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting contact:", error);
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const headers = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Company", field: "company" },
    { label: "Job Title", field: "jobTitle" },
  ];

  // Mobile Card Component
  const ContactCard = ({ contact }) => (
    <Card 
      sx={{ 
        mb: 2,
        boxShadow: 2,
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {contact.firstName} {contact.lastName}
            </Typography>
            <Box>
              <IconButton 
                onClick={() => handleOpenDialog("edit", contact)} 
                color="primary"
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleDelete(contact._id)} 
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Divider />
          
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon color="action" fontSize="small" />
              <Typography variant="body2">{contact.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon color="action" fontSize="small" />
              <Typography variant="body2">{contact.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon color="action" fontSize="small" />
              <Typography variant="body2">{contact.company}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WorkIcon color="action" fontSize="small" />
              <Typography variant="body2">{contact.jobTitle}</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 500,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
         display: { xs: 'none', sm: 'block' },
          }}
        >
          Contacts List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("create")}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
          }}
        >
          Create New Contact
        </Button>
      </Box>

      {/* Content */}
      {contacts.length === 0 ? (
    // No data available case
    <Typography 
      variant="h6" 
      sx={{ 
        textAlign: 'center', 
        color: 'text.secondary', 
        mt: 4 
      }}
    >
      No contact is added.
    </Typography>
  ) : (
  <>
      {isMobile ? (
        // Mobile Card View
        <Box>
          {sortContacts(contacts)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((contact) => (
              <ContactCard key={contact._id} contact={contact} />
            ))}
        </Box>
      ) : (
        // Desktop View
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2,
            boxShadow: 2,
            mb: 2,
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                {headers.map((header) => (
                  <TableCell 
                    key={header.field}
                    sx={{ color: 'white', fontWeight: 500 }}
                  >
                    <TableSortLabel
                      active={orderBy === header.field}
                      direction={orderBy === header.field ? order : "asc"}
                      onClick={() => handleRequestSort(header.field)}
                      sx={{
                        '&.MuiTableSortLabel-root': {
                          color: 'white',
                        },
                        '&.MuiTableSortLabel-root:hover': {
                          color: 'white',
                        },
                        '&.MuiTableSortLabel-root.Mui-active': {
                          color: 'white',
                        },
                        '& .MuiTableSortLabel-icon': {
                          color: 'white !important',
                        },
                      }}
                    >
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ color: 'white', fontWeight: 500 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortContacts(contacts)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <TableRow
                    key={contact._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {headers.map((header) => (
                      <TableCell key={header.field}>
                        {contact[header.field]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog("edit", contact)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(contact._id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </>
  )}

      {/* Contact Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "create" ? "Create New Contact" : "Edit Contact"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={contactData.firstName}
                onChange={handleContactChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={contactData.lastName}
                onChange={handleContactChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                value={contactData.email}
                onChange={handleContactChange}
                fullWidth
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Phone"
                value={contactData.phone}
                onChange={handleContactChange}
                fullWidth
                required
                type="tel"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="company"
                label="Company *"
                value={contactData.company}
                onChange={handleContactChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobTitle"
                label="Job Title *"
                value={contactData.jobTitle}
                onChange={handleContactChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveContact} color="primary">
            {dialogMode === "create" ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactsTable;
