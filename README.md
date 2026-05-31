# ML for Hardware Engineers — 50-day training site

An interactive, browseable training plan to break into **Apple Silicon ML** and **NVIDIA GPU architecture** roles. Built for final-year ECE students starting from Python basics.

**Live site:** Deploy to GitHub Pages following the instructions below.

---

## What's inside

- `docs/index.html` — the full interactive site
- `docs/curriculum.js` — all 50 days of content (reading lists, coding tasks, mentor questions)
- `docs/app.js` — progress tracking, phase navigation, expandable day cards
- All data is plain JavaScript — easy to edit, fork, customize

---

## Features

- **Browse all 50 days** organized into 4 phases (Python → Classical ML → Neural Nets → Capstone)
- **Track progress** with checkboxes that save to localStorage (persists across sessions)
- **Streak counter** to encourage daily commits
- **Expandable day cards** with reading list, coding tasks, hardware-connection note, and mentor check-in question per day
- **Dark mode** auto-applies based on system preference
- **Mobile responsive** — works on phones for quick reference

---

## Deploy to GitHub Pages (3 steps)

### 1. Create a new GitHub repo
```bash
gh repo create ml-hardware-roadmap --public
```

### 2. Push these files
```bash
git init
git add .
git commit -m "Initial: 50-day ML for hardware site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ml-hardware-roadmap.git
git push -u origin main
```

### 3. Enable Pages
- Go to your repo on GitHub
- Settings → Pages
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/docs**
- Save

Your site will be live at `https://YOUR_USERNAME.github.io/ml-hardware-roadmap/` in about a minute.

---

## How your cousin uses it

1. Open the site on day 1
2. Click the first phase tab → Day 1 card expands
3. Complete the reading and coding tasks
4. Push the day's commit to GitHub
5. Click "Mark complete" — progress saves
6. Next day, return to the site and continue

The Sunday mentor session uses the weekly review template (in the source repo). Your husband asks the check-in questions from each day the cousin completed that week.

---

## Customizing the curriculum

All content is in `docs/curriculum.js`. To edit a day, find the day object:

```javascript
{
  d: 5, title: "Statistics: math behind every ML decision", phase: 0, badges: ["read", "code"],
  read: [ ... ],
  code: [ ... ],
  hw: "...",
  mentor: "..."
}
```

Edit the strings, push, GitHub Pages rebuilds automatically.

---

## Roadmap (for the student)

| Phase | Days | Outcome |
|-------|------|---------|
| 1 | 1–12 | Python, NumPy, Pandas — fluent with hardware datasets |
| 2 | 13–27 | Classical ML — XGBoost, SHAP, clustering on real workloads |
| 3 | 28–40 | Neural networks — PyTorch, LSTMs, transformers |
| 4 | 41–50 | Capstone — ML cache replacement predictor shipped to GitHub |

After day 50, follow the post-capstone plan: **August** — CUDA GEMM optimization (Project 2), **October–November** — ML-assisted RTL verification (Project 3), **September** — apply to Apple and NVIDIA new grad programs.

---

## License

MIT — fork it, modify it, share it with other students.
