import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { useState, PropsWithChildren, useCallback, useMemo } from "react";
import { CheckCircleIcon, XIcon as CloseIcon } from "@heroicons/react/solid";
import ReactDOM from "react-dom";
export default function useModalPortal(targetId: string) {
  const [active, setActive] = useState(false);
  const showModal = () => {
    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    setActive(true);
  };
  const hideModal = () => {
    document.body.style.overflow = "";
    // document.body.style.overflow = "auto";//NOT GOOD, it mutates
    document.body.style.paddingRight = "0";
    setActive(false);
  };
  const Portal = useCallback(
    (props: React.PropsWithChildren<{}>) => {
      const el = document.getElementById(targetId);
      if (!el) return null;
      else return ReactDOM.createPortal(<div className="modal-portal">{props.children}</div>, el);
    },
    [targetId]
  );

  const PortalRender = ({ children }: PropsWithChildren<{}>) => (
    <>
      {active && (
        <Portal>
          <ModalWrapper onClose={hideModal}>{children}</ModalWrapper>
        </Portal>
      )}
    </>
  );
  return { showModal, hideModal, Portal: PortalRender };
}

function ModalWrapper({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) {
  return (
    <div
      className="modal-wrapper"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      style={{ position: "fixed", left: 0, right: 0, top: 0, bottom: 0, zIndex: 1000 }}
    >
      <div
        className="modal-mask-layer"
        style={{
          width: "100%",
          height: "100%",
          backdropFilter: "blur(12px)",
          background: "rgba(98,125,149,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => {
          onClose();
        }}
      >
        <div
          className="modal-box"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            position: "relative",
            width: "512px",
            padding: "24px",
            borderRadius: "24px",
            background: "white",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)",
          }}
        >
          <CloseButton onClick={onClose}></CloseButton>
          {children}
        </div>
      </div>
    </div>
  );
}
function CloseButton({ onClick }: { onClick: () => void }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      style={{
        cursor: "pointer",
        position: "absolute",
        right: "16px",
        top: "16px",
        color: isHovering ? "#627d95" : "#8299ae",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <CloseIcon style={{ width: "24px", height: "24px" }}></CloseIcon>
    </div>
  );
}
