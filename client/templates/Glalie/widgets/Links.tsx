import React, { useEffect, useState } from 'react';
import { ThemeConfig } from '@reactive-resume/schema';
import get from 'lodash/get';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ sectionId, data }: any) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));
  const [linksToShow, setLinksToShow]: any = useState([]);

  const styles = {
    image: {
      width: 20,
      height: 20,
    },
  };

  useEffect(() => {
    let links: any = [];

    if (sectionId === 'projects') {
      links = projectLinks;
    } else if (sectionId === 'awards') {
      links = awardLinks;
    } else if (sectionId === 'certifications') {
      links = certificationLinks;
    }

    const filteredLinks = links?.filter((p) => {
      if (data[p?.key]) {
        return p;
      }
    });
    setLinksToShow(filteredLinks);
  }, [sectionId]);

  // https://www.svgrepo.com/
  const projectLinks = [
    {
      iconUrl: 'https://www.svgrepo.com/show/506476/external-link.svg',
      key: 'url',
    },
    {
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      key: 'githubUrl',
    },
    {
      iconUrl: 'https://www.svgrepo.com/show/500737/video-play.svg',
      key: 'videoUrl',
    },
  ];

  const awardLinks = [
    {
      iconUrl: 'https://www.svgrepo.com/show/450704/certificate.svg',
      key: 'url',
    },
    {
      iconUrl: 'https://www.svgrepo.com/show/472992/award.svg',
      key: 'awardUrl',
    },
  ];

  const certificationLinks = [
    {
      iconUrl: 'https://www.svgrepo.com/show/450704/certificate.svg',
      key: 'url',
    },
  ];

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'flex-start',
        paddingRight: 10,
      }}
    >
      {linksToShow?.length
        ? linksToShow?.map(({ key, iconUrl }: any) => {
            return (
              <a href={data?.[key] || ''} target="_blank" key={iconUrl}>
                <img style={styles.image} src={iconUrl} />
              </a>
            );
          })
        : null}
    </section>
  );
};

export default Heading;
