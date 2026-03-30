#!/bin/bash

# Help Desk Application - GitHub Workflow Setup Script
# This script initializes git, commits your code, and pushes to GitHub

echo "================================"
echo "Help Desk Application - Setup"
echo "================================"
echo ""

# Step 1: Initialize Git
echo "Step 1: Initializing Git Repository..."
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Step 2: Add files
echo "Step 2: Adding files to Git..."
git add .

# Step 3: Initial commit
echo "Step 3: Creating initial commit..."
git commit -m "Initial commit: Help Desk Application with GitHub Actions workflows"

# Step 4: Rename branch
echo "Step 4: Setting up main branch..."
git branch -M main

# Step 5: Add remote
echo ""
echo "Step 5: Adding GitHub remote..."
echo "Enter your GitHub username:"
read username
echo "Enter your repository name (default: HelpDeskApplication):"
read reponame
reponame=${reponame:-HelpDeskApplication}

git remote add origin https://github.com/$username/$reponame.git
git remote -v

# Step 6: Push to GitHub
echo ""
echo "Step 6: Pushing to GitHub..."
echo "You may be prompted for GitHub credentials..."
git push -u origin main

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Visit: https://github.com/$username/$reponame"
echo "2. Go to Settings > Secrets and variables > Actions"
echo "3. Add required secrets:"
echo "   - GROQ_API_KEY"
echo "4. Enable branch protection rules"
echo "5. View your workflows in the Actions tab"
echo ""

