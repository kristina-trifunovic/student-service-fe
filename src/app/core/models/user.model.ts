import { City } from "./city.model";

export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: City;
    authorities: [{authority: string}]
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
}