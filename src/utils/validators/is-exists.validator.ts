import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'isExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];
    const entity: unknown = await this.dataSource
      .getRepository(repository)
      .findOne({
        where: {
          [pathToProperty ? pathToProperty : validationArguments.property]:
            pathToProperty ? value?.[pathToProperty] : value,
        },
      });
    return !!entity;
  }
}
