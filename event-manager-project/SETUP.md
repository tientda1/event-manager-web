# Hướng dẫn thiết lập và chạy ứng dụng với JSON Server

## Bước 1: Cài đặt dependencies

```bash
npm install
```

## Bước 2: Chạy ứng dụng

### Cách 1: Chạy cả frontend và backend cùng lúc (Khuyến nghị)
```bash
npm run dev:full
```
Lệnh này sẽ chạy:
- JSON Server trên port 3001 (API backend)
- Vite dev server trên port 5173 (Frontend)

### Cách 2: Chạy riêng biệt

**Terminal 1 - Chạy JSON Server:**
```bash
npm run server
```

**Terminal 2 - Chạy Frontend:**
```bash
npm run dev
```

## Bước 3: Truy cập ứng dụng

- Frontend: http://localhost:5173
- API Backend: http://localhost:3001

## Cấu trúc dữ liệu

Dữ liệu được lưu trong file `src/server/db.json` với các endpoint:

- **Users**: `/users` - Quản lý người dùng
- **Boards**: `/boards` - Quản lý bảng công việc
- **Lists**: `/lists` - Quản lý danh sách trong board
- **Tasks**: `/tasks` - Quản lý công việc
- **Tags**: `/tags` - Quản lý nhãn cho công việc

## Lưu ý quan trọng

1. **Luôn chạy JSON Server trước** khi truy cập ứng dụng
2. Dữ liệu sẽ được lưu vào `db.json` và **tự động cập nhật** khi bạn thêm/sửa/xóa
3. Nếu gặp lỗi CORS, hãy đảm bảo JSON Server đang chạy trên port 3001
4. Dữ liệu sẽ **tồn tại** giữa các lần restart server

## Kiểm tra dữ liệu

Bạn có thể kiểm tra dữ liệu bằng cách truy cập:
- http://localhost:3001/users - Xem danh sách người dùng
- http://localhost:3001/boards - Xem danh sách boards
- http://localhost:3001/lists - Xem danh sách lists
- http://localhost:3001/tasks - Xem danh sách tasks
- http://localhost:3001/tags - Xem danh sách tags

## Troubleshooting

### Lỗi "Network Error" hoặc "Failed to fetch"
- Đảm bảo JSON Server đang chạy trên port 3001
- Kiểm tra console để xem thông báo lỗi chi tiết

### Dữ liệu không lưu
- Kiểm tra file `src/server/db.json` có quyền ghi không
- Đảm bảo JSON Server đang chạy với flag `--watch`

### Port đã được sử dụng
- Thay đổi port trong `package.json` nếu cần:
```json
"server": "json-server --watch src/server/db.json --port 3002"
```
- Và cập nhật `baseURL` trong `src/api/axiosInstance.ts`
