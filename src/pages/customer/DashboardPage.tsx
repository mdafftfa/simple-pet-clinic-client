import { useEffect, useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { getPets } from "@/services/api";
import { DataTable } from "@/components/layout/DataTable";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardPage() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        getPets()
            .then((res) => setPets(res.data))
            .catch((err) => console.error("Gagal ambil data", err));
    }, []);

    return (
        <>
            <Flex>
                <Sidebar />
                <Box p={8} flex={1}>
                    <Heading mb={6}>Selamat Datang di Pet Clinic</Heading>
                    <DataTable data={pets} columns={["Nama", "Species"]} />
                </Box>
            </Flex>
        </>
    );
}