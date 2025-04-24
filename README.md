# Omniboard

A test dashboard/repository application for viewing and managing links to documents and external resources.

## Architecture

### Frontend
- React with Vite
- Keycloak for authentication (IN DEVELOPMENT)

### Backend
- Python with Flask
- Flask Blueprints for API routes
- SQLAlchemy for database access

### Infrastructure
- Docker containers for all services
- NGINX for routing and serving
- PostgreSQL database
- Keycloak for authentication and authorization (IN DEVELOPMENT)

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