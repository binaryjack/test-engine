# 📖 For Students & Learners

Welcome to Test Engine! This guide explains how to use this project and what you should know before getting started.

---

## 🎯 What This Project Is

Test Engine is a **free, open-source React certification preparation platform** designed to help you:

✅ Learn React fundamentals (MID-level)  
✅ Master advanced React concepts (SENIOR-level)  
✅ Practice real-world development patterns  
✅ Prepare for React certification exams  
✅ Build a portfolio project  

---

## 🚀 Getting Started (3 Steps)

### Step 1: Fork or Clone the Repository

**Option A: Fork (Recommended)**
```bash
# Click "Fork" button on GitHub
# Then clone YOUR fork:
git clone https://github.com/YOUR-USERNAME/test-engine.git
cd test-engine
```

**Option B: Clone Directly**
```bash
# If you just want to learn (no contributions):
git clone https://github.com/binaryjack/test-engine.git
cd test-engine
```

### Step 2: Install Dependencies

```bash
# Install pnpm if needed
npm install -g pnpm

# Install all project dependencies
pnpm install
```

### Step 3: Start Learning

```bash
# Pick your level:

# MID-Level Challenges
cd mid
pnpm dev

# SENIOR-Level Challenges
cd senior
pnpm dev

# Full-Stack Test Machine
cd test-machine/backend
pnpm dev

# In another terminal:
cd test-machine/frontend
pnpm dev
```

---

## 📝 How to Use the Challenges

### Study Workflow

For each challenge:

1. **Read** — Open `README.md` first
   - Understand the concepts
   - Learn common mistakes
   - Review exam tips

2. **Challenge** — Open `Challenge.tsx`
   - Read the code and comments
   - Implement the TODOs
   - **Don't look at the solution yet!**

3. **Compare** — Open `Solution.tsx`
   - Compare your implementation
   - Learn from the reference
   - Note what you missed

4. **Practice** — Redo the challenge
   - Close the solution
   - Implement again from memory
   - Perfect your understanding

### Time Management

- **Per Challenge:** 30-60 minutes (MID), 60-90 minutes (SENIOR)
- **Exam Simulation:** 105 minutes total
- **Practice Under Time Pressure:** Important!

---

## ⚠️ Important: Work on Your Own Machine

**You MUST download/fork and work on your local machine because:**

### ❌ What NOT to Do

- ❌ Do NOT modify files directly on GitHub in your browser
- ❌ Do NOT commit solutions to this public repository
- ❌ Do NOT push your work to the original repository
- ❌ Do NOT use GitHub's online editor for code changes

### ✅ What to Do Instead

- ✅ Clone the repo to your machine
- ✅ Make changes locally
- ✅ Test thoroughly before committing
- ✅ **If forked:** Keep your fork private or configure properly (see below)

---

## 🔐 Protecting Your Work & Solutions

### Option 1: Private Fork (Recommended)

If you fork and want to work privately:

```bash
# 1. Fork the repo on GitHub (creates your copy)
# 2. Make it PRIVATE:
#    - Go to Settings → General
#    - Under "Danger Zone" → Change visibility to Private
# 3. Clone YOUR private fork:
git clone https://github.com/YOUR-USERNAME/test-engine.git
cd test-engine

# 4. Work freely without exposing solutions
git add .
git commit -m "My challenge solutions"
git push origin main
```

**Why?** Your solution work stays private, but you can still collaborate.

### Option 2: Personal Branch

```bash
# Clone the original repo
git clone https://github.com/binaryjack/test-engine.git
cd test-engine

# Create personal branch (never pushed)
git checkout -b my-solutions

# Work freely on this branch
# Your work stays local only
```

### Option 3: Download & Disconnect

```bash
# Download the repo (green Code button → Download ZIP)
# Work locally without git
# No public exposure of your solutions
```

---

## 📚 Learning Resources

### Official React Documentation
- [react.dev](https://react.dev) — Official React docs
- [React Hooks](https://react.dev/reference/react) — Hooks API reference
- [React Patterns](https://react.dev/learn) — Learn React step-by-step

### Redux & State Management
- [Redux](https://redux.js.org/) — State management
- [Redux-Saga](https://redux-saga.js.org/) — Side effects library

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Complete guide
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/) — Cheatsheet

### Certification
- [certificates.dev](https://certificates.dev) — Official certification platform
- [React Certification](https://certificates.dev/exams/react) — React exam info

---

## 💻 Development Environment Setup

### Required Tools

```bash
# 1. Node.js (≥18.0.0)
node --version

# 2. pnpm (≥8.0.0)
npm install -g pnpm
pnpm --version

# 3. Git (≥2.0)
git --version

# 4. Code Editor (VS Code recommended)
# Download: https://code.visualstudio.com/
```

### VS Code Extensions (Optional but Recommended)

- **ES7+ React/Redux/React-Native Snippets** — Code snippets
- **Thunder Client** — API testing
- **Tailwind CSS IntelliSense** — CSS autocompletion
- **Vitest** — Test runner integration
- **TypeScript Vue Plugin** — TS support

---

## 🐛 Troubleshooting

### Problem: "pnpm not found"
```bash
# Install pnpm globally
npm install -g pnpm

# Verify
pnpm --version
```

### Problem: "Port already in use"
```bash
# Kill the process using the port (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.ts
```

### Problem: "Dependencies won't install"
```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules
pnpm install
```

### Problem: "TypeScript errors in VS Code"
```bash
# Restart TypeScript server
Cmd/Ctrl + Shift + P
Type: "TypeScript: Restart TS Server"
```

---

## ✅ Before You Start Coding

### Read These Files First

1. [README.md](../README.md) — Project overview
2. [GETTING_STARTED.md](../GETTING_STARTED.md) — Quick start guide
3. [ARCHITECTURE.md](../ARCHITECTURE.md) — How everything works (optional)

### Follow These Rules

✅ Use **TypeScript** — No JavaScript files  
✅ Follow **Redux + Saga pattern** — No direct API calls  
✅ Use **functional components** — No class components  
✅ Add **type definitions** — No `any` types  
✅ Write **clean code** — Follow ESLint rules  

See [`.github/copilot-instructions.xml`](../.github/copilot-instructions.xml) for complete rules.

---

## 🤝 Want to Contribute?

If you want to improve this project:

### Before Contributing

1. Check [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines
2. Follow all code standards in [copilot-instructions.xml](../.github/copilot-instructions.xml)
3. Fork the repo and create a feature branch

### How to Contribute

```bash
# 1. Fork the repo
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/test-engine.git
cd test-engine

# 3. Create feature branch
git checkout -b feature/your-feature

# 4. Make changes
# - Add new challenges
# - Improve documentation
# - Fix bugs
# - Add tests

# 5. Validate your changes
pnpm lint              # Check code quality
pnpm type-check        # Check TypeScript
pnpm test              # Run tests

# 6. Commit and push
git commit -m "feat: add new challenge"
git push origin feature/your-feature

# 7. Open Pull Request on GitHub
# - Describe your changes
# - Reference any related issues
# - Wait for review
```

---

## 📋 Learning Checklist

- [ ] Forked/cloned the repo to your machine
- [ ] Installed Node.js ≥ 18.0.0
- [ ] Installed pnpm ≥ 8.0.0
- [ ] Ran `pnpm install`
- [ ] Read README.md
- [ ] Read GETTING_STARTED.md
- [ ] Understand the 3 ways to protect your work (above)
- [ ] Completed first challenge
- [ ] Compared solution
- [ ] Ready to learn!

---

## 🎓 Learning Path

### Week 1-2: Foundations (MID-Level)
```
Day 1-2:   01 - Hooks Deep Dive
Day 3-4:   02 - Component Patterns
Day 5-6:   03 - Performance Optimization
Day 7-8:   04 - Error Handling
Day 9-10:  05 - Forms
Day 11-12: 06 - Context & State Management
Day 13-14: Review & Practice
```

### Week 3-4: Advanced (SENIOR-Level)
```
Day 1-2:   01 - React 19 Actions
Day 3-4:   02 - Concurrent Features
Day 5-6:   03 - Server Components
Day 7-8:   04 - React Compiler
Day 9-10:  05 - Advanced Patterns
Day 11-12: 06 - Accessibility
Day 13-14: 07 - Testing
```

### Final Week: Exam Prep
```
Day 1-3: Redo all MID challenges under time pressure
Day 4-5: Redo all SENIOR challenges under time pressure
Day 6-7: Mock exam (105 minutes, 8-10 random challenges)
```

---

## 📞 FAQ

### Q: Can I use this for my company/team?
**A:** Yes! The project is MIT licensed. You can fork and adapt for internal training.

### Q: Can I modify the challenges?
**A:** Absolutely! Modify locally for your needs. If improvements are valuable, consider contributing back via PR.

### Q: Can I share my solutions publicly?
**A:** Please keep solutions private to help future learners. If you have feedback, open an issue instead.

### Q: How often is this updated?
**A:** Check the GitHub repository for updates. Pull frequently to get latest content.

### Q: Is this officially affiliated with React/certificates.dev?
**A:** This is a community learning project. It's not official but follows official React documentation and patterns.

### Q: Can I use this to teach?
**A:** Yes! Great for classroom or workshop use. Consider forking and customizing for your students.

### Q: How do I report a bug or typo?
**A:** Open an issue on GitHub with clear description and steps to reproduce.

---

## 🎯 Tips for Success

### Study Tips
✅ Study every day, even 30 minutes is valuable  
✅ Actually TYPE the code, don't just read it  
✅ Explain concepts out loud (teaches better)  
✅ Teach others what you learned  
✅ Practice under time pressure  

### Code Tips
✅ Start small (MID-level first)  
✅ Understand WHY, not just HOW  
✅ Read official React docs (not just this project)  
✅ Ask questions in issues if stuck  
✅ Build personal projects using learned patterns  

### Mental Approach
✅ Embrace confusion (it means learning)  
✅ Don't memorize, understand  
✅ Mistakes are learning opportunities  
✅ Progress matters more than perfection  
✅ Celebrate small wins  

---

## 🚀 Next Steps

1. **Fork or clone** the repo to your machine
2. **Make your fork PRIVATE** if you forked
3. **Install dependencies** with `pnpm install`
4. **Start learning** with MID-level challenges
5. **Enjoy the journey!** 🎉

---

## 📄 License

This project is MIT licensed. See [LICENSE](../LICENSE) for details.

**In short:**
- ✅ Use for personal learning
- ✅ Use for team training
- ✅ Modify and adapt
- ✅ Share improvements via PR
- ✅ Include license in distributions

---

## 💬 Questions?

- 📖 Check [README.md](../README.md)
- 🚀 Read [GETTING_STARTED.md](../GETTING_STARTED.md)
- 🏗️ See [ARCHITECTURE.md](../ARCHITECTURE.md)
- 📝 Review [CONTRIBUTING.md](../CONTRIBUTING.md)
- 🐛 Open a GitHub issue
- 🤝 Start a GitHub discussion

---

## 🙏 Final Thoughts

Thank you for choosing Test Engine for your React learning journey! This project is free because education is important. By learning properly, you'll not only pass the certification but become a better React developer.

**Remember:** The best investment is in yourself. Happy learning! 🚀

---

*Last updated: 2026-04-17*  
*Made with ❤️ for React learners worldwide*
