@echo off
echo Testing PDF Service...
echo.

cd /d "%~dp0"

echo Running test script...
node test.js

echo.
echo Test completed. Check test-output.pdf file.
pause