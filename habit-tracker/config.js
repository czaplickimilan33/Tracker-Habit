// Konfiguracja Habit Tracker.
// Dopóki pola Supabase są puste, aplikacja działa w 100% lokalnie (localStorage),
// bez logowania i bez limitów. Po uzupełnieniu kluczy włącza się logowanie
// i synchronizacja w chmurze. Instrukcja: docs/02-BACKEND.md
window.HABIT_CONFIG = {
  // Z panelu Supabase → Settings → API:
  supabaseUrl: "",      // np. "https://abcd1234.supabase.co"
  supabaseAnonKey: "",  // klucz "anon public" (jest bezpieczny we froncie, chroni go RLS)

  // Plan darmowy: maksymalna liczba nawyków (0 = bez limitu).
  // Limit działa tylko gdy włączona jest chmura i użytkownik nie ma premium.
  freeHabitLimit: 5,
};
