// tasklist module

export class TaskListModel {
  public id: number;
	public name: string;
	public description: string;
	constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
		this.description = description;
	}
}
