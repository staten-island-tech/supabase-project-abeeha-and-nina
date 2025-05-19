import type { Component } from "vue";

export interface User {
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

export type category  = {
  name: string,
  value: number,
  cost_type: CostType,

}

export interface categories {
  category:category
}

