# GitHub Actions Setup Guide

This guide explains how to set up GitHub Actions CI/CD pipeline for the Help Desk Application.

## Prerequisites

1. GitHub repository with Actions enabled
2. GitHub account with admin access to the repository
3. Accounts/credentials for external services (Docker Hub, SonarCloud, deployment server, etc.)

## Step 1: Create GitHub Secrets

Navigate to your repository → Settings → Secrets and variables → Actions

Add the following secrets:

### Docker Hub Secrets
```
DOCKER_USERNAME: your_docker_hub_username
DOCKER_PASSWORD: your_docker_hub_access_token
```

To generate Docker access token:
1. Go to Docker Hub → Account Settings → Security → Access Tokens
2. Create a new token
3. Copy and paste into GitHub secret

### SonarCloud Secrets
```
SONAR_TOKEN: your_sonarcloud_token
```

To generate SonarCloud token:
1. Go to SonarCloud → My Account → Security
2. Generate a token
3. Copy and paste into GitHub secret

### Deployment Secrets (for production deployment)
```
DEPLOY_KEY: (private SSH key content)
DEPLOY_HOST: your.server.com
DEPLOY_USER: deploy_user
```

To generate SSH key:
```bash
ssh-keygen -t rsa -b 4096 -f deploy_key -N ""
cat deploy_key  # Copy this to DEPLOY_KEY secret
cat deploy_key.pub  # Add this to ~/.ssh/authorized_keys on your server
```

## Step 2: Enable Workflow Permissions

1. Go to Settings → Actions → General
2. Under "Workflow permissions", select:
   - ✓ Read and write permissions
   - ✓ Allow GitHub Actions to create and approve pull requests

## Step 3: Configure Branch Protection

1. Go to Settings → Branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Configure:
   - ✓ Require a pull request before merging
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date before merging
   - ✓ Require code reviews before merging (at least 1)
   - Select status checks: Build, Security Scan, Docker Build

## Step 4: Configure Webhook (Optional)

For notifications:

1. Go to Settings → Webhooks
2. Add webhook with:
   - Payload URL: Your notification service (Slack, Discord, etc.)
   - Events: Let me select individual events
   - Select: Workflow runs
   - Select: Push events
   - Select: Pull requests

## Step 5: SonarCloud Integration

### Create SonarCloud Project

1. Go to [SonarCloud](https://sonarcloud.io)
2. Click "Analyze new project"
3. Select your GitHub repository
4. Choose "GitHub Actions" as CI platform
5. Follow the setup wizard
6. Copy your project key and organization name

### Update Workflow

Update `.github/workflows/ci-cd.yml`:

```yaml
- name: SonarQube Analysis
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
  run: mvn sonar:sonar \
    -Dsonar.projectKey=HelpDeskApplication \
    -Dsonar.organization=your-organization \
    -Dsonar.host.url=https://sonarcloud.io
```

## Step 6: Docker Hub Integration

### Create Docker Repository

1. Go to [Docker Hub](https://hub.docker.com)
2. Create a new repository: `helpdesk-app`
3. Set visibility to Private or Public
4. Generate access token in Account Settings

## Step 7: Deployment Server Setup

### On Your Server

```bash
# Create deploy user
sudo useradd -m -s /bin/bash deploy

# Create .ssh directory
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh

# Add public key
echo "your_public_key_content" | sudo tee /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys

# Create application directory
sudo mkdir -p /app/helpdesk
sudo chown deploy:deploy /app/helpdesk

# Allow deploy user to use sudo without password for specific commands (optional)
echo "deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl" | sudo tee /etc/sudoers.d/deploy-user
```

## Step 8: Workflow Triggers

The workflow runs on:

1. **Push to main**: Builds, tests, and deploys to production
2. **Push to develop**: Builds and tests only
3. **Pull Requests**: Builds and tests

## Step 9: Monitor Workflow

1. Go to Actions tab
2. Click on any workflow run to see logs
3. Each job shows detailed output
4. Failed jobs show error messages and stack traces

## Troubleshooting

### Build Fails

Check logs in GitHub Actions:
1. Click on the failed workflow
2. Click on the failing job
3. Expand any failing step
4. Look for error messages

Common issues:
- **Out of memory**: Increase runner resources
- **Timeout**: Increase timeout in workflow
- **Cache issues**: Clear cache and retry

### Deployment Fails

1. Verify SSH key is correctly added
2. Check server connectivity: `ssh -i deploy_key deploy@your.server.com`
3. Verify permissions on deployment directory
4. Check application logs on server

### Docker Push Fails

1. Verify Docker credentials are correct
2. Ensure Docker Hub token has push permissions
3. Check Docker username is correct
4. Verify rate limits haven't been exceeded

## Best Practices

1. **Keep secrets secure**: Use GitHub Secrets, never commit sensitive data
2. **Use branch protection**: Prevent direct pushes to main
3. **Require code reviews**: Set minimum review count before merge
4. **Monitor workflows**: Check Actions tab regularly
5. **Update dependencies**: Regularly update Maven dependencies
6. **Test locally**: Run tests before pushing
7. **Use semantic versioning**: Tag releases properly
8. **Document changes**: Use clear commit messages

## Advanced Configuration

### Custom Notification

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Matrix Testing (Multiple Java Versions)

```yaml
strategy:
  matrix:
    java-version: [17, 21]
steps:
  - uses: actions/setup-java@v3
    with:
      java-version: ${{ matrix.java-version }}
```

### Cache Management

```yaml
- uses: actions/cache@v3
  with:
    path: ~/.m2/repository
    key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
    restore-keys: |
      ${{ runner.os }}-maven-
```

## Support

For issues or questions:
1. Check [GitHub Actions Documentation](https://docs.github.com/en/actions)
2. Review workflow logs
3. Check action marketplace for updates
4. Contact your DevOps team

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Maven GitHub Actions](https://github.com/actions/setup-java)
- [Docker Build and Push](https://github.com/docker/build-push-action)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)

