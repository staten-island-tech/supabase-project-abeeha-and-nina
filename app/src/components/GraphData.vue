<template>
  <div class="p-8">
    <div class="mb-16">
      <div class="flex justify-center">
        <h2 class="text-2xl font-bold text-center mb-4 duration-150 italic px-3 py-3 rounded-lg bg-primary inline-block text-base-100">Income, Savings, & Debt Bar Chart</h2>
      </div>
      <div class="flex justify-center">
        <svg ref="barChartRef" width="600" height="400"></svg>
      </div>
    </div><br/><br/>
    <div>
      <div class="flex justify-center">
        <h2 class="text-2xl font-bold text-center mb-4 duration-150 italic px-3 py-3 rounded-lg bg-primary inline-block text-base-100">Expenses Pie Chart - Percent of Monthly Income</h2>
      </div><br/>
      <div class="flex justify-center">
        <svg ref="pieChartRef" width="400" height="400"></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/pinia';
import type { BarChartData } from '@/types';
import type { expencePercent } from '@/types';

const barChartRef = ref();
const pieChartRef = ref();
const auth = useAuthStore();
const expensesData = ref<expencePercent[]>([]);

async function fetchIncomeSavingsData() {
  const { data, error } = await supabase
    .from('user_personalized_responses')
    .select('primary_income, secondary_income, savings_goal, debt')
    .eq('user_id', auth.currentUser?.userId)
    .single();

  if (error) {
    alert("Error fetching income data: " + error.message);
    return null;
  }

  return data;
}

async function fetchExpenseData() {
  const { data, error } = await supabase
    .from('expenses')
    .select('category_name, budget_percent') 
    .eq('user_id', auth.currentUser?.userId);

  if (error) {
    alert("Error fetching expense data: " + error.message);
    return;
  }

  expensesData.value = data as expencePercent[];
}

onMounted(async () => {
  const incomeData = await fetchIncomeSavingsData();
  await fetchExpenseData();

    const barData: BarChartData[] = [
    { label: 'Primary Income', value: incomeData?.primary_income ?? 0 },
    { label: 'Secondary Income', value: incomeData?.secondary_income ?? 0 },
    { label: 'Savings Goal', value: incomeData?.savings_goal ?? 0 },
    { label: 'Debt', value: incomeData?.debt ?? 0 }
    ];

  drawBarChart(barData);
  drawPieChart(expensesData.value);
});

watch(expensesData, (newData) => {
  drawPieChart(newData);
});

function drawBarChart(data: BarChartData[]) {
  const svg = d3.select(barChartRef.value);
  svg.selectAll('*').remove(); 

  const margin = { top: 20, right: 20, bottom: 50, left: 80 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([0, width])
    .padding(0.4);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)!])
    .nice()
    .range([height, 0]);

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  chart.append('g')
    .call(d3.axisLeft(y));

  chart.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.label)!)
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', '#60a5fa');
}

function drawPieChart(expenses: expencePercent[]) {
  const svg = d3.select(pieChartRef.value);
  svg.selectAll('*').remove();

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;
  const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

  const grouped = d3.rollups(
    expenses,
    v => d3.sum(v, d => d.budget_percent),
    d => d.category_name
  );

  const pie = d3.pie<[string, number]>().value(d => d[1]);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  const color = d3.scaleOrdinal(d3.schemeSet3);

  g.selectAll('path')
    .data(pie(grouped))
    .enter()
    .append('path')
    .attr('d', d => arc(d as unknown as d3.DefaultArcObject)!)
    .attr('fill', (d, i) => color(i.toString()))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

    g.selectAll('text')
    .data(pie(grouped))
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d as unknown as d3.DefaultArcObject)})`)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .text(d => `${d.data[0]}: ${d3.format('.1f')(d.data[1])}%`);

}
</script>
