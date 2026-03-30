# Help Desk Application - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- Git installed
- GitHub account
- Java 17+ installed
- MySQL 8.0+ running (or Docker)

### Step 1: Push to GitHub

**Windows (PowerShell):**
```powershell
cd G:\HelpDeskApplication
.\setup-github-workflow.ps1
```

**Linux/Mac:**
```bash
cd HelpDeskApplication
chmod +x setup-github-workflow.sh
./setup-github-workflow.sh
```

**Manual:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/HelpDeskApplication.git
git push -u origin main
```

### Step 2: Add GitHub Secrets

1. Go to: `https://github.com/YOUR_USERNAME/HelpDeskApplication/settings/secrets/actions`
2. Click **New repository secret**
3. Add secret `GROQ_API_KEY` with your Groq API key
4. Click **Add secret**

### Step 3: Verify Workflows

1. Go to Actions tab in GitHub
2. You should see workflows running
3. Check ✅ Build and Test workflow

### Step 4: Configure Branch Protection (Optional but Recommended)

1. Go to Settings > Branches
2. Click **Add rule**
3. Enter pattern: `main`
4. Check:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
5. Click **Create**

---

## 🐳 Run Locally with Docker

```bash
# Set environment variable
$env:GROQ_API_KEY = "your_api_key"

# Start all services
docker-compose up --build

# Application runs at http://localhost:8080
# MySQL runs at localhost:3306
```

---

## 📋 Available Workflows

| Workflow | Runs On | Purpose |
|----------|---------|---------|
| Build & Test | Push, PR | Compile & run tests |
| Code Quality | Push, PR | SonarCloud analysis |
| Security Scan | Push, PR, Weekly | Vulnerability check |
| Docker Build | Push (main), Tags | Container images |
| Release | Version tags | GitHub releases |

---

## 🔗 Useful Commands

```bash
# Create a version tag and trigger release workflow
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# View git logs
git log --oneline

# Check remote
git remote -v

# View available branches
git branch -a
```

---

## 🆘 Common Issues & Solutions

### "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/HelpDeskApplication.git
```

### "Permission denied" (Mac/Linux)
```bash
chmod +x setup-github-workflow.sh
./setup-github-workflow.sh
```

### Build fails with "Cannot connect to MySQL"
- Ensure MySQL is running
- Check connection string in `application.yaml`
- Or use Docker: `docker-compose up`

### Workflows not running
1. Check `.github/workflows/` files exist
2. Verify branch name is `main` (not `master`)
3. Check Actions tab for error logs

---

## 📚 Learn More

- **GitHub Actions**: https://docs.github.com/en/actions
- **Spring Boot**: https://spring.io/
- **Maven**: https://maven.apache.org/
- **Docker**: https://docs.docker.com/

---

## 🎉 You're All Set!

Your Help Desk Application is now:
- ✅ Version controlled with Git
- ✅ Hosted on GitHub
- ✅ Running automated tests on every push
- ✅ Scanning for security vulnerabilities
- ✅ Building Docker images automatically
- ✅ Ready for CI/CD!

Happy coding! 🚀

