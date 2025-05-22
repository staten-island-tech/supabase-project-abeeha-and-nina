import type { Component } from "vue";

export interface User {
    name: string,
    id: number;
    username: string;
    email: string;
  }


export interface DashboardView {
  name: string,
  isActive?: boolean,

}

export interface RegisterForm {
  name: string,
  isActive?: boolean,

}
//QuestionForm

export type CostType = "fixed" | "flexible"

export interface QuestionForm {
  name: string,
  isActive?: boolean
}


export interface Category  {
  name: string,
  limit: number,
  cost_type: CostType,

}

export interface UserData {
  pIncome:number,
  sIncome:number,
  Deps:number,
  Age:number,
  
}

