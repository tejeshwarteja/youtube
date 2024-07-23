import React, { useState } from 'react';
import './Videoupload.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useSelector, useDispatch } from 'react-redux';
import { uploadvideo } from '../../action/video';

const Videoupload = ({ setvideouploadpage }) => {
  const [title, settitle] = useState(""); 
  const [videofile, setvideofile] = useState(""); 
  const [progress, setprogress] = useState(0);
  const dispatch = useDispatch();

  const handleSetVideoFile = (e) => {
    setvideofile(e.target.files[0]);
  };

  const currentuser = useSelector(state => state.currentuserreducer);

  const fileoption = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor((loaded / total) * 100); 
      setprogress(percentage);
      if (percentage === 100) {
        setTimeout(() => {
          setvideouploadpage(false);
        }, 300);
      }
    }
  };

  const uploadvideofile = () => {
    if (!title) { 
      alert("Please enter a title of the video");
    } else if (!videofile) {
      alert("Please attach a video file");
    } else if (videofile.size > 10000000) {
      alert("Please attach a video file less than 10 MB");
    } else {
      const filedata = new FormData();
      filedata.append("file", videofile);
      filedata.append("title", title);
      filedata.append("channel", currentuser?.result?._id); 
      filedata.append("uploader", currentuser?.result?.name);

      console.log(filedata.get("key"));
      console.log("Video File:", videofile);
      console.log("Title:", title);
      console.log("Channel ID:", currentuser?.result?._id);
      console.log("Uploader Name:", currentuser?.result?.name);

      dispatch(uploadvideo({ filedata, fileoption: fileoption }));
    }
  };

  return (
    <div className="container_vidupload">
      <input type="submit" name="text" value="X" onClick={() => setvideouploadpage(false)} className="btn_x" />
      <div className="container2_vidupload">
        <div className="ibox_div_vidupload">
          <input type="text" maxLength={39} placeholder="Enter title of your video" className="ibox_vidupload" onChange={(e) => settitle(e.target.value)} />
          <label htmlFor="file" className="ibox_cidupload btn_vidupload">
            <input type="file" name="file" style={{ fontSize: '1rem' }} onChange={handleSetVideoFile} />
          </label>
        </div>
        <input type="submit" onClick={uploadvideofile} value="Upload" className="ibox_vidupload" />
        <CircularProgressbar value={progress} 
        text={`${progress}%`} 
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: 'butt',
          textSize: '20px',
          pathTransitionDuration: 0.5,
          pathColor: `rgba(255, 255, 255, ${progress / 100})`,
          textColor: `#f88`,
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7'
        })} />
      </div>
    </div>
  );
};

export default Videoupload;