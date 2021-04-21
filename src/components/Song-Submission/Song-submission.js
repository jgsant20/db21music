import React, { useState } from "react";
import { getUserId } from "@Src/verifyLogin";
import Form from "react-bootstrap/Form";
import Button from '@material-ui/core/Button';
import "./Song-submission.scss"

import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const SongSubmission = () => {
  const [songNameState, setSongNameState] = useState("");
  const [resultState, setResultState] = useState("");

  const blankContributor = { idNum: '', name: '' };
  const [contributorState, setContributorState] = useState([
    { ...blankContributor },
    ]);

  const addContributor = () => {
    setContributorState([...contributorState, {...blankContributor}]);
  };
  
  const removeContributor = () => {
    const list = [...contributorState];
      if (list.length != 1){
        list.pop()
      }
      setContributorState(list);
  };

  const handleContributorChange = (i, e) => {
    const updatedContributors = [...contributorState];
    updatedContributors[i][e.target.name] = e.target.value;
    setContributorState(updatedContributors);

  };

  const [selectedMP3File, setSelectedMP3File] = useState(null);
  const [isFileMP3Picked, setIsFileMP3Picked] = useState(false);

  const mp3FileChangeHandler = (e) => {
    setSelectedMP3File(e.target.files[0]);
    setIsFileMP3Picked(true);
  };

  const [selectedJPGFile, setSelectedJPGFile] = useState(null);
  const [isFileJPGPicked, setIsFileJPGPicked] = useState(false);

  const jpgFileChangeHandler = (e) => {
    setSelectedJPGFile(e.target.files[0]);
    setIsFileJPGPicked(true);
  };

  const handleSubmission = () => {
    setResultState("loading")
    const formData = new FormData();

    formData.append('songName', songNameState);
    formData.append('mp3File', selectedMP3File);
    formData.append('jpgFile', selectedJPGFile);
    formData.append('contributors', JSON.stringify(contributorState));
    formData.append('token', localStorage.getItem('token'))

    fetch(`${process.env.API_URL}/api/music?token=${localStorage.getItem('token')}&userID=${getUserId()}`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((result) => {
        console.log(result)
        if (result.status == 200) {
          setResultState("success")
        } else {
          setResultState("error")
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
        setResultState("error")
      });
  };

  return (
    <div className="song-submission">
      <form className="song-submission__container"> 
        <label htmlFor="songName">Song Name</label>
        <input
          type='text'
          name="songName"
          id="songName"
          value={songNameState.songName}
          onChange={(e)=>setSongNameState(e.target.value)}
          />
        <div>
          <label htmlFor="file">Song File (MP3)</label>
        </div>
        <input type="file" name="mp3File" onChange={mp3FileChangeHandler} />
        {isFileMP3Picked ? (
          <div>
            <p>Filename: {selectedMP3File.name}</p>
            <p>Filetype: {selectedMP3File.type}</p>
            <p>Size in bytes: {selectedMP3File.size}</p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <label htmlFor="file">Song Cover (jpg)</label>
        </div>
        <input type="file" name="coverFile" onChange={jpgFileChangeHandler} />
        {isFileJPGPicked ? (
          <div>
            <p>Filename: {selectedJPGFile.name}</p>
            <p>Filetype: {selectedJPGFile.type}</p>
            <p>Size in bytes: {selectedJPGFile.size}</p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <input
          type="button"
          value="Add Contributor"
          onClick={addContributor}
        /> 
        <input
          type="button"
          value="Remove Contributor"
          onClick={removeContributor}
          />
        {
          contributorState.map((val, idx)=> {
            let numID = `num-${idx}`
            let nameID = `name-${idx}`
            return (
              <div key={`contributor-${idx}`}>
              <label htmlFor={numID}>{`Contributor #${idx + 1}`}</label>
              <input
              type='text'
              placeholder='Contributor ID'
              name="idNum"
              data-idx={idx}
              id={numID}
              className = "name"
              value={contributorState.idNum}
              onChange={event => handleContributorChange(idx, event)}
              />
              <input
              type='text'
              placeholder='Contributor Name'
              name='name'
              data-idx={idx}
              id={nameID}
              className = "id"
              value={contributorState.name}
              onChange={event => handleContributorChange(idx, event)}
              />
              </div>
            );
          })
        }
        <input type= "button" value="Submit" onClick={handleSubmission} />
        <div className="submit-state">
          {resultState == "success" ? "Success!" :
            resultState == "error" ? "Error!" :
            resultState == "loading" ? "Loading!" :
            null
          }
        </div>
      </form>
    </div>
  );
}

export default SongSubmission;
