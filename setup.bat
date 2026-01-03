@echo off
echo Starting Setup... > setup_log.txt

echo Setting up Server... >> setup_log.txt
cd server
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt >> ..\setup_log.txt 2>&1
cd ..

echo Setting up Client... >> setup_log.txt
if exist client (
    rmdir /s /q client
)
call npm create vite@latest client -- --template react
cd client
call npm install >> ..\setup_log.txt 2>&1

echo Setup Complete! >> ..\setup_log.txt
