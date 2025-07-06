import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 4000;
const UPLOADS_DIR = path.resolve('./backend/uploads');
const DATA_FILE = path.resolve('./backend/photos.json');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

function readPhotos() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writePhotos(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 사진 업로드
app.post('/api/photos', upload.single('photo'), (req, res) => {
  const { description } = req.body;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const photo = {
    id: Date.now().toString(),
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    description: description || '',
    uploadedAt: new Date().toISOString()
  };
  const photos = readPhotos();
  photos.unshift(photo);
  writePhotos(photos);
  res.json(photo);
});

// 사진 목록 조회
app.get('/api/photos', (req, res) => {
  const photos = readPhotos();
  res.json(photos);
});

// 사진 삭제
app.delete('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  let photos = readPhotos();
  const photo = photos.find(p => p.id === id);
  if (!photo) return res.status(404).json({ error: 'Not found' });
  photos = photos.filter(p => p.id !== id);
  writePhotos(photos);
  // 파일 삭제
  fs.unlink(path.join(UPLOADS_DIR, photo.filename), () => {});
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 