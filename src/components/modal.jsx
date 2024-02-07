import "./modal.css";
import { Transition } from "react-transition-group";
import { useState, useMemo,useEffect  } from "react";
export default function ({ visible, setVisible, children }) {
  const [show, setShow] = useState(false);
  const overlayAnimate = useMemo(() => {
    return show
      ? "modal-wrapper animate__animated animate__faster animate__zoomIn"
      : "modal-wrapper animate__animated animate__faster animate__zoomOut";
  }, [show]);
  const maskAnimate = useMemo(() => {
    return show
      ? "modal-container animate__animated animate__faster animate__fadeIn"
      : "modal-container animate__animated animate__faster animate__fadeOut";
  }, [show]);

  const ignore = (e) => {
    e.stopPropagation();
    setShow(() => false);
    setVisible(false);
  };

  useEffect(() => {
    setShow(() => visible);
  }, [visible]);

  return (
    <Transition in={show} unmountOnExit timeout={300}>
      <div onClick={ignore} className={maskAnimate}>
        <div className={overlayAnimate}>{children}</div>
      </div>
    </Transition>
  );
}
