import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Heading } from 'react-bulma-components';
import style from './LatestActivities.module.scss';

import { LatestPhotoSwiper } from './LatestPhotoSwiper';
import { ErrorLoadAPINotice } from '../ErrorLoadAPINotice';
import { Loader } from '../Loader';
import { LatestActivitiesPostData } from '../../types/LatestActivity';
import { getLatestActivitiesAPI } from '../../api/latestActivitySwiper';
import { parseLatestActivitiesPostData } from '../../utils/helperLatestActivitySwiper';

export const LatestActivities = () => {
  const [postData, setPostData] = React.useState<
    LatestActivitiesPostData | undefined
  >();

  const { loading, error, data } = getLatestActivitiesAPI();

  useEffect(() => {
    setPostData(parseLatestActivitiesPostData(data));
  }, [data]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error || !postData) {
    return <ErrorLoadAPINotice />;
  }

  return (
    <>
      <Heading size={2}>{postData.title}</Heading>
      <Heading subtitle>{postData.description}</Heading>
      <p>
        {postData?.date &&
          postData.date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </p>

      <div className={classNames(style.latest_photo_swiper)}>
        <LatestPhotoSwiper imageData={postData.imageData} />
      </div>
    </>
  );
};
