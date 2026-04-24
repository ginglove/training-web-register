#!/bin/bash

echo "🚀 Starting Database Setup..."

# 1. Start the PostgreSQL Docker Container
echo "🧹 Cleaning up old Docker volumes to ensure clean authentication..."
docker compose down -v

echo "📦 Starting PostgreSQL via Docker Compose..."
docker compose up -d

# Wait a few seconds for Postgres to be fully ready to accept connections
echo "⏳ Waiting for PostgreSQL to initialize (10 seconds)..."
sleep 10

# 2. Push the Prisma Schema to the database
echo "🛠️ Pushing Prisma Schema to database..."
npx prisma db push

# 3. Seed the initial data
echo "🌱 Seeding initial data (Admin user, questions, active session)..."
npm run db:seed

echo "✅ Database is ready! You can now run 'npm run dev' to start the application."
