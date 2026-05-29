@echo off
REM Kolkata Real Estate - Railway Database Setup Script
REM Windows Batch Version

setlocal enabledelayedexpansion

REM Colors using ANSI codes (requires Windows 10+)
set GREEN=[0;32m
set RED=[0;31m
set YELLOW=[1;33m
set NC=[0m

cls
echo.
echo ================================================
echo Kolkata Real Estate - Database Setup
echo ================================================
echo.

REM Railway Database Configuration
set RAILWAY_HOST=YOUR_RAILWAY_PUBLIC_HOST
set RAILWAY_PORT=YOUR_RAILWAY_PUBLIC_PORT
set RAILWAY_USER=root
set RAILWAY_PASSWORD=YOUR_RAILWAY_MYSQL_PASSWORD
set RAILWAY_DB=railway

echo Railway Database Configuration:
echo Host: %RAILWAY_HOST%
echo Port: %RAILWAY_PORT%
echo User: %RAILWAY_USER%
echo Database: %RAILWAY_DB%
echo.

REM Check if mysql client is installed
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL client is not installed
    echo Please download from: https://dev.mysql.com/downloads/mysql/
    pause
    exit /b 1
)

echo Testing connection to Railway database...
mysql -h %RAILWAY_HOST% -P %RAILWAY_PORT% -u %RAILWAY_USER% -p%RAILWAY_PASSWORD% -e "SELECT 1" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Connection failed
    echo Please verify your credentials
    pause
    exit /b 1
)
echo Connection successful
echo.

echo Initializing database schema...
if exist "Kolkata-database\database.sql" (
    mysql -h %RAILWAY_HOST% -P %RAILWAY_PORT% -u %RAILWAY_USER% -p%RAILWAY_PASSWORD% %RAILWAY_DB% < Kolkata-database\database.sql
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to initialize database schema
        pause
        exit /b 1
    )
    echo Database schema initialized successfully
) else (
    echo ERROR: Database schema file not found
    pause
    exit /b 1
)

echo.
echo Verifying database...
for /f %%i in ('mysql -h %RAILWAY_HOST% -P %RAILWAY_PORT% -u %RAILWAY_USER% -p%RAILWAY_PASSWORD% %RAILWAY_DB% -e "SHOW TABLES;" ^| find /c /v ""') do set TABLES=%%i
echo Database contains %TABLES% tables

echo.
echo Creating admin user...
mysql -h %RAILWAY_HOST% -P %RAILWAY_PORT% -u %RAILWAY_USER% -p%RAILWAY_PASSWORD% %RAILWAY_DB% << EOF
INSERT IGNORE INTO users (username, email, password, role) 
VALUES ('admin', 'admin@example.com', '$2a$12$QixJ.6bJ/OMy9w4p2WZJa.hMwsRLZHJ9Lp2KLMVx9OHgZhQ0bkLBa', 'ADMIN');
EOF

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create admin user
) else (
    echo Admin user configured
    echo Username: admin
    echo Password: Admin@1234
    echo WARNING: Change password after first login!
)

echo.
echo ================================================
echo Database setup completed successfully!
echo ================================================
echo.
echo Next Steps:
echo 1. Deploy backend to Render with Railway credentials
echo 2. Deploy frontend to Render
echo 3. Verify both services are running
echo 4. Test admin login
echo.
pause
