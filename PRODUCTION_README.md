# Help Desk Application

A production-ready Spring Boot application for managing support tickets with AI-powered assistance using Spring AI and Groq API.

## Features

- **Ticket Management**: Create, read, update, and delete support tickets
- **AI-Powered Assistance**: Get AI-generated solutions for issues using the Groq API
- **Text Summarization**: Automatically summarize support tickets
- **RESTful API**: Clean and well-documented REST endpoints
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Global exception handler for consistent error responses
- **Logging**: Production-grade logging with SLF4J
- **Database**: MySQL with JPA/Hibernate ORM
- **Docker Support**: Docker and Docker Compose for easy deployment

## Tech Stack

- **Java 17**
- **Spring Boot 3.5.13**
- **Spring Data JPA**
- **Spring AI 1.1.3**
- **MySQL 8.0**
- **Lombok**
- **Maven**
- **Docker**

## Prerequisites

- JDK 17 or higher
- Maven 3.8+
- MySQL 8.0+
- Docker and Docker Compose (optional)
- Groq API Key (get from https://groq.com)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HelpDeskApplication
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory or set system environment variables:

```env
# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/help_desk
DB_USERNAME=root
DB_PASSWORD=your_secure_password
DB_DDL_AUTO=update

# AI Configuration
OPENAI_API_KEY=your_groq_api_key
OPENAI_BASE_URL=https://api.groq.com/openai
OPENAI_MODEL=mixtral-8x7b-32768
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=1000

# Server Configuration
SERVER_PORT=8080
LOG_LEVEL=INFO
SHOW_SQL=false
```

### 3. Build the Application

```bash
mvn clean package
```

### 4. Run the Application

**Using Maven:**
```bash
mvn spring-boot:run
```

**Using Docker Compose:**
```bash
docker-compose up
```

**Using Java:**
```bash
java -jar target/HelpDeskApplication-0.0.1-SNAPSHOT.jar
```

## API Endpoints

### Ticket Management

**Create Ticket**
```http
POST /api/v1/tickets
Content-Type: application/json

{
  "title": "Network Connectivity Issue",
  "description": "Cannot connect to company VPN from home",
  "priority": "HIGH",
  "username": "john.doe"
}
```

**Get All Tickets**
```http
GET /api/v1/tickets
```

**Get Ticket by ID**
```http
GET /api/v1/tickets/{ticketId}
```

**Get Ticket by Username**
```http
GET /api/v1/tickets/user/{username}
```

**Update Ticket**
```http
PUT /api/v1/tickets/{ticketId}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "priority": "MEDIUM",
  "username": "john.doe"
}
```

**Delete Ticket**
```http
DELETE /api/v1/tickets/{ticketId}
```

### AI Endpoints

**Get AI Chat Response**
```http
POST /api/v1/ai/chat
Content-Type: application/json

{
  "message": "How do I reset my password?"
}
```

**Summarize Text**
```http
POST /api/v1/ai/summarize
Content-Type: application/json

{
  "message": "Long ticket description here..."
}
```

**Get Assistant Response**
```http
POST /api/v1/ai/assistant
Content-Type: application/json

{
  "message": "Your question or request here"
}
```

## Response Format

All API responses follow a consistent format:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2026-04-04T12:00:00"
}
```

## Error Handling

The application includes a global exception handler that returns consistent error responses:

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed",
  "error": "Field 'title': Title must be between 5 and 200 characters",
  "timestamp": "2026-04-04T12:00:00"
}
```

## Testing

Run the test suite:

```bash
mvn test
```

Run with coverage:

```bash
mvn clean test jacoco:report
```

View the coverage report at `target/site/jacoco/index.html`

## Database Setup

### Create Database

```sql
CREATE DATABASE help_desk;
USE help_desk;
```

Tables are automatically created by Hibernate based on entity definitions.

### Sample Data

The application includes methods to create sample tickets for testing.

## Logging

Logs are configured to write to both console and file:

- **Console**: INFO and above
- **File**: `logs/helpdesk-application.log`
- **Application logs**: DEBUG level for com.helpdesk package
- **Max file size**: 10MB with 30-day retention

## Docker Deployment

### Build Docker Image

```bash
docker build -t helpdesk-app:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

This will start:
- Application on port 8080
- MySQL database on port 3306

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Builds the application
2. Runs all tests
3. Performs security scanning
4. Builds and pushes Docker image
5. Deploys to production (main branch only)

### Setting up GitHub Actions

Add the following secrets to your GitHub repository:

- `SONAR_TOKEN`: SonarQube token
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `DEPLOY_KEY`: SSH private key for deployment
- `DEPLOY_HOST`: Deployment server hostname
- `DEPLOY_USER`: Deployment server username

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **API Keys**: Rotate regularly and use different keys for different environments
3. **Database**: Use strong passwords and restrict access
4. **HTTPS**: Use HTTPS in production
5. **Validation**: All inputs are validated server-side
6. **Logging**: Sensitive information is never logged

## Monitoring

The application includes:

- Application-level logging
- Database query logging (configurable)
- Error tracking through exception handler
- API response metrics

## Troubleshooting

**Database Connection Error**
- Ensure MySQL is running
- Verify database URL and credentials
- Check database exists and is accessible

**AI API Error**
- Verify Groq API key is valid
- Check API rate limits
- Ensure network connectivity to Groq API

**Port Already in Use**
- Change port in application.yaml: `SERVER_PORT=8081`
- Or kill the process using port 8080

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Contact the development team

## Production Checklist

Before deploying to production:

- [ ] Database backups configured
- [ ] Environment variables set correctly
- [ ] HTTPS/SSL configured
- [ ] API keys rotated and secured
- [ ] Logging level set to INFO
- [ ] Database indices created
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Monitoring and alerting configured
- [ ] Disaster recovery plan in place
- [ ] Documentation updated
- [ ] Health check endpoint tested

## Version

**Current Version**: 0.0.1-SNAPSHOT  
**Java Version**: 17  
**Spring Boot Version**: 3.5.13

