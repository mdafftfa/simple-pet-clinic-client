import { useEffect, useState } from "react";
import { Box, Heading, Flex, Text, SimpleGrid, Card, Spinner, Stack } from "@chakra-ui/react";
import { getPets } from "@/services/api";
import { getMyProfile } from "@/services/authService";
import { DataTable } from "@/components/layout/DataTable";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardPage() {

    const [pets, setPets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("Pet Owner");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [profileRes, petsRes] = await Promise.all([
                    getMyProfile(),
                    getPets()
                ]);

                if (profileRes.data.result?.fullName) {
                    setUserName(profileRes.data.result.fullName);
                }

                const petData = petsRes.data.result || petsRes.data || [];
                setPets(Array.isArray(petData) ? petData : []);
            } catch (err) {
                console.error("Gagal memuat data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Flex bg="gray.50" minH="100vh">
            <Sidebar />
            <Box p={8} flex={1}>
                <Box mb={8} p={6} bg="purple.600" borderRadius="2xl" color="white" shadow="lg">
                    <Heading size="3xl">Halo, {userName}!</Heading>
                    <Text fontSize="lg" opacity={0.9}>Kelola kesehatan dan data peliharaan Anda di sini.</Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={10}>
                    <StatCard title="Total Peliharaan" value={pets.length} color="purple" />
                    <StatCard title="Reservasi Aktif" value="0" color="blue" />
                    <StatCard title="Status Akun" value="Verified" color="green" />
                </SimpleGrid>

                <Box bg="white" p={8} borderRadius="2xl" shadow="sm" border="1px solid" borderColor="gray.100">
                    <Heading size="lg" mb={6}>Data Peliharaan</Heading>
                    {loading ? (
                        <Flex justify="center" p={10}><Spinner size="xl" /></Flex>
                    ) : (
                        <DataTable
                            data={pets}
                            columns={[
                                { label: "Nama Peliharaan", key: "petName" },
                                { label: "Spesies", key: "species" },
                                { label: "Riwayat Penyakit", key: "diseaseHistory" }
                            ]}
                        />
                    )}
                </Box>
            </Box>
        </Flex>
    );
}

const StatCard = ({ title, value, color }: { title: string, value: any, color: string }) => (
    <Card.Root p={6} shadow="sm" borderRadius="xl" borderTop="4px solid" borderColor={`${color}.500`}>
        <Stack gap={2}>
            <Text color="gray.500" fontWeight="medium">{title}</Text>
            <Heading size="2xl">{value}</Heading>
        </Stack>
    </Card.Root>
);