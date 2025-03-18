import { useCallback, useEffect } from '@lynx-js/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';
import { themeAtom } from '../atoms/theme.js';
import { useUserProfile } from '../hooks/useUserProfile.js';
import { t } from '../i18n/index.js';

export function HomeScreen() {
  const navigate = useNavigate();
  const [theme, setTheme] = useAtom(themeAtom);
  const { data: profile, isLoading } = useUserProfile();

  useEffect(() => {
    console.log('HomeScreen mounted');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    console.log('Toggle theme called');
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const goToSettings = useCallback(() => {
    console.log('Attempting to navigate to settings');
    try {
      navigate('/settings');
      console.log('Navigation function called');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <view className="flex-1 items-center justify-center bg-background">
        <text className="text-foreground">{t('common.loading')}</text>
      </view>
    );
  }

  return (
    <view className="flex-1 bg-background safe-top">
      <view className="flex-row items-center justify-between p-4">
        <text className="text-2xl font-bold text-foreground">{t('home.welcome')}</text>
        <view className="flex-row items-center space-x-4">
          <view bindtap={toggleTheme} className="p-2">
            <text className="text-foreground">{theme === 'light' ? '🌙' : '☀️'}</text>
          </view>
          <view bindtap={goToSettings} className="p-2">
            <text className="text-foreground">⚙️</text>
          </view>
        </view>
      </view>
      <view className="flex-1 p-4 safe-bottom">
        <text className="text-foreground">{t('home.description')}</text>
        <text className="text-foreground mt-4">Welcome, {profile?.name || 'User'}!</text>
      </view>
    </view>
  );
} 