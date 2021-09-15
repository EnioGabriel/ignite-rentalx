// Responsável pela regra de negócio da importação de um arquivo .csv

import fs from "fs";
import csvParse from "csv-parse";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

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
          // Removendo arquivo armazenado no tmp
          fs.promises.unlink(file.path);

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

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        // Armazenando no 'DB' os valores importados do arquivo
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoriesUseCase };
