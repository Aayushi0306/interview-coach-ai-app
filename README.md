# AI Interview Prep Buddy 🎓🚀

A responsive mock interview practice and coaching platform designed for college students preparing for campus placements, technical interviews, and HR rounds.

Powered by **Gemini 3.8 Flash** and equipped with a resilient 80+ question curated placement bank.

---

## 🌟 Key Features

- **6 In-Demand Topics**: HR Interview, SQL, Python, Excel, Power BI, and Aptitude.
- **3 Difficulty Tiers**: Beginner (Campus Entry/Freshers), Intermediate (Core Placement Drives), and Advanced (Senior Rounds).
- **Flexible Practice Length**: 5 Questions (Quick Sprint ~10 mins) or 10 Questions (Full Mock Round ~25 mins).
- **Interactive Coach Alex**: Evaluates one question at a time with realistic workplace scenarios.
- **Objective 5-Point Grading**:
  - Score out of 10
  - What was correct
  - What was missing or incorrect
  - Model improved sample answer (ready to copy)
  - Practical placement tip
- **Results Dashboard**: Detailed percentage, placement readiness tier, key strengths, improvement areas, recommended practice topics, and printable report.
- **Resilient Offline Architecture**: If the Gemini API key is restricted or unconfigured, the app falls back to the curated question bank and evaluator without breaking.

---

## 🚀 How to Deploy

### Option 1: Live Instant Link (Already Deployed)
Your application is already hosted and running live on Google Cloud Run:
- **Shared App URL**: `https://ais-pre-e5ax3gmhuerrehxu3mbgj5-849334520706.asia-southeast1.run.app`
- **Development URL**: `https://ais-dev-e5ax3gmhuerrehxu3mbgj5-849334520706.asia-southeast1.run.app`

You can share this link with anyone immediately!

---

### Option 2: Deploy to Vercel (1-Click or Git)

#### Step 1: Get a Free Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account and click **Create API Key**.
3. Copy the key.

#### Step 2: Push to Your GitHub Account
```bash
git init
git add .
git commit -m "Deploy AI Interview Prep Buddy"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ai-interview-prep-buddy.git
git push -u origin main
```

#### Step 3: Deploy on Vercel
1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New** > **Project** and select your GitHub repository.
3. Vercel will automatically detect **Vite** and read the included `vercel.json`.
4. In the **Environment Variables** section, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `your_copied_gemini_api_key`
5. Click **Deploy**.

---

### Option 3: Deploy via Vercel CLI

If you have the Vercel CLI installed:
```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy to preview
npx vercel

# 3. Add your environment variable
npx vercel env add GEMINI_API_KEY

# 4. Deploy to production
npx vercel --prod
```

---

## 🛠 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure .env file
cp .env.example .env
# Open .env and insert your GEMINI_API_KEY

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📄 License
Apache-2.0
