import { alpha } from '@mui/material';
import { ThemeConfig } from '@reactive-resume/schema';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { getContrastColor } from '@/utils/styles';

type Props = {
  items: string[];
};

const BadgeDisplay: React.FC<Props> = ({ items }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);

  if (!isArray(items) || isEmpty(items)) return null;

  return (
    <ul className="mt-1 flex flex-wrap gap-2 text-xs">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm px-2"
          style={{ backgroundColor: 'white', border: `1px solid ${alpha(theme.primary, 0.25)}` }}
        >
          <span style={{ color: contrast === 'dark' ? theme.text : theme.text }}>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BadgeDisplay;
