# HƯỚNG DẪN CẤU HÌNH VÀ CHẠY PROJECT
## Clone repository
 ```bash
    https://github.com/HT-Tuan/MedPro.git
  ```
#
## Cách 1: Sử dụng nodejs
- Mở terminal và di chuyển vào thư mục MedPro
- Cài đặt các dependencies cho server
```bash
npm i
```
- Tại thư mục MedPro thực hiện chạy lệnh thêm data và chạy server
```bash
npm run seeder && npm run prod 
```
- Mở terminal khác và di chuyển vào thư mục frontend mở file package.json và chuyển:
 "proxy": "http://Server:5000" thành  "proxy": "http://localhost:5000"
- Sau đó chạy lệnh
```bash
npm i
```
```bash
npm start
```
#
## Cách 2: Sử dụng docker
- Mở terminal vào thư mục MedPro
```bash
docker compose up
```
#
### Phần mềm chạy trên đường dẫn
http://localhost:3000
