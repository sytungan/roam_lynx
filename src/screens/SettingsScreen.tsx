import { useCallback, useEffect, useState } from '@lynx-js/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';
import { themeAtom } from '../atoms/theme.js';
import { changeLanguage, getCurrentLanguage, t } from '../i18n/index.js';
import { languageAtom } from '../store/atoms.js';


export function SettingsScreen() {
  const navigate = useNavigate();
  const [theme, setTheme] = useAtom(themeAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    console.log('SettingsScreen mounted');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const handleLanguageChange = useCallback((lng: string) => {
    console.log(`Changing language to: ${lng}`);
    try {
      // Skip if already using this language
      if (getCurrentLanguage() === lng) {
        console.log(`Already using language: ${lng}`);
        return;
      }
      
      // First update the i18next language
      changeLanguage(lng);
      console.log('i18next language changed successfully');
      
      // Then update the atom
      setLanguage(lng as any);
      console.log('Language atom updated successfully');
      
      // Force a small delay then update UI
      setTimeout(() => {
        console.log('Forcing UI update after language change');
      }, 100);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [setLanguage]);

  const goBack = useCallback(() => {
    console.log('Attempting to navigate back to home');
    try {
      navigate('/');
      console.log('Back navigation function called');
    } catch (error) {
      console.error('Back navigation error:', error);
    }
  }, [navigate]);

  // Check if a language is active
  const isLanguageActive = useCallback((lng: string) => {
    return getCurrentLanguage() === lng;
  }, []);

  return (
    <view className="flex-1 bg-background safe-top">
      <view className="flex-row items-center p-4 safe-top">
        <view bindtap={goBack} className="p-2">
          <text className="text-foreground">←</text>
        </view>
        <text className="text-2xl font-bold text-foreground ml-4">{t('profile.settings')}</text>
      </view>

      <view className="p-4 space-y-4 safe-bottom">
        <view className="bg-card p-4 rounded-lg">
          <text className="text-lg font-semibold text-foreground mb-2">{t('settings.theme')}</text>
          <view className="flex-row items-center justify-between">
            <text className="text-foreground">{theme === 'light' ? t('settings.lightMode') : t('settings.darkMode')}</text>
            <view bindtap={toggleTheme} className="p-2">
              <text className="text-foreground">{theme === 'light' ? '🌙' : '☀️'}</text>
            </view>
          </view>
        </view>

        <view className="bg-card p-4 rounded-lg">
          <text className="text-lg font-semibold text-foreground mb-2">{t('settings.language')}</text>
          
          {/* English option */}
          <view className="flex-row items-center justify-between mb-2">
            <text className="text-foreground">English</text>
            <view bindtap={() => handleLanguageChange('en')} className="p-2">
              <text className="text-foreground">{isLanguageActive('en') ? '✓' : ''}</text>
            </view>
          </view>
          
          {/* Vietnamese option */}
          <view className="flex-row items-center justify-between">
            <text className="text-foreground">Tiếng Việt</text>
            <view bindtap={() => handleLanguageChange('vi')} className="p-2">
              <text className="text-foreground">{isLanguageActive('vi') ? '✓' : ''}</text>
            </view>
          </view>
        </view>

        <view className="bg-card p-4 rounded-lg">
          <text className="text-lg font-semibold text-foreground mb-2">{t('settings.about')}</text>
          <view bindtap={() => setShowAboutModal(true)} className="flex-row items-center justify-between">
            <text className="text-foreground">{t('settings.aboutUs')}</text>
            <text className="text-foreground">→</text>
          </view>
        </view>

        <view className="bg-card p-4 rounded-lg">
          <text className="text-lg font-semibold text-foreground mb-2">{t('settings.sendFeedback')}</text>
          <view bindtap={() => setShowFeedbackModal(true)} className="flex-row items-center justify-between">
            <text className="text-foreground">{t('settings.sendFeedback')}</text>
            <text className="text-foreground">→</text>
          </view>
        </view>
      </view>

      {showAboutModal && (
        <view className="absolute inset-0 bg-black/50 items-center justify-center safe-area">
          <view className="bg-card p-6 rounded-lg m-4">
            <text className="text-xl font-bold text-foreground mb-4">{t('settings.aboutUs')}</text>
            <text className="text-foreground mb-4">
              Roam is a modern application built with LynxJS, Jotai, and TanStack Query.
              Version 1.0.0
            </text>
            <view bindtap={() => setShowAboutModal(false)} className="bg-primary p-3 rounded-lg items-center">
              <text className="text-white">{t('common.close')}</text>
            </view>
          </view>
        </view>
      )}

      {showFeedbackModal && (
        <view className="absolute inset-0 bg-black/50 items-center justify-center safe-area">
          <view className="bg-card p-6 rounded-lg m-4">
            <text className="text-xl font-bold text-foreground mb-4">{t('settings.sendFeedback')}</text>
            <text className="text-foreground mb-4">
              We value your feedback! Please let us know how we can improve.
            </text>
            <view bindtap={() => setShowFeedbackModal(false)} className="bg-primary p-3 rounded-lg items-center">
              <text className="text-white">{t('common.close')}</text>
            </view>
          </view>
        </view>
      )}
    </view>
  );
} 