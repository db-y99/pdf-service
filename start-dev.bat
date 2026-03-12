@echo off
echo Starting PDF Service on port 3001...
echo.

cd /d "%~dp0"

if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting development server...
npm run dev