import React, {useState} from "react";
import UnityComponent from "@/pages/unity";
import {Button} from "react-bootstrap";

const KittyKaboom = ({ isAllowed , setUnityInstance}: { isAllowed: boolean, setUnityInstance: any } ) => {
    const [isGameVisible, setIsGameVisible] = useState(false);
    let gameIsActive =false;
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
                            gameName="SpeedyPaws"
                            dataUrl="Data/Speedy/speedypaws.data.unityweb"
                            frameworkUrl="Data/Speedy/speedypaws.framework.js.unityweb"
                            codeUrl="Data/Speedy/speedypaws.wasm.unityweb"
                            scriptUrl="Data/Speedy/speedypaws.loader.js"
                            setUnityInstance={setUnityInstance}
                        />
                    ) : (
                        <></>
                    )}
                </div>

                <div className="home">
                    <div className="background">
                        <img src={"/images/kitty-images/gamebanner.png"} alt={"game banner"}></img>
                    </div>
                    <h6 className={"title"}>Kitty Kaboom</h6>
                    <div className={"description"}>Boom!</div>
                    <div className={"description"}>
                        <div>
                            {isAllowed ? (
                                <>
                                    {isGameVisible ? (
                                        <></>
                                    ) : (
                                        <Button onClick={handlePlayClick}>Play</Button>
                                    )}
                                </>
                            ) : (
                                <div>Sorry, Speedy Paws content is only available to allowed users.</div>
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
                                            <img src="/icons/arcade.png" width={32} height={32}></img>
                                            <p>
                                                Arcade
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

                <div className="game-detail">

                    <img src="images/kitty-images/kitty1.png" width={400} height={300}></img>

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
                    <img src="images/kitty-images/kitty2.png" width={400} height={300}></img>
                </div>

                <div className="screenshots">
                    <div className="info">
                        <img className="" src="images/kitty-images/ss1.png"></img>

                    </div>
                    <div className="info">
                        <img className="" src="images/kitty-images/ss2.png"></img>
                    </div>
                </div>

                <div className="screenshots-single" >
                    <img className="enlargeable" src="images/kitty-images/controls.png" alt={"controls"}></img>
                </div>
            </div>
        </div>
    );
};

export default KittyKaboom;