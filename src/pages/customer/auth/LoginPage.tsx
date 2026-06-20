import { Box, Button, Flex, Heading, Input, Text, VStack, Stack, Field, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { login } from "@/services/authService.ts";

export default function LoginPage() {
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const response = await login({ email, password });

            localStorage.setItem("token", response.data.result.token);
            localStorage.setItem("role", response.data.result.roles[0]);

            window.location.href = "/dashboard";
        } catch (error) {
            alert("Login Gagal: Periksa email atau password Anda.");
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4} py={12}>
            {/* Box menggunakan styling yang persis sama dengan RegisterPage */}
            <Box
                w="full"
                maxW="md"
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="xl"
                boxShadow="sm"
                border="1px"
                borderColor="gray.200"
            >
                {/* Header */}
                <VStack gap={1} mb={6} textAlign="center">
                    <Heading size="xl" fontWeight="bold" color="gray.900">Selamat Datang</Heading>
                    <Text fontSize="sm" color="gray.500">Masukkan kredensial Anda untuk melanjutkan</Text>
                </VStack>

                {/* Form Login */}
                <form onSubmit={handleLogin}>
                    <Stack gap={4}>
                        <Field.Root>
                            <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Email Address</Field.Label>
                            <Input name="email" size="md" color={"black"} type="email" placeholder="nama@gmail.com" />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Password</Field.Label>
                            <Input name="password" size="md" color={"black"} type="password" placeholder="••••••••" />
                        </Field.Root>

                        <Button
                            type="submit"
                            colorPalette="purple"
                            w="full"
                            size="md"
                            mt={4}
                        >
                            Sign In
                        </Button>
                    </Stack>
                </form>

                <Text mt={6} fontSize="sm" textAlign="center" color="gray.500">
                    Belum punya akun? {" "}
                    <Link asChild color="purple.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                        <RouterLink to="/register">Daftar di sini</RouterLink>
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
}