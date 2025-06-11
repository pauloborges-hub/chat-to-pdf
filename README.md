# Chat to PDF 

**Chat to PDF** is a modern web application that allows users to upload PDF files and interact with their content through an intelligent AI-powered chat interface.

---

##  Features

- Upload and parse PDF documents
- Chat with your PDF content using LLMs (via LangChain & OpenAI)
- User authentication with Clerk
- Payment integration via Stripe
- Embedding & vector search with Pinecone
- Firebase for auth and real-time features
- PDF rendering and custom export
- Drag-and-drop file support
- Notifications and markdown rendering
- Clean and responsive UI with TailwindCSS + DaisyUI

---

##  Tech Stack

### Frontend
- **Next.js** 14
- **React** 18
- **TailwindCSS** + **DaisyUI**
- **Radix UI** (Toast, Slot)
- **Lucide React** (icons)
- **React Dropzone**
- **React Markdown**, **React PDF**

### Backend / AI
- **LangChain** (core, openai, pinecone, community)
- **Pinecone** (vector DB)
- **OpenAI API**
- **pdf-parse**
- **Firebase** / **Firebase Admin**

### Auth & Payments
- **Clerk**
- **Stripe**

---

## 📁 Project Structure

```bash
chat-to-pdf
├── .clerk/                 # Clerk configuration
├── .next/                  # Next.js build output
├── actions/                # Server-side actions or helpers
├── app/                    # Main Next.js 14 App directory
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries and helpers
├── node_modules/           # Project dependencies
├── public/                 # Static files (e.g., images, icons)
├── .eslintrc.json          # ESLint config
├── .gitignore              # Git ignored files
├── components.json         # UI components metadata (optional use)
├── firebase.ts             # Firebase client setup
├── firebaseAdmin.ts        # Firebase Admin SDK setup
├── middleware.ts           # Next.js middleware logic
├── next-env.d.ts           # TypeScript Next.js environment types
├── next.config.mjs         # Next.js configuration
├── package.json            # Project manifest
├── package-lock.json       # Dependency lockfile
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation

---