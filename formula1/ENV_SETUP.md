# Hướng Dẫn Cấu Hình Biến Môi Trường

## 📋 Tổng Quan

Ứng dụng Spring Boot này sử dụng biến môi trường để bảo mật thông tin nhạy cảm như mật khẩu database, JWT secret, và thông tin email.

## 🔧 Cách Thiết Lập

### 1. Tạo File `.env` (Development)

```bash
# Copy file mẫu
cp .env.example .env
```

Sau đó chỉnh sửa file `.env` với thông tin thực tế của bạn:

```env
SPRING_DATASOURCE_PASSWORD=7324*Tan
JWT_SECRET=duong-quoc-tan-formula1-postgresql-nextjs-nestjs
SPRING_MAIL_USERNAME=cutorasusu2004@gmail.com
SPRING_MAIL_PASSWORD=cnid lavl ifsq dbnu
```

### 2. Chạy Ứng Dụng với Biến Môi Trường

#### **Windows (PowerShell)**

```powershell
# Set biến môi trường
$env:SPRING_DATASOURCE_PASSWORD="7324*Tan"
$env:JWT_SECRET="duong-quoc-tan-formula1-postgresql-nextjs-nestjs"
$env:SPRING_MAIL_USERNAME="cutorasusu2004@gmail.com"
$env:SPRING_MAIL_PASSWORD="cnid lavl ifsq dbnu"

# Chạy ứng dụng
./mvnw spring-boot:run
```

#### **Windows (Command Prompt)**

```cmd
set SPRING_DATASOURCE_PASSWORD=7324*Tan
set JWT_SECRET=duong-quoc-tan-formula1-postgresql-nextjs-nestjs
set SPRING_MAIL_USERNAME=cutorasusu2004@gmail.com
set SPRING_MAIL_PASSWORD=cnid lavl ifsq dbnu

mvnw spring-boot:run
```

#### **Linux/Mac**

```bash
export SPRING_DATASOURCE_PASSWORD="7324*Tan"
export JWT_SECRET="duong-quoc-tan-formula1-postgresql-nextjs-nestjs"
export SPRING_MAIL_USERNAME="cutorasusu2004@gmail.com"
export SPRING_MAIL_PASSWORD="cnid lavl ifsq dbnu"

./mvnw spring-boot:run
```

### 3. Sử Dụng File `.env` với Spring Boot

Cài đặt thư viện `dotenv-java`:

**pom.xml:**

```xml
<dependency>
    <groupId>io.github.cdimascio</groupId>
    <artifactId>dotenv-java</artifactId>
    <version>3.0.0</version>
</dependency>
```

### 4. IntelliJ IDEA Configuration

1. Mở **Run/Debug Configurations**
2. Chọn Spring Boot application
3. Trong tab **Environment**, thêm biến môi trường:
   ```
   SPRING_DATASOURCE_PASSWORD=7324*Tan;JWT_SECRET=duong-quoc-tan-formula1-postgresql-nextjs-nestjs;SPRING_MAIL_USERNAME=cutorasusu2004@gmail.com;SPRING_MAIL_PASSWORD=cnid lavl ifsq dbnu
   ```

### 5. Docker Configuration

Nếu sử dụng Docker, thêm vào `docker-compose.yml`:

```yaml
services:
  backend:
    environment:
      - SPRING_DATASOURCE_PASSWORD=7324*Tan
      - JWT_SECRET=duong-quoc-tan-formula1-postgresql-nextjs-nestjs
      - SPRING_MAIL_USERNAME=cutorasusu2004@gmail.com
      - SPRING_MAIL_PASSWORD=cnid lavl ifsq dbnu
```

Hoặc sử dụng file `.env`:

```yaml
services:
  backend:
    env_file:
      - .env
```

### 6. Production Deployment

Đối với môi trường production (Render, Heroku, AWS, etc.):

1. **Render.com**: Thêm Environment Variables trong dashboard
2. **Heroku**: `heroku config:set SPRING_DATASOURCE_PASSWORD=xxx`
3. **AWS/GCP**: Sử dụng Secrets Manager hoặc Parameter Store

## ⚠️ Lưu Ý Bảo Mật

- ✅ **KHÔNG BAO GIỜ** commit file `.env` vào Git
- ✅ Đảm bảo `.env` có trong `.gitignore`
- ✅ Sử dụng mật khẩu mạnh cho production
- ✅ Rotate JWT secret định kỳ
- ✅ Sử dụng Gmail App Password thay vì mật khẩu thật

## 📝 Danh Sách Biến Môi Trường Bắt Buộc

| Biến                         | Mô Tả              | Ví Dụ                   |
| ---------------------------- | ------------------ | ----------------------- |
| `SPRING_DATASOURCE_URL`      | Database URL       | `jdbc:postgresql://...` |
| `SPRING_DATASOURCE_USERNAME` | Database username  | `postgres`              |
| `SPRING_DATASOURCE_PASSWORD` | Database password  | `your_password`         |
| `JWT_SECRET`                 | JWT signing key    | `min 32 characters`     |
| `SPRING_MAIL_USERNAME`       | Email username     | `your@gmail.com`        |
| `SPRING_MAIL_PASSWORD`       | Email app password | `xxxx xxxx xxxx xxxx`   |

## 🔍 Kiểm Tra Cấu Hình

Chạy lệnh sau để kiểm tra biến môi trường đã được load:

```bash
./mvnw spring-boot:run --debug
```

Hoặc thêm log trong code:

```java
System.out.println("Database URL: " + environment.getProperty("spring.datasource.url"));
```
