<template>
<div class="overflow-y-scroll">
    <div>
        <div class="flex justify-center">
            <h1>INCOME AND SAVINGS</h1>
        </div>
        <div class="flex justify-center">
            <IncomeTable></IncomeTable>
        </div>
    </div><br/>
    <div class="grid grid-cols-2">
        <div>
            <h1 class="text-center flex justify-center">SPENDING</h1>
            <div class="flex justify-center">
                <SpendingTable></SpendingTable>
            </div>  
        </div>
        <div>
            <h1 class="text-center">EXPENSES</h1>
            <LogData></LogData>
        </div>

    </div>
</div>
</template>

<script setup lang="ts">
import IncomeTable from './Tables/IncomeTable.vue';
import SpendingTable from './Tables/SpendingTable.vue';
import LogData from './Tables/LogData.vue';
</script>