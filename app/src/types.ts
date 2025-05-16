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

export interface UserProperty {
  value: number,
  cost_type: CostType,

}

export interface formData {
  groceries: UserProperty,
  utilities: UserProperty,
  shopping: UserProperty
}
