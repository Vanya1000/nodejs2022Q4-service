type FavsEntity = {
  artists: string[];
  albums: string[];
  tracks: string[];
};

export default class DBFavs {
  protected entities: FavsEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findMany() {
    return this.entities;
  }

  findOneByType(type: keyof FavsEntity) {
    return this.entities[type];
  }

  add(type: keyof FavsEntity, id: string) {
    this.entities[type].push(id);
  }

  delete(type: keyof FavsEntity, id: string) {
    const index = this.entities[type].findIndex((entity) => entity === id);
    this.entities[type].splice(index, 1);
  }
}
