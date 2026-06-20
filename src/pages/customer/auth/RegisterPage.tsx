import { Box, Button, Flex, Heading, Input, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useColorModeValue } from "../../../components/ui/color-mode.tsx";

export default function RegisterPage() {
    const bgBody = useColorModeValue("gray.50", "gray.900");
    const bgForm = useColorModeValue("white", "gray.800");
    const textSubtitle = useColorModeValue("gray.500", "gray.400");
    const textLabel = useColorModeValue("gray.700", "gray.300");

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Proses registrasi...");
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg={bgBody} p={6}>
            <Box w="full" maxW="lg" bg={bgForm} p={10} borderRadius="2xl" boxShadow="xl">
                <VStack gap={4} mb={8} textAlign="center">
                    <Heading size="3xl" color="purple.500">Daftar Akun</Heading>
                    <Text fontSize="lg" color={textSubtitle}>Buat akun baru untuk memulai</Text>
                </VStack>

                <form onSubmit={handleRegister}>
                    <VStack gap={6}>
                        <Box w="full">
                            <Text mb={3} fontSize="md" fontWeight="bold" color={textLabel}>Nama Lengkap</Text>
                            <Input size="lg" type="text" placeholder="Masukkan nama lengkap" />
                        </Box>
                        <Box w="full">
                            <Text mb={3} fontSize="md" fontWeight="bold" color={textLabel}>Email</Text>
                            <Input size="lg" type="email" placeholder="Masukkan email" />
                        </Box>
                        <Box w="full">
                            <Text mb={3} fontSize="md" fontWeight="bold" color={textLabel}>Password</Text>
                            <Input size="lg" type="password" placeholder="Buat password" />
                        </Box>
                        <Button type="submit" colorScheme="purple" w="full" size="xl" mt={4}>
                            Daftar Sekarang
                        </Button>
                    </VStack>
                </form>

                <Text mt={6} textAlign="center" color={textSubtitle}>
                    Sudah punya akun?{" "}
                    {/* Menggunakan RouterLink sebagai children dari ChakraLink agar aman */}
                    <ChakraLink color="purple.500" fontWeight="bold">
                        <RouterLink to="/login">Login di sini</RouterLink>
                    </ChakraLink>
                </Text>
            </Box>
        </Flex>
    );
}