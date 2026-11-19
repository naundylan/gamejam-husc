# 05. OBJECT PROMPT (BỘ 5 PROMPT CON CHUYÊN BIỆT TẠO TÀI NGUYÊN THEO STYLE)

## 📌 1. Mục Đích Sử Dụng & Phương Án Kiến Trúc Tối Ưu
* **Tại sao không gộp tất cả loại vật thể vào chung 1 form duy nhất?**  
  Nếu dùng chung 1 prompt cho cả Nhân vật, Quái, Vũ khí, Vật phẩm và UI thì các trường điền từ khóa (như *"mặc trang phục gì, cầm cái gì"*) sẽ rất vô lý khi áp dụng cho *"Viên đạn"*, *"Thanh máu"* hay *"Bẫy gai"*, làm AI bị nhiễu ngữ cảnh và giảm độ chi tiết.
* **Phương án tối ưu được thực thi trong file này**:  
  Chúng ta sử dụng kiến trúc **"1 Gốc Phong Cách (Style Anchor) + 5 Prompt Con Chuyên Biệt (Specialized Sub-Prompts)"** nằm gọn trong cùng 1 file này:
  - **Bước Khởi Tạo (Chỉ làm 1 lần đầu phiên chat)**: Dán khối `[KHỞI TẠO NGỮ CẢNH STYLE]` (chứa kết quả từ `04_style_prompt.md`) cho AI đọc và ghi nhớ.
  - **Bước Sản Xuất Hàng Loạt**: Cần tạo loại nào thì chỉ cần copy đúng **Prompt Con (5A, 5B, 5C, 5D hoặc 5E)** tương ứng với loại đó, điền vài từ khóa đặc tả + chọn định dạng (`SVG` / `PNG` / `JPG` / `Canvas JS`) là AI xuất ra đúng 1 file chuẩn xác ngay lập tức!

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Nhận Input từ**: `04_style_prompt.md` (`[LOCKED STYLE CONTEXT]`).
* **Truyền Output sang**:
  - Đưa trực tiếp file ảnh / mã SVG vào dự án game.
  - Hoặc đưa file/mã của vật thể vừa tạo sang **`06_motion_prompt.md`** để sinh tiếp 8 góc nhìn (Top-down) hoặc các tư thế chuyển động (Chạy, Nhảy, Đánh, Hiệu ứng nổ).

---

## 🔒 3. BƯỚC KHỞI TẠO: NẠP NGỮ CẢNH PHONG CÁCH (DÁN 1 LẦN ĐẦU PHIÊN CHAT)
*(Trước khi dùng các Prompt con 5A -> 5E, hãy dán đoạn này cho AI để khóa cứng phong cách)*

```text
=== [SYSTEM STYLE LOCK: KHÓA PHONG CÁCH TÀI NGUYÊN GAME] ===
Bạn là Lead Game Concept Artist & Technical SVG/Sprite Generator.
Từ giờ trở đi, trong toàn bộ cuộc hội thoại này, mọi nhân vật, quái vật, vũ khí, vật phẩm và giao diện UI mà bạn tạo ra BẮT BUỘC phải tuân thủ tuyệt đối 100% bảng màu, góc nhìn và quy tắc nét vẽ trong hồ sơ [LOCKED STYLE CONTEXT] dưới đây:

"""
[DÁN TOÀN BỘ NỘI DUNG OUTPUT CỦA FILE 04_style_prompt.md VÀO ĐÂY]
"""

Quy tắc xuất file (Output Rules):
- Nếu tôi chọn định dạng [SVG]: Hãy xuất ra mã code `<svg viewBox="0 0 ...">` hoàn chỉnh, sạch, tối ưu hóa các thẻ `<path>`, `<circle>`, `<rect>`, `<g>`, tách lớp rõ ràng, nền trong suốt 100%, lưu dùng được ngay thành file `.svg`.
- Nếu tôi chọn định dạng [PNG / Image Generator]: Hãy tạo trực tiếp hình ảnh (nếu bạn có công cụ vẽ DALL-E/Imagen) HOẶC xuất ra chuỗi Prompt tiếng Anh chuẩn xác nhất (kèm thông số isolated on pure white/transparent background, no shadow clipping) để tôi dán thẳng vào Recraft.ai / Leonardo AI.
- Nếu tôi chọn định dạng [Canvas 2D JS Function]: Hãy xuất ra một hàm JavaScript `drawObject(ctx, x, y, size, angle)` vẽ trực tiếp vật thể đó lên HTML5 Canvas.

Hãy trả lời "ĐÃ KHÓA PHONG CÁCH - SẴN SÀNG NHẬN OBJECT PROMPT" để tôi bắt đầu gửi từng yêu cầu.
```

---

## 📋 4. BỘ 5 PROMPT CON CHUYÊN BIỆT (CẦN LOẠI NÀO COPY LOẠI ĐÓ)

### 🧍 PROMPT 5A: TẠO NHÂN VẬT CHÍNH / ĐỒNG MINH (PLAYER / ALLY)
*(Chuyên biệt cho hình thể nhân vật, trang phục, phụ kiện và vật cầm tay)*

```text
=== [OBJECT PROMPT 5A: TẠO NHÂN VẬT / ĐỒNG MINH] ===
Hãy tạo cho tôi 01 tài nguyên Nhân vật bám sát [LOCKED STYLE CONTEXT] đã nạp với các thông số đặc tả sau:
1. Phân loại: [CHỌN: Nhân vật chính (Player) / Đồng minh (Ally) / NPC]
2. Chủng tộc / Hình dáng cơ thể: [ĐIỀN - VD: Hiệp sĩ tí hon / Robot hình cầu / Pháp sư mèo / Phi thuyền chiến đấu...]
3. Trang phục & Giáp trụ: [ĐIỀN HOẶC BỎ TRỐNG - VD: Áo choàng xanh neon rách tà, mũ sắt che kín mặt...]
4. Vật cầm trên tay / Trang bị gắn kèm: [ĐIỀN HOẶC BỎ TRỐNG - VD: Tay phải cầm kiếm laser phát sáng, sau lưng đeo bình phản lực...]
5. Đặc điểm nhận diện nổi bật (Silhouette & Focal Point): [ĐIỀN - VD: Đôi mắt phát sáng vàng rực, viền ngoài sáng rõ để không lẫn vào nền]
6. Góc nhìn mặc định: [CHỌN: Nhìn thẳng từ trên xuống (Top-down hướng mặt sang phải 0 độ) / Nhìn ngang (Side-view hướng mặt sang phải) / Nhìn chính diện (Front-view)]
7. ĐỊNH DẠNG FILE OUTPUT YÊU CẦU: [CHỌN 1: File code SVG hoàn chỉnh (.svg) / Hình ảnh PNG nền trong suốt (.png) / Hàm vẽ HTML5 Canvas JS]

Yêu cầu bắt buộc: Chỉ xuất ra đúng 01 đối tượng đơn lẻ nằm chính giữa khung hình (Centered Pivot), không vẽ kèm chữ, không vẽ nền thừa, tỷ lệ cân đối sắc nét.
```

---

### 👹 PROMPT 5B: TẠO QUÁI VẬT / KẺ ĐỊCH / BOSS (ENEMY / BOSS)
*(Chuyên biệt cho ngôn ngữ hình khối đe dọa, bộ phận tấn công và phân cấp độ nguy hiểm)*

```text
=== [OBJECT PROMPT 5B: TẠO QUÁI VẬT / BOSS] ===
Hãy tạo cho tôi 01 tài nguyên Kẻ địch bám sát [LOCKED STYLE CONTEXT] đã nạp với các thông số đặc tả sau:
1. Cấp bậc kẻ địch: [CHỌN: Quái thường (Minion - nhỏ gọn, đơn giản) / Quái tinh anh (Elite - to vừa, có giáp/gai) / Trùm cuối (Boss - đồ sộ, nhiều chi tiết áp đảo)]
2. Hình thái / Loài quái vật: [ĐIỀN - VD: Slime độc biến dị / Drone tự sát 3 cánh / Bộ xương cầm khiên / Quái thú bóng đêm...]
3. Bộ phận tấn công / Vũ khí gây sát thương: [ĐIỀN - VD: Hàm răng sắc nhọn chiếm nửa thân / Gai nhọn tỏa ra 4 phía / Nòng pháo plasma trước ngực...]
4. Màu sắc cảnh báo nguy hiểm (Threat Accent): [ĐIỀN HOẶC ĐỂ AI LẤY TỪ PALETTE - VD: Đỏ thẫm phát sáng ở lõi / Tím độc...]
5. Góc nhìn mặc định: [CHỌN: Top-down (hướng về phía bên phải) / Side-view (hướng về phía bên trái đối diện Player)]
6. ĐỊNH DẠNG FILE OUTPUT YÊU CẦU: [CHỌN 1: File code SVG hoàn chỉnh (.svg) / Hình ảnh PNG nền trong suốt (.png) / Hàm vẽ HTML5 Canvas JS]

Yêu cầu bắt buộc: Ngôn ngữ hình khối (Shape Language) phải tạo sự tương phản rõ rệt với Nhân vật chính để người chơi nhận diện kẻ địch chỉ trong 0.1 giây.
```

---

### ⚔️ PROMPT 5C: TẠO VŨ KHÍ, ĐẠN & BẪY (WEAPON, PROJECTILE & HAZARD)
*(Chuyên biệt cho độ rõ nét ở tốc độ bay cao, lõi sáng và hitbox chuẩn xác)*

```text
=== [OBJECT PROMPT 5C: TẠO VŨ KHÍ / ĐẠN / BẪY] ===
Hãy tạo cho tôi 01 tài nguyên Vũ khí / Đạn / Bẫy bám sát [LOCKED STYLE CONTEXT] đã nạp với các thông số đặc tả sau:
1. Loại vật thể: [CHỌN: Viên đạn bay (Projectile) / Vũ khí cận chiến tách rời (Melee Weapon) / Bẫy môi trường (Hazard/Trap)]
2. Mô tả hình dáng chi tiết: [ĐIỀN - VD: Tia đạn năng lượng hình giọt nước kéo dài / Lưỡi cưa đĩa tròn răng cưa máu / Bẫy gai thép vuông...]
3. Quy tắc lõi sáng & viền (Readability): Lõi bên trong màu sáng rực (Trắng/Vàng), bao quanh bởi viền màu [ĐIỀN MÀU: Xanh cho đạn Player / Đỏ cam cho đạn Quái] để nhìn cực rõ khi bay nhanh.
4. Hướng xoay chuẩn: Đặt mũi nhọn/hướng bắn của vũ khí/đạn chỉ thẳng về hướng ĐÔNG (Bên phải - Góc 0 độ) để trong code dễ dàng xoay góc `Math.atan2`.
5. ĐỊNH DẠNG FILE OUTPUT YÊU CẦU: [CHỌN 1: File code SVG hoàn chỉnh (.svg) / Hình ảnh PNG nền trong suốt (.png) / Hàm vẽ HTML5 Canvas JS]
```

---

### 💎 PROMPT 5D: TẠO VẬT PHẨM, BUFF & Đạo Cụ (ITEM, COLLECTIBLE & PROP)
*(Chuyên biệt cho icon thu thập được, rương báu, bình máu, vật cản)*

```text
=== [OBJECT PROMPT 5D: TẠO VẬT PHẨM / ĐẠO CỤ] ===
Hãy tạo cho tôi 01 tài nguyên Vật phẩm / Đạo cụ bám sát [LOCKED STYLE CONTEXT] đã nạp với các thông số đặc tả sau:
1. Chức năng vật phẩm: [CHỌN: Vật phẩm hồi phục (Health/Shield) / Điểm thưởng & Tiền tệ (Coin/Gem/XP) / Nâng cấp sức mạnh (Power-up Buff) / Vật cản bản đồ (Crate/Rock/Wall)]
2. Hình ảnh biểu tượng: [ĐIỀN - VD: Bình thuốc thủy tinh chứa dung dịch xanh lá phát sáng / Viên pha lê năng lượng hình thoi / Thùng gỗ đóng đai sắt...]
3. Hiệu ứng viền nhận diện: [ĐIỀN - VD: Có viền sáng vàng kim loại báo hiệu có thể nhặt được / Hoặc đổ bóng đậm báo hiệu vật cản cứng]
4. ĐỊNH DẠNG FILE OUTPUT YÊU CẦU: [CHỌN 1: File code SVG hoàn chỉnh (.svg) / Hình ảnh PNG nền trong suốt (.png) / Hàm vẽ HTML5 Canvas JS]
```

---

### 🖼️ PROMPT 5E: TẠO GIAO DIỆN UI, POPUP, THANH BAR & BACKGROUND (UI & BG)
*(Chuyên biệt cho khung bảng thông báo, thanh máu, nút bấm và nền lặp)*

```text
=== [OBJECT PROMPT 5E: TẠO THÀNH PHẦN UI / BACKGROUND] ===
Hãy tạo cho tôi 01 tài nguyên Giao diện (UI) hoặc Nền (Background) bám sát [LOCKED STYLE CONTEXT] đã nạp với các thông số sau:
1. Hạng mục cần tạo: [CHỌN 1: Khung Bảng Popup (Dialog/GameOver Panel) / Thanh Bar (Health/Mana/XP Bar) / Nút bấm (Button Normal & Hover) / Họa tiết Nền lặp (Seamless Tileable Background)]
2. Mô tả chi tiết thiết kế: [ĐIỀN - VD: Khung bảng Game Over kim loại rỉ sét có 4 đinh tán ở 4 góc / Hoặc Nền sàn đấu gạch đá tối màu lặp lại không vết nối...]
3. Yêu cầu kỹ thuật:
   - Nếu là UI Panel/Bar: Thiết kế phần ruột phẳng để chữ đè lên đọc rõ 100%, viền ngoài sắc sảo theo đúng mã màu HEX của Style Prompt.
   - Nếu là Background: Độ tương phản thấp (Low contrast), màu tối/trầm để không làm chói mắt hay che khuất nhân vật và đạn.
4. ĐỊNH DẠNG FILE OUTPUT YÊU CẦU: [CHỌN 1: File code SVG hoàn chỉnh (.svg) / Code CSS + HTML Component / Hình ảnh PNG/JPG]
```
