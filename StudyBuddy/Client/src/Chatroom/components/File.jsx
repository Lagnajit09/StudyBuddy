import SaveAltIcon from '@mui/icons-material/SaveAlt';


const File = ({file, otherStyles}) => {
    const formatFileSize = (size) => {
      if (size < 1024) {
        return `${size} bytes`;
      } else if (size < 1048576) {
        return `${(size / 1024).toFixed(2)} KB`;
      } else {
        return `${(size / 1048576).toFixed(2)} MB`;
      }
    };
  
    const fileName = () => (
      (file.name.split('.')[0].length > 10 ? `${file.name.split('.')[0].slice(0,10)}...` : file.name.split('.')[0]) + `.${file.name.split('.')[1]}`
    )
    
    const saveFile = () => {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      a.target = '_blank'
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 15px', borderRadius: '5px', border: '1px solid #FFFFFF', backgroundColor: '#ffffff', cursor: 'pointer', ...otherStyles }}
      onClick={saveFile}
      >
        <div style={{ backgroundColor: '#00A9FF', padding: '3px', borderRadius: '3px' }}>
          <SaveAltIcon style={{ color: 'white', width: '15px', height: '15px' }} />
        </div>
        <div style={{ display: 'flex', gap: '3px', flexDirection: 'column' }}>
          <p>{fileName()}</p>
          <p style={{fontSize: '10px', color: 'gray'}}>{formatFileSize(file.size)}</p>
        </div>
      </div>
    );
  }

export default File