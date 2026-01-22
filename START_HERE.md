# 🎯 AI CAD PLATFORM - GETTING STARTED

**Three deployment options. Choose what fits your needs.**

---

## 📦 What's in This Package

```
adam-ultimate-platform/
├── README.md                    ← You are here
├── QUICKSTART.md               ← Detailed setup guides
├── DEPLOYMENT.md               ← Full deployment guide
├── DEPLOY_QUICK_REFERENCE.md   ← Quick commands
│
├── docker-compose.basic.yml    ← Basic (Free)
├── docker-compose.pro.yml      ← Professional
├── docker-compose.yml          ← Enterprise
│
├── frontend/                   ← Next.js App (Required)
├── backend/                    ← FastAPI (Optional)
└── mcp-server/                 ← MCP (Optional)
```

---

## ⚡ FASTEST START (2 minutes)

### 🆓 Basic - FREE Forever

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

**Features:**
- ✅ 2D CAD (DXF, SVG)
- ✅ 3D CAD (OpenSCAD)
- ✅ Puter.js AI (500+ models, FREE!)
- ✅ Cloud storage
- ✅ $0/month!

**Deploy to production:**
```bash
npm i -g vercel
vercel
```

**Done!** Your site is live at `https://your-project.vercel.app`

---

## 💼 Professional (20 minutes)

### Need TRUE B-Rep CAD, STEP export, validation?

**Frontend:**
```bash
cd frontend
vercel
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m app.main
```

**Features Added:**
- ✅ OpenCascade B-Rep engine
- ✅ STEP/IGES export
- ✅ Manufacturing validation
- ✅ Still uses Puter.js AI! ($0)

**Deploy:** See DEPLOYMENT.md for Railway/Render setup

---

## 🏢 Enterprise (1 hour)

### Need Claude Desktop integration?

```bash
docker-compose up -d
```

**Features Added:**
- ✅ MCP Server
- ✅ Use in Claude Desktop
- ✅ Conversational CAD
- ✅ Team features
- ✅ Database + caching

**Configure Claude:** See mcp-server/README.md

---

## 📚 Documentation

| File | What's Inside |
|------|---------------|
| **DEPLOY_QUICK_REFERENCE.md** | Quick deploy commands |
| **DEPLOYMENT.md** | Full deployment guide |
| **QUICKSTART.md** | Detailed setup for all options |
| **frontend/README.md** | Frontend documentation |
| **backend/README.md** | Backend documentation |
| **mcp-server/README.md** | MCP server documentation |

---

## 🎯 Recommended Path

```
1. Start with Basic (FREE)
   ↓ 2 minutes, validate idea
   
2. Upgrade to Professional
   ↓ Need STEP files, validation
   
3. Scale to Enterprise
   ↓ Team + Claude integration
```

**You can upgrade anytime!**

---

## 💰 Cost Summary

| Option | Monthly Cost | Setup Time |
|--------|-------------|------------|
| Basic | $0 | 2 min |
| Professional | $20 | 20 min |
| Enterprise | $50 | 1 hour |

---

## 🆘 Need Help?

1. **Quick commands?** → DEPLOY_QUICK_REFERENCE.md
2. **Step-by-step?** → DEPLOYMENT.md
3. **Features?** → QUICKSTART.md

---

## 🚀 Deploy Now!

**For quickest start:**
```bash
cd frontend
npm install
npm run dev
```

**Deploy to production:**
```bash
npm i -g vercel
vercel
```

**✅ Done in 2 minutes!**
