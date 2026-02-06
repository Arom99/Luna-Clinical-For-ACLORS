const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.log("❌ Connection Error:", err));

// --- SCHEMAS ---
const DoctorSchema = new mongoose.Schema({
  id: String,
  name: String,
  specialty: String,
  location: String,
  locationId: String,
  rating: Number,
  reviews: Number,
  available: Boolean,
  consultationFee: Number,
  about: String
});
const Doctor = mongoose.model('Doctor', DoctorSchema);

const AppointmentSchema = new mongoose.Schema({
  doctorId: String,
  doctorName: String,
  specialty: String,
  date: String,
  time: String,
  location: String,
  status: { type: String, default: 'Pending' }, 
  paymentStatus: String, 
  amount: Number,
  notes: String,
  patientName: String,
  resultFile: String,
  created_at: { type: Date, default: Date.now }
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);

const UserSchema = new mongoose.Schema({
  customId: Number, 
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Customer' },
  status: { type: String, default: 'Active' },
  phone: String,
  
  // Profile Fields
  countryCode: { type: String, default: '+61' },
  dateOfBirth: String,
  address: String,
  medicalNumber: String,
  insuranceProvider: String,
  insuranceNumber: String,
  emergencyContact: String,
  emergencyPhone: String,

  joinedDate: { type: String, default: () => new Date().toLocaleDateString() },
  savedCards: [{ last4: String, brand: String, expiry: String }]
});
const User = mongoose.model('User', UserSchema);

const InventorySchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  reorderLevel: Number,
  status: String 
});
const InventoryItem = mongoose.model('InventoryItem', InventorySchema);

// --- SEED DATA (FULL 15 DOCTORS) ---
app.get('/seed-all', async (req, res) => {
  try {
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    await User.deleteMany({});
    await InventoryItem.deleteMany({});
    
    // 15 DOCTORS
    const doctorsData = [
      { id: "doc1", name: "Dr. Sarah Johnson", specialty: "Pathologist", location: "Sydney CBD", locationId: "loc1", rating: 4.9, reviews: 124, available: true, consultationFee: 150 },
      { id: "doc2", name: "Dr. Michael Chen", specialty: "Lab Director", location: "Parramatta", locationId: "loc2", rating: 4.8, reviews: 98, available: true, consultationFee: 180 },
      { id: "doc3", name: "Dr. Emily Watson", specialty: "Cardiologist", location: "Wollongong", locationId: "loc3", rating: 4.7, reviews: 215, available: false, consultationFee: 200 },
      { id: "doc4", name: "Dr. James Wilson", specialty: "General Practitioner", location: "Sydney CBD", locationId: "loc1", rating: 4.6, reviews: 89, available: true, consultationFee: 120 },
      { id: "doc5", name: "Dr. Linda Brown", specialty: "Dermatologist", location: "Parramatta", locationId: "loc2", rating: 4.9, reviews: 310, available: true, consultationFee: 160 },
      { id: "doc6", name: "Dr. Robert Davis", specialty: "Pediatrician", location: "Wollongong", locationId: "loc3", rating: 5.0, reviews: 150, available: true, consultationFee: 140 },
      { id: "doc7", name: "Dr. William Miller", specialty: "Neurologist", location: "Sydney CBD", locationId: "loc1", rating: 4.8, reviews: 75, available: false, consultationFee: 220 },
      { id: "doc8", name: "Dr. Elizabeth Taylor", specialty: "Psychiatrist", location: "Parramatta", locationId: "loc2", rating: 4.7, reviews: 90, available: true, consultationFee: 190 },
      { id: "doc9", name: "Dr. David Anderson", specialty: "Orthopedic Surgeon", location: "Wollongong", locationId: "loc3", rating: 4.9, reviews: 200, available: true, consultationFee: 250 },
      { id: "doc10", name: "Dr. Jennifer Thomas", specialty: "Ophthalmologist", location: "Sydney CBD", locationId: "loc1", rating: 4.6, reviews: 112, available: true, consultationFee: 170 },
      { id: "doc11", name: "Dr. Christopher Martinez", specialty: "Dentist", location: "Parramatta", locationId: "loc2", rating: 4.8, reviews: 300, available: true, consultationFee: 130 },
      { id: "doc12", name: "Dr. Jessica Jackson", specialty: "ENT Specialist", location: "Wollongong", locationId: "loc3", rating: 4.7, reviews: 85, available: true, consultationFee: 160 },
      { id: "doc13", name: "Dr. Daniel White", specialty: "Gynecologist", location: "Sydney CBD", locationId: "loc1", rating: 4.9, reviews: 180, available: true, consultationFee: 175 },
      { id: "doc14", name: "Dr. Matthew Harris", specialty: "Urologist", location: "Parramatta", locationId: "loc2", rating: 4.5, reviews: 60, available: true, consultationFee: 190 },
      { id: "doc15", name: "Dr. Ashley Martin", specialty: "Oncologist", location: "Sydney CBD", locationId: "loc1", rating: 4.9, reviews: 95, available: false, consultationFee: 300 }
    ];
    await Doctor.insertMany(doctorsData);

    // INVENTORY
    await InventoryItem.insertMany([
      { name: 'Blood Collection Tubes', category: 'Supplies', stock: 150, reorderLevel: 50, status: 'Good' },
      { name: 'Test Reagents - CBC', category: 'Reagents', stock: 25, reorderLevel: 30, status: 'Low' },
      { name: 'Sterile Gloves (Box)', category: 'PPE', stock: 80, reorderLevel: 40, status: 'Good' },
      { name: 'Microscope Slides', category: 'Equipment', stock: 10, reorderLevel: 20, status: 'Critical' }
    ]);

    // USERS (Default Password: 123)
    await User.insertMany([
      { customId: 1, name: 'Admin User', email: 'admin123@gmail.com', password: '123', role: 'Admin', status: 'Active', phone: '0412345678' },
      { customId: 10, name: 'John Doe', email: 'john@example.com', password: '123', role: 'Customer', status: 'Active', phone: '0487654321', address: '123 Sydney St', dateOfBirth: '1990-01-01' },
      { customId: 11, name: 'Jane Smith', email: 'jane@example.com', password: '123', role: 'Customer', status: 'Active', phone: '0411223344' }
    ]);

    res.send("🎉 Database Fully Restored: 15 Doctors & Users Ready!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// --- API ENDPOINTS ---

// FIX 1: Lấy user không phân biệt hoa thường
app.get('/users/email/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();
    const user = await User.findOne({ email: email });
    if (user) res.json(user);
    else res.status(404).json({ message: "Not found" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/users', async (req, res) => {
  const users = await User.find().sort({ customId: 1 });
  res.json(users);
});

// FIX 2: Tạo user lưu email thường
app.post('/users', async (req, res) => {
  try {
    const rawEmail = req.body.email || "";
    const email = rawEmail.toLowerCase().trim();
    const { role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email exists" });

    let newId;
    if (role === 'Admin') {
       const last = await User.findOne({ role: 'Admin' }).sort({ customId: -1 });
       newId = last ? last.customId + 1 : 1;
    } else {
       const last = await User.findOne({ role: 'Customer' }).sort({ customId: -1 });
       newId = last && last.customId >= 10 ? last.customId + 1 : 10;
    }
    const newUser = new User({ ...req.body, email, customId: newId });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// FIX 3: Đăng nhập không phân biệt hoa thường
app.post('/auth/login', async (req, res) => {
  try {
    const rawEmail = req.body.email || "";
    const email = rawEmail.toLowerCase().trim();
    const { password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/doctors', async (req, res) => { const d = await Doctor.find(); res.json(d); });
app.get('/doctors/:id', async (req, res) => { const d = await Doctor.findOne({id: req.params.id}); if(d) res.json(d); else res.status(404).json({msg:"Not found"}); });
app.post('/doctors', async (req, res) => { try { const d = new Doctor(req.body); await d.save(); res.json(d); } catch (e) { res.status(400).json(e); } });

app.get('/appointments', async (req, res) => { const a = await Appointment.find().sort({ created_at: -1 }); res.json(a); });
app.post('/appointments', async (req, res) => { const {doctorId, date, time} = req.body; const ex = await Appointment.findOne({doctorId, date, time}); if(ex) return res.status(400).json({error:"Taken"}); const n = new Appointment({...req.body, status:'Confirmed', paymentStatus:'Paid'}); await n.save(); res.json(n); });
app.patch('/appointments/:id', async (req, res) => { const u = await Appointment.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json(u); });
app.delete('/appointments/:id', async (req, res) => { await Appointment.findByIdAndDelete(req.params.id); res.json({msg:"Deleted"}); });
app.get('/booked-slots', async (req, res) => { const {doctorId, date} = req.query; const a = await Appointment.find({doctorId, date}); res.json(a.map(x=>x.time)); });
app.get('/inventory', async (req, res) => { const i = await InventoryItem.find(); res.json(i); });
app.post('/inventory', async (req, res) => { const n = new InventoryItem(req.body); await n.save(); res.json(n); });
app.post('/inventory/order', async (req, res) => { const {itemId, quantity} = req.body; const i = await InventoryItem.findById(itemId); i.stock+=quantity; await i.save(); res.json(i); });

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));