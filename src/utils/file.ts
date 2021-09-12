import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // Verifica se existe o arquivo
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // Remove o arquivo
  await fs.promises.unlink(filename);
};
