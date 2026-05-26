#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}================================================${NC}"
echo -e "${YELLOW}Kolkata Real Estate - Database Setup${NC}"
echo -e "${YELLOW}================================================${NC}"
echo ""

# Railway Database Configuration
RAILWAY_HOST="railway.proxy.rlwy.net"
RAILWAY_PORT="53307"
RAILWAY_USER="root"
RAILWAY_PASSWORD="MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI"
RAILWAY_DB="railway"

echo -e "${YELLOW}Railway Database Configuration:${NC}"
echo "Host: $RAILWAY_HOST"
echo "Port: $RAILWAY_PORT"
echo "User: $RAILWAY_USER"
echo "Database: $RAILWAY_DB"
echo ""

# Check if mysql client is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}✗ MySQL client is not installed${NC}"
    echo "Please install MySQL client:"
    echo "  Ubuntu/Debian: sudo apt-get install mysql-client"
    echo "  macOS: brew install mysql-client"
    echo "  Windows: Download from https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

echo -e "${YELLOW}Testing connection to Railway database...${NC}"
# Test connection
if mysql -h "$RAILWAY_HOST" -P "$RAILWAY_PORT" -u "$RAILWAY_USER" -p"$RAILWAY_PASSWORD" -e "SELECT 1" &> /dev/null; then
    echo -e "${GREEN}✓ Connection successful${NC}"
else
    echo -e "${RED}✗ Connection failed${NC}"
    echo "Please verify your credentials"
    exit 1
fi

echo ""
echo -e "${YELLOW}Initializing database schema...${NC}"

# Initialize database
if [ -f "Kolkata-database/database.sql" ]; then
    mysql -h "$RAILWAY_HOST" -P "$RAILWAY_PORT" -u "$RAILWAY_USER" -p"$RAILWAY_PASSWORD" "$RAILWAY_DB" < Kolkata-database/database.sql
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database schema initialized successfully${NC}"
    else
        echo -e "${RED}✗ Failed to initialize database schema${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Database schema file not found: Kolkata-database/database.sql${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Verifying database...${NC}"
TABLES=$(mysql -h "$RAILWAY_HOST" -P "$RAILWAY_PORT" -u "$RAILWAY_USER" -p"$RAILWAY_PASSWORD" "$RAILWAY_DB" -e "SHOW TABLES;" | wc -l)
echo -e "${GREEN}✓ Database contains $((TABLES-1)) tables${NC}"

echo ""
echo -e "${YELLOW}Creating admin user (if not exists)...${NC}"
mysql -h "$RAILWAY_HOST" -P "$RAILWAY_PORT" -u "$RAILWAY_USER" -p"$RAILWAY_PASSWORD" "$RAILWAY_DB" << EOF
INSERT IGNORE INTO users (username, email, password, role) 
VALUES ('admin', 'admin@example.com', '\$2a\$12\$QixJ.6bJ/OMy9w4p2WZJa.hMwsRLZHJ9Lp2KLMVx9OHgZhQ0bkLBa', 'ADMIN');
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Admin user configured${NC}"
    echo "  Username: admin"
    echo "  Password: Admin@1234"
    echo -e "${YELLOW}  ⚠️  Change password after first login!${NC}"
else
    echo -e "${RED}✗ Failed to create admin user${NC}"
fi

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}Database setup completed successfully!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Deploy backend to Render with Railway credentials"
echo "2. Deploy frontend to Render"
echo "3. Verify both services are running"
echo "4. Update CORS origins if needed"
echo ""
