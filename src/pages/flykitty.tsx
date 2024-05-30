import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import Scrollslider from "@/pages/scrollslider";
import { formatDistanceToNow, parseISO } from 'date-fns';
import moment from "moment-timezone";
import axios from 'axios';
import * as cheerio from "cheerio";

const FlyKitty = ({ isAllowed }: { isAllowed: boolean }) => {


    const [isGameVisible, setIsGameVisible] = useState(false);

    isAllowed = true;
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


    // Leaderboard
    interface LeaderboardEntry {
        rank: number;
        username: string;
        score: number;
        extra: string;
        date: string;
    }

    async function scrapeLeaderboard(url: string): Promise<LeaderboardEntry[]> {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const leaderboard: LeaderboardEntry[] = [];

            $('tbody tr').each((index, element) => {
                const rank = parseInt($(element).find('td').eq(0).text().trim());
                const username = $(element).find('td').eq(1).text().trim();
                const score = parseInt($(element).find('td').eq(2).text().trim());
                const extra = $(element).find('td').eq(3).text().trim();
                const date = $(element).find('td').eq(4).text().trim();

                leaderboard.push({ rank, username, score, extra, date });
            });

            return leaderboard;
        } catch (error) {
            console.error('Error scraping data:', error);
            return [];
        }
    }

    function processLeaderboardData(data: LeaderboardEntry[]): LeaderboardEntry[] {
        const leaderboardMap: { [key: string]: LeaderboardEntry } = {};

        // Iterate over the data to find the lowest score for each unique username
        data.forEach(item => {
            const { username, score } = item;
            if (!(username in leaderboardMap) || score < leaderboardMap[username].score) {
                leaderboardMap[username] = item;
            }
        });

        // Convert the map back to an array
        const leaderboard = Object.values(leaderboardMap);

        // Sort the leaderboard by score in ascending order
        leaderboard.sort((a, b) => a.score - b.score);

        // Assign ranks based on the sorted order
        leaderboard.forEach((item, index) => {
            item.rank = index + 1; // Rank starts from 1
        });

        return leaderboard.slice(0, 10);
    }


    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    useEffect(() => {
        moment.tz.names();
        const fetchData = async () => {
            try {
                const url = "https://lbexp.danqzq.games/html?publicKey=10d72d538cab474437b416bdd3c4c106037b1b918d65e11cad188be608633a9f&take=1000";
                const data = await scrapeLeaderboard(url);
                if (data != null) {
                    const processedData = processLeaderboardData(data);
                    setLeaderboard(processedData);
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchData();
    }, []);


    function formatScore(milliseconds: number) {
        milliseconds *= 0.001;
        const ms = milliseconds % 1000;
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

        const formattedTime = [];

        if (minutes > 0) {
            formattedTime.push(`${minutes}m`);
        }
        if (seconds > 0 || minutes > 0) {
            formattedTime.push(`${seconds}s`);
        }
        if (ms > 0 || seconds > 0 || minutes > 0) {
            formattedTime.push(`${ms}ms`);
        }

        return formattedTime.join('');
    }

    function obfuscateUsername(username : string) {
        if (!username || username.length <= 8) return username;
        const prefix = username.slice(0, 5);
        const suffix = username.slice(-3);
        return `${prefix}...${suffix}`;
    }

    const timeZone = 'Etc/GMT'; // Replace with your desired time zone, e.g., 'America/New_York'
    function convertToTimeZone(dateString: string, timeZone: string) {
        return moment.tz(dateString, timeZone).toDate();
    }

// Use this in your component


    return (
        <div id="content-column" className="view">
            <div className={"content-inner"}>
                <div>
                    {isGameVisible ?(
                        <div className={"unityBackground"}>
                            <iframe src="Games/flykitty/index.html" width="100%" height="1000vw" title="Cubic Tangle"></iframe>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="home">
                    <div className="background">
                        <img src={"/images/plane-images/gamebanner.jpg"} alt={"game banner"}></img>
                    </div>
                    <h6 className={"title"}>Fly Kitty</h6>
                    <div className={"description"}>A Kitty, A Plane!</div>
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
                                <div className={"siteMessage"}>
                                    You need <a href={"https://magiceden.io/launchpad/stray_cat_tribe"}>SCT NFT</a>  to Play.
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
                                            <img src="/icons/action.png" width={32} height={32} ></img>
                                            <p>
                                                Action
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Scrollslider imgSources={imgSources}></Scrollslider>

                <div className="game-detail leaderboard">

                <h2>Leaderboard</h2>
                </div>
                {/* Leaderboard */}
                <div className="game-detail leaderboard">

                    <div className="">
                        {leaderboard.length > 0 ? (
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaderboard.map((item, index ) => (
                                    <tr key={index}>
                                        <td>{item.rank}</td>
                                        <td>{obfuscateUsername(item.username)}</td>
                                        <td>{formatScore(item.score)}</td>
                                        <td>{formatDistanceToNow(convertToTimeZone(item.date, timeZone))} ago</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading leaderboard...</p>
                        )}
                    </div>
                </div>

                <div className="game-detail">

                    <img src="images/plane-images/ss1.png" width={400} height={300}></img>

                    <div className="info">
                        <div className="title">Fly Kitty! - Exciting Adventure of Pilot Cats</div>
                        <p >
                            Fly Kitty! is a fun airplane combat game that you can play solo or with your friends. In this game, you compete to be the first to complete the round by using the adorable pilot cats' controlled planes to blast your opponents. You can use power-ups found along the way to attack enemies with your plane's machine gun or rocket launchers, destroying them. Additionally, while playing with your friends, you can either use tactics against them or collaborate to defeat opponents. </p>
                    </div>
                </div>

                <div className="game-detail">


                    <div className="info-right">
                        <div className="title">Fly Kitty! - Bridging Web3 with Web2 for Rewards and Benefits</div>
                        <p>
                            Fly Kitty! stands out as a game available on the web3 platform, seamlessly integrating with web2. By playing this game, you can earn rewards and benefit from various advantages. Whether playing alone or with friends, you can enjoy spending entertaining moments and relish in competitive battles. Join the adventure of the pilot cats and prove your mastery in airplane warfare!</p>
                    </div>
                    <img src="images/plane-images/ss2.png" width={400} height={300}></img>
                </div>

                <div className="screenshots">
                    <div className="info">
                        <img className="" src="images/plane-images/ss3.png"></img>

                    </div>
                    <div className="info">
                        <img className="" src="images/plane-images/ss4.png"></img>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default FlyKitty;