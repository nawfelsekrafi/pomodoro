import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  newProject: string = "";
  projects: Project[] = [];
  user: User =  new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.currentUserData.subscribe((user) => {
      this.user = user;
       if (this.user.projects){
        this.projects = this.user.projects;
      } else {
        this.projects = [];
      }
    });
   
   /*
    this.userService.getUserAllData().subscribe((data:any) => {
      this.user =  data[0];
      if (this.user.projects){
        this.projects = this.user.projects;
      } else {
        this.projects = [];
      }
    });
    */
  }

  createProject(){
    if (this.newProject != "" ) {
      let p = {
        name : this.newProject,
        TimePassed :0,
        uid : <string>uuidv4() 
      };

      (<HTMLInputElement>document.getElementById("goal")).value = "";
      this.projects.push(p);
      
      this.user.projects = this.projects;
      this.userService.changeUserData(this.user);
      //this.userService.updateUserData(this.user);
    }
    else {
      console.log("Please fill in with the new Project name")
    }
  }

  deleteProject(id: string){
    this.projects = this.projects.filter(x=> x.uid != id);
    this.user.projects =  this.projects;
    //this.userService.updateUserData(this.user);
    this.userService.changeUserData(this.user);
  }

  updateProjectName(id: string) {
    let name = "*********";
    this.projects.find(x => x.uid == id).name = name;
    this.user.projects =  this.projects;
    //this.userService.updateUserData(this.user);
    this.userService.changeUserData(this.user);
  }
}
