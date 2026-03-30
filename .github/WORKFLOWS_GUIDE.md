# GitHub Actions Workflows Guide for Help Desk Application

## Overview
This project includes comprehensive GitHub Actions workflows for CI/CD automation.

## Workflows Included

### 1. **Build and Test Workflow** (build-and-test.yml)
- **Triggers**: Push to `main`/`develop` branches and Pull Requests
- **Steps**:
  - Checkout code
  - Setup Java 17 (JDK)
  - Build with Maven (mvn clean compile)
  - Run tests
  - Upload coverage reports to Codecov
- **Purpose**: Ensures code compiles and all tests pass

### 2. **Code Quality Workflow** (code-quality.yml)
- **Triggers**: Push to `main`/`develop` branches and Pull Requests
- **Steps**:
  - Build project
  - Run SonarCloud code quality analysis
  - Check for vulnerable dependencies
- **Purpose**: Maintain code quality and security standards

### 3. **Security Scan Workflow** (security-scan.yml)
- **Triggers**: Push, Pull Requests, and weekly schedule (Sunday)
- **Steps**:
  - Dependency vulnerability check (OWASP)
  - Trivy filesystem vulnerability scanning
  - Upload SARIF results to GitHub Security tab
- **Purpose**: Identify and track security vulnerabilities

### 4. **Docker Build Workflow** (docker-build.yml)
- **Triggers**: Push to `main` and version tags
- **Steps**:
  - Setup Docker buildx
  - Login to Docker Hub & GitHub Container Registry
  - Extract metadata
  - Build and push Docker image
- **Purpose**: Automate containerization and distribution

### 5. **Release Workflow** (release.yml)
- **Triggers**: Push version tags (e.g., `v1.0.0`)
- **Steps**:
  - Build JAR artifact
  - Create GitHub Release
  - Upload JAR to release
- **Purpose**: Automated release management

## Setup Instructions

### Step 1: Initialize Git Repository
```bash
cd G:\HelpDeskApplication
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create a repository named `HelpDeskApplication`
3. Don't initialize with README (you already have files)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/HelpDeskApplication.git
git push -u origin main
```

### Step 4: Configure Secrets (if needed)

Go to your GitHub repository → Settings → Secrets and variables → Actions

#### For Codecov (Code Coverage):
- `CODECOV_TOKEN`: Get from https://codecov.io

#### For SonarCloud (Code Quality):
- `SONAR_TOKEN`: Get from https://sonarcloud.io

#### For Docker (Docker Build):
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub access token

#### For Maven Central (Releases):
- `MAVEN_USERNAME`: Maven Central username
- `MAVEN_PASSWORD`: Maven Central password

## How to Create Secrets

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add name and value
6. Click **Add secret**

## GitHub Workflow Status Badge

Add this to your README.md to show workflow status:

```markdown
[![Build and Test](https://github.com/YOUR_USERNAME/HelpDeskApplication/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/YOUR_USERNAME/HelpDeskApplication/actions/workflows/build-and-test.yml)
```

## Dockerfile Details

The included `Dockerfile` uses a multi-stage build:
- **Builder stage**: Uses Maven to compile and package the application
- **Runtime stage**: Uses lightweight Alpine JRE for production

To build locally:
```bash
docker build -t helpdesk-app:latest .
docker run -p 8080:8080 helpdesk-app:latest
```

## Workflow Triggers & Conditions

| Workflow | Trigger | Condition |
|----------|---------|-----------|
| build-and-test.yml | Push, PR | main, develop branches |
| code-quality.yml | Push, PR | main, develop branches |
| security-scan.yml | Push, PR, Schedule | Weekly on Sunday |
| docker-build.yml | Push, Tags | main branch & v* tags |
| release.yml | Tags | v* version tags |

## Version Tags Format

For releases, use semantic versioning:
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Monitoring Workflows

1. Go to your GitHub repository
2. Click **Actions** tab
3. View workflow runs and their status
4. Click on a run to see detailed logs

## Best Practices

1. **Branch Protection**: Enable branch protection rules
   - Require status checks before merging
   - Require code reviews
   - Require workflows to pass

2. **Regular Updates**: Keep dependencies updated
   ```bash
   mvn versions:display-dependency-updates
   ```

3. **Test Coverage**: Aim for >80% code coverage
   - View coverage reports in Codecov

4. **Security**: Fix vulnerabilities promptly
   - Check GitHub Security tab regularly
   - Review Trivy scan results

## Troubleshooting

### Workflow not running?
- Check branch name matches trigger conditions
- Verify .github/workflows/ files are in main branch
- Check Actions tab for error logs

### Build failing?
- Review job logs in Actions tab
- Ensure Java 17 is compatible
- Check Maven dependencies: `mvn dependency:tree`

### Docker push failing?
- Verify secrets are set correctly
- Check Docker Hub credentials
- Ensure repository is public or you have push access

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Maven Documentation](https://maven.apache.org/)
- [Docker Documentation](https://docs.docker.com/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)

