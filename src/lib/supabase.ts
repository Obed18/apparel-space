import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://yibvsmcdrytxpyryavai.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFmODYxZGE4LTgyM2ItNDQzZC1hZmE4LWY2ZWQ2YTcwOWE3MyJ9.eyJwcm9qZWN0SWQiOiJ5aWJ2c21jZHJ5dHhweXJ5YXZhaSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgxMDk1Nzk4LCJleHAiOjIwOTY0NTU3OTgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.8Np0h-kj6Hjaxw54R30uWA1p5zKqAZI_mjrFWX7kQ4U';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };