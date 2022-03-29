import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';

import '../Dropzone/Dropzone.css'

const Dropzone = () => {

  const [fileData, setFileData] = useState("")

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {

        setFileData(reader.result.split(',')[1])
      }

      reader.readAsDataURL(file);

    })

  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  useEffect(() => {
    console.log(fileData)
  }, [fileData]);
  return (
    <>
      <div className='dropzoneContainer'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <p>Drop your meme image or gif here ...</p>
        </div>
      </div>
    </>
  )

}

export default Dropzone;