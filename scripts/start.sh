#!/bin/bash

echo "Запуск проекта To-Do App..."

echo "Остановка старых контейнеров..."
docker-compose down

echo "Применение миграций..."
docker-compose run backend npx prisma migrate deploy

echo "Сборка и запуск контейнеров..."
docker-compose up --build -d

echo "Проверка запущенных сервисов:"
docker-compose ps

echo "Проект успешно запущен!"
echo "Фронтенд: http://localhost:3001"
echo "Бэкенд: http://localhost:3000"
