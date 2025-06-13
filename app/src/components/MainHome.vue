<template>
<div class="overflow-y-scroll">
    
        <div>
            <LogData>
                
            </LogData>
        </div><br>
        <SpendingTable></SpendingTable><br>
        <IncomeTable></IncomeTable><br>

    </div>
</template>

<script setup lang="ts">
import IncomeTable from './Tables/IncomeForm.vue';
import SpendingTable from './Tables/SpendingForm.vue';
import LogData from './Tables/LogData.vue';
</script>