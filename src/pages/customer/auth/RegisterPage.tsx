import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Text,
    VStack,
    Stack,
    Field,
    Link,
} from "@chakra-ui/react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerUser } from "@/services/authService";

const registerSchema = z.object({
    fullName: z.string().min(1, "Nama lengkap tidak boleh kosong"),
    email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
    password: z
        .string()
        .min(8, "Password minimal 8 karakter")
        .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf kapital")
        .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok dengan password utama",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setIsLoading(true);
        setApiError("");
        try {
            // Panggil API register
            // Catatan: Pastikan struktur object data sesuai dengan request DTO backend
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                role: "Customer"
            });

            alert("Registrasi Berhasil! Silakan login.");
            navigate("/login"); // Pindah ke halaman login
        } catch (err: any) {
            console.error(err);
            setApiError(err?.response?.data?.message || "Terjadi kegagalan saat mendaftar.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4} py={12}>
            {/* Box disesuaikan ukuran max-width profesional (maxW="md" / 440px) */}
            <Box w="full" maxW="md" bg="white" p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.200">

                {/* Header */}
                <VStack gap={1} mb={6} textAlign="center">
                    <Heading size="xl" fontWeight="bold" color="gray.900">Buat Akun Baru</Heading>
                    <Text fontSize="sm" color="gray.500">Mulai kelola sistem Anda secara efisien</Text>
                </VStack>

                {/* Form Pendaftaran */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={4}>
                        <Field.Root invalid={!!errors.fullName}>
                            <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Nama Lengkap</Field.Label>
                            <Input color={"black"} size="md" placeholder="Nama lengkap Anda" {...register("fullName")} />
                            <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.email}>
                            <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Alamat Email</Field.Label>
                            <Input color={"black"} size="md" type="email" placeholder="nama@gmail.com" {...register("email")} />
                            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.password}>
                            <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Password</Field.Label>
                            <Input color={"black"} size="md" type="password" placeholder="Minimal 8 karakter" {...register("password")} />
                            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.confirmPassword}>
                            <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Konfirmasi Password</Field.Label>
                            <Input color={"black"} size="md" type="password" placeholder="Ulangi password Anda" {...register("confirmPassword")} />
                            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
                        </Field.Root>

                        {apiError && (
                            <Box bg="red.50" border="1px" borderColor="red.200" borderRadius="md" p={3} mt={2}>
                                <Text fontSize="xs" color="red.600" fontWeight="medium">{apiError}</Text>
                            </Box>
                        )}

                        <Button colorPalette="purple" w="full" size="md" mt={4} type="submit" loading={isLoading}>
                            Daftar Sekarang
                        </Button>
                    </Stack>
                </form>
                <Text mt={6} fontSize="sm" textAlign="center" color="gray.500">
                    Sudah memiliki akun?{" "}
                    <Link asChild color="purple.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                        <RouterLink to="/login">Login di sini</RouterLink>
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
}