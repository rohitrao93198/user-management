// src/components/Company/CompanyPage.jsx
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CompanyTable from "./CompanyTable";
import CompanyFormDialog from "./CompanyFormDialog";

function CompanyPage() {
    const [companies, setCompanies] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editData, setEditData] = useState(null);

    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

    const fetchCompanies = async () => {
        try {
            const response = await fetch("http://192.168.12.43:8080/ems/api/get/all/company", {
                headers: {
                    token,
                },
            });
            const result = await response.json();
            if (result.responseCode === 200) {
                setCompanies(result.data);
            }
        } catch (err) {
            console.error("Error fetching companies:", err);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleAddClick = () => {
        setEditData(null);
        setOpenDialog(true);
    };

    const handleEditClick = (company) => {
        setEditData(company);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditData(null);
        fetchCompanies();
    };

    return (
        <Box sx={{ marginLeft: "220px", p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Company Management
            </Typography>
            <Button variant="contained" onClick={handleAddClick} sx={{ mb: 2 }}>
                Add Company
            </Button>

            <CompanyTable companies={companies} onEdit={handleEditClick} />
            <CompanyFormDialog
                open={openDialog}
                onClose={handleDialogClose}
                initialData={editData}
                token={token}
            />
        </Box>
    );
}

export default CompanyPage;
