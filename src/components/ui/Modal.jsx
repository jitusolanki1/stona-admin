import React from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg mx-auto my-6 bg-white rounded-lg shadow-lg outline-none focus:outline-none">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-solid rounded-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-gray-500 hover:text-gray-800 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        {/* Body */}
        <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end p-5 border-t border-solid border-gray-200 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
