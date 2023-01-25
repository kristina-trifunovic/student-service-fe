import { Semester } from "../enums";

export interface Subject {
    id: number;
    name: string;
    description: string;
    noOfEsp: number;
    yearOfStudy: number;
    semester: Semester;
}