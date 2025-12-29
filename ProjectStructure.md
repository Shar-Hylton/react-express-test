#  Project Strucutre

project-root/
│
├── server/          ← Express API
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   └── package.json
│
└── client/          ← Next.js app
    ├── src/
    │   ├── app/     ← Next.js routing
    │   ├── components/
    │   ├── context/
    │   ├── lib/
    │   └── styles/
    └── package.json

# Next.js Structure

src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx          ← landing page
│   ├── login/
│   │   └── page.jsx
│   ├── register/
│   │   └── page.jsx
│   ├── dashboard/
│   │   └── page.jsx      ← protected
│   └── notes/
│       ├── page.jsx
│       └── new/
│           └── page.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── NoteCard.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── lib/
│   └── api.js
│
└── styles/
