#!/bin/bash

# Kolkata Real Estate - Quick Start Script
# This script helps you set up and run the application

set -e

echo "=============================================="
echo "Kolkata Real Estate - Quick Setup"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed. Please install Java 17 or higher.${NC}"
    exit 1
else
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -lt 17 ]; then
        echo -e "${RED}❌ Java version must be 17 or higher. Current: $JAVA_VERSION${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Java $JAVA_VERSION found${NC}"
fi

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo -e "${YELLOW}⚠ Maven not found. Will use Maven wrapper.${NC}"
else
    echo -e "${GREEN}✓ Maven found${NC}"
fi

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL is not installed. Please install MySQL 8.0+${NC}"
    exit 1
else
    echo -e "${GREEN}✓ MySQL found${NC}"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
else
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js version must be 18 or higher. Current: v$NODE_VERSION${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Node.js v$NODE_VERSION found${NC}"
fi

echo ""
echo "=============================================="
echo "Database Setup"
echo "=============================================="
echo ""

read -p "Enter MySQL root password: " -s MYSQL_ROOT_PASSWORD
echo ""

# Create database
echo "Creating database..."
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS kolkata_realestate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || {
    echo -e "${RED}❌ Failed to create database. Check your MySQL credentials.${NC}"
    exit 1
}

# Create user
echo "Creating database user..."
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER IF NOT EXISTS 'realestate_user'@'localhost' IDENTIFIED BY 'RealEstate@2024';" 2>/dev/null
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "GRANT ALL PRIVILEGES ON kolkata_realestate.* TO 'realestate_user'@'localhost';" 2>/dev/null
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "FLUSH PRIVILEGES;" 2>/dev/null

# Import schema
echo "Importing database schema..."
mysql -u realestate_user -pRealEstate@2024 kolkata_realestate < kolkata-backend/database/schema.sql 2>/dev/null || {
    echo -e "${RED}❌ Failed to import schema.${NC}"
    exit 1
}

echo -e "${GREEN}✓ Database setup complete${NC}"

echo ""
echo "=============================================="
echo "Backend Configuration"
echo "=============================================="
echo ""

# Update application.properties with database password
sed -i.bak 's/YOUR_MYSQL_PASSWORD/RealEstate@2024/' kolkata-backend/src/main/resources/application.properties

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
sed -i.bak "s/YOUR_256_BIT_SECRET_KEY_REPLACE_THIS_IN_PRODUCTION_MINIMUM_32_CHARS/$JWT_SECRET/" kolkata-backend/src/main/resources/application.properties

echo -e "${GREEN}✓ Backend configured${NC}"

echo ""
echo "=============================================="
echo "Installing Frontend Dependencies"
echo "=============================================="
echo ""

cd kolkata-frontend
npm install
cd ..

echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo ""
echo "=============================================="
echo "Setup Complete!"
echo "=============================================="
echo ""
echo "To start the application:"
echo ""
echo "1. Start Backend (in terminal 1):"
echo "   cd kolkata-backend"
echo "   ./mvnw spring-boot:run"
echo ""
echo "2. Start Frontend (in terminal 2):"
echo "   cd kolkata-frontend"
echo "   npm run dev"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8080"
echo "   Admin:    http://localhost:5173/admin/login"
echo ""
echo "Default Admin Credentials:"
echo "   Username: admin"
echo "   Password: Admin@1234"
echo ""
echo -e "${YELLOW}⚠ Remember to change the admin password after first login!${NC}"
echo ""
