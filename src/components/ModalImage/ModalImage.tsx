import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import style from './ModalImage.module.scss';

type Props = {
  imageUrl: string;
  visible: boolean;
  onClose: (vis: boolean) => void;
};
export const ModalImage: React.FC<Props> = ({ imageUrl, visible, onClose }) => {
  const targetRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        if (
          targetRef.current &&
          !targetRef.current.contains(event.target as Node | null)
        ) {
          onClose(false);
        }
      }
    }

    document.addEventListener('click', handleClickOutside);

    // document.body.style.overflow = 'hidden'; // Disable scrolling
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // document.body.style.overflow = 'unset'; // Reset on unmount or visibility change
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className={classNames('modal', { 'is-active': visible })}
    >
      <div className="modal-background"></div>
      <div className={classNames('modal-content', style.container)}>
        <div className={classNames('p-0 m-0')}>
          <img className={style.image} src={imageUrl} alt="" ref={targetRef} />
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => onClose(false)}
      ></button>
    </div>
  );
};
