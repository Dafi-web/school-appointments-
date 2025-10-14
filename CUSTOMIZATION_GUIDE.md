# Customization Guide - Dilla University Branding

## 🎨 Current Branding

The application has been customized for:
- **Institution:** Dilla University
- **Department:** School of Electrical and Computer Engineering
- **Location:** Ethiopia
- **Color Scheme:** Blue gradient theme

---

## 🖼️ Adding Your Logo

### **Method 1: Simple Logo Addition**

1. **Prepare your logo:**
   - Format: PNG, SVG, or JPG
   - Recommended size: 200x200px minimum
   - Background: Transparent (PNG/SVG) or white

2. **Add logo to project:**
   ```bash
   # Place your logo file in the public folder
   cp /path/to/your/logo.png frontend/public/logo.png
   ```

3. **Update the Logo component:**
   - Open `frontend/src/components/Logo.jsx`
   - Find the commented `<img>` tag
   - Uncomment it
   - Comment out the "DU" text

   ```jsx
   // Before (placeholder):
   DU
   
   // After (real logo):
   <img 
     src="/logo.png" 
     alt="Dilla University Logo" 
     style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
   />
   ```

### **Method 2: Using Multiple Logo Sizes**

Create optimized versions:
```bash
# Add different sizes
frontend/public/
  ├── logo-small.png    # 50x50px for navbar
  ├── logo-medium.png   # 100x100px for cards
  └── logo-large.png    # 200x200px for login/register
```

Update Logo component to use size-specific images:
```jsx
const logoSrc = size === 'large' ? '/logo-large.png' : 
                size === 'medium' ? '/logo-medium.png' : 
                '/logo-small.png';

<img src={logoSrc} alt="Dilla University Logo" ... />
```

---

## 🎨 Customizing Colors

### **University Color Scheme**

Edit `frontend/src/index.css`:

```css
:root {
  /* Primary Colors - Customize to match your university colors */
  --primary: #1e40af;        /* Main blue */
  --primary-dark: #1e3a8a;   /* Darker blue for hover states */
  --primary-light: #dbeafe;  /* Light blue for backgrounds */
  
  /* Secondary Colors */
  --secondary: #10b981;      /* Green for success */
  --accent: #f59e0b;         /* Amber for highlights */
  
  /* You can change these to your university's official colors */
}
```

### **Common Color Schemes:**

**Ethiopian Flag Colors:**
```css
--primary: #078930;    /* Green */
--secondary: #FCDD09;  /* Yellow */  
--accent: #DA121A;     /* Red */
```

**Traditional Blue/Gold:**
```css
--primary: #003366;    /* Navy Blue */
--secondary: #FFD700;  /* Gold */
--accent: #6699CC;     /* Light Blue */
```

---

## 📝 Updating Text Content

### **1. Institution Name**

**Files to update:**

`frontend/src/components/Navbar.jsx`:
```jsx
<h1>School of Electrical & Computer Engineering</h1>
<p>Dilla University, Ethiopia</p>
```

`frontend/src/pages/Login.jsx`:
```jsx
<p>School of Electrical & Computer Engineering</p>
<p>Dilla University, Ethiopia</p>
```

`frontend/src/pages/Register.jsx`:
```jsx
<p>School of Electrical & Computer Engineering</p>
<p>Dilla University, Ethiopia</p>
```

### **2. Page Titles**

Update `frontend/index.html`:
```html
<title>ECE Appointments - Dilla University</title>
```

### **3. System Name**

If you want to change "appointments" to something else like "Consultation System":

Search and replace in all dashboard files:
- "appointments" → "consultations"
- "Book Appointment" → "Schedule Consultation"
- etc.

---

## 🌐 Adding Amharic Support (Optional)

### **Method 1: Static Content**

Add Amharic text alongside English:

```jsx
<h1 style={{ fontSize: '1.1rem' }}>
  School of Electrical & Computer Engineering
  <br/>
  የኤሌክትሪክ እና ኮምፒውተር ምህንድስና ትምህርት ቤት
</h1>
```

### **Method 2: Full i18n Support**

1. **Install i18n library:**
   ```bash
   cd frontend
   npm install react-i18next i18next
   ```

2. **Create translation files:**
   ```
   frontend/src/locales/
   ├── en.json  # English translations
   └── am.json  # Amharic translations
   ```

3. **Configure and use:**
   See: https://react.i18next.com/

---

## 📱 Responsive Logo Display

### **Hide text on mobile:**

Update Navbar component:
```jsx
<div>
  <h1 style={{ 
    fontSize: '1.1rem',
    display: window.innerWidth < 768 ? 'none' : 'block'  // Hide on mobile
  }}>
    School of Electrical & Computer Engineering
  </h1>
</div>
```

Or use CSS media queries in `index.css`:
```css
@media (max-width: 768px) {
  .navbar-title {
    display: none;
  }
}
```

---

## 🎯 Department-Specific Customization

If you want to customize per department:

### **Create Department Config:**

```javascript
// frontend/src/config/department.js
export const departmentConfig = {
  name: 'School of Electrical & Computer Engineering',
  shortName: 'ECE',
  university: 'Dilla University',
  country: 'Ethiopia',
  logo: '/logo-ece.png',
  colors: {
    primary: '#1e40af',
    secondary: '#10b981'
  }
};
```

### **Use in Components:**

```jsx
import { departmentConfig } from '../config/department';

<h1>{departmentConfig.name}</h1>
<img src={departmentConfig.logo} alt={departmentConfig.shortName} />
```

---

## 🖨️ Customizing Email/Print Templates

For appointment confirmations or printable schedules:

### **Add Footer Info:**

```jsx
<footer style={{ 
  textAlign: 'center', 
  padding: '2rem',
  color: 'var(--gray-600)'
}}>
  <p>School of Electrical & Computer Engineering</p>
  <p>Dilla University, Dilla, Ethiopia</p>
  <p>Email: ece@du.edu.et | Phone: +251-XX-XXX-XXXX</p>
</footer>
```

---

## 🔧 Environment-Based Branding

For multiple deployments (different schools):

### **1. Create .env file:**

```bash
# frontend/.env
VITE_SCHOOL_NAME="School of Electrical & Computer Engineering"
VITE_UNIVERSITY_NAME="Dilla University"
VITE_COUNTRY="Ethiopia"
VITE_LOGO_PATH="/logo.png"
```

### **2. Use in components:**

```jsx
<h1>{import.meta.env.VITE_SCHOOL_NAME}</h1>
<p>{import.meta.env.VITE_UNIVERSITY_NAME}, {import.meta.env.VITE_COUNTRY}</p>
<img src={import.meta.env.VITE_LOGO_PATH} alt="Logo" />
```

---

## 📋 Branding Checklist

Use this checklist to ensure complete branding:

### **Visual Elements:**
- [ ] University logo added to `/public/logo.png`
- [ ] Logo component updated to use real logo
- [ ] Colors customized to match university branding
- [ ] Favicon updated (`/public/favicon.ico`)

### **Text Content:**
- [ ] Institution name updated in Navbar
- [ ] Institution name updated in Login page
- [ ] Institution name updated in Register page
- [ ] Page title updated in `index.html`
- [ ] Footer information added (if needed)

### **Optional:**
- [ ] Amharic translations added
- [ ] Department-specific config created
- [ ] Email templates customized
- [ ] Print layouts branded

---

## 🎨 Design Tips

### **Professional Look:**

1. **Consistent Spacing:**
   - Use consistent padding/margins
   - Follow the existing spacing patterns

2. **Color Usage:**
   - Primary color for main actions
   - Secondary for confirmations
   - Gray for secondary actions
   - Keep contrast ratios accessible

3. **Typography:**
   - Use 2-3 font sizes maximum per component
   - Maintain hierarchy (headings > subheadings > body)

4. **Images:**
   - Optimize logo files (use SVG when possible)
   - Keep file sizes small (<100KB)
   - Use consistent aspect ratios

---

## 🚀 Quick Customization Commands

```bash
# 1. Add your logo
cp /path/to/logo.png frontend/public/logo.png

# 2. Update favicon
cp /path/to/favicon.ico frontend/public/favicon.ico

# 3. Restart dev server to see changes
npm run dev
```

---

## 📚 Files Reference

### **Branding Files:**
```
frontend/
├── public/
│   ├── logo.png          # Your university logo
│   └── favicon.ico       # Browser tab icon
├── src/
│   ├── components/
│   │   ├── Logo.jsx      # Reusable logo component
│   │   └── Navbar.jsx    # Top navigation with branding
│   ├── pages/
│   │   ├── Login.jsx     # Login page branding
│   │   └── Register.jsx  # Register page branding
│   └── index.css         # Color scheme & styles
└── index.html            # Page title
```

---

## 🆘 Troubleshooting

### **Logo not showing:**
- Check file path is correct: `/logo.png` (in `public` folder)
- Clear browser cache (Ctrl+Shift+R)
- Check console for 404 errors
- Verify image format is supported (PNG, JPG, SVG)

### **Colors not updating:**
- Clear browser cache
- Check CSS syntax in `:root` variables
- Restart dev server

### **Text not changing:**
- Make sure you saved the file
- Check you're editing the correct component
- Restart dev server if hot reload fails

---

**Need help?** Check the component files or ask for assistance!

**Last Updated:** October 14, 2025

