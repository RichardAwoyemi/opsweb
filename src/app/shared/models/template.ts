export interface ITemplate {
  id: string;
  name: string;
  description: string
}

export class Template implements ITemplate {
  id: string;
  name: string;
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
