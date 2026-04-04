# Quick Reference Card

**One-page summary for developers and DevOps**

---

## 📍 API Endpoints

### Tickets
```
POST   /api/v1/tickets                  Create ticket
GET    /api/v1/tickets                  Get all tickets  
GET    /api/v1/tickets/{id}             Get by ID
GET    /api/v1/tickets/user/{username}  Get by username
PUT    /api/v1/tickets/{id}             Update ticket
DELETE /api/v1/tickets/{id}             Delete ticket
```

### AI Services
```
POST   /api/v1/ai/chat                  Chat with AI
POST   /api/v1/ai/summarize             Summarize text
POST   /api/v1/ai/assistant             Assistant response
```

---

## 🔧 Essential Commands

### Build & Run
```bash
mvn clean package           # Build JAR
mvn spring-boot:run        # Run locally
java -jar target/*.jar     # Run JAR
docker-compose up -d       # Run with Docker
```

### Test & Quality
```bash
mvn test                           # Run tests
mvn clean test jacoco:report       # Code coverage
mvn compile                        # Compile only
mvn clean                          # Clean build
```

### API Testing
```bash
# Health check
curl http://localhost:8080/actuator/health

# Create ticket
curl -X POST http://localhost:8080/api/v1/tickets \
  -H "Content-Type: application/json" \
  -d '{"title":"Issue","description":"Description text here with more than 10 chars","priority":"HIGH","username":"user"}'

# Get tickets
curl http://localhost:8080/api/v1/tickets

# Chat with AI
curl -X POST http://localhost:8080/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Your question here"}'
```

---

## 📁 Key Files

### Configuration
- `.env.example` - Environment template
- `pom.xml` - Dependencies
- `application.yaml` - App configuration
- `.github/workflows/ci-cd.yml` - CI/CD pipeline

### Documentation
- `FINAL_SUMMARY.md` - Start here
- `PRODUCTION_README.md` - Setup guide
- `API_TESTING_GUIDE.md` - Test endpoints
- `DEPLOYMENT_CHECKLIST.md` - Before deploying
- `ACTION_PLAN.md` - What to do next
- `GITHUB_ACTIONS_SETUP_GUIDE.md` - CI/CD setup

### Code
- `controller/AiController.java` - AI endpoints
- `controller/TicketController.java` - Ticket endpoints
- `service/AiService.java` - AI logic
- `service/TicketService.java` - Ticket CRUD
- `dto/ApiResponse.java` - Response format
- `exception/GlobalExceptionHandler.java` - Error handling

---

## 🌍 Environment Variables Required

```env
# Database
DB_URL=jdbc:mysql://localhost:3306/help_desk
DB_USERNAME=root
DB_PASSWORD=your_password

# AI (Groq)
OPENAI_API_KEY=your_groq_key
OPENAI_BASE_URL=https://api.groq.com/openai

# Server
SERVER_PORT=8080
LOG_LEVEL=INFO
```

---

## ✅ Response Format

All responses follow this format:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2026-04-04T12:00:00"
}
```

---

## 🚨 Common Errors

| Error | Solution |
|-------|----------|
| Connection refused | Ensure app running on port 8080 |
| Database error | Check DB_URL, DB_USERNAME, DB_PASSWORD |
| API validation error | Check request body matches DTO constraints |
| 404 Not Found | Check endpoint path spelling |
| 500 Server error | Check app logs for details |

---

## 📊 Validation Rules

### Ticket Creation
- **Title**: 5-200 characters, required
- **Description**: 10-5000 characters, required
- **Priority**: HIGH, MEDIUM, or LOW, required
- **Username**: 3-50 characters, required

### AI Request
- **Message**: 1-5000 characters, required, not blank

---

## 🔐 Default Ports & URLs

| Service | URL |
|---------|-----|
| Application | http://localhost:8080 |
| MySQL | localhost:3306 |
| Health Check | http://localhost:8080/actuator/health |
| API Base | http://localhost:8080/api/v1 |

---

## 👥 Team Roles

| Role | Key Tasks |
|------|-----------|
| **Developer** | Review code, test APIs, fix bugs |
| **DevOps** | Deploy, configure CI/CD, manage infrastructure |
| **QA** | Test endpoints, verify functionality |
| **DBA** | Setup database, backups, optimization |
| **Lead** | Code review, go/no-go decisions |

---

## 📋 Deployment Steps (Quick)

1. **Prepare**
   - Copy .env.example to .env
   - Edit with credentials
   - Verify database running

2. **Build**
   - `mvn clean package`
   - Verify JAR created

3. **Test**
   - `mvn test`
   - Manual endpoint testing

4. **Deploy**
   - Copy JAR to server
   - Set environment variables
   - Start application

5. **Verify**
   - Health check
   - API smoke tests
   - Log inspection

---

## 🔗 Links

- **Setup**: PRODUCTION_README.md
- **Testing**: API_TESTING_GUIDE.md  
- **Deployment**: DEPLOYMENT_CHECKLIST.md
- **CI/CD**: GITHUB_ACTIONS_SETUP_GUIDE.md
- **Plan**: ACTION_PLAN.md

---

## 💡 Quick Tips

```bash
# Tail logs while running
mvn spring-boot:run | tail -f

# Check what's using port 8080
lsof -i :8080

# Kill process on port 8080
kill -9 $(lsof -t -i :8080)

# Format check
mvn checkstyle:check

# Find tests
find . -name "*Test*.java"

# Show dependencies
mvn dependency:tree
```

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Read documentation | 1-2 hours |
| Setup environment | 30 minutes |
| Build & test locally | 30 minutes |
| Review code | 1-2 hours |
| Setup GitHub Actions | 1-2 hours |
| Deploy to staging | 2-4 hours |
| Full testing | 4-8 hours |
| Deploy to production | 1-2 hours |
| **Total** | **1-2 weeks** |

---

## 🎓 Learning Path

1. Read `FINAL_SUMMARY.md` (5 min)
2. Read `PRODUCTION_README.md` (30 min)
3. Test endpoints with `API_TESTING_GUIDE.md` (15 min)
4. Review code with `PRODUCTION_CODE_REVIEW.md` (30 min)
5. Plan deployment with `DEPLOYMENT_CHECKLIST.md` (30 min)
6. Setup CI/CD with `GITHUB_ACTIONS_SETUP_GUIDE.md` (1 hour)

---

## 🚀 You're Ready!

Your application is production-ready.

**Next**: Read `FINAL_SUMMARY.md`

**Then**: Follow `ACTION_PLAN.md`

**Questions?**: Check `PRODUCTION_README.md`

---

*Keep this card handy for quick reference while working!*

