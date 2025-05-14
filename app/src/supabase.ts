import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jswnrgxonemvwwwkqrbm.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd25yZ3hvbmVtdnd3d2txcmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNDQwMTksImV4cCI6MjA2MjgyMDAxOX0.iIhreczYPPD-KhWGmBO441xFdknwlv5G6TOeqvYyTQ8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
