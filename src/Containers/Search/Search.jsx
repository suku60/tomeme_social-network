import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet';


import { ReactComponent as UserResultSvg } from '../../assets/svg/userresult.svg'

import { ReactComponent as StarSvg } from '../../assets/svg/star.svg'
import './Search.css';

import { ScrollArea, Accordion, Textarea } from '@mantine/core';
import { Send, ChevronDown } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

import { connect } from 'react-redux';

const Search = (props) => {
    // HOOKS
    // memes
    const [memesSearch, setMemesSearch] = useState([]);
    const [msg, setMsg] = useState("");
    const [searchData, setSearchData] = useState("");

    // add comment
    const [comment, setComment] = useState("");
    // add answer
    const [answer, setAnswer] = useState("");


    // post data
    const [postDataDisplay, setPostDataDisplay] = useState("flex");

    // stars
    const [star1, setStar1] = useState("var(--color-vapor-3-3");
    const [star2, setStar2] = useState("var(--color-vapor-3-3");
    const [star3, setStar3] = useState("var(--color-vapor-3-3");
    const [star4, setStar4] = useState("var(--color-vapor-3-3");
    const [star5, setStar5] = useState("var(--color-vapor-3-3");




    // USEEFFECTS
    useEffect(() => {
        // bringMemes();
        // memesRender();

        // console.log("meme?", memes)
    }, [])

    // FUNCTIONS
    // Handlers


    // stars handlers
    const OnBackgroundStar = () => {
        setStar1("var(--color-vapor-1-3)")
    }

    const OnBackgroundStar2 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)")
    }

    const OnBackgroundStar3 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
    }

    const OnBackgroundStar4 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
        setStar4("var(--color-vapor-1-3)");
    }

    const OnBackgroundStar5 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
        setStar4("var(--color-vapor-1-3)");
        setStar5("var(--color-vapor-1-3)");
    }


    const OffBackgroundStar = () => {
        if (star1 === "var(--color-vapor-1-3)") {
            setStar1("var(--color-vapor-3-3)")
            setStar2("var(--color-vapor-3-3)")
            setStar3("var(--color-vapor-3-3)")
            setStar4("var(--color-vapor-3-3)")
            setStar5("var(--color-vapor-3-3)")
        }
    }

    //LOCAL FUNCTIONS
    //Fill the search bar
    const fillForm = (e) => {
        setSearchData({ [e.target.name]: e.target.value })
    }

    //Search endpoint
    const search = async () => {
        let results;

        try {
            results = await axios.get(`https://socialmeme.herokuapp.com/posts/actions/find?term=${searchData.term}`)

        } catch (error) {

            console.log("Find endpoint error: ", error)

        }

        if (results.data.length !== 0) {
            setMemesSearch(results.data)
        } else {
            setMsg(results.data)
        }

    }

    // Rating post action
    const ratePost = async (postId, rating) => {
        if (props.credentials.token) {
            let body = {
                postId: postId,
                raterId: props.credentials.user[0]._id,
                raterNickname: props.credentials.user[0].nickname,
                rate: rating
            }
            console.log(body);
            let response = await axios.put(`https://socialmeme.herokuapp.com/posts/actions/addRating`, body);

            console.log(response.data);
            if (response.data !== "You have already rated this post") {
                showNotification({
                    title: `Post rated with ${rating} tomatoes!`,
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            } else {
                showNotification({
                    title: "You have already rated this post",
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            }

        } else {
            showNotification({
                title: 'You must be logged in to rate',
                // message: 'Hey there, your code is awesome! 🤥',
                autoClose: 1000
            })
        }


    }

    // Rating comment action
    const rateComment = async (postId, commentId, rating) => {
        if (props.credentials.token) {
            let body = {
                postId: postId,
                commentId: commentId,
                raterId: props.credentials.user[0]._id,
                raterNickname: props.credentials.user[0].nickname,
                rate: rating
            }
            console.log(body);
            let response = await axios.put(`https://socialmeme.herokuapp.com/posts/actions/addCommentRating`, body);

            console.log(response.data);
            if (response.data !== "You have already rated this comment") {
                showNotification({
                    title: `Comment rated with ${rating} tomatoes!`,
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            } else {
                showNotification({
                    title: "You have already rated this comment",
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            }

        } else {
            showNotification({
                title: 'You must be logged in to rate',
                // message: 'Hey there, your code is awesome! 🤥',
                autoClose: 1000
            })
        }


    }

    const clearHooks = () => {

        setComment("");
        setAnswer("");
    }

    //Add comment
    const addComment = async (id) => {

        let body = {
            ownerId: props.credentials.user[0]._id,
            ownerNickname: props.credentials.user[0].nickname,
            comment: comment,
            postId: id,
        }

        axios.put(`https://socialmeme.herokuapp.com/posts/actions/addComment`, body);


        setTimeout(() => {
            clearHooks();
        }, 1000);

    }

    //Add answer
    const addAnswer = async (postId, commentId) => {

        let body = {

            postId: postId,
            commentId: commentId,
            ownerId: props.credentials.user[0]._id,
            ownerNickname: props.credentials.user[0].nickname,
            answer: answer,
        }

        axios.put(`https://socialmeme.herokuapp.com/posts/actions/addCommentAnswer`, body);


        setTimeout(() => {
            clearHooks();
        }, 1000);

    }


    const memesRender = () => {
        if (memesSearch.length !== 0) {
            // console.log(memesSearch);
            return (
                <ScrollArea className='scrollArea'>
                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`users results`}>
                            <div className='accordionContent'>
                                {memesSearch.usersResults?.map(elmnt => {
                                    return (
                                        <div className="user_results"><UserResultSvg />{elmnt.nickname}</div>
                                    )
                                })}
                            </div>
                        </Accordion.Item>
                    </Accordion>

                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`posts results`}>
                            <div className='accordionContent'>
                                {memesSearch?.postsResults.map(images => {
                                    return (

                                        <div className='meme_card' key={images._id}>
                                            <img className='meme_photo' src={images.img} alt={images.title} />
                                            <div className="meme_card_data">

                                                <div className="meme_title" style={{ display: postDataDisplay }}>{images.title}
                                                </div>
                                                <div className="meme_description" style={{ display: postDataDisplay }}>{images.text}
                                                </div>
                                                <div className="meme_rating_action" style={{ display: postDataDisplay }} onMouseOver={() => OffBackgroundStar()}>
                                                    <div
                                                        className="meme_rating_star"
                                                        style={{ backgroundColor: star1 }}
                                                        onMouseOver={() => OnBackgroundStar()}
                                                        onClick={() => { ratePost(images._id, 1) }}
                                                    >
                                                        <StarSvg
                                                            style={{ backgroundColor: star1 }}
                                                            onMouseOver={() => OnBackgroundStar()}

                                                        />
                                                        {/* <div className="star_white"></div> */}
                                                    </div>
                                                    <div
                                                        className="meme_rating_star"
                                                        style={{ backgroundColor: star2 }}
                                                        onMouseOver={() => OnBackgroundStar2()}
                                                        onClick={() => { ratePost(images._id, 2) }}
                                                    >
                                                        <StarSvg
                                                            style={{ backgroundColor: star2 }}
                                                            onMouseOver={() => OnBackgroundStar2()}
                                                        />
                                                    </div>
                                                    <div
                                                        className="meme_rating_star"
                                                        style={{ backgroundColor: star3 }}
                                                        onMouseOver={() => OnBackgroundStar3()}
                                                        onClick={() => { ratePost(images._id, 3) }}
                                                    >
                                                        <StarSvg
                                                            style={{ backgroundColor: star3 }}
                                                            onMouseOver={() => OnBackgroundStar3()}
                                                        />
                                                    </div>
                                                    <div
                                                        className="meme_rating_star"
                                                        style={{ backgroundColor: star4 }}
                                                        onMouseOver={() => OnBackgroundStar4()}
                                                        onClick={() => { ratePost(images._id, 4) }}
                                                    >
                                                        <StarSvg
                                                            style={{ backgroundColor: star4 }}
                                                            onMouseOver={() => OnBackgroundStar4()}
                                                        />
                                                    </div>
                                                    <div
                                                        className="meme_rating_star"
                                                        style={{ backgroundColor: star5 }}
                                                        onMouseOver={() => OnBackgroundStar5()}
                                                        onClick={() => { ratePost(images._id, 5) }}
                                                    >
                                                        <StarSvg
                                                            style={{ backgroundColor: star5 }}
                                                            onMouseOver={() => OnBackgroundStar5()}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="meme_rating" style={{ display: postDataDisplay }}>rating: {images.ratingAverage}
                                                </div>
                                                <div className="meme_creator" style={{ display: postDataDisplay }}>meme done by: {images.ownerNickname}
                                                </div>
                                                <Accordion
                                                    className='meme_comments_accordion'
                                                    icon={<ChevronDown size={20} />}
                                                    iconPosition="right"
                                                    offsetIcon={false}
                                                >
                                                    {/* <Accordion className='meme_comments_accordion' iconPosition="right" iconSize={0} offsetIcon={false} onClick={() => HideShowPostData()}> */}
                                                    <Accordion.Item label={`Comments`}>
                                                        <div className='accordionContent'>
                                                            <div className='meme_comment_textarea_box'>
                                                                <Textarea
                                                                    className="meme_comment_textarea"
                                                                    label="New comment"
                                                                    autosize
                                                                    minRows={2}
                                                                    maxRows={4}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                    value={comment}
                                                                />
                                                                <div
                                                                    className="meme_comment_textarea_bttn"
                                                                    onClick={() => addComment(images._id)}

                                                                ><Send
                                                                        size={48}
                                                                        strokeWidth={1.5}
                                                                        color={'black'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {images?.comments?.map(elmnt => {
                                                                return (
                                                                    <div className='meme_comment_box' key={elmnt.commentId}>
                                                                        <div className="meme_comment_owner">{elmnt.ownerNickname}</div>
                                                                        <div className="meme_comment_created">{elmnt.created}</div>
                                                                        <div className="meme_comment_content">{elmnt.comment}</div>
                                                                        <div className="meme_comment_rating_action" onMouseOver={() => OffBackgroundStar()}>
                                                                            <div
                                                                                className="meme_comment_rating_star"
                                                                                style={{ backgroundColor: star1 }}
                                                                                onMouseOver={() => OnBackgroundStar()}
                                                                                onClick={() => { rateComment(images._id, elmnt.commentId, 1) }}
                                                                            >
                                                                                <StarSvg
                                                                                    style={{ backgroundColor: star1 }}
                                                                                    onMouseOver={() => OnBackgroundStar()}
                                                                                />
                                                                                {/* <div className="star_white"></div> */}
                                                                            </div>
                                                                            <div
                                                                                className="meme_comment_rating_star"
                                                                                style={{ backgroundColor: star2 }}
                                                                                onMouseOver={() => OnBackgroundStar2()}
                                                                                onClick={() => { rateComment(images._id, elmnt.commentId, 2) }}
                                                                            >
                                                                                <StarSvg
                                                                                    style={{ backgroundColor: star2 }}
                                                                                    onMouseOver={() => OnBackgroundStar2()}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="meme_comment_rating_star"
                                                                                style={{ backgroundColor: star3 }}
                                                                                onMouseOver={() => OnBackgroundStar3()}
                                                                                onClick={() => { rateComment(images._id, elmnt.commentId, 3) }}
                                                                            >
                                                                                <StarSvg
                                                                                    style={{ backgroundColor: star3 }}
                                                                                    onMouseOver={() => OnBackgroundStar3()}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="meme_comment_rating_star"
                                                                                style={{ backgroundColor: star4 }}
                                                                                onMouseOver={() => OnBackgroundStar4()}
                                                                                onClick={() => { rateComment(images._id, elmnt.commentId, 4) }}
                                                                            >
                                                                                <StarSvg
                                                                                    style={{ backgroundColor: star4 }}
                                                                                    onMouseOver={() => OnBackgroundStar4()}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="meme_comment_rating_star"
                                                                                style={{ backgroundColor: star5 }}
                                                                                onMouseOver={() => OnBackgroundStar5()}
                                                                                onClick={() => { rateComment(images._id, elmnt.commentId, 5) }}
                                                                            >
                                                                                <StarSvg
                                                                                    style={{ backgroundColor: star5 }}
                                                                                    onMouseOver={() => OnBackgroundStar5()}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="meme_comments_rating">rating: {elmnt.ratingAverage}
                                                                        </div>
                                                                        <Accordion
                                                                            className='meme_answers_accordion'
                                                                            icon={<ChevronDown size={20} />}
                                                                            iconPosition="right"
                                                                            offsetIcon={false}>
                                                                            <Accordion.Item label={`Answers`}>
                                                                                <div className='accordionContent'>
                                                                                    <div className='meme_comment_textarea_box'>
                                                                                        <Textarea
                                                                                            className="meme_comment_textarea"
                                                                                            label="New answer"
                                                                                            autosize
                                                                                            minRows={2}
                                                                                            maxRows={4}
                                                                                            onChange={(e) => setAnswer(e.target.value)}
                                                                                            value={answer}
                                                                                        />
                                                                                        <div
                                                                                            className="meme_comment_textarea_bttn"
                                                                                            onClick={() => addAnswer(images._id, elmnt.commentId)}

                                                                                        ><Send
                                                                                                size={48}
                                                                                                strokeWidth={1.5}
                                                                                                color={'black'}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    {elmnt.answers?.map(elmnt2 => {
                                                                                        return (
                                                                                            <div className='meme_answer_box' key={elmnt2.answerId}>
                                                                                                <div className="meme_comment_owner">{elmnt2.ownerNickname}</div>
                                                                                                <div className="meme_comment_created">{elmnt2.created}</div>
                                                                                                <div className="meme_comment_content">{elmnt2.answer}</div>
                                                                                            </div>

                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </Accordion.Item>
                                                                        </Accordion>
                                                                    </div>

                                                                )
                                                            })}
                                                        </div>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <div className="meme_card_footer"></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </Accordion.Item>
                    </Accordion>


                </ScrollArea>
            )

        } else {
            return (
                <></>
            )
        }
    }


    return (
        <div className="container_box" id="search_box">
            <div>
                <Helmet>
                    <title>tomeme | Search </title>
                </Helmet>
            </div>



            {/* FIXED SEARCH TRANSPARENCY  */}
            <div className="container_search_transparency">
                search here
            </div>

            {/* THIS WILL BE A CAROUSEL OF IMAGES */}

            <div className="component_search" id="animationContainerFromTop">

                <div className="searchbar_container">

                    <input
                        type="text"
                        placeholder='Search in Tomeme'
                        name="term"
                        title="nick"
                        autoComplete="off"
                        id="search_input"
                        onChange={(e) => { fillForm(e) }}
                    />
                    <div
                        className="search_button"
                        onClick={() => search()}

                    >Search
                    </div>
                </div>
                {memesRender()}
            </div>
        </div>
    )

}
export default connect((state) => ({
    credentials: state.credentials
}))(Search);