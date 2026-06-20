import { Button, VStack, Text, Box, Separator } from "@chakra-ui/react"; // Divider diganti Separator
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, CalendarDays, ShoppingBag, ReceiptText, User } from "lucide-react";

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Reservations", path: "/reservations", icon: <CalendarDays size={20} /> },
        { name: "Shop", path: "/shop", icon: <ShoppingBag size={20} /> },
        { name: "Transactions", path: "/transactions", icon: <ReceiptText size={20} /> },
        { name: "Profile", path: "/profile", icon: <User size={20} /> },
    ];

    return (
        <VStack p={6} borderRight="1px solid" borderColor="gray.200" h="100vh" w="260px" bg="white" align="stretch" shadow="sm">
            <Box mb={8} px={2}>
                <Text fontSize="2xl" fontWeight="bold" color="purple.600">Pet Clinic</Text>
            </Box>

            <VStack align="stretch" gap={2} flex={1}>
                {menuItems.map((item) => (
                    <Button
                        key={item.name}
                        variant={isActive(item.path) ? "solid" : "ghost"}
                        colorPalette={isActive(item.path) ? "purple" : "gray"} // colorScheme jadi colorPalette
                        justifyContent="flex-start"
                        onClick={() => navigate(item.path)}
                        size="lg"
                    >
                        {item.icon} {item.name}
                    </Button>
                ))}
            </VStack>

            <Separator my={4} /> {/* Divider jadi Separator */}

            <Button
                variant="ghost"
                colorPalette="red"
                justifyContent="flex-start"
                onClick={() => { localStorage.clear(); navigate("/login"); }}
                size="lg"
            >
                <LogOut size={20} /> Logout
            </Button>
        </VStack>
    );
};