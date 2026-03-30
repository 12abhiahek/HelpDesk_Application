# GitHub Actions Workflows Configuration

This directory contains GitHub Actions workflow files for Continuous Integration and Continuous Deployment (CI/CD).

## Quick Summary

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-and-test.yml` | Push, PR | Build & Test on every code change |
| `code-quality.yml` | Push, PR | Code quality & SonarCloud analysis |
| `security-scan.yml` | Push, PR, Schedule | Security vulnerability scanning |
| `docker-build.yml` | Push (main), Tags | Build & push Docker images |
| `release.yml` | Version tags | Create releases on new versions |
| `dependency-check.yml` | Manual, Schedule | Check for vulnerable dependencies |
| `performance-tests.yml` | Manual, Schedule | Run performance benchmarks |

## Getting Started

### Option 1: Windows (PowerShell)
```powershell
cd G:\HelpDeskApplication
.\setup-github-workflow.ps1
```

### Option 2: Linux/Mac (Bash)
```bash
cd HelpDeskApplication
chmod +x setup-github-workflow.sh
./setup-github-workflow.sh
```

### Option 3: Manual Steps
1. Create GitHub repository at https://github.com/new
2. Initialize local git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/HelpDeskApplication.git
   git push -u origin main
   ```

## Required GitHub Secrets

Configure these in your GitHub repository (Settings > Secrets and variables > Actions):

### Essential
- `GROQ_API_KEY` - API key from Groq for AI features

### Optional (for advanced features)
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token
- `SONAR_TOKEN` - SonarCloud token for code quality
- `CODECOV_TOKEN` - Codecov token for coverage tracking

## Branch Protection

Recommended settings in Settings > Branches > Add rule for `main`:
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require code reviews before merging (recommend 1 approval)
- ✅ Require conversation resolution before merging

## Troubleshooting

### Workflows not running?
1. Check files are in `.github/workflows/` directory
2. Verify filenames end with `.yml` or `.yaml`
3. Check branch name matches trigger condition (main/develop)
4. Visit Actions tab for error logs

### Build failures?
1. Check Java version is 17+
2. Verify MySQL connection string
3. Check environment variables are set
4. Review action logs for detailed errors

### Docker build failing?
1. Ensure Docker Hub secrets are set correctly
2. Check Dockerfile is in project root
3. Verify repository visibility settings
4. Review Docker login step in logs

## Viewing Workflow Runs

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select workflow from list
4. Click run to see detailed logs
5. Check individual job steps for errors

## Useful Links

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Maven Plugin Guide](https://maven.apache.org/plugins/)
- [Spring Boot CI/CD Guide](https://spring.io/guides/gs/ci-cd)

## Examples

### Add Branch Protection Rule
1. Repository Settings > Branches
2. Click "Add rule"
3. Enter "main" as branch name pattern
4. Enable protection options
5. Save

### Update Workflow on Main Change
The workflow triggers automatically on push to main. No additional configuration needed!

### Manual Workflow Dispatch
For workflows with `workflow_dispatch` trigger:
1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"
4. Follow prompts

