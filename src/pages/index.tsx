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
import * as solanaWeb3 from "@solana/web3.js"
import NftEyez from "@/pages/nfteyez";
import { useRouter } from 'next/router';
import PawsomeTank from "@/pages/pawsometank";
import Ticketcounter from "@/pages/ticketcounter";

import { collection, addDoc } from "firebase/firestore";
import {initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth, Auth} from "@firebase/auth";
import { signIn, signOut, useSession } from 'next-auth/react'

import {verifySignIn} from "@solana/wallet-standard-util";
import {SolanaSignInInput} from "@solana/wallet-standard-features";
import {Adapter} from "@solana/wallet-adapter-base";
import WhitelistComponent from "@/pages/whitelist";
import FreeStrayComponent from "@/pages/freestray";
import {Connection, PublicKey} from "@solana/web3.js";
import {undefined} from "zod";
import {address} from "@trezor/utxo-lib";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

export default function Home() {
	// ROUTER
	const router = useRouter();

	const [activeLink, setActiveLink] = useState("Homepage");

	const handleLinkClick = async (link: string) => {
		if ((window as any).globalUnityInstance) {
			await new Promise<void>((resolve) => {
				cleanupUnityInstance();
				setTimeout(() => resolve(), 1000); // Adjust the timeout as needed
			});
		}
		setActiveLink(link);
	};

	const renderPage = () => {
		switch (activeLink) {
			case "Homepage":
				return <Homepage />;
			case "Speedy Paws":
				return <SpeedyPaws isAllowed={isAllowed} setUnityInstance={setUnityInstance} />;
			case "Kitty Kaboom":
				return <KittyKaboom isAllowed={isAllowed} setUnityInstance={setUnityInstance} />;
			case "Fly Kitty!":
				return <FlyKitty isAllowed={isAllowed} setUnityInstance={setUnityInstance}  />;
			case "Cubic Tangle":
				return <Cubictangle isAllowed={isAllowed} setUnityInstance={setUnityInstance}  />;
			case "Pawsome Tank":
				return <PawsomeTank isAllowed={isAllowed} setUnityInstance={setUnityInstance} />;
			default:
				return <Homepage />;
		}
	};

	// WALLET




	const WalletMultiButtonDynamic = dynamic(
		async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
		{ ssr: false }
	);

	const { connection } = useConnection();
	const [balance, setBalance] = useState<number>(0);
	const address = "3JrbCVKzSevkW1CUrJtHNLiNa1zD8MXeKnVsyXQFcJBM";
	const SignInDynamic = dynamic(async () =>
		(await import('./SignIn')).SignIn, { ssr: false });


	const [allowedWallets, setAllowedWallets] = useState<string[]>([]);
	const [isAllowed, setIsAllowed] = useState(false);
	const [toastShown, setToastShown] = useState(false);
	const { publicKey } = useWallet();


	// Solana web3 Querry

	const connectionMainnet = new Connection('https://solana-mainnet.api.syndica.io/api-token/2s53Y9XjuXWjz165ShK3iVwNeNoufmE9HwTVPprYJ2P49sEkNNntnRHMdDjLypn6mDwFRqpQsad2QwKMRfgLEuSX3chj7XVtkNhBF4vMwoimkjVB3xAEMt2fcNwVoUCsu4q6RCQS3AdEGqdtPCre4aPjhcXnUT4wYNB1ummt4z7FWUScvxCiP7ypSHE6Nux9nrmEMVimQtsiaHhxHKN7efBnefYTzNyqJ3B6c4YbuuRqcDY4cSZVYk4H7V4MRYqXfU4xHCWssyWqheuqM9GApPHrAU6SsonkkF2w5bUMG5sVnvgzuTNnK89QsMBhuw2igtbMzaw9jXnX2DpGhEZvBkLFPia4eZZtRpRXVu8zfpaRP4cz4w3ARByYVBrXM39RGj9M11zVNYn7f6nnsL8kXHkmu4RwdVvEDqUy8Qj1v6XR9ZxPWofZVCvgmr39wyzmvuw8ag3gYQhBKHNB7S6mR3dxF3zoHrBywCVZtdBzv9bKWbdNwzEgBGU5RUqHq \\');

// Example: Get the current slot
	connectionMainnet.getSlot().then(slot => {
		//console.log('Current slot:', slot);
	}).catch(error => {
		//console.error('Error:', error);
	});

// Now use connectionMainnet instead of solanaWeb3Connection
	const solanaWeb3Connection = useMemo(() => connectionMainnet, []);

	const fetchNFTsByOwner = useCallback(async () => {
		if (!publicKey) return;

		try {
			const ownerPublicKey = new PublicKey(publicKey.toBase58());

			const tokenAccounts = await solanaWeb3Connection.getTokenAccountsByOwner(
				ownerPublicKey,
				{ programId: TOKEN_PROGRAM_ID },
				'confirmed'
			);

			console.log('Token Accounts:', tokenAccounts); // Log the token accounts data

			const nftTokenAccounts = tokenAccounts.value.filter(account => {
				// Check if the account represents an NFT (usually has a balance of 1)
				if (
					account.account.data.length > 0 && // Check if data is present
					account.account.data.readUInt8(0) === 1 // Check if data represents an NFT
				) {
					return true;
				}
				return false;
			});

			console.log('NFT Token Accounts:', nftTokenAccounts); // Log the filtered NFT token accounts
		} catch (error) {
			console.error('Error fetching NFT token accounts:', error);
		}
	}, [publicKey, solanaWeb3Connection]);


	const savePublicKeyToLocalStorage = ({WalletID}: { WalletID: any }) => {
		localStorage.setItem('publicKey', WalletID);
	};

	useEffect(() => {
		if (publicKey) {
			savePublicKeyToLocalStorage({WalletID: publicKey.toString()});
			fetchNFTsByOwner();
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

	useEffect(() => {
		setIsAllowed(allowedWallets.includes(publicKey?.toBase58() || ""));
		if (publicKey && isAllowed && !toastShown) {
			enqueueSnackbar('Welcome to SCT Premium', { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "right" } });
			setToastShown(true);
		}
	}, [publicKey, allowedWallets]);

	// UNITY

	const [unityInstance, setUnityInstance] = useState<any>(null);
	let globalUnityInstance = null;
	const cleanupUnityInstance = () => {
		console.log('Cleaning up Unity instance');

		if((window as any).globalUnityInstance == null) {
			console.warn("unity instance is null");
		}
		else {
			(window as any).globalUnityInstance.Quit();
			console.log('Unity instance cleaned up successfully');
			(window as any).globalUnityInstance = null;
		}
	};

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
