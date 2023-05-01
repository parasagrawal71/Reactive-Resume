import { ThemeConfig } from '@reactive-resume/schema';
import get from 'lodash/get';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children, sectionId }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));

  return (
    <h3
      className="mb-2 w-full border-b-2 pb-1.5 font-bold uppercase"
      style={{
        color: theme.primary,
        borderColor: theme.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: ['awards', 'education'].includes(sectionId) ? 10 : undefined,
        marginTop: 5,
      }}
    >
      {children}
    </h3>
  );
};

export default Heading;
