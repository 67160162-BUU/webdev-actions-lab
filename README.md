# Web Development & GitHub Actions Lab (`webdev-actions-lab`)

**ผู้จัดทำ:** กตัญญู สงวนสัจวาจา (Gatunyu Sanguansatjawaja)  
**รหัสนิสิต:** 67160162  
**คณะ:** วิทยาการสารสนเทศ สาขาปัญญาประดิษฐ์ประยุกต์ มหาวิทยาลัยบูรพา (BUU)  
**ลิงก์เว็บไซต์ (GitHub Pages):** [https://67160162-buu.github.io/webdev-actions-lab/](https://67160162-buu.github.io/webdev-actions-lab/)

---

## ส่วนที่ 1: สรุปการทำแบบฝึกหัด (Exercise)

1. **ข้อ 1 (UI):** ออกแบบหน้าเว็บใน `index.html` และ `style.css` แบ่งออกเป็น 3 ส่วนหลัก ได้แก่:
   - **About Me (`#about`):** แนะนำข้อมูลส่วนตัว การศึกษา ความสนใจ และเป้าหมาย
   - **Skills (`#skills`):** แสดงทักษะความสามารถ แบ่งเป็นหมวดหมู่ Frontend, Backend, DevOps & Automation และ Tools & Workflow
   - **Contact (`#contact`):** แสดงช่องทางการติดต่อ (อีเมลมหาวิทยาลัย, GitHub Profile, สถานที่)
2. **ข้อ 2 (JavaScript):** พัฒนาฟังก์ชันใน `script.js` ให้ใช้งานได้จริง:
   - ปุ่มสลับภาษา **TH / EN (`#langToggle`)** เปลี่ยนข้อความทั้งหน้าเว็บแบบ Dynamic
   - ปุ่มสลับธีม **Light / Dark (`#themeToggle`)** เปลี่ยนโทนสีสว่าง/มืดผ่าน CSS Variables พร้อมจำค่าใน `localStorage`
   - ปุ่มทักทาย **Say Hello (`#helloBtn`)** เปลี่ยนข้อความสถานะบนหน้าเว็บ
3. **ข้อ 3 (Automation — อธิบายการทำงานของ Workflow และ Job `deploy`):**
   - **Workflow จะเริ่มทำงานเมื่อใด?**  
     Workflow จะเริ่มทำงานอัตโนมัติใน 2 กรณีตามที่ระบุไว้ในส่วน `on:` ของไฟล์ `.github/workflows/deploy.yml` ได้แก่:
     1. เมื่อมีการ `push` โค้ดใหม่ขึ้นไป `main` บน GitHub
     2. เมื่อผู้พัฒนสั้งรันผ่านคำสั่ง `workflow_dispatch` ในหน้าแท็บ Actions บนเว็บไซต์ GitHub
   - **Job `deploy` ทำอะไร?**  
     Job `deploy` ทำหน้าที่จำลองเครื่องเซิร์ฟเวอร์ Linux เพื่อเตรียมและส่งไฟล์เว็บไซต์ขึ้นไปเผยแพร่บน GitHub Pages โดยมีขั้นตอนย่อย ดังนี้:
     1. **Checkout source code (`actions/checkout@v4`):** ดึงไฟล์โค้ดล่าสุดจาก Repository ลงมายังเครื่อง Runner
     2. **Check `index.html` exists (`test -f index.html`):** ตรวจสอบว่ามีไฟล์ `index.html` อยู่จริงหรือไม่ก่อนดำเนินการต่อ
     3. **Setup Pages (`actions/configure-pages@v5`):** ตั้งค่าสภาพแวดล้อมและเตรียมคอนฟิกของ GitHub Pages
     4. **Upload static website (`actions/upload-pages-artifact@v3`):** บีบอัดไฟล์เว็บไซต์ทั้งหมดในโฟลเดอร์ปัจจุบัน (`path: '.'`) แล้วอัปโหลดเป็น Artifact
     5. **Deploy to GitHub Pages (`actions/deploy-pages@v4`):** นำ Artifact ที่อัปโหลดไว้ไปเผยแพร่ขึ้นสู่เซิร์ฟเวอร์ GitHub Pages จนได้ URL เว็บไซต์ที่ใช้งานได้จริง
4. **Challenge (เพิ่มเติม):** เพิ่มขั้นตอนตรวจสอบไฟล์ `index.html` ก่อน Deploy ใน `.github/workflows/deploy.yml` ด้วยคำสั่ง Shell:
   ```yaml
   - name: Check index.html exists before deploy
     run: test -f index.html
   ```

---

## ส่วนที่ 2: คำถามท้ายแลป (10. Lab Questions)

### 1) GitHub Actions แตกต่างจาก GitHub Pages อย่างไร?

- **GitHub Actions** คือระบบ **CI/CD และ Workflow Automation** ที่ทำหน้าที่รันชุดคำสั่งอัตโนมัติเมื่อเกิดเหตุการณ์ต่างๆ ใน Repository (เช่น การตรวจสอบโค้ด, การรันเทสต์, การ Build โปรเจกต์ และการสั่ง Deploy)
- **GitHub Pages** คือบริการ **Static Web Hosting** ที่ทำหน้าที่เป็นเซิร์ฟเวอร์สำหรับเก็บและแสดงผลไฟล์หน้าเว็บ (HTML, CSS, JavaScript, รูปภาพ) ให้ผู้ใช้ทั่วไปสามารถเปิดเข้าชมผ่าน URL บนเบราว์เซอร์ได้
- **สรุปความสัมพันธ์:** GitHub Actions คือ _"กระบวนการขนส่งและตรวจสอบอัตโนมัติ"_ ส่วน GitHub Pages คือ _"ปลายทางที่ใช้แสดงผลเว็บไซต์"_

---

### 2) เหตุใดจึงเลือก trigger ด้วย `push` ที่ branch `main`?

- เพราะในมาตรฐานการพัฒนาซอฟต์แวร์ กิ่ง `main` เปรียบเสมือน **Production Branch** ที่เก็บโค้ดเวอร์ชันหลักที่ผ่านการตรวจสอบและพร้อมใช้งานจริงแล้วเท่านั้น
- การตั้งให้ Trigger เฉพาะเมื่อ `push` เข้ากิ่ง `main` ช่วยให้เว็บไซต์จริงอัปเดตเฉพาะเมื่อมีโค้ดที่สมบูรณ์แล้ว และป้องกันไม่ให้โค้ดที่กำลังทดลองทำอยู่ในกิ่งย่อยอื่นๆ (Feature/Dev branches) ถูกนำไปทับหน้าเว็บไซต์จริงโดยไม่ตั้งใจ

---

### 3) ถ้าแก้ไฟล์ในเครื่องแต่ไม่ได้ `push` เว็บไซต์จะเปลี่ยนหรือไม่ เพราะเหตุใด?

- **ไม่เปลี่ยน**
- **เพราะว่า:** การแก้ไขไฟล์หรือแม้แต่การ `git commit` เป็นเพียงการบันทึกการเปลี่ยนแปลงไว้ในเครื่องคอมพิวเตอร์ของเรา (Local Repository) เท่านั้น โค้ดดังกล่าวยังไม่ได้ถูกส่งขึ้นไปยังเซิร์ฟเวอร์ของ GitHub (Remote Repository) ทำให้ GitHub Actions ไม่ได้รับสัญญาณ (Trigger) ให้เริ่มทำงาน และ GitHub Pages จึงยังคงแสดงผลไฟล์จากเวอร์ชันเก่าที่อยู่บนเซิร์ฟเวอร์ต่อไปจนกว่าเราจะสั่ง `git push`

---

### 4) เหตุใดโปรเจกต์ PHP + MySQL จึงไม่สามารถนำไปรันบน GitHub Pages ได้โดยตรง?

- เพราะ **GitHub Pages รองรับเฉพาะเว็บไซต์แบบ Static (Static Website)** ซึ่งประกอบด้วยไฟล์ที่ทำงานฝั่งผู้ใช้งาน (Client-side / Browser) เช่น HTML, CSS และ JavaScript เท่านั้น
- ในขณะที่โปรเจกต์ **PHP + MySQL เป็นเว็บไซต์แบบ Dynamic** ที่ต้องพึ่งพาการประมวลผลฝั่งเซิร์ฟเวอร์ (Server-side execution ด้วย PHP Runtime) และต้องมีระบบจัดการฐานข้อมูล (MySQL Database Server) คอยทำงานอยู่เบื้องหลัง ซึ่งเซิร์ฟเวอร์ของ GitHub Pages ไม่ได้มีสภาพแวดล้อมเหล่านี้ให้

---

### 5) อธิบายขั้นตอนการค้นหาสาเหตุ เมื่อ Workflow มีสถานะ `Failed`

1. **เข้าสู่หน้าแท็บ Actions:** เปิดหน้า Repository บน GitHub แล้วคลิกที่แท็บ **Actions** ด้านบน
2. **เลือกรายการที่ล้มเหลว:** คลิกเข้าไปที่รายการ Workflow run ล่าสุดที่มีสัญลักษณ์กากบาทสีแดง (`❌ Failed`)
3. **เปิดดู Job ที่เกิดปัญหา:** คลิกที่ชื่อ Job ที่ทำงานไม่สำเร็จ (เช่น `deploy`) เพื่อดูลำดับขั้นตอน (Steps) ทั้งหมด
4. **ตรวจสอบ Step ที่พังและอ่าน Error Logs:** ระบบจะกางบรรทัดที่มีปัญหาออกมาอัตโนมัติ ให้สังเกตข้อความแจ้งเตือน (`Error` หรือ `Process completed with exit code ...`) เช่น:
   - หากพังที่ขั้นตอน `Check index.html exists` แปลว่าไม่พบไฟล์ `index.html` ในโฟลเดอร์หลัก
   - หากพังเรื่อง `Permission denied` หรือ `HttpError` แปลว่าตั้งค่า `permissions` ในไฟล์ YAML ไม่ครบ หรือยังไม่ได้เปิด Settings → Pages ให้เป็น GitHub Actions
5. **แก้ไขและทดสอบใหม่:** นำสาเหตุที่พบกลับมาแก้โค้ดในเครื่อง จากนั้นทำ `git add`, `git commit` และ `git push` ขึ้นไปใหม่เพื่อตรวจสอบว่าสถานะเปลี่ยนเป็นสีเขียว (`✅ Success`) หรือไม่
