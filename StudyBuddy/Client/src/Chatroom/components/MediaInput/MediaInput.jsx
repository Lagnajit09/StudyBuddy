import React, { useMemo } from 'react'
import './MediaInput.css'
import File from "../../../assets/chatroom_imgs/file.svg";
import { MdDelete } from "react-icons/md";

const MediaInput = ({file, preview, setPreview, setFile}) => {

    const isImage = useMemo(() => {
        return file?.type?.startsWith('image/')
    }, [file])

    const fileName = () => (
        (file.name.split('.')[0].length > 10 ? `${file.name.split('.')[0].slice(0,10)}...` : file.name.split('.')[0]) + `.${file.name.split('.')[1]}`
    )

  return (
    <div className='Community-media'>
        <img 
            src={isImage ? preview : File} 
            alt="Preview" 
            className="community-media-img" 
            style={{ width: isImage ? '200px' : '45px', height: isImage ? '200px' : '45px', objectFit: 'contain', marginTop: '10px', borderRadius: '4px' }}
        />
        <div className='bot'>
            <p>{fileName()}</p>
            <MdDelete 
                className='close' 
                onClick={() => {
                    setFile(null)
                    setPreview('')
                }} 
            />
        </div>
    </div>
  )
}

export default MediaInput