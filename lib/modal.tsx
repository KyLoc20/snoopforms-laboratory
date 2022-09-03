import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { useState, PropsWithChildren, useCallback, useMemo } from "react";
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
    document.body.style.overflow = "auto";
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
          <ModalWrapper>{children}</ModalWrapper>
        </Portal>
      )}
    </>
  );
  return { showModal, hideModal, Portal: PortalRender };
}

function ModalWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <div className="modal-wrapper" style={{}}>
      {children}
    </div>
  );
}
