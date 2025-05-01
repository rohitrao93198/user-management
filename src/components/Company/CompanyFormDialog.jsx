// src/components/Company/CompanyFormDialog.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

function CompanyFormDialog({ open, onClose, initialData, token }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        isActive: true,
        profileUrl: "",
        file: null,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                address: initialData.address,
                isActive: initialData.active,
                profileUrl: initialData.profileUrl,
                file: null,
                id: initialData.id,
            });
        } else {
            setFormData({
                name: "",
                address: "",
                isActive: true,
                profileUrl: "",
                file: null,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            file: e.target.files[0],
        }));
    };

    const uploadProfile = async () => {
        if (!formData.file) return formData.profileUrl;

        const body = new FormData();
        body.append("file", formData.file);

        const res = await fetch("http://192.168.12.43:8080/ems/api/upload", {
            method: "POST",
            body,
        });

        const data = await res.json();
        return data.data; // This is profileUrl
    };

    const handleSubmit = async () => {
        const profileUrl = await uploadProfile();

        const payload = {
            name: formData.name,
            address: formData.address,
            profileUrl,
        };

        const isEdit = !!formData.id;

        if (isEdit) {
            payload.id = formData.id;
            payload.isActive = formData.isActive;

            await fetch("http://192.168.12.43:8080/ems/api/company/registration", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch("http://192.168.12.43:8080/ems/api/company/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                body: JSON.stringify(payload),
            });
        }

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{initialData ? "Edit Company" : "Add Company"}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    margin="dense"
                />
                <input type="file" onChange={handleFileChange} style={{ margin: "16px 0" }} />

                {initialData && (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.isActive}
                                onChange={() =>
                                    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
                                }
                            />
                        }
                        label="Active"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {initialData ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CompanyFormDialog;
