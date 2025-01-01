import { ref, onMounted } from 'vue';

const theme = ref<'light' | 'dark'>('light');

export function useTheme() {
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme;
    localStorage.setItem('theme', newTheme);

    // Apply theme class to HTML
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  onMounted(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    setTheme(storedTheme || 'light');
  });

  return { theme, setTheme, toggleTheme };
}
