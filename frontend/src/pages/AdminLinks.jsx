import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Button,
  Heading,
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  VStack,
  HStack,
  Switch,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { 
  AddIcon, 
  EditIcon, 
  DeleteIcon, 
  CheckIcon, 
  CloseIcon,
  LinkIcon,
} from '@chakra-ui/icons';
import axios from 'axios';

const AdminLinks = ({ keycloak }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'external',
    category: '',
    active: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDeleteOpen, 
    onOpen: onDeleteOpen, 
    onClose: onDeleteClose 
  } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const token = keycloak.token;
      const response = await axios.get('/api/admin/links', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching links:', err);
      setError('Failed to fetch links. Please try again later.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the error for this field as the user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSwitchChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      active: checked
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.url.trim()) {
      errors.url = 'URL is required';
    } else if (!/^(https?:\/\/)/.test(formData.url)) {
      errors.url = 'URL must start with http:// or https://';
    }
    if (formData.type === 'internal' && !formData.category.trim()) {
      errors.category = 'Category is required for internal links';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const token = keycloak.token;
    try {
      let response;
      
      if (editingId) {
        // Update existing link
        response = await axios.put(`/api/admin/links/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        toast({
          title: 'Link updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new link
        response = await axios.post('/api/admin/links', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        toast({
          title: 'Link created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      // Reset form and refresh links
      setFormData({
        title: '',
        url: '',
        type: 'external',
        category: '',
        active: true
      });
      setEditingId(null);
      onClose();
      fetchLinks();
      
    } catch (err) {
      console.error('Error saving link:', err);
      toast({
        title: 'Error',
        description: 'Failed to save link. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (link) => {
    setFormData({
      title: link.title,
      url: link.url,
      type: link.type,
      category: link.category || '',
      active: link.active
    });
    setEditingId(link.id);
    onOpen();
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    try {
      const token = keycloak.token;
      await axios.delete(`/api/admin/links/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      toast({
        title: 'Link deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setDeletingId(null);
      onDeleteClose();
      fetchLinks();
    } catch (err) {
      console.error('Error deleting link:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete link. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeleteModal = (id) => {
    setDeletingId(id);
    onDeleteOpen();
  };

  const openAddModal = () => {
    setFormData({
      title: '',
      url: '',
      type: 'external',
      category: '',
      active: true
    });
    setEditingId(null);
    setFormErrors({});
    onOpen();
  };

  if (loading) {
    return (
      <Container maxW="container.lg" py={10} centerContent>
        <Spinner size="xl" />
        <Text mt={4}>Loading links...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={10}>
        <Alert status="error" mb={5}>
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={6}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">Manage Links</Heading>
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="blue" 
            onClick={openAddModal}
          >
            Add New Link
          </Button>
        </Flex>
        <Text mt={2} color="gray.500">
          Add, edit, or remove links that appear on the dashboard.
        </Text>
      </Box>

      <Box 
        p={6} 
        bg={bgColor} 
        borderRadius="lg" 
        boxShadow="md" 
        borderWidth="1px" 
        borderColor={borderColor}
        overflowX="auto"
      >
        {links.length === 0 ? (
          <Box textAlign="center" py={10}>
            <LinkIcon boxSize={10} color="gray.300" mb={4} />
            <Text color="gray.500">No links available. Add your first link to get started.</Text>
          </Box>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>URL</Th>
                <Th>Type</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {links.map((link) => (
                <Tr key={link.id}>
                  <Td fontWeight="medium">{link.title}</Td>
                  <Td>
                    <Text noOfLines={1} maxW="200px">
                      {link.url}
                    </Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={link.type === 'external' ? 'blue' : 'purple'}>
                      {link.type}
                    </Badge>
                  </Td>
                  <Td>{link.category || '-'}</Td>
                  <Td>
                    <Badge colorScheme={link.active ? 'green' : 'red'}>
                      {link.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit link"
                        size="sm"
                        onClick={() => handleEdit(link)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete link"
                        size="sm"
                        colorScheme="red"
                        onClick={() => openDeleteModal(link.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Add/Edit Link Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingId ? 'Edit Link' : 'Add New Link'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={formErrors.title}>
                <FormLabel>Title</FormLabel>
                <Input 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Link Title"
                />
                <FormErrorMessage>{formErrors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formErrors.url}>
                <FormLabel>URL</FormLabel>
                <Input 
                  name="url" 
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
                <FormErrorMessage>{formErrors.url}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select 
                  name="type" 
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="external">External</option>
                  <option value="internal">Internal</option>
                </Select>
              </FormControl>

              {formData.type === 'internal' && (
                <FormControl isInvalid={formErrors.category}>
                  <FormLabel>Category</FormLabel>
                  <Input 
                    name="category" 
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., MITRE, Gaming, Science"
                  />
                  <FormErrorMessage>{formErrors.category}</FormErrorMessage>
                </FormControl>
              )}

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="active-switch" mb="0">
                  Active
                </FormLabel>
                <Switch 
                  id="active-switch" 
                  isChecked={formData.active}
                  onChange={handleSwitchChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {editingId ? 'Update' : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this link? This action cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminLinks; 