import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }
  newProject: string = "";
  projects: Object = [];

  ngOnInit(): void {
    //this.projects = this.getProjects();
  }

  createProject(){
    if (this.newProject != "" ) {
      console.log("new Project Has been created");
      //this.projects.push(this.newProject)

      //this.projectService.create(this.newProject);
    }
    else {
      console.log("Please fill in with the new Project name")
    }
  }

  deleteProject(){
    
  }

  updateProjectName() {

  }

  getProjects() {
    
  }

}
