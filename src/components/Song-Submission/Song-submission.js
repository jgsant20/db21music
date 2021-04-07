import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Song-submission.css"
const SongSubmission = () => {
    const [songNameState, setSongNameState] = useState("");
    const handleSongNameChange = (e) => setSongNameState({
        ...songNameState,
        [e.target.songName]: [e.target.value]
})

    const [selectedFile, setSelectedFile] = useState(null);

    const blankContributor = { name: "" };
    const [contributorState, setContributorState] = useState([
        { ...blankContributor },
        ]);

    const addContributor = () => {
        setContributorState([...contributorState, {...blankContributor}]);
    };

    const handleContributorChange = (e) => {
        const updatedContributors = [...contributorState];
        updatedContributors[e.target.dataset.idx][e.target.className] = e.target.value;
        setContributorState(updatedContributors);
    };

    return (
        <form>
            <label htmlFor="songName">Song Name</label>
            <input
                type='text'
                name="songName"
                id="songName"
                value={songNameState.songName}
                onChange={handleSongNameChange}
                />
            <input
                type="button"
                value="Add New Contributor"
                onClick={addContributor}
            />
            {
                contributorState.map((val, idx)=> {
                    let contribID = `name-${idx}`
                    return (
                        <div key={`contributor-${idx}`}>
                        <label htmlFor={contribID}>{`Contributor #${idx + 1}`}</label>
                        <input
                        type='text'
                        name={contribID}
                        data-idx={idx}
                        id={contribID}
                        value={contributorState[idx].name}
                        onChange={handleContributorChange}
                        />
                        </div>
                    );
                })
            }
            <input type= "submit" value="Submit" />
            </form>
    );
}
export default SongSubmission;