<template>
  <div ref="container" class="w-full px-4 sm:px-10 md:px-24 lg:px-36 py-6 space-y-8">
    <Card class="p-6 rounded-2xl shadow-xl bg-base-100 text-base-content">
      <template #title>
        <div class="text-center space-y-2">
          <h1 class="text-2xl font-bold text-primary">Name: {{ auth.username }}</h1>
          <h2 class="text-lg text-secondary">Email: {{ currentUser?.email }}</h2>
        </div>
      </template>
    </Card>

    <Card class="p-6 rounded-2xl shadow-xl bg-base-100 text-base-content">
      <template #title>
        <h1 class="text-center text-3xl font-bold text-accent">Financial Overview</h1>
      </template>
      <div class="overflow-x-auto mt-4">
        <DataTable :value="finance_info" tableStyle="min-width: 40rem" class="p-datatable-sm">
          <Column field="name" header="Category" headerStyle="font-weight: 700;"></Column>
          <Column field="value" header="Amount" headerStyle="font-weight: 700;"></Column>
        </DataTable>
      </div>
    </Card>

    <Card class="p-6 rounded-2xl shadow-xl bg-base-100 text-base-content">
      <template #title>
        <h1 class="text-center text-3xl font-bold text-accent">Expense Breakdown</h1>
      </template>
      <div class="overflow-x-auto mt-4">
        <DataTable :value="expense_info" tableStyle="min-width: 50rem" class="p-datatable-sm">
          <Column field="category_name" header="Category"></Column>
          <Column field="budget_percent" header="Percent of Budget"></Column>
          <Column field="cost_type" header="Cost Type"></Column>
          <Column field="purchase_price" header="Purchase Price"></Column>
        </DataTable>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/pinia';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import type { FinanceInfo, Expense } from '@/types';

const container = ref(null);

const finance_info = ref([]);
const expense_info = ref([]);

const authStore = useAuthStore();
const currentUser = authStore.currentUser;
const auth = useAuthStore();

async function getFinanceData() {
  if (!currentUser) return;

  const { data, error } = await supabase
    .from("user_personalized_responses")
    .select("primary_income, secondary_income, savings_goal, spend_goal, debt")
    .eq("user_id", currentUser.userId)
    .single();

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    finance_info.value = [
      { name: "Primary Income", value: data.primary_income },
      { name: "Secondary Income", value: data.secondary_income },
      { name: "Debt", value: data.debt },
      { name: "Savings Goal", value: data.savings_goal },
      { name: "Spending Goal", value: data.spend_goal },
    ];
  }
}

async function getExpenseData() {
  if (!currentUser) return;

  const { data, error } = await supabase
    .from("expenses")
    .select("user_id, category_name, budget_percent, cost_type, purchase_price")
    .eq("user_id", currentUser.userId);

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    expense_info.value = data;
  }
}

onMounted(() => {
  getFinanceData();
  getExpenseData();

  gsap.from(container.value, {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power2.out'
  });
});
</script>

<style scoped>
</style>