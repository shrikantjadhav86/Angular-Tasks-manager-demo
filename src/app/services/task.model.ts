// tasklist module

export class TaskModel {
  public id: number;
	public name: string;
  public description: string;
  public taskListId: number;
	constructor(id: number, name: string, description: string, taskListId: number) {
		this.id = id;
    this.name = name;
    this.description = description;
    this.taskListId = taskListId;
	}
}
