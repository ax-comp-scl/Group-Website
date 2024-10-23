import NavbarSelectedIcon from "./NavbarSelectedIcon"
import NavbarUnselectedIcon from "./NavbarUnselectedIcon"
import NavbarCorrectIcon from "./NavbarCorrectIcon"
import NavbarErrorIcon from "./NavbarErrorIcon"
import LoadingIcon from "./LoadingIcon"
import FileUploadedIcon from "./FileUploadedIcon"
import FileErrorIcon from "./FileErrorIcon"
import FileTrashIcon from "./FileTrashIcon"

export default function FileNavbarItem(props){
    return(
        <li>
            <div className="timeline-middle">
                <NavbarSelectedIcon/>
            </div>
            <div className="timeline-end text-center w-24">{props.title}</div>
        </li>
    )
}