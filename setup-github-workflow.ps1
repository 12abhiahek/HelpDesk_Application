# Prerequisites:
# 1. Install Git: https://git-scm.com/download
# 2. Install Docker: https://www.docker.com/products/docker-desktop
# 3. Have a GitHub account: https://github.com

# ============================================
# STEP 1: Initialize Git Repository
# ============================================

Write-Host "Step 1: Initializing Git Repository" -ForegroundColor Green
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# ============================================
# STEP 2: Add All Files
# ============================================

Write-Host "Step 2: Adding files to Git" -ForegroundColor Green
git add .
git status

# ============================================
# STEP 3: Create First Commit
# ============================================

Write-Host "Step 3: Creating initial commit" -ForegroundColor Green
git commit -m "Initial commit: Help Desk Application with GitHub Actions workflows"

# ============================================
# STEP 4: Rename Branch to Main (if needed)
# ============================================

Write-Host "Step 4: Checking/Renaming branch" -ForegroundColor Green
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq "master") {
    git branch -M main
    Write-Host "Branch renamed to 'main'"
} else {
    Write-Host "Currently on branch: $currentBranch"
}

# ============================================
# STEP 5: Add Remote Repository
# ============================================

Write-Host "`nStep 5: Adding Remote Repository" -ForegroundColor Green
Write-Host "Please enter your GitHub username: " -NoNewline
$username = Read-Host
Write-Host "Please enter your repository name (default: HelpDeskApplication): " -NoNewline
$repoName = Read-Host
if ([string]::IsNullOrEmpty($repoName)) { $repoName = "HelpDeskApplication" }

$remoteUrl = "https://github.com/$username/$repoName.git"
Write-Host "Remote URL: $remoteUrl" -ForegroundColor Cyan

git remote add origin $remoteUrl
git remote -v

# ============================================
# STEP 6: Push to GitHub
# ============================================

Write-Host "`nStep 6: Pushing to GitHub" -ForegroundColor Green
git push -u origin main

Write-Host "`nSetup Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/$username/$repoName"
Write-Host "2. Go to Settings > Secrets and variables > Actions"
Write-Host "3. Add required secrets (if using AI features):"
Write-Host "   - GROQ_API_KEY"
Write-Host "   - DOCKER_USERNAME (for Docker builds)"
Write-Host "   - DOCKER_PASSWORD (for Docker builds)"
Write-Host "`n4. Enable branch protection (Settings > Branches)"
Write-Host "5. Check Actions tab to see workflows running"

