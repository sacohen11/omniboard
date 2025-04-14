import React from 'react';
import { 
  Box, 
  Link as ChakraLink, 
  Text, 
  Heading, 
  Badge, 
  useToast, 
  VStack,
  HStack,
  Spacer
} from '@chakra-ui/react';

// Define the structure of the link prop
interface Link {
  id: number;
  title: string;
  url: string;
  type: string;
  category?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  click_count: number; // Added click_count
}

interface LinkCardProps {
  link: Link;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  const toast = useToast();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  const handleClick = async () => {
    // Open the link in a new tab immediately
    window.open(link.url, '_blank', 'noopener,noreferrer');

    // Then, try to increment the click count in the background
    try {
      const response = await fetch(`${apiBaseUrl}/api/links/${link.id}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required
          // 'Authorization': `Bearer ${your_token}` 
        },
      });

      if (!response.ok) {
        // Handle non-2xx responses if needed, but don't block user
        console.error(`Failed to increment click count for link ${link.id}. Status: ${response.status}`);
        // Optionally show a subtle error to the user, but maybe not necessary
        // toast({
        //   title: 'Error updating click count.',
        //   status: 'warning',
        //   duration: 3000,
        //   isClosable: true,
        // });
      }
      // No need to update state here, count updates on next page load/refresh

    } catch (error) {
      console.error('Error sending click count update:', error);
      // Handle fetch errors (e.g., network issues)
      // toast({
      //   title: 'Network error updating click count.',
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
    }
  };

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4} 
      boxShadow="md" 
      _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
      onClick={handleClick} // Make the whole card clickable
      bg="white" // Ensure background contrasts with text
      transition="box-shadow 0.2s ease-in-out"
    >
      <VStack align="start" spacing={2}>
        <HStack width="100%">
          <Heading size="md" noOfLines={1}>
             {link.title}
          </Heading>
          <Spacer />
          {link.category && <Badge colorScheme="blue">{link.category}</Badge>}
        </HStack>
        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {link.url}
        </Text>
        <HStack width="100%">
          <Text fontSize="xs" color="gray.500">
            Type: {link.type}
          </Text>
          <Spacer />
          <Text fontSize="sm" fontWeight="medium" color="purple.600">
             Views: {link.click_count ?? 0} {/* Display click count */}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LinkCard; 