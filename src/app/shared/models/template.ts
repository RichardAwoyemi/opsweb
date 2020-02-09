export interface ITemplate {
  id: string;
  name: string;
}

export class Template implements ITemplate {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
