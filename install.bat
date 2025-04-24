@echo off
echo ========================================
echo   KidsCode - Cài đặt môi trường
echo ========================================

REM Kiểm tra Node.js đã cài chưa
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [!] Node.js chưa được cài. Vui lòng tải tại: https://nodejs.org/
    pause
    exit /b
)

REM Kiểm tra npm đã cài chưa
where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [!] npm chưa được cài. Vui lòng cài đặt Node.js (bao gồm npm) tại: https://nodejs.org/
    pause
    exit /b
)

REM Giải nén Arduino CLI
echo [+] Giải nén Arduino CLI...
IF NOT EXIST "arduino\arduino.zip" (
    echo [!] File arduino.zip không tồn tại trong thư mục arduino. Vui lòng kiểm tra lại.
    pause
    exit /b
)
powershell -Command "Expand-Archive -Path './arduino/arduino.zip' -DestinationPath './arduino' -Force"

REM Kiểm tra xem Arduino CLI đã giải nén thành công chưa
IF NOT EXIST "arduino\arduino-cli.exe" (
    echo [!] Giải nén Arduino CLI thất bại. Vui lòng kiểm tra file arduino.zip.
    pause
    exit /b
)

REM Giải nén Electron
echo [+] Giải nén Electron...
IF NOT EXIST "node_modules\electron\dist\electron.zip" (
    echo [!] File electron.zip không tồn tại trong thư mục node_modules\electron\dist. Vui lòng kiểm tra lại.
    pause
    exit /b
)
powershell -Command "Expand-Archive -Path './node_modules/electron/dist/electron.zip' -DestinationPath './node_modules/electron/dist' -Force"

REM Kiểm tra xem Electron đã giải nén thành công chưa
IF NOT EXIST "node_modules\electron\dist\electron.exe" (
    echo [!] Giải nén Electron thất bại. Vui lòng kiểm tra file electron.zip.
    pause
    exit /b
)

REM Cài đặt tất cả dependencies từ package.json
echo [+] Cài đặt dependencies từ package.json...
npm install

REM Cài đặt Electron (nếu chưa có trong package.json)
echo [+] Đảm bảo Electron được cài đặt...
npm install electron

REM Cài đặt thư viện yaml (cần thiết để tạo file arduino-cli.yaml)
echo [+] Đảm bảo thư viện yaml được cài đặt...
npm install yaml

REM Hoàn tất
echo [✓] Cài đặt hoàn tất! Bạn có thể chạy ứng dụng bằng lệnh: npm start
pause
