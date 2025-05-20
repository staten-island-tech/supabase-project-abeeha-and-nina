<template>

</template>

<script setup>
import QuestionForm from './QuestionForm.vue';
import { supabase } from '@/supabase';

async function getUserData() {
    const { data, error } = await supabase.auth.getUserIdentities(
    )
    if (data) {
        re
        userInfo.email
    }

}

</script>

<style lang="scss" scoped>

</style>