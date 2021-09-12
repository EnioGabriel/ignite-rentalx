// Responsável por controlar o upload de arquivos
import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          // hash para gerar sempre um num aleatório e evitar repetiçao de nome
          const fileHash = crypto.randomBytes(16).toString("hex");
          // Concatenando filehash com o nome do arquivo enviado
          const fileName = `${fileHash}-${file.originalname}`;

          // 1° param: erro
          // 2° param: arquivo
          return callback(null, fileName);
        },
      }),
    };
  },
};
