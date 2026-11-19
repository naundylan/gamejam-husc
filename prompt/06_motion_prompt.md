# 06. MOTION PROMPT (BIẾN VẬT THỂ TĨNH THÀNH 8 GÓC ĐỘ, HOẠT ẢNH & HIỆU ỨNG)

## 📌 1. Giải Đáp Kỹ Thuật Quan Trọng: Output Nên Là 1 File Hay 8 File Rời?

> [!IMPORTANT]
> **KẾT LUẬN KỸ THUẬT: LUÔN XUẤT RA ĐÚNG 01 FILE DUY NHẤT (SPRITE SHEET HOẶC 1 MODULE CODE ĐA TRẠNG THÁI)!**
> * **Tại sao TUYỆT ĐỐI KHÔNG xuất 8 file ảnh rời nhau?**
>   1. **Lệch tâm & Lệch tỷ lệ (Pivot & Scale Drift)**: Nếu AI tạo 8 file ảnh ở 8 lần khác nhau, nhân vật khi quay từ hướng Trái sang hướng Lên sẽ bị to/nhỏ khác nhau và bị giật vị trí chân đứng.
>   2. **Chớp hình khi tải (Loading Flicker)**: Load 8-12 file ảnh lẻ khiến code phức tạp và dễ bị khựng frame khi nhân vật đổi trạng thái lần đầu.
> * **2 Định dạng 1-File Chuẩn Nhất (Được thiết kế sẵn trong Prompt dưới đây)**:
>   1. **Định dạng Ảnh (`1 File Sprite Sheet Grid`)**: Gom toàn bộ 8 hướng (hoặc các động tác Đứng, Chạy, Nhảy, Đánh) vào **1 tấm ảnh duy nhất chia lưới đều nhau** (VD: Lưới ngang `1x8` hoặc `2x4`, mỗi ô đúng `64x64px`, tâm nhân vật đặt đúng chính giữa từng ô).
>   2. **Định dạng Code (`1 File SVG/Canvas Multi-State Component`)**: Nếu bước 05 bạn xuất ra SVG hoặc hàm Canvas JS, bước 06 này sẽ nâng cấp nó thành **1 file code duy nhất có tham số `(direction, actionState, time)`** tự động xoay 8 hướng, co giãn (Squash & Stretch) và diễn hoạt mượt 60 FPS!

---

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Đầu vào (Input)**: File kết quả (Mã SVG / Ảnh PNG / Hàm Canvas) vừa tạo ra từ **`05_object_prompt.md`**.
* **Đầu ra (Output)**: **01 File Sprite Sheet hoàn chỉnh** (hoặc **01 Module Code Diễn Hoạt**) của Nhân vật, Quái, Đạn, Vật phẩm hoặc Thời tiết.
* **Bước tiếp theo**: Đưa thẳng vào souce code game (kết hợp cùng `07_function_prompt.md`).

---

## 📋 3. BỘ 3 PROMPT CON CHUYÊN BIỆT THEO GÓC NHÌN & LOẠI VẬT THỂ
*(Hãy chọn đúng 1 trong 3 Prompt con dưới đây tùy theo góc nhìn game hoặc loại hiệu ứng bạn cần)*

### 🧭 PROMPT 6A: DÀNH CHO GAME 2D TOP-DOWN (XOAY 4 HOẶC 8 HƯỚNG + HÀNH ĐỘNG)
*(Biến 1 nhân vật/quái/xe/phi thuyền thành 8 góc nhìn mũi tên hoặc xoay tự do kèm hiệu ứng di chuyển)*

```text
=== [MOTION PROMPT 6A: TOP-DOWN 4/8 HƯỚNG & HOẠT ẢNH] ===
Bạn là Technical Game Animator. Dưới đây là thiết kế gốc (Base Object) của tôi từ bước Object Prompt:
"""
[DÁN MÃ SVG / HÀM CANVAS / HOẶC ĐÍNH KÈM ẢNH GỐC TỪ FILE 05 VÀO ĐÂY]
"""

Hãy giữ nguyên 100% thiết kế, màu sắc và tỷ lệ của đối tượng gốc trên, sau đó biến đổi nó thành MỘT FILE DIỄN HOẠT TOP-DOWN DUY NHẤT với các yêu cầu sau:
1. Chế độ Góc hướng (Directional Mode):
   - [CHỌN 1: Đủ 8 góc độ theo 8 hướng mũi tên (Đông, Đông-Nam, Nam, Tây-Nam, Tây, Tây-Bắc, Bắc, Đông-Bắc) / HOẶC 4 hướng cơ bản (Lên, Xuống, Trái, Phải) / HOẶC Góc nhìn 90 độ từ đỉnh đầu xuống xoay 360 độ theo chuột].
2. Các trạng thái chuyển động cơ bản:
   - Đứng yên (Idle): Nhấp nhô thở nhẹ (Breathing/Bobbing).
   - Di chuyển (Move/Walk): [ĐIỀN: Bước chân luân phiên / Trượt có luồng khói phản lực / Trườn như slime].
3. Hoạt động đặc biệt bổ sung (Bỏ trống nếu không có):
   - Hành động 1: [ĐIỀN HOẶC ĐỂ TRỐNG - VD: Vung vũ khí chém hình vòng cung phía trước / Giật nòng súng khi bắn]
   - Hành động 2: [ĐIỀN HOẶC ĐỂ TRỐNG - VD: Lướt nhanh (Dash) tạo bóng mờ Afterimage / Bị trúng đòn chớp trắng]
4. ĐỊNH DẠNG 1-FILE OUTPUT BẮT BUỘC:
   - [CHỌN 1]:
     + (A) "01 Tấm Ảnh Sprite Sheet Duy Nhất (PNG)": Xếp các hướng và frame vào một lưới đều nhau (Grid), kích thước mỗi ô bằng nhau tuyệt đối, tâm (Pivot) đặt chính giữa đáy hoặc tâm mỗi ô, nền trong suốt, không bị dính viền giữa các ô.
     + (B) "01 File Code SVG / HTML5 Canvas Animator Duy Nhất": Viết thành một hàm/class hoàn chỉnh `renderTopDownEntity(ctx, x, y, angle8, state, tick)` xử lý trọn gói việc vẽ đủ các hướng, co giãn Squash & Stretch và hoạt động đặc biệt.
```

---

### 🏃 PROMPT 6B: DÀNH CHO GAME 2D GÓC NHÌN NGANG (SIDE-SCROLLER / PLATFORMER)
*(Biến 1 nhân vật/quái nhìn ngang thành bộ chuyển động: Đứng yên, Tới/Lui, Nhảy, Rơi và Chiêu thức đặc biệt)*

```text
=== [MOTION PROMPT 6B: SIDE-VIEW HOẠT ẢNH HÀNH ĐỘNG] ===
Bạn là 2D Character Animator. Dưới đây là thiết kế gốc (Base Object) của tôi từ bước Object Prompt:
"""
[DÁN MÃ SVG / HÀM CANVAS / HOẶC ĐÍNH KÈM ẢNH GỐC TỪ FILE 05 VÀO ĐÂY]
"""

Hãy giữ nguyên 100% thiết kế và bảng màu của đối tượng gốc, biến đổi nó thành MỘT FILE DIỄN HOẠT GÓC NHÌN NGANG (SIDE-VIEW) DUY NHẤT gồm các trạng thái:
1. Các hoạt ảnh bắt buộc:
   - Đứng yên (Idle - 2 frames): Nhún nhẹ cơ thể và vũ khí.
   - Di chuyển Tới / Lui (Run/Walk - 4 frames): Bước chạy dứt khoát (Lưu ý: Chỉ cần vẽ hướng nhìn sang Phải, khi đi Lùi/sang Trái code sẽ tự lật ngang `scaleX = -1` để tiết kiệm 50% tài nguyên!).
   - Nhảy lên & Rơi xuống (Jump & Fall - 2 frames): Tư thế co chân bật nhảy (Stretch dọc) và tư thế tiếp đất (Squash ngang).
2. Các hoạt động đặc biệt (Bỏ trống nếu không có):
   - Đòn tấn công / Kỹ năng: [ĐIỀN HOẶC ĐỂ TRỐNG - VD: Đâm kiếm tới trước / Bắn chưởng năng lượng]
   - Trạng thái Trúng đòn / Chết: [ĐIỀN HOẶC ĐỂ TRỐNG - VD: Ngửa người ra sau chớp trắng / Tan biến thành hạt]
   - Hoạt động riêng theo chủ đề: [ĐIỀN HOẶC ĐỂ TRỐNG]
3. ĐỊNH DẠNG 1-FILE OUTPUT BẮT BUỘC:
   - [CHỌN 1]:
     + (A) "01 Tấm Ảnh Sprite Sheet Ngang Duy Nhất (PNG)": Chia thành các hàng (Mỗi hàng là 1 trạng thái: Hàng 1 Idle, Hàng 2 Run, Hàng 3 Jump, Hàng 4 Special), các ô vuông vức đồng kích thước, chân nhân vật luôn chạm đúng 1 đường baseline cố định.
     + (B) "01 Module Code SVG / HTML5 Canvas Animator Duy Nhất": Hàm `renderSideEntity(ctx, x, y, facingRight, state, tick)` tự động diễn hoạt mượt mà mọi trạng thái trên.
```

---

### 💥 PROMPT 6C: DÀNH CHO ĐẠN, VẬT PHẨM, HIỆU ỨNG CHIÊU THỨC & THỜI TIẾT (VFX / PROPS / WEATHER)
*(Không giới hạn ở người hay quái: Dùng cho viên đạn xoay, vụ nổ, đồng xu lấp lánh, mưa, tuyết, sương mù, hào quang)*

```text
=== [MOTION PROMPT 6C: HIỆU ỨNG ĐẠN, VẬT PHẨM & THỜI TIẾT (VFX & ENVIRONMENT MOTION)] ===
Bạn là Technical VFX Artist cho Game 2D. Dưới đây là vật thể/hiệu ứng gốc từ bước Object Prompt (hoặc mô tả hiệu ứng cần tạo):
"""
[DÁN MÃ SVG / ẢNH VẬT THỂ TỪ FILE 05 HOẶC MÔ TẢ HIỆU ỨNG VÀO ĐÂY]
"""

Hãy tạo ra MỘT FILE DIỄN HOẠT HIỆU ỨNG DUY NHẤT cho đối tượng này theo cấu hình sau:
1. Loại đối tượng chuyển động:
   - [CHỌN 1: Đạn bay & Đuôi đạn (Projectile + Trail) / Vụ nổ khi va chạm (Impact/Explosion VFX) / Vật phẩm xoay & Phát sáng (Floating Collectible) / Hiệu ứng Thời tiết & Môi trường (Mưa, Tuyết, Gió bụi, Sấm sét, Sương mù)].
2. Quy luật chuyển động yêu cầu:
   - Chuyển động chính: [ĐIỀN - VD: Viên đạn xoay tròn liên tục kèm đuôi hạt sáng tắt dần / Vật phẩm bay nhấp nhô lên xuống theo hàm Sin và tỏa vòng sáng / Vụ nổ bung ra 5 frame từ lõi trắng sang khói đen].
   - Biến thể trạng thái đặc biệt (Bỏ trống nếu không có): [ĐIỀN HOẶC ĐỂ TRỐNG - VD: Khi đạn chí mạng thì to gấp đôi và có tia sét quấn quanh].
3. ĐỊNH DẠNG 1-FILE OUTPUT BẮT BUỘC:
   - [CHỌN 1]:
     + (A) "01 Module Code JS/Canvas Procedural VFX (Khuyên dùng số 1 cho Đạn, Hạt & Thời tiết)": Xuất ra class/function tự chứa, xử lý toàn bộ toán học hạt (Particle Emitter), độ mờ (Alpha decay) và chuyển động mượt 60 FPS không tốn bộ nhớ ảnh.
     + (B) "01 Tấm Sprite Sheet Hiệu Ứng (PNG Strip 4-6 frames)": Xếp thành 1 dải ngang từ lúc bắt đầu hiệu ứng đến lúc tan biến trên nền trong suốt.
```
