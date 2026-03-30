# Help Desk Application

A modern help desk ticketing system built with Spring Boot, MySQL, and AI-powered assistance using Spring AI and Groq.

## 🚀 Features

- **Ticket Management**: Create, update, and manage support tickets
- **AI-Powered Solutions**: Get instant solutions using Llama 3 AI via Groq API
- **Priority & Status Tracking**: Organize tickets by priority (HIGH, MEDIUM, LOW) and status (OPEN, CLOSED)
- **RESTful API**: Clean and intuitive REST endpoints
- **Database Persistence**: MySQL database for reliable data storage
- **Auto-timestamping**: Automatic creation and update timestamps

## 🛠 Tech Stack

- **Backend**: Spring Boot 3.5.13
- **Database**: MySQL 8.0
- **AI**: Spring AI with Groq API (Llama 3)
- **Build Tool**: Maven
- **Language**: Java 17
- **ORM**: Spring Data JPA with Hibernate

## 📋 Prerequisites

- Java 17+
- Maven 3.6+
- MySQL 8.0+
- Git
- Docker (optional, for containerization)

## 🔧 Installation

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/HelpDeskApplication.git
cd HelpDeskApplication
```

2. **Configure database**
   - Update `src/main/resources/application.yaml`
   - Set MySQL credentials:
   ```yaml
   datasource:
     url: jdbc:mysql://localhost:3306/help_desk
     username: your_mysql_user
     password: your_mysql_password
   ```

3. **Set Groq API Key**
```bash
# Windows PowerShell
$env:GROQ_API_KEY = "your_groq_api_key"

# Linux/Mac
export GROQ_API_KEY="your_groq_api_key"
```

Get your Groq API key from: https://console.groq.com/

4. **Create MySQL database**
```sql
CREATE DATABASE help_desk;
```

5. **Build the project**
```bash
mvn clean install
```

6. **Run the application**
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080`

## 🐳 Docker Setup

### Build Docker Image
```bash
docker build -t helpdesk-app:latest .
```

### Run Docker Container
```bash
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/help_desk \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  -e GROQ_API_KEY=your_groq_api_key \
  helpdesk-app:latest
```

## 📚 API Documentation

### Create Ticket
```http
POST /api/v1/tickets
Content-Type: application/json

{
  "title": "Login Issue",
  "description": "Unable to login to the system",
  "priority": "HIGH",
  "status": "OPEN",
  "assignedTo": "John Doe",
  "username": "johndoe"
}
```

### Get AI Solution
```http
POST /api/v1/ai/chat
Content-Type: application/json

{
  "message": "How do I reset my password?"
}
```

Response:
```json
{
  "solution": "To reset your password, click on 'Forgot Password' on the login page..."
}
```

## 🔐 Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Groq API key for AI features | `gsk_...` |
| `SPRING_DATASOURCE_URL` | MySQL connection URL | `jdbc:mysql://localhost:3306/help_desk` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `root` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `your_password` |

## 📊 Database Schema

### Tickets Table
```sql
CREATE TABLE tickets (
  ticket_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'OPEN',
  priority VARCHAR(50) DEFAULT 'MEDIUM',
  assigned_to VARCHAR(255),
  username VARCHAR(255),
  created_date DATE,
  updated_date_time DATETIME,
  end_time TIME
);
```

## 🔄 CI/CD Workflows

This project includes automated GitHub Actions workflows:

- **build-and-test.yml**: Builds and runs tests on every push/PR
- **code-quality.yml**: Runs SonarCloud analysis
- **security-scan.yml**: Scans for vulnerabilities
- **docker-build.yml**: Builds and pushes Docker images
- **release.yml**: Creates releases on version tags

See [.github/WORKFLOWS_GUIDE.md](.github/WORKFLOWS_GUIDE.md) for detailed setup instructions.

## 📈 Monitoring & Status

[![Build and Test](https://github.com/YOUR_USERNAME/HelpDeskApplication/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/YOUR_USERNAME/HelpDeskApplication/actions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check existing [GitHub Issues](https://github.com/YOUR_USERNAME/HelpDeskApplication/issues)
2. Create a new issue with detailed description
3. Include error logs and steps to reproduce

## 🗺 Roadmap

- [ ] User authentication and authorization
- [ ] Email notifications for ticket updates
- [ ] Advanced search and filtering
- [ ] Ticket assignment workflow
- [ ] Customer portal
- [ ] Analytics dashboard
- [ ] Mobile app

## 👨‍💻 Author

Your Name - [@YourGitHub](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)
- [Groq API Documentation](https://console.groq.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

