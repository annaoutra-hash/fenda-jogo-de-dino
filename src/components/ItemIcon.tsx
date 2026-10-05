import { 
  Wrench, 
  Flame, 
  Cross, 
  Volume2, 
  HelpCircle,
  Gem,
  Crosshair,
  Shield,
  Layers
} from 'lucide-react';

interface ItemIconProps {
  id: string;
  size?: number;
  className?: string;
}

export const ItemIcon = ({ id, size = 18, className = '' }: ItemIconProps) => {
  switch (id) {
    case 'lanca':
      return <Crosshair size={size} className={`text-[#e0d8c3] ${className}`} />;
    case 'pe':
      return <Wrench size={size} className={`text-[#e57a3b] ${className}`} />;
    case 'corda':
      return <Layers size={size} className={`text-[#4a8270] ${className}`} />;
    case 'apito':
      return <Volume2 size={size} className={`text-[#4a8270] ${className}`} />;
    case 'kit':
      return <Cross size={size} className={`text-[#e0d8c3] bg-[#1e3328] p-0.5 rounded ${className}`} />;
    case 'sinal':
      return <Flame size={size} className={`text-[#e57a3b] animate-pulse ${className}`} />;
    case 'esp':
      return <Shield size={size} className={`text-[#e0d8c3] ${className}`} />;
    case 'colar':
      return <Gem size={size} className={`text-[#ffd54a] ${className}`} />;
    default:
      return <HelpCircle size={size} className={`text-[#4a8270] ${className}`} />;
  }
};
