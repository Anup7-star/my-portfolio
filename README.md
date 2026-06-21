# Anup S | Developer Portfolio Website

A highly polished, responsive, and interactive single-page developer portfolio website built from scratch. Designed with a modern, premium "tech-forward" dark theme, custom ambient gradient animations, and glassmorphism styling. 

It highlights my experience as a **Backend Developer Intern** at **Caytm Technologies** and my academic studies in **B.Tech Computer Science (Core)** at **Vellore Institute of Technology (VIT Chennai)**.

---

## 🚀 Live Preview & Code

- **GitHub Repository**: [https://github.com/Anup7-star/my-portfolio](https://github.com/Anup7-star/my-portfolio)
- **Local Server Access**: `http://localhost:9090` (when running locally)

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5 for SEO optimization
- **Styling**: Vanilla CSS3 (Custom Variables, Flexbox/Grid, Glassmorphic Backdrop Filters, custom `@keyframes` background drift animations)
- **Logic**: ES6+ JavaScript (Intersection Observer API for active navigation states & scroll-triggered fade-ins, form validation)
- **Assets**: Google Fonts (Outfit & Inter), Lucide Vector Icons

---

## 📁 Project Structure

```text
my-portfolio/
│
├── assets/
│   └── profile.jpg      # Profile Photo in Hero section
│
├── index.html           # Main semantic structure & SEO metadata
├── style.css            # Styling system, design tokens, & media queries
├── main.js             # Mobile navigation drawer, filters, and form handlers
├── .gitignore           # Excludes IDE and system metadata from Git tracking
└── README.md            # Project documentation (this file)
```

---

## 🌟 Key Sections

1. **Hero**: Gradient branding, custom profile picture, animated tags, and Call to Actions (CTAs) directing to my projects.
2. **About Me**: Introduces my background, location (Kozhikode/Chennai), current university study plan (2025-2029), and campus club involvement (**French Club VITC**).
3. **Skills & Expertise**: Dynamic progress meters showing language proficiency (Java, JavaScript, Python, C/C++) and technical categorizations (Backend Frameworks, Database engines, Tools & DevOps).
4. **Services**: Service cards mapping out backend capabilities (API Development, Schema Design, Security & JWT integration, script automation).
5. **Projects**: A filterable project portfolio including a **Java Spring Boot Hospital Appointment System**, an **API Gateway & Rate Limiter** simulation, and a **Distributed Web Scraper**.
6. **Contact Me**: Form validation connected to a Google Forms submit handler, complete with a custom pop-up confirmation modal.

---

## 💻 How to Run Locally

You can preview the website instantly without installing any dependencies.

### Option 1: Direct Open
Double-click `index.html` inside the project folder to launch it directly in any modern browser.

### Option 2: Python Local Server (Recommended)
To run a local web server (to test form submissions and active routing):
1. Open terminal inside the project directory.
2. Run:
   ```bash
   python -m http.server 9090
   ```
3. Open your browser and navigate to: [http://localhost:9090](http://localhost:9090)

---

## ⚙️ How to Customize

- **Change Profile Photo**: Save your new image in the `assets/` folder, name it `profile.jpg` (or overwrite the existing one), and it will automatically update in the Hero section.
- **Link Socials & Emails**: Search for `anups241207@gmail.com` and `Anup7-star` inside `index.html` to update the mailto hrefs and GitHub profile links.
- **Add Projects**: Locate `<div class="projects-grid">` in `index.html` and copy/paste a `<div class="project-card">` block to add more of your work.
