# 04. STYLE PROMPT (KHÓA PHONG CÁCH ĐỒ HỌA THREE.JS 3D/2.5D, ÁNH SÁNG & GIAO DIỆN CSS UI)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Nhận `Gameplay Prompt` và đúc kết thành một bản **`[LOCKED THREE.JS & UI STYLE BIBLE]`**.
* **Tại sao bước này quyết định vẻ đẹp của game Three.js?**  
  Trong Three.js, một tựa game nhìn như "đồ án sinh viên sơ sài" hay nhìn như **"Siêu phẩm Indie Game"** phụ thuộc 90% vào: **Bảng màu (Color Palette), Chất liệu (`Material: roughness, metalness, flatShading, emissive`), Ánh sáng (`Ambient + Directional + PointLight + Fog`) và lớp giao diện HTML/CSS Overlay**.
* Prompt này khóa cứng toàn bộ các thông số đó thành một "Hạt giống Ngữ cảnh (Style Context Seed)" để mọi vật thể 3D/SVG ở bước `05` và giao diện UI ở bước `07`, `11` đều đồng bộ tuyệt đối 100%.

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: `GAMEPLAY PROMPT CHÍNH THỨC` (từ file `01` hoặc `02`).
* **Output**: Khối **`[LOCKED STYLE CONTEXT]`** (Bao gồm cả thông số Three.js Lighting/Material lẫn quy chuẩn CSS UI).
* **Truyền sang**: `05_object_prompt.md`, `07_function_prompt.md`, `11_detail_prompt.md`.

---

## 📋 3. NỘI DUNG PROMPT TỐI ƯU HÓA (COPY TOÀN BỘ KHỐI DƯỚI ĐÂY)

```xml
<system_role>
Bạn là Principal 3D WebGL Technical Art Director (Three.js Specialist) & Lead Game UI/UX Designer.
</system_role>

<context_constraints>
Chúng tôi đang phát triển một tựa game Web 3D/2.5D bằng **Three.js + HTML5/CSS3 HUD Overlay** trong 150 phút.
Vì không thể dự đoán trước chủ đề, chúng tôi cần bạn phân tích bản `Gameplay Prompt` dưới đây và xuất ra một bản **"MASTER STYLE PROMPT" (`[LOCKED STYLE CONTEXT]`)**.
Bản khóa phong cách này chỉ định rõ ràng: Phong cách hình khối 3D/2.5D, Bảng mã màu HEX/Three.js (`0x...`), Cấu hình Ánh sáng & Sương mù Three.js, Quy tắc thiết kế Nhân vật, Quái vật, Vũ khí, Vật phẩm, Background Arena, các Bảng Popup và Thanh Bar UI.
</context_constraints>

<input_variables>
- Định hướng phong cách mong muốn (Để trống để AI tự chọn phong cách đỉnh nhất cho Gameplay, hoặc điền như: Low-Poly Neon Cyberpunk / Dark Gothic Dungeon 3D / Cozy Isometric Toon / Retro Synthwave Arcade / Voxel Blocky): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG}}"
- Bản Gameplay Prompt của chúng tôi:
"""
{{DÁN_GAMEPLAY_PROMPT_CHÍNH_THỨC_TỪ_FILE_01_HOẶC_02_VÀO_ĐÂY}}
"""
</input_variables>

<reasoning_protocol>
1. Phân tích tâm trạng (Mood) và nhịp độ của Cú Twist trong Gameplay để chọn trường phái thị giác 3D/2.5D vừa đẹp lung linh trên WebGL vừa tạo hình cực nhanh bằng Procedural Geometry / SVG.
2. Thiết lập độ tương phản 3 lớp (3-Tier Contrast): Lớp Nền (Tối/Độ bão hòa thấp) < Lớp Nhân vật & Quái (Sáng/Rõ khối) < Lớp Đạn & Hiệu ứng Twist (Phát sáng `emissive` rực rỡ nhất).
</reasoning_protocol>

<output_contract>
Xuất kết quả trong một khối code Markdown duy nhất theo đúng 8 mục dưới đây để tôi dùng làm Context khóa phong cách cho toàn bộ các AI tiếp theo:

```markdown
# [LOCKED STYLE CONTEXT] - HỒ SƠ KHÓA PHONG CÁCH THREE.JS & UI TOÀN GAME

## 1. Trường Phái Thị Giác 3D/2.5D & Chất Liệu Three.js (Core Aesthetic & Material Rules)
- Phong cách chủ đạo (Aesthetic Keywords): (VD: Stylized Low-Poly Flat-Shaded Neon / Isometric Toy Diorama / Cyber-Wireframe Glow).
- Loại Material chuẩn trong Three.js: (VD: `THREE.MeshStandardMaterial({ flatShading: true, roughness: 0.3, metalness: 0.2 })` kết hợp `emissive` cho các chi tiết năng lượng).
- Cấu hình Ánh sáng & Không khí (`Scene Lighting & Fog`):
  + `scene.background` & `THREE.FogExp2`: Mã màu và mật độ sương mù tạo chiều sâu không gian.
  + `AmbientLight` (Màu & Cường độ) + `DirectionalLight` (Góc chiếu tạo bóng đổ khối 3D rõ nét) + `PointLight` đi theo Player/Đạn.

## 2. Bảng Màu Khóa Cứng (Locked 6-Color Palette - Mã HEX `#RRGGBB` & Three.js `0xRRGGBB`)
- [1] Màu Nền & Sàn Đấu (Arena & Fog Base): `#......` (`0x......`)
- [2] Màu Chủ Đạo Nhân Vật & Đồng Minh (Player Hero Accent): `#......` (`0x......`)
- [3] Màu Kẻ Địch & Mối Đe Dọa (Enemy Threat Accent): `#......` (`0x......`)
- [4] Màu Cú Twist & Đạn Năng Lượng (Twist / Projectile High-Contrast Emissive): `#......` (`0x......`)
- [5] Màu Vật Phẩm & Điểm Thưởng (Collectible / Buff Gold/Cyan): `#......` (`0x......`)
- [6] Màu Khung Giao Diện UI & Viền (UI Panel Surface & Border): `#......` (`0x......`)

## 3. Phong Cách Thiết Kế Nhân Vật Chính & Đồng Minh (Player & Ally 3D/Sprite Style)
- Cấu trúc tổ hợp khối (`THREE.Group` Anatomy): Cách ghép các khối hình học (Thân, Đầu, Mắt phát sáng, Phụ kiện/Áo choàng/Động cơ) để tạo silhouette đặc trưng nhìn từ Camera trên cao xuống vẫn nhận ra ngay.
- Dấu hiệu nhận biết hướng mặt (Forward Facing Indicator): Chi tiết mũi nhọn, kính chắn hoặc vũ khí phía trước để người chơi biết rõ hướng ngắm bắn.

## 4. Phong Cách Thiết Kế Quái Vật & Boss (Enemy & Boss Silhouette Style)
- Ngôn ngữ hình khối đe dọa (Threat Shape Language): Sử dụng khối gai nhọn (`ConeGeometry` / `OctahedronGeometry`), lõi phát sáng đỏ/tím, phân biệt rõ 3 cấp: Quái thường (Nhỏ, 2-3 khối), Quái tinh anh (Vừa, có vòng giáp xoay), Boss (Khổng lồ, nhiều bộ phận phát sáng).

## 5. Phong Cách Vũ Khí, Đạn, Vật Phẩm & Hiệu Ứng (Weapons, Projectiles & Items Style)
- Đạn / Đòn đánh: Lõi sáng trắng (`0xffffff`) bọc hào quang `emissive` màu `[4]`, kèm đuôi hạt hoặc kéo dài theo hướng vận tốc.
- Vật phẩm / Buff: Khối đa diện lơ lửng (`IcosahedronGeometry` / Tinh thể / Hộp) tự xoay quanh trục Y và phát vòng sáng dưới sàn.

## 6. Phong Cách Sàn Đấu & Môi Trường 3D (3D Arena & Background Environment)
- Thiết kế mặt sàn (`Arena Floor`): Sử dụng `THREE.GridHelper` tùy chỉnh màu hoặc mặt phẳng chia ô gạch có viền tối để người chơi cảm nhận rõ vận tốc di chuyển trong không gian 3D.
- Vật trang trí ngoại vi (Boundary & Pillars): Cột trụ, tường chắn ánh sáng hoặc các khối trôi nổi ngoài rìa tạo cảm giác không gian rộng lớn.

## 7. Phong Cách Giao Diện HTML/CSS: Bảng Popup, Menu & Nút Bấm (UI Panels & Buttons)
- Thiết kế Khung Bảng (Menu / Game Over / Pause Popup): Sử dụng CSS `backdrop-filter: blur(10px)` (Glassmorphism tối màu) hoặc khung viền Arcade sắc cạnh, `border: 2px solid`, `box-shadow` phát sáng theo màu chủ đạo.
- Nút bấm (Buttons): Hiệu ứng hover phóng nhẹ `transform: scale(1.05)`, phát sáng viền và đổi màu tức thì.

## 8. Phong Cách Thanh Bar, HUD & Typography (Gauges, Bars & Fonts)
- Thanh Máu & Thanh Trạng Thái Twist (HP & Twist Gauge): Thiết kế thanh Bar có vạch chia hoặc dải màu chuyển sắc (`linear-gradient`), có lớp nền trễ màu trắng (`damage trail effect`) khi bị tụt máu.
- Font chữ (Typography): Sử dụng font trong thư mục `Assets/fonts/` (`kenpixel_future.ttf` hoặc `kenvector_future.ttf`), chữ in hoa sắc nét kèm `text-shadow: 0 2px 8px rgba(0,0,0,0.9)` để đọc rõ tuyệt đối trên nền WebGL 3D.
```
</output_contract>
```
