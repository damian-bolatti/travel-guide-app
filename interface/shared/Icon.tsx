import * as LucideIcons from "lucide-react-native";
import { ComponentType } from "react";

type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  color: string;
  size?: number;
}

export const Icon = ({ name, size = 24, color }: IconProps) => {
    const LucideIcon = LucideIcons[name] as ComponentType<{ size?: number; color?: string }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in LucideIcons.`);
    return null;
  }

  return <LucideIcon size={size} color={color} />;
};
