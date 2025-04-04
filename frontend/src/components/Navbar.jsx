import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useColorMode,
  Image,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';

const Navbar = ({ login, logout, userRoles = [] }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAdmin = userRoles.includes('admin');

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      position="fixed"
      w="100%"
      zIndex={100}
      boxShadow="md"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Link as={RouterLink} to="/">
              <Flex alignItems="center">
                <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('blue.600', 'blue.200')}>
                  The Omniboard
                </Text>
              </Flex>
            </Link>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" px={2} py={1} rounded={'md'}>
              Dashboard
            </Link>
            <Link as={RouterLink} to="/admin/links" px={2} py={1} rounded={'md'}>
              Manage Links
            </Link>
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <IconButton
            mr={4}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label={'Toggle Color Mode'}
          />

          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <HamburgerIcon boxSize={6} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/">
                Dashboard
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/links">
                Manage Links
              </MenuItem>
              <MenuItem onClick={logout}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 