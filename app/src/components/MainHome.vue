<template>
<div class="overflow-y-scroll">
    <div>
        <div class="flex justify-center">
            <h1>INCOME AND SAVINGS</h1>
        </div>
        <div class="flex justify-center">
            <IncomeTable></IncomeTable>
        </div>
    </div><br/><br/>
    <div>
        <div class="flex justify-center">
            <h1>SPENDING</h1>
        </div>
        <div class="flex justify-center">
            <SpendingTable></SpendingTable>
        </div><br/><br/>
    </div>
        <div>
            <LogData></LogData>
        </div>

    </div>
</template>

<script setup lang="ts">
import IncomeTable from './Tables/IncomeTable.vue';
import SpendingTable from './Tables/SpendingTable.vue';
import LogData from './Tables/LogData.vue';
</script>