import ModalButton from "./ModalButton"

export default function OptionModal(props){
    return(
        <>
            <ModalButton idModal={props.idModal} action={props.action} classes={props.classes} icon={props.icon}/>
            <dialog id={props.idModal} className="modal">
                <div className="modal-box text-center font-bold">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-outline absolute right-2 top-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h3 className="text-xl">Essa é uma ação irreversível.</h3>
                    <p className="my-4 text-lg">Deseja continuar?</p>
                    <div className="flex justify-center gap-5">
                        <button className="btn btn-error" onClick={props.onClick}>Sim</button>
                        <button className="btn">Não</button>
                    </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}