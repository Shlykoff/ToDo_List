echo "Installing Backend..."
cd backend
yarn && npx prisma db push && npx prisma generate &
echo "Installing Frontend..."
cd ../frontend
yarn
