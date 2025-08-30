import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './LatestPhotoSwiper.scss';
import { ImageAPIData } from '../../../types/LatestActivity';
import { ModalImage } from '../../ModalImage';

type Props = {
  imageData: ImageAPIData[] | undefined;
};

export const LatestPhotoSwiper: React.FC<Props> = ({ imageData }) => {
  const [showModal, setShowModal] = useState(false);
  const [curImgUrl, setcurImgUrl] = useState('');

  if (!imageData) return null;

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        speed={600}
        parallax={true}
        modules={[Pagination, Navigation]}
        loop
        className="mainPhotoSwiper"
      >
        {imageData.map(photo => {
          return (
            <SwiperSlide
              key={photo.id}
              className="has-background-primary p-2"
            >
              <div className="slider_img_container">
                <img
                  src={photo.url}
                  alt="main-image"
                  className="slider_img"
                  onClick={() => {
                    setShowModal(true);
                    setcurImgUrl(photo.url);
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {showModal && (
        <ModalImage
          imageUrl={curImgUrl}
          visible={showModal}
          onClose={setShowModal}
        />
      )}
    </>
  );
};
