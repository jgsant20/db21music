import React, { useState } from "react";
import { getUserId } from "@Src/verifyLogin";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import "./EditSong.scss";

const EditSong = ({ obj }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log(obj);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedJPGFile, setSelectedJPGFile] = useState(null);
  const [isFileJPGPicked, setIsFileJPGPicked] = useState(false);
  const [selectedMP3File, setSelectedMP3File] = useState(null);
  const [isFileMP3Picked, setIsFileMP3Picked] = useState(false);
  const [songNameState, setSongNameState] = useState(obj.songName);
  const [durationState, setDurationState] = useState(0);
<<<<<<< HEAD
  const [resultState, setResultState] = useState("");
=======
>>>>>>> f68c5d24360ec64ce1b4a1a06e782c678681b7d1

  const mp3FileChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedMP3File(e.target.files[0]);
<<<<<<< HEAD

    let reader = new FileReader();
    reader.onload = (event) => {
      var audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      audioContext.decodeAudioData(event.target.result, function (buffer) {
        let duration = buffer.duration;

        setDurationState(duration);
      });
    };
    setIsFileMP3Picked(true);
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  const jpgFileChangeHandler = (e) => {
    setSelectedJPGFile(e.target.files[0]);
    setIsFileJPGPicked(true);
  };

  const handleSubmission = () => {
    setResultState("loading");
    const formData = new FormData();
    formData.append("songID", obj.songID);
    formData.append("songName", songNameState);
    formData.append("jpgFile", selectedJPGFile);
    formData.append("musicFile", selectedMP3File);
    formData.append("duration", durationState);

    for (var value of formData.values()) {
      console.log(value);
    }
    fetch(
      `${process.env.API_URL}/api/editsong?token=${localStorage.getItem(
        "token"
      )}&userID=${getUserId()}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json)
      .then((result) => {
        console.log("Success: ", result);
        setResultState("success");
      })
      .catch((error) => {
        console.error("Error: ", error);
        setResultState("error");
      });
  };
=======
    
    let reader = new FileReader();
    reader.onload = (event) => {

    var audioContext = new (window.AudioContext || window.webkitAudioContext)();

      audioContext.decodeAudioData(event.target.result, function(buffer){
       let duration = buffer.duration;

       setDurationState(duration)
      })
    }
    setIsFileMP3Picked(true);
    reader.readAsArrayBuffer(e.target.files[0])
    };

    const jpgFileChangeHandler = (e) => {
      setSelectedJPGFile(e.target.files[0]);
      setIsFileJPGPicked(true);
    };

    const handleSubmission = () => {
      const formData = new FormData();
      formData.append('userID', getUserId());
      formData.append('songID', obj.songID)
      formData.append('songName', songNameState);
      formData.append('jpgFile', selectedJPGFile);
      formData.append('musicFile', selectedMP3File);
      formData.append('duration', durationState);
      formData.append('token', localStorage.getItem('token'))

      for (var value of formData.values()) {
        console.log(value);
     }
     fetch(`${process.env.API_URL}/api/editsong?token=${localStorage.getItem('token')}&userID=${getUserId()}`,
     {
       method: 'POST',
       mode: 'no-cors',
       body: formData,
     }
   )
     .then((response) => response.json)
     .then((result) => {
       console.log('Success: ', result);
     })
     .catch((error) => {
       console.error('Error: ', error);
     });



    }
>>>>>>> f68c5d24360ec64ce1b4a1a06e782c678681b7d1

  return (
    <div>
      <IconButton>
<<<<<<< HEAD
        <EditIcon onClick={handleClickOpen}></EditIcon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="edit-data-form">Edit Song:</DialogTitle>
        <DialogContent>
          <label>New Song Name: </label>
          <input
            type="text"
            name="songName"
            value={songNameState}
            onChange={(e) => setSongNameState(e.target.value)}
          />
          <div>
            <label>New Song File (MP3): </label>
            <input type="file" name="mp3File" onChange={mp3FileChangeHandler} />
          </div>
          <div>
            <label>New Cover File (JPG): </label>
            <input
              type="file"
              name="coverFile"
              onChange={jpgFileChangeHandler}
=======
        <EditIcon onClick={handleClickOpen}>
        </EditIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="edit-data-form">Edit Song:</DialogTitle>
        <DialogContent>
          <label>New Song Name: </label>
          <input 
          type='text' 
          name='songName'
          value={songNameState}
          onChange={(e)=>setSongNameState(e.target.value)}
          />
          <div>
            <label>New Song File (MP3): </label>
            <input 
            type="file" 
            name="mp3File"
            onChange={mp3FileChangeHandler}
            />
          </div>
          <div>
            <label>New Cover File (JPG): </label>
            <input 
            type='file' 
            name="coverFile"
            onChange={jpgFileChangeHandler}
>>>>>>> f68c5d24360ec64ce1b4a1a06e782c678681b7d1
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmission} color="primary">
            Submit
          </Button>
        </DialogActions>
<<<<<<< HEAD
        <div className="submitting-state-edit-song">
          {resultState == "success"
            ? "Success!"
            : resultState == "error"
            ? "Error!"
            : resultState == "loading"
            ? "Loading!"
            : null}
        </div>
      </Dialog>
    </div>
  );
};
=======
      </Dialog>
    </div>
  );
}
>>>>>>> f68c5d24360ec64ce1b4a1a06e782c678681b7d1
export default EditSong;
