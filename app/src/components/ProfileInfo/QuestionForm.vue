<template>
<div class="flex place-content-center grid-cols-3 gap-16">

<form v-if="showUser" class="form bg-base-200 rounded-lg px-32 py-5" @submit.prevent>   
  <h1 class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold">BASIC INFO</h1>
  <input v-model="UserInfo.nName" placeholder="Preferred Name" /><br/>

  <h1>INCOME</h1>
  <input v-model.number="UserInfo.pIncome" placeholder="Estimated Monthly Income"><br>
  <input v-model.number="UserInfo.sIncome" placeholder="Secondary Income (optional)"><br>
  <input v-model.number="UserInfo.Debt" placeholder="Debt (optional)"><br>

  <h1>GOALS (Monthly)</h1>
  <input v-model.number="UserInfo.sav_goal" placeholder="MONTHLY SAVINGS GOAL"><br>
  <input v-model.number="UserInfo.spend_goal" placeholder="OVERALL MONTHLY SPENDING GOAL"><br>
  <div class="flex justify-center">
    <button type="submit" @click="previewInfo()" class="font-medium italic cursor-pointer">Submit Form</button><br>
  </div>  
  <div class="flex justify-center">
    <button type="reset" class="font-medium italic cursor-pointer">Reset Values</button>
  </div>
  <div class="flex justify-center">
    <RouterLink to="/" class="font-medium italic cursor-pointer"> Go Back </RouterLink>
  </div>
</form>

<div v-if="showInfo" class="info_container bg-base-200 rounded-lg px-16">
    <h1 class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold">Please verify that the information provided is correct:</h1><br>
    <h3>Name: {{ UserInfo.nName }}</h3>
    <h3>Estimated Monthly Income: {{ UserInfo.pIncome }}</h3>
    <h3>Secondary Income: {{ UserInfo.sIncome ?? "None" }}</h3>
    <h3>Debt: {{ UserInfo.Debt ?? "None" }}</h3>
    <h3>Monthly Savings Goal: {{ UserInfo.sav_goal }}</h3>
    <h3>Monthly Spending Goal: {{ UserInfo.spend_goal }}</h3><br/>
    
    <div class="grid grid-cols-2">
        <button type="button" @click="updateProfile()" class="font-medium italic cursor-pointer">Yes</button>
        <button type="button" @click="showInfo = false" class="font-medium italic cursor-pointer">No</button>
    </div>
</div>

</div>

</template>

<script setup lang="ts">
import { type UserData, type Category } from '@/types'
import {reactive, ref} from "vue"
import { supabase } from '@/supabase'
import router from '@/router'

//Frm INfo stroe

const UserInfo = reactive<UserData>({
    nName:"",
    pIncome:null,
    sIncome:null,
    Debt:null,
    sav_goal:null,
    spend_goal:null,
})


const showInfo = ref<boolean>(false)
const showUser = ref<boolean>(true)
const userState = ref<boolean>(false)

function previewInfo() {
    showInfo.value = true
}

//Append to tables

// const public_id  = await getUserPublicId()

async function updateProfile() {
    const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        const { data, error } = await supabase.from('user_personalized_responses').upsert([
        {
            user_id: user.id,
            primary_income: UserInfo.pIncome,
            secondary_income:UserInfo.sIncome,
            savings_goal: UserInfo.sav_goal,
            spend_goal: UserInfo.spend_goal,
            debt: UserInfo.Debt,
        },
        ])
        if (error) {
            alert("Error updating profile!")
        }
        else{
            alert("Profile Updated!")
            showInfo.value = false
            showUser.value = false
            userState.value = true
            router.push("/")
        }
    }
}

</script>
