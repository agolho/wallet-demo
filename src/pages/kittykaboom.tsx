import React from "react";

const KittyKaboom = () => {
    return (
        <div id="content-column" className="view">
            <div className={"content-inner"}>
                <div className="home">
                    <div className="background">
                        <img src={"/images/kitty-images/gamebanner.png"} alt={"game banner"}></img>
                    </div>
                    <h6 className={"title"}>Kitty Kaboom</h6>
                    <div className={"description"}>Boom!</div>
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
            </div>
        </div>
    );
};

export default KittyKaboom;