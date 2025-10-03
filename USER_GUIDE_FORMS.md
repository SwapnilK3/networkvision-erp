# 🎯 Quick User Guide - Add Forms

## ✅ Forms Are Now Working!

All **"Add New"** buttons now open functional forms where you can add data that will be **saved and displayed immediately**.

---

## 📦 Add New Inventory Item

### How to Access:
1. Navigate to **Inventory** page
2. Click **"Add Product"** button (top-right corner)

### Form Fields:
- **SKU** * (Required) - e.g., `MT-009`
- **Product Name** * (Required) - e.g., `Copper Wire`
- **Category** - Select from dropdown
- **Unit** - Units, Kg, Liters, etc.
- **Quantity** * (Required) - e.g., `100`
- **Min Stock** - Minimum level alert
- **Max Stock** - Maximum capacity
- **Unit Price (₹)** * (Required) - e.g., `500`
- **Location** - e.g., `Warehouse A - Rack 3`
- **Supplier** - Supplier name
- **Updated By** - Select team member

### What Happens:
✅ Item is added to localStorage  
✅ Item appears in the inventory grid immediately  
✅ Stats update (Total Products count increases)  
✅ Activity log is created  
✅ Stock status is calculated automatically  

### Example Data:
```
SKU: CW-100
Name: Copper Wire 2.5mm
Category: Raw Materials
Quantity: 150
Min Stock: 50
Max Stock: 300
Unit: Meters
Price: 45
Location: Warehouse B - Section 2
Supplier: Mumbai Metals Ltd
```

---

## 🏭 Add New Supplier

### How to Access:
1. Navigate to **Suppliers** page
2. Click **"Add Supplier"** button (top-right corner)

### Form Fields:
- **Company Name** * (Required) - e.g., `Maharashtra Steel Industries`
- **Contact Person** * (Required) - e.g., `Rajesh Patil`
- **Email** * (Required) - e.g., `rajesh@mahasteel.in`
- **Phone** * (Required) - e.g., `+91 98765 43210`
- **Address** - Full address with city, state
- **GST Number** - e.g., `27ABCDE1234F1Z5`
- **Lead Time (days)** - Delivery time in days
- **Supplier Rating** - 1-5 stars (interactive)
- **Performance Score (%)** - 0-100
- **Products Supplied** - Comma-separated list
- **Added By** - Select team member

### What Happens:
✅ Supplier is added to localStorage  
✅ New supplier card appears immediately  
✅ Stats update (Active Suppliers count increases)  
✅ Activity log is created  
✅ Rating and performance are displayed  

### Example Data:
```
Company Name: Pune Metal Suppliers
Contact Person: Amit Deshmukh
Email: amit@punemetal.com
Phone: +91 98234 56789
Address: Bhosari Industrial Estate, Pune, Maharashtra 411026
GST: 27FGHIJ5678K2L9
Lead Time: 7 days
Rating: 4 stars
Performance: 88%
Products: Aluminum Products, Copper Wires, Metal Accessories
```

---

## 💡 Tips & Best Practices

### For Inventory:
1. **Use consistent SKU format** - e.g., `MT-XXX` for materials
2. **Set realistic min/max stock** - For proper alerts
3. **Include location details** - For easy finding
4. **Match supplier names** - Use exact supplier names
5. **Choose correct unit** - Units, Kg, Liters, Meters, etc.

### For Suppliers:
1. **Verify GST format** - Should be 15 characters
2. **Use +91 for phone** - Indian phone format
3. **Complete address** - Include city and state
4. **Realistic lead time** - Actual delivery time
5. **Fair rating** - Based on actual performance

---

## 🔄 Data Persistence

### Where is data stored?
- **localStorage** in your browser
- Survives page refresh
- Specific to this domain
- Can be exported as JSON

### How to view stored data:
1. Open **DevTools** (F12)
2. Go to **Application** tab
3. Click **Local Storage** → **http://localhost:3003**
4. See keys:
   - `networkvision_inventory`
   - `networkvision_suppliers`
   - `networkvision_activities`

### How to export data:
```javascript
// In browser console
const inventory = localStorage.getItem('networkvision_inventory');
console.log(JSON.stringify(JSON.parse(inventory), null, 2));

// Copy the output and save to file
```

---

## ✅ Validation Rules

### Inventory Form:
- ✅ SKU is required and must be unique
- ✅ Name is required
- ✅ Quantity must be >= 0
- ✅ Price must be >= 0
- ✅ Min stock ≤ Max stock
- ✅ All numbers must be valid

### Supplier Form:
- ✅ Company name is required
- ✅ Contact person is required
- ✅ Email must be valid format
- ✅ Phone is required
- ✅ Rating is 1-5 stars
- ✅ Performance is 0-100%
- ✅ Lead time must be > 0

---

## 🎨 Form Features

### Interactive Elements:
- **Dropdowns** - Pre-defined options for consistency
- **Number inputs** - Spin buttons and keyboard input
- **Text areas** - Multi-line for addresses
- **Star rating** - Click to rate suppliers
- **Live totals** - See calculated values instantly

### Visual Feedback:
- **Required fields** - Marked with * symbol
- **Disabled button** - Until form is valid
- **Loading state** - While saving (if added)
- **Success close** - Dialog closes on success
- **Error alerts** - If something fails

### Keyboard Support:
- **Tab** - Move between fields
- **Enter** - Submit form (when valid)
- **Escape** - Close dialog
- **Arrow keys** - Navigate dropdowns

---

## 🐛 Troubleshooting

### Form doesn't open?
- Check if button says "Add Product" or "Add Supplier"
- Ensure you're on the correct page
- Try refreshing the browser

### Can't submit form?
- Check all required fields (*) are filled
- Verify numbers are valid
- Make sure email format is correct

### Data not appearing?
- Refresh the page
- Check localStorage in DevTools
- Verify network connection (for future API)

### Form resets but no new item?
- Open browser console (F12)
- Check for error messages
- Verify localStorage has space

---

## 📱 Mobile Support

The forms are fully responsive and work on:
- ✅ Desktop (full width)
- ✅ Tablet (medium width)
- ✅ Mobile (scrollable)

On mobile:
- Forms take full screen
- Fields stack vertically
- Touch-friendly buttons
- Keyboard opens automatically

---

## 🎯 Common Workflows

### Adding Bulk Inventory:
1. Click "Add Product"
2. Fill form and submit
3. Form closes automatically
4. Click "Add Product" again
5. Repeat for each item

### Quick Supplier Entry:
1. Have supplier details ready
2. Click "Add Supplier"
3. Fill required fields first (*)
4. Add optional details
5. Adjust rating and performance
6. Submit

### Verifying Entry:
1. After submission, form closes
2. Scroll to find new item
3. Check details are correct
4. Edit if needed (coming soon)

---

## 🔜 Coming Soon

### Future Enhancements:
- **Edit forms** - Modify existing items
- **Delete confirmation** - Safe deletion
- **Bulk import** - CSV/Excel upload
- **Templates** - Save common entries
- **Barcode** - Scan to add items
- **Photos** - Upload product images
- **Custom fields** - Add your own fields

---

## 📞 Need Help?

If you encounter issues:
1. Check this guide first
2. View browser console for errors
3. Check localStorage contents
4. Verify form validation
5. Contact developer

---

## 🎉 You're All Set!

Start adding inventory and suppliers now. The forms are fully functional and your data will be saved immediately!

**Happy managing!** 📦🏭

---

**Created**: October 3, 2025  
**For**: NetworkVision ERP Users
