import React from 'react'

const AllMedia = ({docs, setViewAllMedia, setViewAllFiles}) => {

    const downloadFile = (url, name) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.target = '_blank'
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

  return (
    <div 
        style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: '20',
            backgroundColor: 'white',
            overflowY: 'scroll'
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
        <p>All Media</p>
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
            flexWrap: 'wrap',
            gap: '15px',
            padding: '15px',
            
        }}
    >
        {
            docs.map((item) => (
                <img
                    src={item?.file.url} 
                    alt={item?.file.name} 
                    style={{width: '60px', height:'60px', objectFit: 'contain', border: '1px solid gray', borderRadius: '4px', cursor:'pointer'}} 
                    onClick={()=>downloadFile(item?.file.url, item?.file.name)}
                />
            ))
        }
    </div>
        
    </div>
  )
}

export default AllMedia