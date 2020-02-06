import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res.json({ err: 'File not provider.' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    return res.json(file);
  }
}

export default new FileController();