import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../../../components/ui/color-mode.tsx";
import {login} from "@/services/authService.ts";

export default function LoginPage() {
    const [loginType, setLoginType] = useState<'customer' | 'staff'>('customer');

    const bgBody = useColorModeValue("gray.50", "gray.900");
    const bgForm = useColorModeValue("white", "gray.800");
    const textSubtitle = useColorModeValue("gray.500", "gray.400");
    const bgToggleContainer = useColorModeValue("gray.100", "gray.700");
    const textLabel = useColorModeValue("gray.700", "gray.300");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");

            const response = await login({ email, password });

            localStorage.setItem("token", response.data.result.token);

            alert("Login Berhasil!");
            window.location.href = "/dashboard"; // Redirect ke dashboard
        } catch (error) {
            alert("Login Gagal: Periksa email atau password Anda.");
        }
    };


    return (
        <Flex minH="100vh" align="center" justify="center" bg={bgBody} p={6}>
            <Box
                w="full"
                maxW="lg" // Diubah dari md ke lg agar lebih lebar
                bg={bgForm}
                p={10} // Padding lebih besar agar form terlihat lebih lega
                borderRadius="2xl" // Border radius lebih bulat agar terlihat modern
                boxShadow="xl" // Shadow lebih tebal
            >
                <VStack gap={4} mb={10} textAlign="center">
                    <Heading size="3xl" color="purple.500">Pet Clinic</Heading>
                    <Text fontSize="lg" color={textSubtitle}>Silakan login untuk mengakses akun Anda</Text>
                </VStack>

                <Flex bg={bgToggleContainer} p={1.5} borderRadius="xl" mb={8}>
                    {/* Button juga bisa kita tambahkan size lg */}
                    <Button
                        size="lg"
                        flex={1}
                        variant={loginType === 'customer' ? 'solid' : 'ghost'}
                        colorScheme={loginType === 'customer' ? 'purple' : 'gray'}
                        onClick={() => setLoginType('customer')}
                    >
                        Customer
                    </Button>
                    <Button
                        size="lg"
                        flex={1}
                        variant={loginType === 'staff' ? 'solid' : 'ghost'}
                        colorScheme={loginType === 'staff' ? 'purple' : 'gray'}
                        onClick={() => setLoginType('staff')}
                    >
                        Staff Clinic
                    </Button>
                </Flex>

                <form onSubmit={handleLogin}>
                    <VStack gap={6}> {/* Gap antar input lebih lebar */}
                        <Box w="full">
                            <Text mb={3} fontSize="md" fontWeight="bold" color={textLabel}>
                                Email
                            </Text>
                            <Input
                                name="email"
                                size="lg" // Membuat input lebih tinggi dan teks lebih besar
                                type="email"
                                placeholder={`Masukkan email ${loginType} Anda`}
                            />
                        </Box>

                        <Box w="full">
                            <Text mb={3} fontSize="md" fontWeight="bold" color={textLabel}>
                                Password
                            </Text>
                            <Input
                                name="password"
                                size="lg" // Membuat input lebih tinggi
                                type="password"
                                placeholder="Masukkan password Anda"
                            />
                        </Box>

                        <Button
                            type="submit"
                            colorScheme="purple"
                            w="full"
                            size="xl" // Ukuran tombol paling besar
                            mt={6}
                        >
                            Masuk sebagai {loginType === 'customer' ? 'Customer' : 'Staff'}
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}