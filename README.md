# 🎯 KidsCode

**KidsCode** là một ứng dụng học lập trình Arduino và ESP32 thông qua giao diện đồ họa đơn giản, phù hợp cho trẻ em và người mới bắt đầu. Dự án được xây dựng bằng Electron và tích hợp Arduino CLI để biên dịch và nạp mã vào các board Arduino và ESP32.

---

## 📋 Yêu Cầu Hệ Thống

- **Hệ Điều Hành**: Windows (ưu tiên Windows 10 trở lên), macOS, hoặc Linux.
- **Node.js**: Phiên bản 18.16.1 trở lên (khuyến nghị).
- **npm**: Được đi kèm với Node.js.
- **Dung Lượng Trống**: Khoảng 1GB để cài đặt dependencies và Arduino CLI.

---

## 🚀 Cài Đặt và Sử Dụng

### ✅ Cách 1: Dành cho Người Dùng Windows – Cài Đặt Tự Động

Đã có sẵn script `install.bat` để cài đặt nhanh tất cả dependencies và giải nén Arduino CLI và Electron.

1. **Tải về project từ GitHub**:
    ```bash
    git clone https://github.com/xuanphu1/KidsCode.git D:/KidsCode
    ```

2. **Vào thư mục dự án**:
    ```bash
    cd D:/KidsCode
    ```

3. **Giải nén các file cần thiết**:
   Trước khi chạy script, bạn cần đảm bảo rằng các file sau đã được giải nén:
   - **Giải nén `arduino.zip`** trong thư mục `arduino`.
   - **Giải nén `electron.zip`** trong thư mục `node_modules/electron/dist`.

   Nếu các file này chưa được giải nén, script sẽ yêu cầu bạn làm điều đó.

4. **Chạy script cài đặt**:
    ```bash
    ./install.bat
    ```

   Script sẽ tự động:
   - Kiểm tra và yêu cầu cài đặt Node.js nếu chưa có.
   - Cài đặt các dependencies của dự án (bao gồm Electron và thư viện yaml).
   - Giải nén Arduino CLI và Electron nếu các file `.zip` tồn tại trong thư mục.

5. **Chạy ứng dụng**:
    ```bash
    npm start
    ```

### ✅ Cách 2: Cài Đặt Thủ Công (Windows, macOS, Linux)

1. **Cài đặt Node.js**:
   - Tải và cài đặt Node.js từ [https://nodejs.org/](https://nodejs.org/) (khuyến nghị phiên bản 18.16.1).
   - Kiểm tra phiên bản sau khi cài đặt:
     ```bash
     node -v
     npm -v
     ```

2. **Tải về project từ GitHub**:
    ```bash
    git clone https://github.com/xuanphu1/KidsCode.git
    cd KidsCode
    ```

3. **Giải nén các file cần thiết**:
   Trước khi chạy lệnh `npm install`, bạn cần đảm bảo rằng các file sau đã được giải nén:
   - **Giải nén `arduino.zip`** trong thư mục `arduino`.
   - **Giải nén `electron.zip`** trong thư mục `node_modules/electron/dist`.

4. **Cài đặt dependencies**:
    ```bash
    npm install
    ```

   Lưu ý: Đảm bảo bạn đã cài đặt Git và chạy lệnh này trong thư mục dự án.

5. **Chạy ứng dụng**:
    ```bash
    npm start
    ```

---

## 📦 Các Thư Viện Arduino Được Cài Đặt Tự Động

Khi chạy ứng dụng lần đầu, **KidsCode** sẽ tự động kiểm tra và cài đặt các thư viện Arduino sau vào thư mục được chỉ định trong file `arduino-cli.yaml`:

- **Adafruit BME280 Library**
- **PMS Library**
- **MH-Z14A Library**
- **DS3231**
- **PubSubClient**

Lưu ý: Đảm bảo máy tính có kết nối Internet để tải các thư viện này.

---

## 🛠️ Cấu Trúc Dự Án

- **`arduino/`**: Chứa Arduino CLI và các file liên quan.
- **`blocks/`**: Chứa các khối giao diện đồ họa (dựa trên Blockly).
- **`main.js`**: File chính của Electron, xử lý logic cài đặt thư viện và giao tiếp với Arduino CLI.
- **`install.bat`**: Script cài đặt tự động cho Windows.
- **`package.json`**: File cấu hình npm, chứa danh sách dependencies.

---

## 🐛 Xử Lý Sự Cố

- **Lỗi "Node.js chưa được cài"**: Tải và cài đặt Node.js từ [https://nodejs.org/](https://nodejs.org/).
- **Lỗi "Cannot find module 'electron'"**: Chạy lại `npm install electron` trong thư mục dự án.
- **Lỗi "Cannot find module 'yaml'"**: Chạy `npm install yaml` trong thư mục dự án.
- **Ứng dụng không khởi động**: Kiểm tra log trong terminal để xác định lỗi.

---

## 🤝 Đóng Góp

- Fork dự án từ GitHub.
- Tạo pull request với các thay đổi của bạn.
- Báo lỗi hoặc đề xuất tính năng qua Issues.

---

## 📜 Giấy Phép

Dự án được phát hành dưới **MIT License**.
