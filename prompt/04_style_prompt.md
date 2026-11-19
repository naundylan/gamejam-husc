# 04. STYLE PROMPT (ĐÚC KẾT & KHÓA PHONG CÁCH ĐỒ HỌA + UI TOÀN GAME)

## 📌 1. Mục Đích Sử Dụng
* Vì không biết trước đề thi sẽ mang màu sắc gì (Kinh dị/Horror, Giả tưởng/Fantasy, Cyberpunk, Cute Arcade, Retro 1-bit, hay Sci-Fi), bạn không thể chuẩn bị trước bộ ảnh SVG/PNG cố định.
* Prompt này nhận đầu vào là `Gameplay Prompt` và xuất ra một **"MASTER STYLE PROMPT" (Bản Khóa Phong Cách Nghệ Thuật & UI)**.
* **Lưu ý quan trọng**: Prompt đầu ra của bước này **KHÔNG tạo ra một vật thể đơn lẻ**, mà nó đóng vai trò là **"Hạt giống ngữ cảnh (Style Lock Context)"** quy định chặt chẽ bảng màu (Color Palette), nét vẽ, ánh sáng, quy tắc thiết kế Nhân vật, Quái vật, Background, Vật phẩm, Bảng Popup, Thanh Bar (Health/Mana/Combo) và HUD.
* Khi bạn đem kết quả của file này sang `05_object_prompt.md` hoặc nạp cho AI tạo hình ảnh/code SVG, **100% tài nguyên sinh ra sẽ đồng bộ tuyệt đối về mặt thẩm mỹ**, không bao giờ bị cảnh "nhân vật một đằng, quái một nẻo, UI một kiểu".

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Đầu vào (Input)**: `GAMEPLAY PROMPT CHÍNH THỨC` (từ file `01` hoặc `02`).
* **Đầu ra (Output)**: Một khối **`[LOCKED STYLE CONTEXT]`** hoàn chỉnh.
* **Bước tiếp theo**: Copy khối `[LOCKED STYLE CONTEXT]` này dán vào:
  - `05_object_prompt.md` (để tạo từng nhân vật, quái, vũ khí, vật phẩm, UI đúng tông).
  - `07_function_prompt.md` hoặc `11_detail_prompt.md` (để AI code giao diện CSS/Canvas UI đúng mã màu HEX và phong cách đã khóa).

---

## 📋 3. NỘI DUNG PROMPT (COPY TỪ ĐÂY ĐỂ SỬ DỤNG)

```text
=== [CONTEXT CƠ SỞ: ART & UI DIRECTION FOR GAME JAM] ===
Bạn là Principal Game Art Director & UI/UX Designer.
Chúng tôi cần thiết lập và KHÓA (LOCK) phong cách đồ họa + giao diện (UI) cho một tựa game phát triển trong 150 phút.
Mục tiêu là tạo ra một "MASTER STYLE PROMPT" (Bản Khóa Phong Cách Toàn Diện) để nạp làm ngữ cảnh gốc cho các AI tạo tài nguyên (SVG / Canvas Procedural / PNG Sprite) ở bước tiếp theo. Mọi quy định về phong cách phải cụ thể, rõ ràng, có mã màu HEX và từ khóa thị giác chuẩn xác.

=== [INPUT: GAMEPLAY PROMPT CỦA GAME] ===
- Định hướng thẩm mỹ mong muốn (Bỏ trống để AI tự chọn phong cách hợp với gameplay nhất, hoặc điền như: Pixel Art 16-bit / Clean Vector SVG / Neon Cyberpunk / Dark Gothic Horror / Cozy Hand-drawn): "[ĐIỀN HOẶC ĐỂ TRỐNG]"
- Bản Gameplay Prompt của chúng tôi:
"""
[DÁN GAMEPLAY PROMPT TỪ FILE 01 HOẶC 02 VÀO ĐÂY]
"""

=== [NHIỆM VỤ CỦA BẠN] ===
Hãy phân tích nhịp độ, cốt truyện và cơ chế Twist của Gameplay trên, sau đó đúc kết và XUẤT RA MỘT BẢN "MASTER STYLE PROMPT" đặt trong khối code markdown theo đúng 8 hạng mục dưới đây (chỉ mô tả quy chuẩn phong cách thiết kế để khóa ngữ cảnh, không đi vào code logic):

```markdown
# [LOCKED STYLE CONTEXT] - HỒ SƠ KHÓA PHONG CÁCH ĐỒ HỌA & UI
1. Chủ Đạo Thẩm Mỹ & Góc Nhìn (Core Aesthetic & Perspective):
   - Từ khóa phong cách chính (Style Keywords): (VD: Crisp 2D Vector SVG / High-Contrast 16-bit Pixel Art / Dark Minimalist Neon...).
   - Góc nhìn chuẩn (Camera Projection): (VD: Strict 90-degree Top-Down / 3/4 Top-Down RPG / 2D Side-View Orthographic).
   - Quy tắc đường viền & đổ bóng (Stroke & Shading Rule): (VD: Viền đen dày 2px, đổ bóng phẳng cel-shaded 2 tông màu, không dùng gradient mờ).

2. Bảng Màu Khóa Cứng (Locked Color Palette - 6 Mã HEX):
   - Màu nền chính (Background Primary): #......
   - Màu nhân vật & đồng minh (Player/Ally Safe Accent - Nổi bật nhất): #......
   - Màu kẻ địch & nguy hiểm (Enemy/Hazard Threat Accent - Tương phản mạnh): #......
   - Màu vật phẩm & điểm thưởng (Reward/Buff Gold/Neon Accent): #......
   - Màu khung UI & Popup (UI Surface & Border): #......
   - Màu chữ & thông báo (Typography & Alert): #......

3. Phong Cách Thiết Kế Nhân Vật Chính & Đồng Minh (Player & Ally Style):
   - Tỉ lệ hình thể (Proportions): (VD: Chibi đầu to thân nhỏ 1:2 dễ nhìn từ xa / Hình khối hình học sắc cạnh...).
   - Đặc điểm nhận diện (Visual Readability): Cách phối màu sáng và viền nổi bật để không bao giờ bị lẫn vào nền hoặc đám đông quái.

4. Phong Cách Thiết Kế Quái Vật & Boss (Enemy & Threat Style):
   - Ngôn ngữ hình khối (Shape Language): (VD: Sử dụng nhiều góc nhọn tam giác, gai góc, mắt phát sáng đỏ/tím để báo hiệu nguy hiểm).
   - Phân cấp kích thước: Quái thường vs Quái tinh anh vs Boss khác nhau về độ phức tạp chi tiết như thế nào.

5. Phong Cách Vũ Khí, Đạn & Vật Phẩm (Projectiles, Weapons & Items Style):
   - Đạn / Đòn đánh: Phải có lõi sáng trắng/vàng và viền màu rực rỡ (High-contrast core) để nhìn rõ đường đạn ở tốc độ cao.
   - Vật phẩm / Buff: Thiết kế dạng icon tối giản, có hào quang hoặc khung viền phân biệt rõ với đạn của quái.

6. Phong Cách Background & Môi Trường (Environment & Arena Style):
   - Độ tương phản thấp (Low-contrast, desaturated): Đảm bảo nền luôn dịu mắt, độ bão hòa thấp hơn nhân vật 50% để làm nổi bật gameplay phía trên.
   - Họa tiết lặp (Tile/Grid pattern): Cách bố trí lưới hoặc chi tiết trang trí nền để người chơi cảm nhận rõ tốc độ di chuyển.

7. Phong Cách Giao Diện UI: Bảng Popup, Khung Hộp & Nút Bấm (Popups, Panels & Buttons):
   - Hình dáng khung (Frame & Corner Style): (VD: Khung chữ nhật vát góc 45 độ kiểu Sci-Fi / Khung viền pixel bo góc cổ điển / Khung giấy da...).
   - Hiệu ứng trạng thái nút bấm (Hover / Active / Disabled): Đổi màu viền, phát sáng hoặc lún xuống như thế nào.

8. Phong Cách Thanh Bar, HUD & Typography (Bars, Gauges & Fonts):
   - Thanh máu / Năng lượng / Tiến trình (Progress & Health Bars): Thiết kế dạng vạch chia (segmented blocks) hay thanh trượt liền mạch, hiệu ứng chớp trắng khi tụt máu.
   - Kiểu chữ (Typography): Font pixel vuông vức (Monospace/Retro) hay Sans-serif hiện đại đậm nét, quy tắc đổ bóng chữ (Drop shadow 2px đen) để đọc rõ trên mọi nền.
```
```
