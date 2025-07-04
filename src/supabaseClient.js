// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gjrpmqowmemjgudodont.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcnBtcW93bWVtamd1ZG9kb250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjQwMzUsImV4cCI6MjA2NzI0MDAzNX0.DdI9PpR7UfHSzSEB7CGWZHkhRdExNOExQ3ly7fqEqt4'
export const supabase = createClient(supabaseUrl, supabaseKey)
