import React from "react";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => (
  <>
    {isOpen && (
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-center ${
          isOpen ? "sm:pb-0" : ""
        }`}
      >
        <div
          className={`${
            isOpen ? "transform translate-y-0" : "transform translate-y-full"
          } w-full sm:w-64 bg-white sm:rounded-none rounded-t-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">{children}</div>
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
            onClick={() => onClose()}
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    )}
    {isOpen && (
      <div
        className={`fixed inset-0 bg-gray-800 opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onClose()}
      />
    )}
  </>
);

export default Modal;
