import * as LucideIcons from 'lucide-react-native';
import { ComponentType } from 'react';
import { useThemeStore } from '@/interface/theme/useThemeStore';
import colors from '../theme/colors';

type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 24 }: IconProps) => {
  const { theme } = useThemeStore();
  const LucideIcon = LucideIcons[name] as ComponentType<{ size?: number; color?: string }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in LucideIcons.`);
    return null;
  }

  const resolvedColor = theme === 'dark' ? colors['icon-dark'] : colors.icon;

  return <LucideIcon size={size} color={resolvedColor} />;
};
