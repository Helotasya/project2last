import React, { useState } from "react";
import Project from  './Project';

const ProjectFrom = ({project: initialProject, onSave, onCancel}) => {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState ({
        name : '',
        description :'',
        budget : ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid()) return
        onSave(project);
    }
    
    const handleChange = (event) =>{
        const {type, name, value, checked} = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        
        if(type==='number'){
            updatedValue = Number(updatedValue)
        }
        
    const change = {
        [name] : updatedValue
    }

    let updatedProject;

    setProject ((p) => {

        updatedProject = new Project({...p,...change});
        return updatedProject;
    });
    setErrors(() => validate(updatedProject))
    };
    
    const validate = (project) =>{
        let errors = {name : "", description: "", budget : "" };
        if (project.name.length === 0){
            errors.name = 'name is required';
        }
        if (project.name.length > 0 && project.name.length < 3 ){
            errors.name = "name need at least 3 characters";
        }
        if (project.description.length === 0 ){
            errors.description = "descriptrion is required";
        }
        if(project.budget === 0){
            errors.budget = "Budget mus t be more than 50.";
        }
        return errors;
    }
 
    const isValid = () => {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0 
        )   
    } 

    return(
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor='name'>Project Name</label>
            <input type="text" name = 'name' placeholder="Enter Name" value={project.name} onChange={handleChange}/>
            <label htmlFor='description'>Description</label>
            <input type="text" name = 'description' placeholder="Enter Name" value={project.description} onChange={handleChange}/>
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="Enter Budget" value={project.budget} onChange={handleChange} />
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" value={project.checkbox} onChange={handleChange}/>
            <div className="input-group">
                <button className="primary bordered medium">
                    save
                </button>
                <span />
                <button type="button" className="danger bordered medium" onClick={onCancel}>
                    cancel
                </button>
            </div>
        </form>
    )
}

export default ProjectFrom;