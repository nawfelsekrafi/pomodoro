import {Project} from './project';;
import { WorkingSession } from './working-session';

export class User {
  uid: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  photoUrl?: string;
  setting?: number;
  projects?: Project[] = [];
  workingSessions?: WorkingSession[] = [];
}