import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <VStack p={4} borderRight="1px solid #ccc" h="100vh" w="200px">
            <Button w="full" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button w="full" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</Button>
        </VStack>
    );
};