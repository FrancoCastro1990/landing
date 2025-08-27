import { useSectionTint } from '../hooks/useSectionTint';

const DynamicBackground: React.FC = () => {
  const { mounted, currentBgClass } = useSectionTint();

  if (!mounted) {
    return null;
  }

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-1000 ease-in-out ${currentBgClass}`} />
  );
};

export default DynamicBackground;