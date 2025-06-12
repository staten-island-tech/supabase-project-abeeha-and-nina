<template>
    <h1 class="text-center">Log Transactions and Earnings</h1><br/>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Transaction</button>
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Additional Earnings</button>
    </div>
    </div><br/>
    <div class="flex justify-center">
    <AutoComplete v-model="selectedCategory" optionLabel="label" :suggestions="c_options"> 
    <template #option="c_options">
            <div class="flex items-center">
                <div>{{ c_options.option.name }}</div>
            </div>
        </template>
        <template #header>
            <div class="font-medium px-3 py-2">Available Categories</div>
        </template>
        <template #footer>
            <div class="px-3 py-3">
                <Button label="Add New Category" @click="add_Option()" text size="small" icon="pi pi-plus"></Button>
                <ExpenseForm v-if="showCatForm"></ExpenseForm>
            </div>
        </template>
    </AutoComplete>
    </div><br/><br/>

    
</template>

<script setup lang="ts">


// const auth = useAuthStore()
// const currentUser = auth.currentUser




</script>

<style lang="ts" scoped>

</style>