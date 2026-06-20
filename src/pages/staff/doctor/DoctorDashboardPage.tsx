import { useEffect, useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { getPets } from "@/services/api";
import { DataTable } from "@/components/layout/DataTable";

export default function DoctorDashboardPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getPets().then(res => setData(res.data)).catch(() => alert("Gagal konek API"));
    }, []);

    return (
        <Box p={8}>
            <Heading mb={6}>Panel Dokter</Heading>
            <DataTable data={data} columns={["Nama", "Species"]} />
            <Button mt={4} onClick={() => { localStorage.clear(); window.location.href="/login"; }}>Logout</Button>
        </Box>
    );
}