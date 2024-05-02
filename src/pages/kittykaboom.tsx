import React, {useState} from "react";
import UnityComponent from "@/pages/unity";
import {Button} from "react-bootstrap";
import Scrollslider from "@/pages/scrollslider";

const KittyKaboom = ({ isAllowed , setUnityInstance}: { isAllowed: boolean, setUnityInstance: any } ) => {
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
                        <UnityComponent
                            gameName="KittyKaboom"
                            dataUrl="Data/Kitty/kittykaboom.data.unityweb"
                            frameworkUrl="Data/Kitty/kittykaboom.framework.js.unityweb"
                            codeUrl="Data/Kitty/kittykaboom.wasm.unityweb"
                            scriptUrl="Data/Kitty/kittykaboom.loader.js"
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


                <Scrollslider imgSources={imgSources}></Scrollslider>


                <div className="game-detail">

                    <img src="images/kitty-images/kitty1.png" width={400} height={300}></img>

                    <div className="info">
                        <div className="title">Feline Explosive Showdown: Kitty Kaboom</div>
                        <p >
                            Gear up for an explosive showdown in "Feline Explosive Showdown: Kitty Kaboom," where savvy cats engage in a bombastic battle royale! Envision yourself amidst cunning feline warriors, surrounded on all sides by crafty adversaries, each determined to outmaneuver and outsmart the competition. Your objective? Strategically deploy bombs adjacent to the cubes in the center to thwart your opponents' advances while sidestepping their explosive traps. With danger lurking around every corner, only the most agile and cunning cats will emerge victorious in this thrilling game of survival.  </p>
                    </div>
                </div>

                <div className="game-detail">


                    <div className="info-right">
                        <div className="title">Master the Stray Cat Explosives Brigade in 'Kitty Kaboom'</div>
                        <p>
                            Join forces with the Stray Cat Explosives Brigade and brace yourself for an exhilarating contest where every move is critical! As you navigate the perilous battlefield, keep in mind that a single misstep could lead to your downfall. But fear not, for the taste of triumph awaits those who possess the skill and cunning to outwit their adversaries. And here's the kicker: as tensions escalate and bombs start flying, only the last cat standing will seize victory and bask in eternal glory. So, rally your comrades, refine your strategies, and prepare to outmaneuver, outsmart, and out-bomb your way to victory in Kitty Kaboom!    </p>
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