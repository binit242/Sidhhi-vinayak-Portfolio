@echo off
REM Kolkata Real Estate - Quick Start Script for Windows

echo ==============================================
echo Kolkata Real Estate - Quick Setup
echo ==============================================
echo.

echo Checking prerequisites...

REM Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed. Please install Java 17 or higher.
    pause
    exit /b 1
)
echo [OK] Java found

REM Check MySQL
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] MySQL is not installed. Please install MySQL 8.0+
    pause
    exit /b 1
)
echo [OK] MySQL found

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)
echo [OK] Node.js found

echo.
echo ==============================================
echo Database Setup
echo ==============================================
echo.

set /p MYSQL_PASSWORD="Enter MySQL root password: "

REM Create database
echo Creating database...
mysql -u root -p%MYSQL_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS kolkata_realestate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

REM Create user
echo Creating database user...
mysql -u root -p%MYSQL_PASSWORD% -e "CREATE USER IF NOT EXISTS 'realestate_user'@'localhost' IDENTIFIED BY 'RealEstate@2024';"
mysql -u root -p%MYSQL_PASSWORD% -e "GRANT ALL PRIVILEGES ON kolkata_realestate.* TO 'realestate_user'@'localhost';"
mysql -u root -p%MYSQL_PASSWORD% -e "FLUSH PRIVILEGES;"

REM Import schema
echo Importing database schema...
mysql -u realestate_user -pRealEstate@2024 kolkata_realestate < kolkata-backend\database\schema.sql

echo [OK] Database setup complete

echo.
echo ==============================================
echo Installing Frontend Dependencies
echo ==============================================
echo.

cd kolkata-frontend
call npm install
cd ..

echo [OK] Frontend dependencies installed

echo.
echo ==============================================
echo Setup Complete!
echo ==============================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (in Command Prompt 1):
echo    cd kolkata-backend
echo    mvnw.cmd spring-boot:run
echo.
echo 2. Start Frontend (in Command Prompt 2):
echo    cd kolkata-frontend
echo    npm run dev
echo.
echo 3. Access the application:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:8080
echo    Admin:    http://localhost:5173/admin/login
echo.
echo Default Admin Credentials:
echo    Username: admin
echo    Password: Admin@1234
echo.
echo [WARNING] Remember to change the admin password after first login!
echo.
pause
