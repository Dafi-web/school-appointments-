# 🚀 Quick Guide: Push to GitHub

## Simple 5-Minute Guide

### Step 1: Check Git Installation
```bash
git --version
```
If you see a version number ✅, continue. Otherwise, install Git first.

---

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. Name: `appointment-system`
4. Click "Create repository"
5. Copy the repository URL

---

### Step 3: Open Terminal in Your Project
```bash
cd "/Users/dawitabrhaweldegebriel/Desktop/cursor test"
```

---

### Step 4: Run These Commands
```bash
# Initialize Git
git init

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Dilla University Appointment System"

# Connect to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/appointment-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

---

### Step 5: Authenticate
When prompted for password, use a **Personal Access Token**:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Check "repo" 
4. Generate and copy token
5. Paste as password in terminal

---

## ✅ Done!

Visit: `https://github.com/YOUR-USERNAME/appointment-system`

Your code is now on GitHub! 🎉

---

## 🔄 To Update Later:
```bash
git add .
git commit -m "Description of changes"
git push
```

---

**Need detailed help?** See [GITHUB_SETUP.md](GITHUB_SETUP.md)
