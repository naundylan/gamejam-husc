# 06. MOTION PROMPT (DIỄN HOẠT THREE.JS 3D/2.5D: 8 HƯỚNG, HÀNH ĐỘNG & HIỆU ỨNG VFX)

## 📌 1. Giải Pháp Kỹ Thuật Tối Thượng Trên Web Three.js: 01 File Duy Nhất!

> [!IMPORTANT]
> **KẾT LUẬN KỸ THUẬT TRÊN THREE.JS: LUÔN XUẤT RA ĐÚNG 01 FILE MODULE DIỄN HOẠT (HOẶC 01 TẤM SPRITE SHEET ATLAS DUY NHẤT)!**
> * **Ưu thế tuyệt đối của Three.js so với 2D truyền thống**:
>   1. **Xoay 8 hướng hoặc 360 độ tự nhiên bằng `mesh.rotation.y`**: Nếu đối tượng từ bước `05_object_prompt.md` là một **`THREE.Group` 3D Mesh**, bạn **KHÔNG CẦN vẽ lại 8 bức ảnh ở 8 góc độ**! Three.js xoay khối 3D thật theo mọi góc nhìn (`Math.atan2(dx, dz)`), ánh sáng và bóng đổ tự động cập nhật theo thời gian thực!
>   2. **Diễn hoạt bộ phận bằng Toán học (Procedural Rigging)**: Tay, chân, vũ khí, áo choàng trong `mesh.userData.parts` chuyển động mượt 60 FPS bằng hàm lượng giác (`Math.sin`, `Math.cos`, `THREE.MathUtils.lerp`) và hiệu ứng co giãn (`mesh.scale.set(squash, stretch, squash)`).
>   3. **Nếu dùng Sprite 2.5D (`THREE.Sprite` / `PlaneGeometry`)**: Toàn bộ 8 hướng hoặc các động tác (Idle, Run, Jump, Attack) được đóng gói vào **01 tấm Sprite Sheet Grid duy nhất**, điều khiển bằng `texture.offset.set(col / cols, row / rows)` — không bao giờ bị lệch tâm hay chớp hình!

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: Mã nguồn `THREE.Group` / `SVG` / `Ảnh Sprite` tạo ra từ **`05_object_prompt.md`**.
* **Output**: **01 File Module Diễn Hoạt (`animateEntity(mesh, state, dir, dt, elapsedTime)`)** hoặc **01 Sprite Sheet Atlas hoàn chỉnh**.
* **Truyền sang**: Ghép trực tiếp vào vòng lặp `requestAnimationFrame` của game (cùng với `07_function_prompt.md`).

---

## 📋 3. BỘ 3 PROMPT CON CHUYÊN BIỆT (CHỌN ĐÚNG GÓC NHÌN / LOẠI VẬT THỂ)

### 🧭 PROMPT 6A: DIỄN HOẠT GÓC NHÌN TOP-DOWN / ISOMETRIC 3D (8 HƯỚNG / 360° & HÀNH ĐỘNG)
*(Dành cho Nhân vật, Quái vật, Xe, Phi thuyền trong không gian 3D/2.5D nhìn từ trên xuống)*

```xml
<motion_prompt_6a type="TOP_DOWN_3D_OR_8WAY_MOTION">
<system_role>
Bạn là Principal Three.js Procedural Animator & Technical Character Rigger.
</system_role>

<base_object_input>
Dưới đây là mã nguồn / hình ảnh gốc của thực thể từ bước Object Prompt:
"""
{{DÁN_CODE_THREE_GROUP_HOẶC_SVG_TỪ_FILE_05_VÀO_ĐÂY}}
"""
</base_object_input>

<animation_specification>
Hãy giữ nguyên 100% cấu trúc hình học và chất liệu của thực thể gốc, sau đó viết **01 MODULE DIỄN HOẠT DUY NHẤT** thực hiện đầy đủ các chuyển động sau:
1. Chế độ Xoay Hướng (Directional Rotation):
   - [CHỌN 1: Xoay 360 độ mượt mà theo hướng di chuyển/con trỏ chuột bằng `THREE.MathUtils.lerpAngle` / HOẶC Khóa cứng 8 góc độ chuẩn (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°) theo 8 hướng mũi tên].
   - Khi đổi hướng hoặc di chuyển ngang, thân nhân vật nghiêng nhẹ vào tâm cua (`mesh.rotation.z = -turnVelocity * 0.15` - Banking Effect).
2. Các Trạng thái Chuyển động Cơ bản (Base Locomotion States):
   - `IDLE` (Đứng yên): Nhấp nhô thở nhẹ theo trục Y (`Math.sin(time * 3) * 0.05`), vũ khí và tay đung đưa nhẹ.
   - `MOVE` (Di chuyển): Nảy bước chân nhịp nhàng (`Math.abs(Math.sin(time * 12))`), nghiêng người về phía trước (`rotation.x = 0.15`), co giãn Squash & Stretch.
3. Các Hoạt động Đặc biệt (Bỏ trống nếu không có):
   - Hành động Đặc biệt 1 (`ATTACK / SHOOT`): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: VD: Vung vũ khí chém ngang 180 độ kèm độ giật lùi Recoil / Giật nòng pháo về sau rồi trả về bằng Lerp}}"
   - Hành động Đặc biệt 2 (`DASH / TWIST_SKILL`): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: VD: Kéo giãn thân dài ra theo trục Z (Stretch 1.5x) và để lại bóng mờ / Xoay tít 360 độ như cơn lốc}}"
   - Hành động Đặc biệt 3 (`HIT / DEATH`): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: VD: Giật ngửa ra sau, chớp toàn bộ material.emissive sang trắng trong 0.08s}}"
4. ĐỊNH DẠNG 1-FILE OUTPUT BẮT BUỘC:
   - [CHỌN 1: Module hàm Three.js `updateEntityMotion(mesh, state, targetAngle, dt, elapsedTime)` hoàn chỉnh / HOẶC 01 Tấm Sprite Sheet 8 hướng chia lưới đều nhau kèm code `THREE.CanvasTexture` UV offset].
</animation_specification>
</motion_prompt_6a>
```

---

### 🏃 PROMPT 6B: DIỄN HOẠT GÓC NHÌN NGANG 2.5D (SIDE-SCROLLER: TỚI, LUI, NHẢY, ĐÁNH)
*(Dành cho game 2.5D Platformer / Side-view Action trên Three.js)*

```xml
<motion_prompt_6b type="SIDE_VIEW_2_5D_MOTION">
<system_role>
Bạn là Lead 2.5D Action Animator trên nền tảng Three.js WebGL.
</system_role>

<base_object_input>
Dưới đây là mã nguồn / hình ảnh gốc của thực thể từ bước Object Prompt:
"""
{{DÁN_CODE_THREE_GROUP_HOẶC_SVG_TỪ_FILE_05_VÀO_ĐÂY}}
"""
</base_object_input>

<animation_specification>
Hãy xuất ra **01 MODULE DIỄN HOẠT SIDE-VIEW DUY NHẤT** cho thực thể trên với đầy đủ các trạng thái:
1. Các hoạt ảnh cơ bản bắt buộc:
   - `IDLE` (Đứng yên): Nhún vai và vũ khí theo nhịp thở.
   - `RUN_FORWARD / RUN_BACKWARD` (Chạy tới / Lùi): Tự động quay mặt sang Phải (`rotation.y = Math.PI/2`) hoặc Trái (`rotation.y = -Math.PI/2`) mượt mà bằng Lerp; chân tay đánh nhịp ngược pha nhau.
   - `JUMP & FALL` (Nhảy lên & Rơi xuống): Khi bật nhảy kéo giãn trục Y (`scale.set(0.8, 1.3, 0.8)`), khi chạm đất ép dẹt (`scale.set(1.3, 0.7, 1.3)`) rồi đàn hồi về `(1, 1, 1)`.
2. Các hoạt động đặc biệt (Bỏ trống nếu không có):
   - Chiêu thức / Tấn công: "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: VD: Đập vũ khí từ trên xuống tạo sóng xung kích / Lướt chém trên không}}"
   - Hoạt động đặc thù theo chủ đề: "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG}}"
3. ĐỊNH DẠNG 1-FILE OUTPUT BẮT BUỘC:
   - Xuất ra 01 hàm JavaScript Three.js tự chứa `updateSideEntityMotion(mesh, state, facingDir, velocityY, dt, elapsedTime)` (hoặc 01 Sprite Sheet ngang đồng kích thước).
</animation_specification>
</motion_prompt_6b>
```

---

### 💥 PROMPT 6C: DIỄN HOẠT ĐẠN, VẬT PHẨM, HIỆU ỨNG NỔ & THỜI TIẾT 3D (THREE.JS VFX & WEATHER)
*(Dùng cho mọi thứ ngoài nhân vật: Đạn bay, Vụ nổ mảnh vỡ 3D, Vòng sáng Buff, Mưa, Tuyết, Bụi không gian, Sấm sét)*

```xml
<motion_prompt_6c type="THREEJS_VFX_PROJECTILE_WEATHER">
<system_role>
Bạn là Senior Three.js VFX & Particle Systems Engineer.
</system_role>

<vfx_specification>
Hãy thiết kế cho tôi **01 MODULE HIỆU ỨNG ĐỘNG THREE.JS DUY NHẤT** cho đối tượng sau:
- Loại đối tượng / Hiệu ứng: [CHỌN 1: Đạn bay kèm đuôi sáng (Projectile + Trail) / Vụ nổ mảnh vỡ 3D (3D Debris Explosion) / Vật phẩm bay lơ lửng & Vòng hào quang (Floating Item) / Hiệu ứng Thời tiết & Môi trường 3D (Mưa 3D, Tuyết rơi, Bụi phát sáng, Sấm sét, Sương mù)]
- Mô tả chuyển động chính: "{{ĐIỀN: VD: Khi quái chết, bắn tung ra 20 khối lập phương nhỏ bay theo quỹ đạo parabol có trọng lực, nảy trên mặt sàn rồi thu nhỏ biến mất / Hoặc Mưa neon rơi chéo trong không gian 3D quanh Camera}}"
- Biến thể đặc biệt (Bỏ trống nếu không có): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG}}"

<performance_constraints>
- BẮT BUỘC sử dụng `THREE.InstancedMesh`, `THREE.Points` (`BufferGeometry`), hoặc Object Pool tái sử dụng để vẽ hàng trăm hạt mà chỉ tốn **01 Draw Call**, giữ vững 60 FPS tuyệt đối.
- Tuyệt đối không tạo mới (`new THREE.Mesh`) liên tục mỗi frame mà không thu hồi (`dispose` / pool).
</performance_constraints>
</vfx_specification>
</motion_prompt_6c>
```
