import FileNavbarItem from "./FileNavbarItem"

export default function FileNavbar(){
    const titles = ["Ontologia", "Organismo", "Publicação",
                    "FASTA", "GFF", "Adicional", "Blast", "InterproScan"]
        
    return(
        <ul className="timeline justify-evenly px-10">
            {titles.map((t, i) => <FileNavbarItem title={t}/>)}
        </ul>
    )
}