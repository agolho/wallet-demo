import React, {useState} from "react";
import UnityComponent from "@/pages/unity";
import {Button} from "react-bootstrap";
import Scrollslider from "@/pages/scrollslider";

const PawsomeTank = ({ isAllowed , setUnityInstance}: { isAllowed: boolean, setUnityInstance: any } ) => {
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
                <div className="home">
                    <div className="background">
                        <img src={"/images/tank-images/gamebanner.png"} alt={"game banner"}></img>
                    </div>
                    <h6 className={"title"}>Pawsome Tank</h6>
                    <div className={"description"}>Boom!</div>
                    <div className={"description"}>
                        <div className={"siteMessage"}>
                            Coming Soon!
                        </div>
                    </div>
                </div>
                <div className="standard">
                    <div className="tab-container">
                        <h6 className="title">Game Details</h6>
                        <div className="total"><p >Game Genre</p>
                            <span >Action</span>
                        </div>
                        <div className="check-container"><h6>Zooming Kitties!</h6>
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
                        <div className="title">Locked and Loaded!</div>
                        <p >
                            Dive into the high-octane world of cooperative tank battles with "Pawsome Tank Team: Web3 Adventure," the ultimate co-op tank game that's taking the internet by storm! Picture this: you and your buddies teaming up to command fearless feline tanks in epic showdowns against rival squads. It's like a virtual catnip for adrenaline junkies! And here's the best part – playing this game on the web is an absolute breeze, thanks to its user-friendly setup and smooth-as-silk gameplay.  </p>
                    </div>
                </div>

                <div className="game-detail">


                    <div className="info-right">
                        <div className="title">Join the Fun and Win Big with the Stray Cat Tribe in 'Pawsome Tank Team</div>
                        <p>
                            Now, let me tell you about the cherry on top: "Pawsome Tank Team" is part of the super cool Stray Cat Tribe project. That means while you're out there dominating the battlefield and having a blast, you're also racking up chances to win some seriously awesome prizes. It's like hitting the jackpot while hanging out with your furry friends – what could be better? So, if you're ready to embark on an unforgettable adventure filled with tank warfare, camaraderie, and tons of prizes, hop on board the "Pawsome Tank Team: Web3 Adventure" train and let's roll out to victory!   </p>
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

export default PawsomeTank;