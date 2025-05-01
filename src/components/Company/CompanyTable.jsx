// src/components/Company/CompanyTable.jsx
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
} from "@mui/material";

function CompanyTable({ companies, onEdit }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company) => (
                        <TableRow key={company.id}>
                            <TableCell>
                                <Avatar src={company.profileUrl} alt={company.name} />
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.address}</TableCell>
                            <TableCell>{company.active ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(company)} variant="outlined" size="small">
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CompanyTable;
