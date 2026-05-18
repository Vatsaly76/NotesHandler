Here's exactly what Shrey & Sourav need to do step by step:

Step 1 — Accept the Invite
Check email from GitHub OR open this link directly:
https://github.com/Vatsaly76/NotesHandler/invitations

Step 2 — Clone the Repo
bashgit clone https://github.com/Vatsaly76/NotesHandler.git
cd NotesHandler
cd backend

Step 3 — Install Dependencies
bashnpm install
This reads your package.json and installs everything automatically.

Step 4 — Create their own .env
bashcp .env.example .env
Then open .env and fill in their own MongoDB URI and JWT secret.

Step 5 — Create their own branch (never work on main)
bashgit checkout -b feat/your-feature-name
# example:
git checkout -b feat/frontend-login

Day to Day Workflow (every time they sit to code)
bash# 1. First always pull latest changes from main
git pull origin main

# 2. Write their code...

# 3. Stage and commit
git add .
git commit -m "feat: what they built"

# 4. Push their branch
git push origin feat/your-feature-name
Then on GitHub → open a Pull Request → you review → merge into main.
