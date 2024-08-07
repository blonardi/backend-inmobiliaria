import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../uploads/') // Asegúrate de que este directorio existe
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } });

export default upload;
