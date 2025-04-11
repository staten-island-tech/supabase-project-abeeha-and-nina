import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://xycrjhhgpeqxbwydtjzl.supabase.co" 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5Y3JqaGhncGVxeGJ3eWR0anpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTY3NjAsImV4cCI6MjA1OTE5Mjc2MH0.Jk3Zu-0l_43pJ-aI5djyy2Ot5GeIRnxy4WPJSJrsI9M"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
