<div align="center">

# Anesh SM

**Full Stack Developer · React, Node.js, PostgreSQL · Qlik Sense and Power BI**

I build version control, deployment and migration tooling for BI teams.<br>
Since 2023 I've worked on a production SaaS platform for Qlik Sense and Power BI, from intern to Software Engineer.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/anesh-somanath-majalikar-13666b222)
[![X](https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white)](https://twitter.com/anesh_sm)
[![Dev.to](https://img.shields.io/badge/Dev.to-0A0A0A?style=flat-square&logo=dev.to&logoColor=white)](https://dev.to/aneshsm)
[![CodePen](https://img.shields.io/badge/CodePen-000000?style=flat-square&logo=codepen&logoColor=white)](https://codepen.io/aneshsm)
[![CodeSandbox](https://img.shields.io/badge/CodeSandbox-151515?style=flat-square&logo=codesandbox&logoColor=white)](https://codesandbox.io/u/aneshsm)
[![Instagram art](https://img.shields.io/badge/Art-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/arto.beginner)

</div>

---

## About

I joined as an intern in February 2023, became an Associate Engineer, and am now a Software Engineer. In October 2023 I rebuilt the product from a server-rendered Handlebars app into the React client and Node.js server it runs on today. I own its architecture and the versioning core, and I look after the Qlik and Power BI integrations. On our Qlik to Power BI migration tool, a team project, I own the migration flow.

Since October 2023 that's about **2,800 commits**, and roughly **9 in 10 lines** of the current client and server code were last written by me.

## What I've built

| Area | What it does |
|---|---|
| 🌿 **Git-style versioning for BI apps** | Repositories, branches, compare, merge to a parent branch, and a commit graph for Qlik apps. A manager approves a merge against the latest destination commit before a change is promoted. |
| ☁️ **Qlik Sense Enterprise and SaaS** | Engine API (enigma.js) and QRS, certificates, token lifecycle, SaaS clone, bulk repository creation, and loop-and-reduce pagination. |
| 📊 **Power BI and Fabric** | Extraction through Fabric REST, compare by file category, per-item merge selection, platform adapters behind a single dispatch, in-app report embedding, separate Fabric and Power BI consent, and manual semantic-model refresh. |
| 🔄 **Qlik to Power BI migration** | One Qlik extract reused for review and migration, a mapping catalog with a validator, a per-visual picker, theme and layout support, and one honest migration percentage. When Power BI Desktop refused our output, I fixed the causes and added a shape check against Desktop-saved files to the pre-commit hook. |
| 🔐 **Security** | AES-256-GCM payload encryption with gzip for large payloads, client secrets encrypted at rest and masked in the API, nonce-bound sign-in, identity taken from the signed token, and git commands run as argument lists. Worked through pen-test and ZAP findings. |
| ⚙️ **Reliability** | Worker threads for background work, recovery when the server stops mid-commit, retry with backoff, scheduled jobs, and structured logging with pino. |
| 🧹 **Data lifecycle** | Housekeeping that finds stale and duplicate apps, then quarantines, purges on a schedule and restores them. Cloud backup to the customer's own git host. |
| 👥 **Sync, regression and docs** | User and project sync moved from the browser to the server so a failed fetch can't deactivate everyone. Regression snapshots compared after a job, with JSONB history. Generated release documentation. |
| 🤖 **AI-assisted engineering** | Set up the team's Claude Code workspace: rules, skills, review agents, git hooks, and UI checks through the Playwright MCP. Design decisions are recorded as ADRs. |

<details>
<summary><b>Year by year</b></summary>

<br>

**2023: the base.** Scaffolded the React, TypeScript, Vite and MUI client and the Node.js, Express, Sequelize and PostgreSQL server. Built the first screens and started the git-style workflow for Qlik apps: branches, merge to parent, merge approval and a commit graph.

**2024: Qlik depth and operations.** Qlik Enterprise setup (hub URL, certificates, tokens) and the start of Qlik SaaS support. Job notification mail, the first version of cloud backup in a worker thread, error classes and structured logging.

**2025: reliability, security and new modules.** Moved post-commit work to worker threads with crash recovery. Scheduled jobs, SaaS pagination, release documentation and a regression module. Security work driven by pen-test reports and ZAP scans: input validation, security middleware and a CSP with per-request nonces.

**2026: multi-platform and migration.** Housekeeping (quarantine, purge, restore), AES-256-GCM payload encryption, and Power BI as a second platform. User and project sync moved to the server. Owned the Qlik to Power BI migration flow and set up the team's AI-assisted workspace.

</details>

## Tech stack

**Languages and frontend**

<img src="https://skillicons.dev/icons?i=ts,js,react,vite,materialui,tailwind" alt="TypeScript, JavaScript, React, Vite, Material UI, Tailwind CSS" />

React Router, React Hook Form with Yup, TanStack Query, IndexedDB, react-window, jsondiffpatch, @gitgraph/js, Web Crypto

**Backend and data**

<img src="https://skillicons.dev/icons?i=nodejs,express,postgres,sequelize" alt="Node.js, Express, PostgreSQL, Sequelize" />

JWT, WebSockets, worker threads, node-schedule, pino, Nodemailer, Handlebars, JSONB, Umzug migrations

**BI platforms**

![Qlik Sense](https://img.shields.io/badge/Qlik_Sense-009848?style=for-the-badge&logo=qlik&logoColor=white)
![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Microsoft Entra ID](https://img.shields.io/badge/Microsoft_Entra_ID-0078D4?style=for-the-badge&logo=microsoft&logoColor=white)

Qlik Engine API (enigma.js), QRS, Power BI REST and Embedded, Fabric REST, PBIP, Power Query M

**Tools**

<img src="https://skillicons.dev/icons?i=git,github,bitbucket,webpack,postman,figma" alt="Git, GitHub, Bitbucket, Webpack, Postman, Figma" />

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

Git hooks, Conventional Commits, MCP servers (Playwright, Postgres), ADRs

**Learning next:** Docker, CI/CD and Nginx · Next.js, edge functions and serverless · RAG with open-source LLMs · Zustand

<details>
<summary><b>Used before</b></summary>

<br>

<img src="https://skillicons.dev/icons?i=java,php,mongodb,mysql" alt="Java, PHP, MongoDB, MySQL" />

</details>

## Archived projects

<details>
<summary><b>Earlier explorations, kept for reference</b></summary>

<br>

| Project | What it explored |
|---|---|
| [AlvasNiraamaya](https://github.com/AneshSM/AlvasNiraamaya) | College major project: React Native patient app for an Ayurvedic hospital |
| [backend-js-template](https://github.com/AneshSM/backend-js-template) | Minimal production-ready Express.js (ESM) backend template |
| [express-typescript-setup](https://github.com/AneshSM/express-typescript-setup) | Express + TypeScript boilerplate |
| [restful_API-PostgreSQL_Prisma](https://github.com/AneshSM/restful_API-PostgreSQL_Prisma) | REST API with Express, TypeScript, Prisma and PostgreSQL |
| [restful_API-PostgreSQL_Sequelize](https://github.com/AneshSM/restful_API-PostgreSQL_Sequelize) | The same REST API on Sequelize, to compare ORMs |
| [vite-react_ts-mui-setup](https://github.com/AneshSM/vite-react_ts-mui-setup) | Vite + React + TypeScript + Material UI starter |
| [ReactJS-Projects](https://github.com/AneshSM/ReactJS-Projects) | Learning React through small projects |

</details>

## GitHub stats

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=aneshsm&show_icons=true&hide_border=true&theme=dark" />
  <img src="https://github-readme-stats.vercel.app/api?username=aneshsm&show_icons=true&hide_border=true" alt="GitHub stats" height="165" />
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=aneshsm&layout=compact&hide_border=true&theme=dark" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=aneshsm&layout=compact&hide_border=true" alt="Top languages" height="165" />
</picture>

<sub>Most of my work is in private company repositories, so these cards show only public activity.</sub>

</div>

---

<div align="center">

Outside code I sketch, and post the results on <a href="https://www.instagram.com/arto.beginner">Instagram</a>.

</div>
