import React from 'react'
import DescriptionIcon from "@mui/icons-material/Description";

const AllFiles = ({docs, setViewAllMedia, setViewAllFiles}) => {

    const fileName = (name) => (
        (name.split('.')[0].length > 10 ? `${name.split('.')[0].slice(0,10)}...` : name.split('.')[0]) + `.${name.split('.')[1]}`
      )
    
      const formatFileSize = (size) => {
        if (size < 1024) {
          return `${size} bytes`;
        } else if (size < 1048576) {
          return `${(size / 1024).toFixed(2)} KB`;
        } else {
          return `${(size / 1048576).toFixed(2)} MB`;
        }
      };

  return (
    <div 
        style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: '20',
            backgroundColor: 'white',
        }}
    >
    <div 
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18.5px 15px',
            borderBottom: '2px solid rgba(217, 217, 217, 0.773)',
            fontSize: '16px'
        }}
    >
        <p>All Files</p>
        <span 
            style={{
                fontSize: '12px',
                color: '#00A9FF',
                fontWeight: 600,
                cursor: 'pointer',
            }}
            onClick={() => {
                setViewAllFiles(false);
                setViewAllMedia(false);
            }}
        >
            Show less
        </span>
    </div>
    <div 
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '15px',
        }}
    >
        {
            docs.map((item) => (
                <div className="userFile">
                    <div className="fileIcon">
                        <DescriptionIcon style={{ width: "25px", height: "25px" }} />
                    </div>
                    <div className="chatUser-fileDetails">
                        <p>{fileName(item?.file.name)}</p>
                        <span>{formatFileSize(item?.file.size)}</span>
                    </div>
                </div>
            ))
        }
    </div>
        
    </div>
  )
}

export default AllFiles