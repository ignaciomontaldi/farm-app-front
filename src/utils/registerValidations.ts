import { User } from "../types/user.types";

export function checkPassword(password:string):boolean {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-]{6,12}$/
    if(!regex.test(password)){
        return false;
    } else {
        return true;
    }
}

export function checkValidNumber(number:number):boolean {
    const regex = /^\d{7,9}$/
    if(!regex.test(number.toString())){
        return false;
    } else {
        return true;
    }
}

export function checkName(name:string):boolean {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    if(!regex.test(name)){
        return false;
    } else {
        return true;
    }
}

export function checkEmail(email: string):boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!regex.test(email)){
        return false;
    } else {
        return true;
    }
}

export function isEmailRepeated(email:string, usersList : User[]) : boolean {
    let b = 0
    usersList.forEach(user => {
        if(user.email === email) {
          b=1
        }
      })
    return b === 1; // 0 no esta repetido --- 1 está repetido
}