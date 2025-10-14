# Quick Guide: Add Your Logo

## 🚀 3 Simple Steps

### **Step 1: Prepare Your Logo**
- File format: PNG, SVG, or JPG
- Size: At least 200x200 pixels
- Background: Transparent (PNG) recommended
- Name it: `logo.png`

### **Step 2: Add Logo File**
```bash
# Copy your logo to the public folder
cp /path/to/your/logo.png frontend/public/logo.png
```

### **Step 3: Update Logo Component**

Open: `frontend/src/components/Logo.jsx`

**Find this code (around line 28-35):**
```jsx
{/* 
  To use your actual logo:
  1. Add your logo image to: frontend/public/logo.png
  2. Uncomment the img tag below
  3. Comment out or remove the "DU" text
*/}
{/* <img 
  src="/logo.png" 
  alt="Dilla University Logo" 
  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
/> */}
DU
```

**Change it to:**
```jsx
{/* Logo added! */}
<img 
  src="/logo.png" 
  alt="Dilla University Logo" 
  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
/>
{/* DU */}
```

### **Step 4: Verify**
```bash
# Refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
# Your logo should now appear!
```

---

## 📍 Logo Locations

Your logo will automatically appear in:
- ✅ Navigation bar (top of every page)
- ✅ Login page
- ✅ Register page

---

## 🎨 Logo Requirements

### **Recommended:**
- **Format:** PNG with transparency
- **Size:** 512x512px (will auto-resize)
- **Colors:** University official colors
- **Quality:** High resolution

### **Acceptable:**
- **Format:** JPG, SVG
- **Min Size:** 200x200px
- **Max Size:** < 500KB

---

## 🔧 Troubleshooting

### **Logo not showing?**

1. **Check file location:**
   ```bash
   ls frontend/public/logo.png
   # Should show the file
   ```

2. **Check file name:**
   - Must be exactly `logo.png` (lowercase)
   - In the `public` folder
   - Not in `src` or other folders

3. **Clear browser cache:**
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5`
   - Safari: `Cmd+Option+R`

4. **Check console:**
   - Open browser DevTools (F12)
   - Check Console for errors
   - Look for 404 errors about logo.png

5. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### **Logo looks stretched or cut off?**

Adjust the `objectFit` style in `Logo.jsx`:
```jsx
// Try different values:
objectFit: 'contain'  // Fits inside, may have space
objectFit: 'cover'    // Fills box, may crop
objectFit: 'scale-down' // Scales down if too large
```

### **Logo too small or too large?**

Adjust the padding in `Logo.jsx`:
```jsx
// Reduce padding for larger logo:
padding: '4px'  // Less padding = bigger logo

// Increase padding for smaller logo:
padding: '12px' // More padding = smaller logo
```

---

## 🎯 Alternative: Using Different Sizes

If you want different logo sizes for different places:

### **1. Create multiple versions:**
```bash
frontend/public/
  ├── logo-navbar.png   # 50x50px
  ├── logo-auth.png     # 100x100px
  └── logo-full.png     # 200x200px
```

### **2. Update Logo.jsx:**
```jsx
const logoSrc = size === 'large' ? '/logo-auth.png' : 
                size === 'medium' ? '/logo-navbar.png' : 
                '/logo-navbar.png';

<img src={logoSrc} alt="..." />
```

---

## 📝 Quick Commands

```bash
# Add logo
cp ~/Downloads/logo.png frontend/public/logo.png

# Verify it's there
ls -lh frontend/public/logo.png

# Open Logo component to edit
code frontend/src/components/Logo.jsx

# Restart server
npm run dev
```

---

## ✅ Checklist

- [ ] Logo file prepared (PNG, 200x200px+)
- [ ] Logo copied to `frontend/public/logo.png`
- [ ] `Logo.jsx` updated (img uncommented, DU commented)
- [ ] Browser cache cleared
- [ ] Logo appears in navbar
- [ ] Logo appears in login page
- [ ] Logo appears in register page

---

## 🎉 Done!

Your Dilla University logo is now part of the system!

**For more customization:**
- See `CUSTOMIZATION_GUIDE.md` for advanced options
- See `BRANDING_SUMMARY.md` for complete branding info

---

**Need help?** Check the troubleshooting section above or the full customization guide.

