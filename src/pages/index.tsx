import styles from "@/styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import { Nav, Container } from "react-bootstrap";
import React, {useState, useEffect, useCallback, useMemo} from "react";
import {enqueueSnackbar, SnackbarProvider} from 'notistack/';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import SpeedyPaws from "@/pages/speedypaws";
import Homepage from "@/pages/homepage";
import KittyKaboom from "@/pages/kittykaboom";
import FlyKitty from "@/pages/flykitty";
import Cubictangle from "@/pages/cubictangle";
import dynamic from "next/dynamic";
import { useConnection, useWallet  } from "@solana/wallet-adapter-react";
import { useRouter } from 'next/router';
import PawsomeTank from "@/pages/pawsometank";
import Ticketcounter from "@/pages/ticketcounter";


import WhitelistComponent from "@/pages/whitelist";
import FreeStrayComponent from "@/pages/freestray";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";



export default function Home() {

	// ROUTER
	const router = useRouter();

	const [activeLink, setActiveLink] = useState("Homepage");

	const handleLinkClick = async (link: string) => {
		if ((window as any).globalUnityInstance) {
			await new Promise<void>((resolve) => {
				setTimeout(() => resolve(), 1000); // Adjust the timeout as needed
			});
		}
		setActiveLink(link);
	};

	const renderPage = () => {
		switch (activeLink) {
			case "Homepage":
				return <Homepage/>;
			case "Speedy Paws":
				return <SpeedyPaws isAllowed={isAllowed}/>;
			case "Kitty Kaboom":
				return <KittyKaboom isAllowed={isAllowed}/>;
			case "Fly Kitty!":
				return <FlyKitty isAllowed={isAllowed} />;
			case "Cubic Tangle":
				return <Cubictangle isAllowed={isAllowed} />;
			case "Pawsome Tank":
				return <PawsomeTank isAllowed={isAllowed} />;
			default:
				return <Homepage/>;
		}
	};

	// WALLET
	const WalletMultiButtonDynamic = dynamic(
		async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
		{ssr: false}
	);

	const {connection} = useConnection();
	const [allowedWallets, setAllowedWallets] = useState<string[]>([]);
	const [isAllowed, setIsAllowed] = useState(false);
	const [toastShown, setToastShown] = useState(false);
	const {publicKey} = useWallet();



	// Solana web3 Querry
	interface NFT {
		account: {
			data: {
				parsed: {
					info: {
						mint: string;

					}
				}
			}
		}
	}

	async function fetchTokenAccountsByOwner() {
		try {
			const response = await fetch('https://solana-mainnet.api.syndica.io/api-token/5Lziijebr419MgBrAyxADJAHnEWPswzt58i79gnBiV8ArJNs1iSarC7GisoU4yFDeHfYC3GE6oD5pYw63d8CowVTLnw84PaEebfu9LUdH7SbJAwZvu3vrVKgYPHh19AeRUewRNZrGfz8QgZHeBuGn1gahKmTF6pz7AraRFiWtD5x92D2Jr7Rzp1Sh5gmuaKroacj3j9v7coB2SdRtGqaBf5rWgouNR5ANVjEjALD5Cw1H73ALncSMBXtqc64tdWwrKg38BcaMLGzidrbZZRcWWuPhxmpkvrAnFAsdi94c7nJM4d7F2ufrXWmkJkJ7PzpoF4SJqjVMo6EFGjJBVxQroTpDBDmcgWT96con1ynn9RHEzC8xKLw7TqqzcSHkC42t1HwD9PkupGhEALe8Fkf8X5wjk34vzuFVFYrR1orRdbCzn9JsSpBciJekkbmnEweaHJW4KcUhYuAtaGxWAbi8RHdbaW2RKxqmr844ECB8EKaqZPhJu8ztBVTwpBNxg1dGKeH5XKxSMMwGRGrDJC7vqoG', {
				method: 'POST',
				headers: {
					'Content-Type': 'text/json'
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					id: 1,
					method: 'getTokenAccountsByOwner',
					params: [
						publicKey,
						{
							programId: TOKEN_PROGRAM_ID

						},
						{
							encoding: 'jsonParsed'
						}
					]
				})
			});
			const responseBody = await response.text();
			const responseData = JSON.parse(responseBody);
			const nftArray = responseData.result.value;

			// Filter NFTs whose mint address matches any address in mintaddresses.txt
			const matchedNFTs = nftArray.filter((nft:NFT) => mintAddresses.includes(nft.account.data.parsed.info.mint));
			const allowedLogin = matchedNFTs.length > 0;
			if(allowedLogin){
				setIsAllowed(true);
				//console.log('Matched NFTs:', matchedNFTs, "User allowed:", allowedLogin);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	const [mintAddresses, setMintAddresses] = useState<string[]>([]);
	useEffect(() => {
		// Fetch whitelist from whitelist.txt file
		fetch('/mintadresses.txt') // Assuming txt is in your public directory
			.then(response => response.text())
			.then(data => setMintAddresses(data.split('\n').map(line => line.trim())))
			.catch(error => console.error('Error fetching whitelist from file:', error));
	}, []);

	const savePublicKeyToLocalStorage = ({WalletID}: { WalletID: any }) => {
		localStorage.setItem('publicKey', WalletID);
	};

	useEffect(() => {
		if (publicKey) {
			savePublicKeyToLocalStorage({WalletID: publicKey.toString()});
			fetchTokenAccountsByOwner();
		}
	}, [publicKey]);

	useEffect(() => {
		const allowedWalletsString = process.env.ALLOWED_WALLETS;
		if (allowedWalletsString) {
			const keys = allowedWalletsString.split(",").map(key => key.trim()).filter(Boolean);
			setAllowedWallets(keys);
		} else {
			console.error(" environment variable is not defined");
		}
	}, []);

	return (
		<>
			<SnackbarProvider
				Components={{

			}} />
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
				html {
				}
			`}</style>
			<Head>
				<title>StrayHUB - SCT HUB</title>
				<meta
					name="Official Game HUB of StrayCatTribe, SCT HUB"
					content="Powered by On Off Games"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/icons/fluffy.png" />
			</Head>
			<header>
				<div className={styles.header}>
					<div></div>
					<div className={styles.buttons}>

						<WalletMultiButtonDynamic/>

					</div>
				</div>
			</header>
			<div className={styles.main}>
				<Container className={"homepage"} fluid>
					<div className="content-container">
						<div className="navigation-bar ">

							{/* Sidebar navigation */}
							<div className={"sitelogo"}>
								<a href={"#"} onClick={() => handleLinkClick("Homepage")}>
									<img className={"icon img-fluid"} src="/logosct.png" alt={"site logo"}></img>
								</a>
							</div>
							<Nav defaultActiveKey="/home" className=" navigation-menu">

								<div className={"menu-wallet-connect"}>

									<Nav.Link className={"nav-link"}>
											<WalletMultiButtonDynamic/>

									</Nav.Link>
								</div>
								<Ticketcounter></Ticketcounter>

								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Speedy Paws")} active={activeLink === "Speedy Paws"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/car.png"}></img>
									<span className={"menu-item-title"}>Speedy Paws</span>
								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Kitty Kaboom")} active={activeLink === "Kitty Kaboom"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/bomb.png"}></img>
									<span className={"menu-item-title"}>Kitty Kaboom</span>
								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Fly Kitty!")} active={activeLink === "Fly Kitty!"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/airplane.png"}></img>
									<span className={"menu-item-title"}>Fly Kitty!</span>
								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Cubic Tangle")} active={activeLink === "Cubic Tangle"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/puzzle.png"}></img>
									<span className={"menu-item-title"}>Cubic Tangle</span>
								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Pawsome Tank")} active={activeLink === "Pawsome Tank"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/tank.png"}></img>
									<span className={"menu-item-title"}>Pawsome Tank</span>
								</Nav.Link>

								<WhitelistComponent></WhitelistComponent>
								<FreeStrayComponent></FreeStrayComponent>

							</Nav>
							<div className={"connectLinks"}>
								<div className={"items"}>
									<a href={"https://magiceden.io/launchpad/stray_cat_tribe"}>
										<img className={"icon img-fluid"} width={30} height={30} src={"/icons/magiceden.png"}></img>
										<span>Magic Eden
										</span>
									</a>
									<a href={"https://discord.gg/straycattribe"}>
										<img className={"icon img-fluid"} width={30} height={30} src={"/icons/discord.png"}></img>
										<span>Join Discord
										</span>
									</a>
									<a href={"https://twitter.com/StrayCatTribe"}>
										<img className={"icon img-fluid"} width={30} height={30} src={"/icons/x.png"}></img>

									<span>
										Stray Cat Tribe
									</span>
									</a>
									<a href={"https://twitter.com/OnOffGames"}>
										<img className={"icon img-fluid"} width={30} height={30} src={"/icons/x.png"}></img>
										<span>On Off Games
										</span>
									</a>
								</div>
							</div>
						</div>
						<div id="main-content" className={''}>
							{/* Render the selected page */}
							{renderPage()}
						</div>
					</div>
				</Container>
			</div>
		</>
	);
}
