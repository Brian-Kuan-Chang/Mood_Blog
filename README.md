# Mood Blog 🌈✍️

## Overview

Mood Blog is an AI-powered journaling app designed to analyze your emotional well-being through your journal entries. It allows you to gain insights into your mood and even ask AI-based questions to understand yourself better.

## Tech Stack 🛠️

- **Frontend**: Next.js (React framework)
- **Backend**: Prisma (ORM), MySQL (Database)
- **AI**: Langchain library, OpenAI GPT-3.5 Turbo model
- **Authentication**: Clerk

## Features 🌟

- Write and save journal entries securely
- AI-powered mood analysis for each journal entry
- Ask questions to the AI for personalized insights based on your entries
- User Authentication using Clerk
- Easy-to-use interface

## Prerequisites 📝

Before you begin, ensure you have installed:

- Node.js
- MySQL
- Prisma CLI (optional)

## Installation 📥

```bash
# Clone the repository
git clone https://github.com/yourusername/mood-blog.git

# Navigate into the project directory
cd mood-blog

# Install dependencies
npm install

# Initialize MySQL database (follow your MySQL setup)
# ...

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev
```
