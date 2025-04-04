import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

const Dashboard = () => {
  const [extLinks, setExtLinks] = useState([]);
  const [intLinks, setIntLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linksRes = await axios.get('/api/links');
        
        // Organize links
        const external = linksRes.data.filter(link => link.type === 'external');
        const internal = linksRes.data.filter(link => link.type === 'internal');
        
        // Group internal links by category
        const groupedIntLinks = internal.reduce((acc, link) => {
          if (!acc[link.category]) {
            acc[link.category] = [];
          }
          acc[link.category].push(link);
          return acc;
        }, {});
        
        setExtLinks(external);
        setIntLinks(groupedIntLinks);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.xl" pt={10}>
        <Text>Loading dashboard data...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" pt={10}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" pt={5}>
      <Grid templateColumns={{ base: '1fr' }} gap={8}>
        <Box>
          <Box mb={8} p={6} bg={bgColor} borderRadius="lg" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
            <Heading size="lg" mb={6}>Omniboard Links</Heading>
            
            <Tabs variant="enclosed" mb={8}>
              <TabList>
                <Tab>External Links</Tab>
                <Tab>Internal Links</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={3} align="stretch">
                    {extLinks.map((link) => (
                      <Link 
                        key={link.id} 
                        href={link.url} 
                        target="_blank"
                        p={3} 
                        borderWidth="1px" 
                        borderRadius="md" 
                        borderColor={borderColor}
                        display="block"
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  {Object.entries(intLinks).map(([category, links]) => (
                    <Box key={category} mb={4}>
                      <Heading size="sm" mb={2}>{category}</Heading>
                      <VStack spacing={2} align="stretch">
                        {links.map((link) => (
                          <Link 
                            key={link.id} 
                            href={link.url} 
                            target="_blank"
                            p={2} 
                            borderWidth="1px" 
                            borderRadius="md" 
                            borderColor={borderColor}
                            display="block"
                            fontSize="sm"
                            _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </VStack>
                    </Box>
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};

export default Dashboard; 