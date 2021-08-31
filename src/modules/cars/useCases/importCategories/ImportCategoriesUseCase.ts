// Responsável pela regra de negócio da importação de um arquivo .csv

import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Lê arquivo
      const stream = fs.createReadStream(file.path);

      // Array para armazenar os dados
      const categories: IImportCategory[] = [];

      // Responsavel por separar os valores (formato de virgula)
      const parseFile = csvParse();

      // pipe => funciona igual conceito de buffer em videos (pega pedaços do arquivo e vai repassando)
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          // Populando o array
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          // Retorna o array com os dados
          resolve(categories);
        })
        .on("error", (err) => {
          // Retorna um erro
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        // Armazenando no 'DB' os valores importados do arquivo
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoriesUseCase };
