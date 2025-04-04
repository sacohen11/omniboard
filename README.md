# Omniboard

A comprehensive dashboard application for viewing and managing legislative documents and external resources.

## Architecture

### Frontend
- React with Vite
- Chakra UI for styling
- Chart.js for data visualization
- Keycloak for authentication

### Backend
- Python with Flask
- Flask Blueprints for API routes
- SQLAlchemy for database access
- Document transformation with BeautifulSoup

### Infrastructure
- Docker containers for all services
- NGINX for routing and serving
- PostgreSQL database
- Keycloak for authentication and authorization

## Features

- Dashboard of latest legislative resolutions and bills
- Document viewing with metadata
- External and internal link management
- Admin interface for managing links
- Authentication and role-based access control

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Running the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd omniboard
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Initialize the database (first time only):
   ```bash
   docker-compose exec backend flask db upgrade
   ```

4. Access the application:
   - Frontend: http://localhost
   - Keycloak Admin: http://localhost:8080/auth/admin

### Development

For development, you can use the following commands:

- Start services in development mode:
  ```bash
  docker-compose up
  ```

- Access logs:
  ```bash
  docker-compose logs -f frontend
  docker-compose logs -f backend
  ```

- Run backend tests:
  ```bash
  docker-compose exec backend pytest
  ```

## Admin Access

The default admin credentials are:

- Username: admin
- Password: admin

## License

This project is licensed under the MIT License - see the LICENSE file for details. 