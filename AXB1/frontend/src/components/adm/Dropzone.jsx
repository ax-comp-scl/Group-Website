import { Button, Progress, Tooltip } from '@nextui-org/react'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { UploadIcon } from './UploadIcon'
import axios from 'axios'
import FileTrashIcon from './FileTrashIcon'
import FileUploadedIcon from './FileUploadedIcon'

export default function Dropzone(props) {
    const [files, setFiles] = useState([])
    const [rejectedFiles, setRejectedFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState("selectione") //selecionar carregado carregando

    const clearFileInput = () => {
        setSelectedFile(null)
        setProgress(0)
        setUploadStatus("selecione")
    }

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append('file', selectedFile)
        console.log(selectedFile)
        try{
            const response = await axios.post(
                'http://localhost:8080/upload',
                formData,
                {
                    onUploadProgress: (ProgressEvent) => {
                        const percent = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                        setProgress(percent)
                    }
                }
            )
            setUploadStatus("carregado")
        }
        catch (error) {
            setUploadStatus("selecione")
        }
    }

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0){
            rejectedFiles.forEach(r => console.log(r))
            setRejectedFiles(rejectedFiles)
        }

        if (acceptedFiles?.length){
            setFiles([])
            console.log(acceptedFiles)
            setRejectedFiles([])
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
            ])
            setSelectedFile(files[0])
            handleUpload()
        }
        }, [])

    // const {getRootProps, getInputProps, open} = useDropzone({
    //     onDrop, 
    //     maxFiles: 1, 
    //     accept: props.accept,
    //     validator: (file) => props.validator(file)})
    const {getRootProps, getInputProps, open, isDragActive} = useDropzone({
        onDrop, 
        maxFiles: 1,
        // validator: (file) => props.validator(file)
    })
    //   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name))
        clearFileInput()
    }

    const dropzoneComponent = (
        <div className='flex flex-col w-7/12'>
            <h2 className='text-xl font-bold'>{props.label}</h2>
            <div className='border-2 md:h-32 flex flex-col md:flex-row p-4 rounded-xl gap-5'>
                <div {...getRootProps({
                    className: `flex-1 border-2 border-dashed border-gray-500 rounded-xl duration-150 ` + (isDragActive ? 'bg-gray-200' : 'bg-gray-100')
                })}>
                    <input {...getInputProps()} />
                    <div className='flex items-center w-full h-full'>
                        <div className='flex-1 flex items-center justify-center'>
                            <UploadIcon />
                        </div>
                        <div className='flex-1 flex flex-col items-center justify-center gap-1'>
                            <Button type='button'
                                className='font-semibold w-8/12'
                                radius='lg'
                                style={{
                                backgroundColor: '#154734',
                                color: '#fff'}} onClick={open}>
                                Faça upload
                            </Button>
                            <p className='text-sm'>ou arraste um arquivo</p>
                        </div>
                    </div>
                </div>
                <div className={`flex-1 rounded-sm flex flex-col justify-between `
                    + (rejectedFiles.length > 0 ? "bg-[#f31260]/20" : "bg-gray-200")}>
                    <div className='flex-1 flex flex-col justify-center'>
                        {
                        rejectedFiles.length > 0 ?
                            <div className='flex justify-between px-4'>
                                {rejectedFiles.map((r, i) => <p className='text-center text-sm font-semibold' key={i}>{r.errors[0].message}</p>)}
                            </div>
                        :
                        files.map(file => (
                            <>
                                <div className='flex justify-between px-4'>
                                    <p className='font-semibold text-lg'>
                                        {
                                            file.name.length > 40 ?
                                            `${(file.name).substring(0, 40)}...`
                                            : file.name
                                        }
                                    </p>
                                    <div className='flex items-center'>
                                        {
                                            progress === 100 ? 
                                            <FileUploadedIcon/>
                                            : `${progress}%`
                                        }
                                        <button onClick={() => removeFile(file.name)}><FileTrashIcon/></button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    <Progress size='sm' color='success' value={progress}/>
                </div>
            </div>
        </div>
    )

    return (<>  
        <div className='w-full flex justify-center'>
            {
                props.textOnHover ? (
                    <Tooltip content={props.textOnHover} placement="top-start" delay={800}>
                        {dropzoneComponent}
                    </Tooltip>
                ) : (
                    dropzoneComponent
                )
            }
        </div>
    </>)
}