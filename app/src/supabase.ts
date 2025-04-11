import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// export const supabase = createClient('<https://xycrjhhgpeqxbwydtjzl.supabase.co>', '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5Y3JqaGhncGVxeGJ3eWR0anpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTY3NjAsImV4cCI6MjA1OTE5Mjc2MH0.Jk3Zu-0l_43pJ-aI5djyy2Ot5GeIRnxy4WPJSJrsI9M>')