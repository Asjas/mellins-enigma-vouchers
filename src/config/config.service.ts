import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(3000),
      ENIGMA_URL: Joi.string().required(),
      ENIGMA_TENANT: Joi.string().required(),
      ENIGMA_USERNAME: Joi.string().required(),
      ENIGMA_PASSWORD: Joi.string().required(),
      SMTP_HOST: Joi.string().required(),
      SMTP_PORT: Joi.number().required(),
      MAIL_USER: Joi.string().required(),
      MAIL_PASS: Joi.string().required(),
      MYSQL_HOST: Joi.string().required(),
      MYSQL_PORT: Joi.number().default(3306),
      MYSQL_USERNAME: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().required(),
      MYSQL_DATABASE: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get NODE_ENV(): string {
    return this.envConfig.NODE_ENV;
  }
  get PORT(): number {
    return Number(this.envConfig.PORT);
  }
  get ENIGMA_URL(): string {
    return this.envConfig.ENIGMA_URL;
  }
  get ENIGMA_TENANT(): string {
    return this.envConfig.ENIGMA_TENANT;
  }
  get ENIGMA_USERNAME(): string {
    return this.envConfig.ENIGMA_USERNAME;
  }
  get ENIGMA_PASSWORD(): string {
    return this.envConfig.ENIGMA_PASSWORD;
  }
  get SMTP_HOST(): string {
    return this.envConfig.SMTP_HOST;
  }
  get SMTP_PORT(): number {
    return Number(this.envConfig.SMTP_PORT);
  }
  get MAIL_USER(): string {
    return this.envConfig.MAIL_USER;
  }
  get MAIL_PASS(): string {
    return this.envConfig.MAIL_PASS;
  }
  get MYSQL_HOST(): string {
    return this.envConfig.MYSQL_HOST;
  }
  get MYSQL_PORT(): number {
    return Number(this.envConfig.MYSQL_PORT);
  }
  get MYSQL_USERNAME(): string {
    return this.envConfig.MYSQL_USERNAME;
  }
  get MYSQL_PASSWORD(): string {
    return this.envConfig.MYSQL_PASSWORD;
  }
  get MYSQL_DATABASE(): string {
    return this.envConfig.MYSQL_DATABASE;
  }
}
