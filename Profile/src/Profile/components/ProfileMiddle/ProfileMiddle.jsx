import './ProfileMiddle.css';
import ProfileRight from '../ProfileRight/ProfileRight';
import { useState } from 'react';
const ProfileMiddle=()=>{

    const[openRight,setOpenRight]=useState(false);

    return(
        <div className='profile-middle'>
            <div className="profileMiddle-container" style={{width:openRight?"100%":"100%"}}>
                <h2>DIV</h2>
            </div>
            <div  className="profileMiddle-extra"  style={{right:openRight?"0%":"-24%"}}>
                <ProfileRight open={openRight} setOpen={setOpenRight}/>
            </div>
        </div>
    )
}

export  default ProfileMiddle;