import React from 'react'
import { useNavigate } from 'react-router-dom'

const ModalSuccess = ({ close }) => {
  const navigate = useNavigate()

  const setShowModal = () => {
    close(false)
    navigate('/')
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full mt-8 h-auto max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div className="relative bg-white rounded-lg shadow-sm border-2 border-gray">
          <button
            onClick={setShowModal}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>

            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-square-quote-icon lucide-message-square-quote"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 12a2 2 0 0 0 2-2V8H8" />
              <path d="M14 12a2 2 0 0 0 2-2V8h-2" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Seu email foi enviado
            </h3>
            <button
              onClick={setShowModal}
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-emerald-800 rounded-lg border border-gray-200 hover:bg-emerald-900 hover:text-dark-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSuccess
