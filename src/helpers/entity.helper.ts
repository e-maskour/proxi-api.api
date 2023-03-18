import { AfterLoad, BaseEntity } from 'typeorm';

export class EntityHelper extends BaseEntity {
  __entity?: string;

  @AfterLoad()
  setEntity() {
    this.__entity = this.constructor.name;
  }
}
