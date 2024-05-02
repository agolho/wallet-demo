import React, {useState} from "react";
import UnityComponent from "@/pages/unity";
import {Button} from "react-bootstrap";

const CubicTangle = ({ isAllowed , setUnityInstance}: { isAllowed: boolean, setUnityInstance: any }) => {
    const [isGameVisible, setIsGameVisible] = useState(false);
    let gameIsActive = false;
    const handlePlayClick = () => {
        if(gameIsActive) return;
        gameIsActive= true;
        setIsGameVisible(true);
    };

    return (
        <div id="content-column" className="view">
            <div className={"content-inner"}>
                <div>
                    {isGameVisible ?(
                        <UnityComponent
                            gameName="Cubic Tangle"
                            dataUrl="Data/Cubic/cubictangle.data"
                            frameworkUrl="Data/Cubic/cubictangle.framework.js"
                            codeUrl="Data/Cubic/cubictangle.wasm"
                            scriptUrl="Data/Cubic/cubictangle.loader.js"
                            setUnityInstance={setUnityInstance}
                        />
                    ) : (
                        <></>
                    )}
                </div>

                <div className="home">
                    <div className="background">
                        <img src={"/images/cube-tangle/gamebanner.png"} alt={"game banner"}></img>
                    </div>
                    <h6 className={"title"}>Cubic Tangle</h6>
                    <div className={"description"}>Tangled!</div>
                    <div className={"description"}>
                        <div>
                            {isAllowed ? (
                                <>
                                    {isGameVisible ? (
                                        <></>
                                    ) : (
                                        <div className={"playButton"}>
                                        <Button onClick={handlePlayClick}>Play</Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={"playButton"}>
                                    <Button>Connect a valid wallet to Play</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="standard">
                    <div className="tab-container">
                        <h6 className="title">Game Details</h6>
                        <div className="total"><p >Game Genre</p>
                            <span >Puzzle</span>
                        </div>
                        <div className="check-container">
                            <div className="row details">
                                <div className="column-6">
                                    <ul >
                                        <li >
                                            <img src="/icons/puzzle.png" width={32} height={32}></img>
                                            <p>
                                                Puzzle
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="column-6">
                                    <ul >
                                        <li >
                                            <img src="/icons/achievement.png" width={32} height={32} ></img>
                                            <p>
                                                Achievements
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game-detail">

                    <img src="images/cube-tangle/cubic1.png" width={400} height={300}></img>

                    <div className="info">
                        <div className="title">Unravel the Challenge with "Cubic Tangle"!</div>
                        <p >
                            Welcome to the next generation of puzzle gaming with our revolutionary title, "Cubic Tangle"! Prepare to embark on an exhilarating journey of untangling ropes that are intricately intertwined on a cube's surfaces. With either 2 or 6 sides to conquer, each level presents a unique challenge that will test your spatial awareness and problem-solving skills. But beware, as you untangle the ropes on one side, you'll need to tackle the knots on the opposite side as well, adding an extra layer of complexity to the gameplay. </p>
                    </div>
                </div>

                <div className="game-detail">


                    <div className="info-right">
                        <div className="title">Experience the Next Generation of Puzzle Gaming!</div>
                        <p>
                            "Cubic Tangle" isn't just your average puzzle game; it's a thrilling and competitive experience that will keep you hooked for hours on end. With its innovative mechanics and dynamic challenges, every level offers a fresh and engaging puzzle-solving experience. Compete against friends or global players to see who can unravel the ropes the fastest and claim the top spot on the leaderboard. As one of the best puzzle games on Web3, "Cubic Tangle" has the potential to win prestigious awards for its creativity and innovation, setting a new standard for puzzle gaming in the digital era. Combining the best of Web2 and Web3 technologies, "Cubic Tangle" delivers an immersive and interactive gaming experience like no other, making it a must-play for puzzle enthusiasts and casual gamers alike. Get ready to unravel the fun and excitement with "Cubic Tangle"! </p>
                    </div>
                    <img src="images/cube-tangle/cubic2.png" width={400} height={300}></img>
                </div>

                <div className="screenshots">
                    <div className="info">
                        <img className="" src="images/cube-tangle/ss1.png"></img>

                    </div>
                    <div className="info">
                        <img className="" src="images/cube-tangle/ss2.png"></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CubicTangle;