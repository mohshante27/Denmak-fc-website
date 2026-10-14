# Denmak FC Maganyakulo - Official Website

![Denmak FC Logo](images/logo.png)

The official digital headquarters for **Denmak FC Maganyakulo**, a football club based in Maganyakulo, Matuga Constituency, Kwale County, Kenya. Competing in the FKF Division Two Northern Zone League (Pool A).

This project serves four main audiences simultaneously: **Supporters, Players, Sponsors, and the Media.**

---

##  Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Future Roadmap (Admin Dashboard)](#-future-roadmap-admin-dashboard)
- [Contact & Social Media](#-contact--social-media)
- [License](#-license)

---

##  About the Project

This website was built to transform Denmak FC from a local community team into a nationally recognized brand. It serves as a central hub for:

- **Match Centre:** Live league standings, upcoming fixtures, and recent results.
- **Squad Profiles:** Detailed information on players, technical staff, and club legends.
- **History & Heritage:** The club's journey from 1998 to national parliamentary recognition.
- **Revenue & Partnerships:** Information for sponsors and an online merchandise store.
- **Latest News:** Updates, match reports, and media highlights.

---

##  Key Features

- ** Fully Responsive Design:** Optimized for mobile phones, which is how the majority of supporters access the site.
- ** Dynamic Match Centre:** Displays league tables, fixtures, and results.
- ** News Hub:** Dedicated section for club news, with direct links to YouTube highlights and Facebook posts.
- ** Sponsorship Portal:** Detailed packages, branding locations, and downloadable proposals for potential partners.
- ** Online Store (MVP):** A frontend mockup of the club's merchandise store with M-Pesa/WhatsApp integration ready.
- ** Club History:** A visual timeline highlighting key milestones, including parliamentary recognition.
- ** SEO Optimized:** Structured data (JSON-LD) for SportsTeam, Organization, and Website to help search engines and AI understand the club.

---

##  Tech Stack

This project is currently built as a **static frontend website**:

- **HTML5:** Semantic structure and SEO meta tags.
- **CSS3:** Custom styling, CSS Variables, Flexbox, and Grid. No external frameworks (like Bootstrap) for maximum performance.
- **JavaScript (Vanilla):** Interactivity, hamburger menu, carousel logic, and cart simulation.
- **FontAwesome/Icons:** For social media and UI icons.

### Planned Backend Stack (For Admin Dashboard)
To allow club officials to update content without touching code, the following stack is planned:
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Netlify (Frontend) + Render/Railway (Backend)

---

##  Project Structure

```text
denmak-fc/
│
├── index.html              # Homepage (Hero, Next Match, News, Partners)
├── matches.html            # Match Centre (League Table, Fixtures, Results)
├── squad.html              # Squad (Goalkeepers, Defenders, Midfielders, Forwards)
├── history.html            # History (Timeline, Legends Corner, Management)
├── revenue.html            # Revenue Hub (Store & Partnerships overview)
├── store.html              # Online Store (Merchandise & Cart)
├── partnerships.html       # Sponsorship Packages & Opportunities
│
├── pages/                  # Secondary Pages
│   ├── news.html           # Latest News Feed
│   ├── privacy.html        # Privacy Policy
│   ├── terms.html          # Terms of Service
│   └── sitemap.html        # Site Map
│
├── css/
│   └── style.css           # Main Stylesheet
│
├── js/
│   └── script.js           # Main JavaScript (Carousel, Cart, Menu)
│
└── images/                 # All club logos, player photos, and banners
