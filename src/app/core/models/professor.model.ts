import { Subject } from "./subject.model";
import { Title } from "./title.model";
import { User } from "./user.model";

export interface Professor extends User {
    phone: string;
    reelectionDate: string;
    title: Title;
    subjects?: Subject[];
}