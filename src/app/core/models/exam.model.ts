import { ExamId } from "./exam-id.model";
import { ExamPeriod } from "./exam-period.model";
import { Professor } from "./professor.model";
import { Student } from "./student.model";
import { Subject } from "./subject.model";

export interface Exam {
    id: ExamId;
    examPeriod: ExamPeriod;
    subject: Subject;
    professor: Professor;
    grade?: number;
    examDate: string;
}