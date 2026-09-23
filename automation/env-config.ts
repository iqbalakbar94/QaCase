import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import customConfig from './custom-config.json';

function checkFile(filePath: string): string {
  const fileName = path.basename(filePath);

  if (fileName === '.env.-') {
    console.error('Invalid environment file name!');
    process.exit(1);
  }

  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    console.log(`File exist at path: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error(`File not exist at path: ${filePath}`);
    process.exit(1);
  }
}

export function configureEnvironment(): void {
  const selectedEnv = customConfig.env_active;
  const selectedEnvLowerCase = typeof selectedEnv === 'string' ? selectedEnv.toLowerCase() : '';
  const validEnvName = ['testing', 'staging'];
  const envActive = validEnvName.includes(selectedEnvLowerCase) ? selectedEnvLowerCase : '-';
  const envActivePath = path.resolve(process.cwd(), `.env.${envActive}`);
  
  // Memuat variabel langsung ke process.env
  dotenv.config({ path: checkFile(envActivePath) });

  // Simpan ENV_NAME aktif ke process.env agar bisa diakses di mana saja
  process.env.ENV_NAME = envActive;
}

configureEnvironment();