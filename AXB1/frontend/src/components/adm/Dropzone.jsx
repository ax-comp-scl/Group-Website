import { Button, Progress } from '@nextui-org/react'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { UploadIcon } from './UploadIcon'
import axios from 'axios'
import FileTrashIcon from './FileTrashIcon'
import FileUploadedIcon from './FileUploadedIcon'

export default function MDropzone(props) {
    const [files, setFiles] = useState([])
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

    const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length){
        console.log(acceptedFiles)
        setFiles(previousFiles => [
            ...previousFiles,
            ...acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
        ])
        setSelectedFile(files[0])
        handleUpload()
    }
    }, [])

    const {getRootProps, getInputProps, open} = useDropzone({onDrop, maxFiles: 3, accept: {'image/png': ['.png']}})
    // const {getRootProps, getInputProps, open} = useDropzone({onDrop, maxFiles: 3})
    //   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name))
        clearFileInput()
    }

    return (<>  
        <div className='mt-14 flex-1 flex justify-center'>
            <div className='flex-1 flex flex-col items-center'>
                <h2 className='self-start'>{props.label}</h2>
                <div className='w-7/12 border-2 h-32 flex p-4 rounded-xl gap-5'>
                    <div {...getRootProps({
                        className: "flex-1 border-2 border-dashed border-gray-500 rounded-xl bg-gray-100"
                    })}>
                        <input {...getInputProps()} />
                        <div className='flex items-center w-full h-full'>
                            <div className='flex-1 flex items-center justify-center'>
                                <UploadIcon />
                            </div>
                            <div className='flex-1 flex flex-col items-center justify-center'>
                                <Button type='button'
                                    className='font-semibold w-8/12'
                                    radius='lg'
                                    style={{
                                    backgroundColor: '#154734',
                                    color: '#fff'}} onClick={open}>
                                    Faça upload
                                </Button>
                                <p>ou arraste um arquivo</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 rounded-sm bg-gray-200 flex flex-col justify-between'>
                        <div className='flex-1 flex flex-col justify-center'>
                            {files.map(file => (
                                <>
                                    <div className='flex justify-between  px-4'>
                                        <p className='font-semibold text-lg'>
                                            {
                                                file.name.length > 20 ?
                                                `${(file.name).substring(0, 20)}...`
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
                        <Progress size='sm' color='success' value={progress}></Progress>
                    </div>
                </div>
            </div>
        </div>
    </>)
}