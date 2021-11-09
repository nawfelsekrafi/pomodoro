import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  newProject: string = '';
  projects: Project[] = [];
  user: User = new User();

  display: string = 'none';
  ProjectIdToModify: string = '';

  newName: string = '';
  delete: boolean = false;
  update: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((user) => {
      this.user = user;
      if (this.user.projects) {
        this.projects = this.user.projects;
      } else {
        this.projects = [];
      }
    });
  }

  createProject() {
    if (this.newProject != '') {
      let p = {
        name: this.newProject,
        TimePassed: 0,
        uid: <string>uuidv4(),
      };

      (<HTMLInputElement>document.getElementById('goal')).value = '';
      this.projects.push(p);

      this.user.projects = this.projects;
      this.userService.changeUserData(this.user);
      //this.userService.updateUserData(this.user);
    } else {
      console.log('Please fill in with the new Project name');
    }
  }

  openDeleteModal(id: string) {
    this.delete = true;
    this.display = 'block';
    document.getElementById('myModal').style.setProperty('display', 'block');
    this.ProjectIdToModify = id;
  }

  deleteProject() {
    this.projects = this.projects.filter(
      (x) => x.uid != this.ProjectIdToModify
    );
    this.user.projects = this.projects;
    //this.userService.updateUserData(this.user);
    this.userService.changeUserData(this.user);
    this.closeModal();
  }

  openUpdateModal(id: string) {
    this.update = true;
    this.display = 'block';
    document.getElementById('myModal').style.setProperty('display', 'block');
    this.ProjectIdToModify = id;
  }

  updateProjectName() {
    if (this.newName !== '') {
      let name = this.newName;
      this.projects.find((x) => x.uid == this.ProjectIdToModify).name = name;
      this.user.projects = this.projects;
      this.userService.changeUserData(this.user);
      this.closeModal();
      this.newName = '';
    }
  }

  ngOnChanges(): void {
    document
      .getElementById('myModal')
      .style.setProperty('display', this.display);
  }

  closeModal() {
    this.display = 'none';
    document
      .getElementById('myModal')
      .style.setProperty('display', this.display);
    this.delete = false;
    this.update = false;
    this.newName = '';
  }
}
