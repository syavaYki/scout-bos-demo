import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './MainPhotoSwiper.scss';
import { getMainSwiperPhotoBlocks } from '../../api/mainPhotoSwiper';
import { Loader } from '../Loader';
import { ErrorLoadAPINotice } from '../ErrorLoadAPINotice';
import { parseMainPhotoSwiperData } from '../../utils/helperMainPhotoSwiper';
import { ImageAPIData } from '../../types/MainPhotoSwiper';
import { ModalImage } from '../ModalImage';

export const MainPhotoSwiper = () => {
  const [blocks, setBlocks] = useState<ImageAPIData[] | []>([]);
  const { loading, error, data } = getMainSwiperPhotoBlocks();
  const [showModal, setShowModal] = useState(false);
  const [curImgUrl, setcurImgUrl] = useState('');

  useEffect(() => setBlocks(parseMainPhotoSwiperData(data)), [data]);
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return <ErrorLoadAPINotice />;
  }

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainPhotoSwiper"
      >
        {blocks.map((block: ImageAPIData) => {
          return (
            <SwiperSlide key={block.id}>
              <img
                src={block.url}
                alt="main-image"
                className="slider_img"
                onClick={() => {
                  setShowModal(true);
                  setcurImgUrl(block.url);
                }}
              />
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
