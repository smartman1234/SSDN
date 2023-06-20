import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import {
  addEventListeners,
  removeEventListeners,
} from "./EventListnerUtil";

export default function TimeoutLogic  ()  {
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  useEffect(() => {
    const createTimeout1 = () =>
      setTimeout(() => {
        setWarningModalOpen(true);
      }, 1800000);

    const createTimeout2 = () =>
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, 10000);

    const listener = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout);
        timeout = createTimeout1();
      }
    };

    let timeout = isWarningModalOpen ? createTimeout2() : createTimeout1();
    addEventListeners(listener);

    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    };
  }, [isWarningModalOpen]);
  return (
    <div>
      {isWarningModalOpen && (
        <LoginPage
          isOpen={isWarningModalOpen}
          onRequestClose={() => setWarningModalOpen(false)}
        />
      )}
    </div>
  );
};
