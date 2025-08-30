import React, { useEffect } from 'react';

import { UrgentNotificationBanner } from './UrgentNotificationBanner';
import { UrgentNotificationModal } from './UrgentNotificationModal';
import { UrgentNoticeData } from '../../types/UrgenNotice';
import { accessLocalStorage } from '../../utils/accessLocalStorage';
import { LocalAccessKeys } from '../../types/LocalAccessKeys';
import { parseApi } from '../../utils/helperUrgenNotice';
import { useUrgenNoticeApi } from '../../api/urgenNotice';

export const UrgentNotification: React.FC = () => {
  const [urgenNoticeShow] = React.useState(
    accessLocalStorage.get(LocalAccessKeys.URGENT_NOTICE_SHOW),
  );
  const [modalShown, setModalShown] = React.useState(false);
  const [urgentNoticeData, setUrgentNoticeData] = React.useState<
    UrgentNoticeData | undefined
  >();
  const { data } = useUrgenNoticeApi();

  useEffect(() => setUrgentNoticeData(parseApi(data)), [data]);

  return (
    <>
      {urgenNoticeShow && !!urgentNoticeData && (
        <>
          {modalShown ? (
            <UrgentNotificationModal data={urgentNoticeData} />
          ) : (
            <UrgentNotificationBanner
              onModalShow={setModalShown}
              data={urgentNoticeData}
            />
          )}
        </>
      )}
    </>
  );
};
