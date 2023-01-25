import { Exam } from "./exam.model";
import { Index } from "./index.model";
import { User } from "./user.model";

export interface Student extends User{
    index: Index;
    currentYearOfStudy: number;
    exams?: Exam[];
}