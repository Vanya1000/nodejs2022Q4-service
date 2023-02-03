export default abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO,
> {
  protected entities: Entity[] = [];

  abstract create(createDto: CreateDTO): Entity;

  findMany<K extends keyof Entity>(key?: K, value?: Entity[K]) {
    if (key && value) {
      return this.entities.filter((entity) => entity[key] === value);
    }
    return this.entities;
  }

  findOne<K extends keyof Entity>(key: K, value: Entity[K]) {
    return this.entities.find((entity) => entity[key] === value);
  }

  update(id: string, changeDto: ChangeDTO) {
    const index = this.entities.findIndex((entity) => entity.id === id);
    const entity = this.entities[index];
    const updated: Entity = {
      ...entity,
      ...changeDto,
    };
    this.entities[index] = updated;
    return updated;
  }

  delete(id: string) {
    const index = this.entities.findIndex((entity) => entity.id === id);
    const del = this.entities.splice(index, 1);
    return del[0];
  }
}
