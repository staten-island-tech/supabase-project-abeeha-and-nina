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