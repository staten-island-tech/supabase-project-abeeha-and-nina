import type { UUID } from "crypto";
import type { Component } from "vue";

export type User = {
    name: string,
    public_id: UUID,
    username: string,
    email: string,
    userId:UUID

  }

export interface user_instance {
  type:User,

}

export interface Data {
  user: User;
}


export interface DashboardView {
  type:Component,
  name: string,
  isActive?: boolean,

}

export interface RegisterForm {
  type:Component,
  name: string,
  isActive?: boolean,

}
//QuestionForm

export type CostType = "fixed" | "flexible"

export interface QuestionForm {
  name: string,
  isActive?: boolean
  type:Component,

}

export interface Category  {
  name: string,
  budget_percent: percent | null,
  cost_type: CostType,

}

export type percent = number;

export function isPercent(value: number): value is percent {
  return value >= 1 && value <= 100;  
} //run this to check eveyr time your working with a percent

export interface UserData { //separate from the User interface, which is more for auth stuff
  nName: string,
  pIncome:number | null,
  sIncome:number | null,
  Debt:number | null,
  sav_goal:number| null,
  spend_goal:number| null,
  
}

