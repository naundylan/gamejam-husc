# 09. PERFORMANCE PROMPT (ĐÁNH GIÁ HIỆU NĂNG ĐA TIÊU CHÍ & XUẤT PROMPT TỐI ƯU)

## 📌 1. Mục Đích Sử Dụng
* Trong Game Jam, nhiều đội viết game chơi lúc đầu (10 giây đầu) rất mượt, nhưng chơi đến **phút thứ 2 (khi Ban Giám Khảo đang chấm thử)** thì game bắt đầu **giật lag, tụt FPS thê thảm hoặc đơ trình duyệt** do rò rỉ bộ nhớ (Memory Leak: đạn bay ra ngoài màn hình không xóa, hạt particle tích tụ hàng vạn hạt, hoặc tạo mới `AudioContext` / `addEventListener` lặp lại mỗi lần bấm `R` chơi lại!).
* Prompt này được thiết kế sẵn để **khám bệnh hiệu năng toàn diện theo 7 tiêu chí kỹ thuật chuyên sâu**.
* **Đầu ra kép (Dual Output)**:
  1. **Bản Báo Cáo Các Vấn Đề Tồn Đọng** (Chỉ đích danh hàm nào đang ngốn CPU/RAM).
  2. **01 Prompt Đề Xuất Giải Pháp Chỉnh Sửa** (Được viết sẵn trong khối code để bạn chỉ việc copy-paste cho AI thực thi tối ưu ngay trong 10 giây!).

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Thời điểm dùng tốt nhất**: Khoảng **Phút thứ 90 - 110** (khi gameplay và hiệu ứng Juice đã lên hình xong, trước khi đóng băng code để nộp bài).
* **Đầu vào (Input)**: File Source Code của dự án (Nếu chạy trực tiếp trong Antigravity thì để trống phần dán code, chỉ cần trỏ đường dẫn file; nếu chạy trên Chatbot web thì dán code vào).
* **Bước tiếp theo**: Copy **PHẦN 2 (Prompt Đề Xuất Giải Pháp)** từ kết quả của AI và gửi lại cho Antigravity (hoặc ghép vào `08_fix_prompt.md`) để nó tự động tối ưu code.

---

## 📋 3. NỘI DUNG PROMPT (COPY TỪ ĐÂY ĐỂ SỬ DỤNG)

```text
=== [CONTEXT CƠ SỞ: GAME PERFORMANCE & MEMORY AUDITOR] ===
Bạn là Principal Game Engine Performance Engineer.
Chúng tôi đang chuẩn bị đưa sản phẩm game (tại cuộc thi IT Game Jam 2026) lên cho Ban Giám Khảo chấm trực tiếp tại bàn và trình chiếu trên màn hình lớn hội trường. Game BẮT BUỘC phải duy trì 60 FPS ổn định tuyệt đối, không rò rỉ bộ nhớ (Zero Memory Leak) dù người chơi có chơi liên tục 20 phút hay bấm phím [R] Restart 50 lần liên tiếp.

=== [INPUT: SOURCE CODE DỰ ÁN CẦN KIỂM ĐỊNH] ===
- Đường dẫn file trong Workspace (nếu bạn là Agent có quyền đọc file): "[MẶC ĐỊNH: Đọc toàn bộ file code game chính trong dự án, VD: Web_Fallback/index.html hoặc Assets/_Game/Scripts/...]"
- Hoặc Mã nguồn đính kèm trực tiếp (nếu dùng Chatbot Web):
"""
[BỎ TRỐNG NẾU DÙNG TRONG ANTIGRAVITY / HOẶC DÁN CODE VÀO ĐÂY NẾU DÙNG CHATBOT WEB]
"""

=== [7 TIÊU CHÍ KIỂM ĐỊNH HIỆU NĂNG BẮT BUỘC] ===
Hãy quét từng dòng code và đánh giá khắt khe theo đúng 7 tiêu chí sau:
1. Rò rỉ Mảng & Thực thể (Unbounded Array Growth / Memory Leak): Đạn (`bullets`), Quái (`enemies`), Hạt nổ (`particles`), Chữ bay (`floatingTexts`) khi chết hoặc bay ra ngoài màn hình có được xóa triệt để hay vẫn nằm lại trong mảng? Có giới hạn trần số lượng hạt (`MAX_PARTICLES`) không?
2. Lỗi Cộng dồn Sự kiện khi Restart (Restart Duplication Bug): Khi người chơi bấm `[R]` chơi lại, hàm `resetGame()` có vô tình gọi lại `requestAnimationFrame(loop)` làm nhân đôi tốc độ game, hay đăng ký trùng `window.addEventListener` / `setInterval` không?
3. Độ phức tạp Thuật toán Va chạm (Collision Complexity): Vòng lặp kiểm tra va chạm `Đạn vs Quái` hoặc `Quái vs Quái` có bị lồng nhau quá sâu mà không có bước lọc sớm (Early-exit / Bounding-box culling) không?
4. Cổ chai Đồ họa & Render (Rendering Bottlenecks):
   - Với HTML5 Canvas: Có lạm dụng `ctx.shadowBlur` (cực kỳ ngốn GPU nếu bật cho hàng trăm hạt particle!), tạo `LinearGradient` mới trong mỗi frame, hoặc quên `ctx.beginPath()` làm vẽ đè hàng nghìn đường nét cũ không?
   - Với Unity: Có gọi `GetComponent`, `GameObject.Find`, `Camera.main` hay `Instantiate/Destroy` quá nhiều trong `Update()` không?
5. Quản lý Tài nguyên Âm thanh (Audio Node & Buffer Management): Mỗi lần phát tiếng động có tạo mới `new AudioContext()` (giới hạn trình duyệt chỉ cho 6 AudioContext, vượt quá sẽ câm toàn bộ âm thanh!) hoặc quên ngắt `oscillator.disconnect()` không?
6. Rác bộ nhớ & Cấp phát trong Vòng lặp (Garbage Collection Thrashing): Có tạo quá nhiều Object tạm `{x, y}` hoặc mảng mới `.filter()` / `.map()` bên trong hàm `update()` chạy 60 lần/giây gây giật khung hình (GC pause) không?
7. Tính Độc lập Tốc độ Khung hình (Delta-Time Independence): Chuyển động đã nhân chuẩn với `dt` (và có kẹp trần `Math.min(dt, 0.05)` để khi người chơi Alt+Tab quay lại quái không dịch chuyển tức thời giết chết người chơi) chưa?

=== [YÊU CẦU ĐẦU RA (BẮT BUỘC XUẤT ĐỦ 2 PHẦN TRONG CÙNG 1 PHẢN HỒI)] ===

### PHẦN 1: BẢNG BÁO CÁO CÁC VẤN ĐỀ HIỆU NĂNG TỒN ĐỌNG
- Lập bảng gồm các cột: `[Mức độ: CRITICAL / WARNING / PASS]` | `[Tiêu chí]` | `[Vị trí Hàm / Dòng code]` | `[Tác hại thực tế nếu không sửa]`.
- Chấm điểm Hiệu năng hiện tại trên thang điểm `100/100`.

### PHẦN 2: PROMPT ĐỀ XUẤT GIẢI PHÁP CHỈNH SỬA (COPY-PASTE READY)
Hãy viết sẵn cho tôi MỘT PROMPT HOÀN CHỈNH đặt trong khối code markdown ` ```text ... ``` ` dưới đây. Prompt này phải chỉ định rõ từng hàm cần sửa và đoạn code tối ưu tương ứng, đồng thời khóa chặt quy tắc "KHÔNG LÀM THAY ĐỔI GAMEPLAY VÀ GIAO DIỆN HIỆN TẠI", để tôi chỉ cần copy khối prompt này ra lệnh cho AI thực thi sửa ngay trong 1 bước!
```
