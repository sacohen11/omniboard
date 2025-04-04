import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = ({ keycloak }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // With mock auth, always redirect since we're always authenticated
    navigate('/');
  }, [navigate]);

  const handleLogin = () => {
    // Just for UI, real login is bypassed
    navigate('/');
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.md" py={10}>
      <Flex minH="50vh" align="center" justify="center">
        <Box 
          p={8} 
          width="full" 
          maxW="md" 
          borderWidth={1} 
          borderRadius={8} 
          boxShadow="lg"
          bg={bgColor}
          borderColor={borderColor}
        >
          <VStack spacing={4} align="center">
            <Heading size="lg">Welcome to Omniboard</Heading>
            <Text>Authentication has been bypassed</Text>
            <Button 
              mt={4}
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={handleLogin}
            >
              Enter Dashboard
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login; 