import React from 'react'
import ProjectCard from './ProjectCard';
import ProjectFrom from './ProjectFrom';
import { useState } from 'react';

const ProjectList = ({projects, onSave}) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEditClick = (project) => {
    setProjectBeingEdited(project)
  }
  const cancelEditing = () => {
    setProjectBeingEdited ({})
  }
  return (
  
    <div className='row'>
    {projects.map((project) => (
      <div key={project.id} className='cols-sm'>
        {project === projectBeingEdited ?(
          <ProjectFrom onSave={onSave} onCancel={cancelEditing} project={project} /> 
        ) : (
            <ProjectCard project={project} onEdit={handleEditClick}/>
        )}
            
      </div>
        ))}
    </div>
        
  
  )
}

export default ProjectList;
