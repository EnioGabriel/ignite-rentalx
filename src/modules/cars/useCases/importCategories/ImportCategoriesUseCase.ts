import fs from "fs";
import csvParse from "csv-parse";

class ImportCategoriesUseCase {
  execute(file: Express.Multer.File) {
    // Lê arquivo
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    // pipe => funciona igual conceito de buffer em videos (pega pedaços do arquivo e vai repassando)
    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoriesUseCase };
