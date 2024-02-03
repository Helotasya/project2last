import React, { useState, useEffect,Fragment } from 'react'
import { projectAPI } from './projectAPI';
import ProjectList from './ProjectList';
import Project from './Project';

const ProjectsPage = () => {
    const [projects, setProject] = useState ([]);
    const [loading, setLoading] = useState (false);
    const [error,setErrors] = useState (undefined);
    const [currentPage, setCurrentPage] =useState (1);

    const handleMoreClick = () =>{
        setCurrentPage(currentPage => currentPage + 1);
    }

//     const saveProject = (project) => {
//         let updatedProjects = project.map((p)=>{
//             return p.id === project.id ? project : p
//         })

//         setProject(updatedProjects)
// }

useEffect (()=>{
    const loadProjects = async() => {
        setLoading(true);
        try {
            const data = await projectAPI.get(currentPage);
            if (currentPage ===1){
                setProject(data);
            }else{
                setProject((projects)=>[...projects, ...data])
            }
        }catch (e) {
            if (e instanceof Error){
                setErrors(e.message);
            }
        }finally {
            setLoading(false)
        }
    }
    loadProjects()
},[currentPage])

const saveProject = (project) =>{
    projectAPI
    .put(project)
    .then(updatedProject => {
        let updatedProjects = projects.map((p) => {
            return p.id == project.id ? new Project (updatedProject) : p;
        });
        setProject(updatedProjects);
    })
    .catch((e) => {
        if (e instanceof Error) {
            setErrors(e.message)
        }
    })
}


    return (
        <Fragment>
            <h1>Project</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className='icon-alert inverse'> </span>
                                {error}
                            </p> 
                        </section>
                    </div>
                </div>
            )}
            <ProjectList onSave={saveProject} projects={projects} />
            
            {
                !loading && !error &&(
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="button-group fluid">
                                <button className="button default" onClick={handleMoreClick}>
                                    More...
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                loading && (
                    <div className="center-page">
                        <span className="spinner primary">
                            <p>loading...</p>
                        </span>
                    </div>
                )
            }
            
        </Fragment>
    )
}

export default ProjectsPage