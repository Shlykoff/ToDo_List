echo "Starting Backend..."
cd backend
yarn start:dev &

echo "Starting Frontend..."
cd ../frontend
yarn start
