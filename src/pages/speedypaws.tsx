import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import UnityComponent from "./unity";
import Scrollslider from "@/pages/scrollslider";

const SpeedyPaws = ({ isAllowed, setUnityInstance }: { isAllowed: boolean, setUnityInstance: any }) => {
    const [isGameVisible, setIsGameVisible] = useState(false);

    let gameIsActive =false;
    const handlePlayClick = () => {
        if(gameIsActive) return;
        gameIsActive= true;
        setIsGameVisible(true);
    };

    const imgSources: string[] = [
        'game-detail-assets/prizes/CommonBox.png',
        'game-detail-assets/prizes/5usdc.png',
        'game-detail-assets/prizes/10usdc.png',
        'game-detail-assets/prizes/5usdc.png',
        'game-detail-assets/prizes/UnCommonBox.png',
        'game-detail-assets/prizes/10usdc.png',
        'game-detail-assets/prizes/20USDC.png',
        'game-detail-assets/prizes/10usdc.png',
        'game-detail-assets/prizes/CommonBox.png',
        'game-detail-assets/prizes/20USDC.png',
        'game-detail-assets/prizes/UnCommonBox.png',
        'game-detail-assets/prizes/20USDC.png',
        'game-detail-assets/prizes/CommonBox.png'
    ];

    return (
        <div id="content-column" className="view">
            <div className={"content-inner"}>
                <div>
                    {isGameVisible ?(
                        <div className={"unityBackground"}>
                        <iframe src="Games/speedypaws/index.html" width="100%" height="1000vw" title="Speedy Paws Game"></iframe>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="home">

                    <div className="background">
                        <img src={"/images/speedy-paws/gamebanner.png"} alt={"game banner"}></img>
                    </div>

                    <h6 className={"title"}>Speedy Paws!</h6>
                    <div className={"description"}> Vroom Vroom!</div>
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
                            <span >Racing</span>
                        </div>
                        <div className="check-container"><h6 >Zooming Kitties!</h6>
                            <div className="row details">
                                <div className="column-6">
                                    <ul >
                                        <li >
                                            <img src="/icons/racing.png" width={32} height={32}></img>
                                            <p>
                                                Racing
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="column-6">
                                    <ul >
                                        <li >
                                            <img src="/icons/splitscreen.png" width={32} height={32} ></img>
                                            <p>
                                                Splitscreen
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Scrollslider imgSources={imgSources}></Scrollslider>
                <div className="game-detail">

                    <img className={"img-fluid"} src="images/speedy-paws/speedy1.png" ></img>

                    <div className="info">
                        <div className="title">Speedy Paws: Racing Revolution with a Feline Twist!</div>
                        <p >
                            Prepare to embark on a racing revolution like no other with Speedy Paws, where cars take a backseat to the true stars of the show: our furry feline friends. In this groundbreaking web3 racing game, each cat driver brings its own unique charm and abilities to the track, ensuring every race is a purr-fectly unpredictable adventure. Whether you're navigating tight corners with the agility of a nimble Bengal or unleashing the raw speed of a majestic Maine Coon on the straightaways, Speedy Paws offers a dynamic and exhilarating driving experience that will leave you feline fine!
                        </p>
                    </div>
                </div>

                <div className="game-detail">


                    <div className="info-right">
                        <div className="title">More than race cars!</div>
                        <p>
                            But Speedy Paws isn't just about flashy cars—it's about the thrill of the chase and the rush of victory. As you rev your engines and tear through each hairpin turn, you'll feel the adrenaline coursing through your veins as you vie for the top spot on the leaderboard. And with the added incentive of web3 rewards waiting at the finish line, every race becomes an exhilarating opportunity to earn exclusive prizes and establish your dominance in the Speedy Paws universe. So why settle for ordinary racing games when you can join the purr-fectly thrilling world of Speedy Paws and experience the ultimate fusion of gaming excitement and web3 innovation?
                        </p>
                    </div>
                    <img className={"img-fluid"} src="images/speedy-paws/speedy1.png" width={400} height={300}></img>
                </div>

                <div className="screenshots">
                    <div className="info">
                        <img className="" src="images/speedy-paws/ss1.png"></img>

                    </div>
                    <div className="info">
                        <img className="" src="images/speedy-paws/ss2.png"></img>
                    </div>
                </div>

                <div className="screenshots-single" >
                    <img className="enlargeable" src="images/speedy-paws/controls.png" alt={"controls"}></img>
                </div>
            </div>
        </div>
    );
};

export default SpeedyPaws;
