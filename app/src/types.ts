import type { Component } from "vue";

export interface AppUser {
    username: string | null,
    email: string | null,
    userId:string | null
  }

export interface UserPersonalizedResponse {
  primary_income: number
  secondary_income: number
  savings_goal: number
}

export interface data {
  user: AppUser;
}

export interface profileExpense {
  category_name: string;
  cost_type: string;
  budget_percent: number | null;
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

export type CostType = "fixed" | "flexible" | "Cost Type"

export interface QuestionForm {
  name: string,
  isActive?: boolean
  type:Component,

}
export interface DataLogs {
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

export interface UserData { //separate from the AppUser interface, which is more for auth stuff
  nName: string | null,
  pIncome:number | null,
  sIncome:number | null,
  Debt:number | null,
  sav_goal:number| null,
  spend_goal:number| null,
  
}

export interface ProfileInfo {
  name:string,
  email:string,
  
}

//UserProfile

export interface Expense {
  user_id: string
  category_name:string
  cost_type: string
  budget_percent: number | null
}

export interface Finance_Info {
  name:string
  value:number
}

