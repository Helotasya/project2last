export default class Project{
    name =''
    description = ''
    imageUrl = ''
    budget = 0
    isActive = false

    constructor(initilizer){
        this.id = initilizer.id;
        this.name = initilizer.name;
        this.description = initilizer.description;
        this.imageUrl = initilizer.imageUrl;
        this.budget = initilizer.budget;
        this.isActive = initilizer.isActive
    }
}