# 11. DETAIL PROMPT (PHẪU THUẬT VI MÔ: SỬA CHI TIẾT NHỎ & GIAO DIỆN UI CÔ LẬP TUYỆT ĐỐI)

## 📌 1. Mục Đích Sử Dụng
* Khi game đã chạy ổn định (đặc biệt ở 40 phút cuối của cuộc thi), nỗi sợ lớn nhất của mọi đội thi là: **"Chỉ bảo AI đổi màu cái thanh máu hoặc sửa lại cái khung Popup Game Over, thế mà AI viết lại cả file làm hỏng luôn cơ chế bắn đạn ("Sửa 1 lan sang 10")!"**
* Khác với `08_fix_prompt.md` (dùng để thêm/sửa/xóa cả một chức năng hay cơ chế gameplay lớn), **`11_detail_prompt.md`** được thiết kế chuyên biệt để **sửa các chi tiết nhỏ, thay thế/căn chỉnh UI, đổi font, chỉnh màu, thay icon/sprite hoặc tinh chỉnh thông số cảm giác tay**.
* **Cơ chế Khoanh Vùng Cực Mạnh (Zero Blast-Radius Isolation)**: Khóa cứng vùng cấm (Forbidden Zones) và vùng cho phép (Target Zone), ép AI chỉ được phép thay đổi đúng đoạn CSS/HTML/Hàm vẽ UI hoặc hằng số được chỉ định, **bảo toàn 100.00% toàn bộ code logic còn lại đến từng dấu chấm phẩy**.

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Nhận Input từ**:
  - **Đề xuất B** trong báo cáo của **`10_analyze_prompt.md`** (Đặc tả các vấn đề nhỏ về UI, hướng dẫn phím bấm, trải nghiệm thị giác).
  - Hoặc kết hợp với **`04_style_prompt.md`** / **`05_object_prompt.md`** khi bạn muốn thay thế khung UI cũ bằng thiết kế SVG/CSS mới.
* **Đầu ra (Output)**: Bản cập nhật vi mô (Surgical Patch) chính xác tuyệt đối, áp dụng ngay vào dự án mà không gây ra bất kỳ lỗi dây chuyền nào.

---

## 📋 3. BỘ 2 PROMPT CON KHOANH VÙNG CỰC MẠNH (CHỌN ĐÚNG NHU CẦU)

### 🎨 PROMPT 11A: THAY THẾ & CHỈNH SỬA CHI TIẾT GIAO DIỆN UI / HUD (SURGICAL UI PATCH)
*(Chuyên dùng để sửa khung Popup, Thanh máu, Bảng điểm, Nút bấm, Chữ hướng dẫn phím bấm, Căn lề, Font chữ)*

```text
=== [DETAIL PROMPT 11A: PHẪU THUẬT GIAO DIỆN UI & HUD - ZERO BLAST-RADIUS MODE] ===
Bạn là Surgical UI/UX Frontend & Game Interface Specialist.
Nhiệm vụ của bạn là thực hiện một chỉnh sửa/thay thế CHI TIẾT NHỎ VỀ GIAO DIỆN (UI/HUD) dựa trên đặc tả vấn đề dưới đây.

🛑 LỆNH KHOANH VÙNG CÔ LẬP TUYỆT ĐỐI (STRICT ISOLATION LOCK - CẤM VI PHẠM):
1. VÙNG CẤM ĐỤNG CHẠM (FORBIDDEN ZONES): Tuyệt đối KHÔNG được sửa đổi, không xóa, không đổi tên biến, và không chạm vào bất kỳ dòng code nào thuộc: Vòng lặp vật lý (`update`), Kiểm tra va chạm (`collision`), Thuật toán Spawner, Điều khiển nhân vật (`input`), hay Máy trạng thái (`GameState`).
2. VÙNG CHO PHÉP DUY NHẤT (TARGET ZONE): Chỉ được phép can thiệp đúng vào phần tử giao diện / khối CSS / thẻ HTML overlay / hoặc hàm vẽ HUD (`drawUI / updateUI`) được nêu trong mục [VÙNG KHOANH ĐỊNH] bên dưới.
3. GIỮ NGUYÊN ID & BINDING: Khi thay thế hoặc làm đẹp giao diện (VD: thay thanh máu, thay bảng Game Over), BẮT BUỘC giữ nguyên 100% tên `id`, `class` hoặc tên biến tham chiếu (`scoreDisplay`, `hpDisplay`, `gameOverScreen`...) để code logic bên dưới vẫn truyền dữ liệu lên UI bình thường mà không bao giờ bị lỗi `null`!

=== [INPUT: ĐẶC TẢ VẤN ĐỀ TỪ ANALYZE PROMPT / YÊU CẦU CHI TIẾT] ===
- VÙNG KHOANH ĐỊNH CẦN SỬA (Target UI Element): "[ĐIỀN CHÍNH XÁC PHẦN TỬ CẦN SỬA - VD: Khung Popup Game Over / Thanh máu góc trên trái / Dòng chữ hướng dẫn phím bấm dưới đáy màn hình]"
- Đặc tả vấn đề hiện tại & Chi tiết cần thay đổi (Copy từ Đề xuất B của Analyze Prompt hoặc tự điền):
"""
[DÁN ĐẶC TẢ VẤN ĐỀ VÀ YÊU CẦU SỬA CHI TIẾT VÀO ĐÂY - VD: Đổi thanh máu từ chữ số đơn điệu sang thanh Bar màu xanh neon có viền trắng, khi máu dưới 30% thì chuyển sang màu đỏ nhấp nháy; Làm to dòng hướng dẫn WASD + Phím R lên 18px có đổ bóng đen để BGK nhìn rõ ngay]
"""
- Phong cách / Mã màu áp dụng (Lấy từ Style Prompt hoặc để trống): "[ĐIỀN MÃ MÀU HEX / SVG HOẶC ĐỂ TRỐNG]"
- File code cần can thiệp: "[ĐIỀN ĐƯỜNG DẪN FILE HOẶC DÁN ĐOẠN CODE UI VÀO ĐÂY]"

=== [YÊU CẦU ĐẦU RA] ===
1. Xác nhận vùng khoanh định: Nêu rõ bạn chỉ sửa từ dòng nào đến dòng nào (hoặc hàm/thẻ nào) và cam kết 0% ảnh hưởng tới Gameplay Logic.
2. Thực thi chỉnh sửa chính xác vào file (hoặc xuất đoạn code thay thế khớp 100% với vị trí khoanh vùng).
```

---

### 🔧 PROMPT 11B: TINH CHỈNH VI MÔ THÔNG SỐ, HÌNH ẢNH, ÂM THANH & HIỆU ỨNG NHỎ (MICRO-TWEAK & ASSET SWAP)
*(Chuyên dùng để thay ảnh Sprite/SVG vào khối hình học, chỉnh lại cỡ nhân vật, đổi tần số âm thanh, chỉnh độ rung màn hình, tốc độ bay của đạn mà không làm xáo trộn thuật toán)*

```text
=== [DETAIL PROMPT 11B: TINH CHỈNH VI MÔ THÔNG SỐ & THAY THẾ ASSET - MICRO-TWEAK MODE] ===
Bạn là Precision Game Polish Engineer.
Nhiệm vụ của bạn là thực hiện các tinh chỉnh vi mô (Micro-tweaks) về hình ảnh hiển thị, âm thanh hoặc hằng số cân bằng mà KHÔNG làm thay đổi bất kỳ cấu trúc thuật toán nào của game.

🛑 LỆNH KHOANH VÙNG CÔ LẬP TUYỆT ĐỐI (STRICT ISOLATION LOCK):
1. KHÔNG SỬA CẤU TRÚC HÀM: Giữ nguyên toàn bộ luồng điều khiển (`if/else`, vòng lặp `for/while`). Chỉ thay đổi đúng:
   - Hằng số cấu hình (Tốc độ, Kích thước, Thời gian, Màu sắc, Tần số âm thanh).
   - Hoặc lệnh vẽ hình khối (`ctx.arc / ctx.fillRect`) bằng lệnh vẽ Sprite/SVG mới tại đúng tọa độ `(x, y)` và góc xoay của thực thể đó.
2. BẢO TOÀN HITBOX: Khi thay đổi hình ảnh hiển thị (Visual Sprite/SVG) của nhân vật, quái hoặc đạn, hãy canh chỉnh tâm vẽ (`translate / drawImage offset`) trùng khít với tâm của Hitbox vật lý để người chơi không bị cảm giác "đạn chưa chạm người đã mất máu".

=== [INPUT: DANH SÁCH CÁC CHI TIẾT NHỎ CẦN TINH CHỈNH] ===
- VÙNG KHOANH ĐỊNH (Các biến / Hàm vẽ cần chạm vào): "[ĐIỀN - VD: Hàm vẽ nhân vật drawPlayer() và thông số rung màn hình khi bắn]"
- Đặc tả chi tiết cần sửa (Copy từ Analyze Prompt hoặc điền danh sách):
"""
1. [CHI TIẾT 1 - VD: Thay hình tròn màu xanh của Player bằng mã SVG/hàm vẽ phi thuyền mới nhưng giữ nguyên bán kính va chạm radius = 16]
2. [CHI TIẾT 2 - VD: Giảm độ rung màn hình khi bắn thường từ 8px xuống 3px để đỡ mỏi mắt, chỉ giữ rung mạnh 12px khi quái nổ]
3. [CHI TIẾT 3 - VD: Đổi âm thanh khi nhặt điểm sang tiếng chuông cao vút (tần số 880Hz lên 1320Hz, sóng sine)]
"""
- File code cần can thiệp: "[ĐIỀN ĐƯỜNG DẪN FILE HOẶC DÁN CODE VÀO ĐÂY]"

=== [YÊU CẦU ĐẦU RA] ===
1. Liệt kê chính xác các dòng/hằng số được thay đổi.
2. Áp dụng chỉnh sửa gọn gàng, sạch sẽ vào file code, đảm bảo không phát sinh bất kỳ lỗi phụ nào.
```
