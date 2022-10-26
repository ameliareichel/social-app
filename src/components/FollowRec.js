import axios from "axios";
import React, { useEffect, useState } from "react";
import './FollowRec.css';

const FollowRec = (props) => {

    const [recomms, setRecomms] = useState([]);

    const getRecomms = () => {

        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then(res => {
                setRecomms(res.data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getRecomms()
    }, [props.posts]);

    const followUser = (id) => {

        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
        .then(() => {
            props.getLastPosts();
        })
        .catch(error => console.error(error));
    };

    return (
        <div className="follow-recomm-container">
            <h2 className="follow-recomm-title">Follows for you</h2>
            {recomms.map((recomm) => {
                return (
                    <div className="recomm-user-profile">
                        <img className="recomm-user-pfp" src={recomm.avatar_url} alt={recomm.username} />
                        <h4 className="recomm-user-username">{recomm.username}</h4>
                        <button className="button-add follow" onClick={() => followUser(recomm.id)} >Follow</button>
                    </div>
                )
            })}
        </div>
    );
};

export default FollowRec;