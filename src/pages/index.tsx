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
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import NftEyez from "@/pages/nfteyez";
import { useRouter } from 'next/router';
import PawsomeTank from "@/pages/pawsometank";
import Ticketcounter from "@/pages/ticketcounter";

import { collection, addDoc } from "firebase/firestore";
import {initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth, Auth} from "@firebase/auth";

import {verifySignIn} from "@solana/wallet-standard-util";
import {SolanaSignInInput} from "@solana/wallet-standard-features";
import {Adapter} from "@solana/wallet-adapter-base";
import WhitelistComponent from "@/pages/whitelist";
import FreeStrayComponent from "@/pages/freestray";


async function addUser() {
	const firebaseConfig = {
		apiKey: "AIzaSyDx0s34dTsZTZXXE26qWSxIyIGCVqrAQHs",
		authDomain: "strayhub-65a3f.firebaseapp.com",
		projectId: "strayhub-65a3f",
		storageBucket: "strayhub-65a3f.appspot.com",
		messagingSenderId: "322139941913",
		appId: "1:322139941913:web:bd2ebc51ebe8b905220e88",
		measurementId: "G-YNYHYPW2XJ"
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	try {
		const docRef = await addDoc(collection(db, "users"), {
			first: "Ada",
			last: "Lovelace",
			born: 1815
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

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

	const autoSignIn = useCallback(async (adapter: Adapter) => {
		if (!('signIn' in adapter)) return true;

		const input: SolanaSignInInput = {
			domain: window.location.host,
			address: adapter.publicKey ? adapter.publicKey.toBase58() : undefined,
			statement: 'Please sign in.',
		};
		const output = await adapter.signIn(input);

		if (!verifySignIn(input, output)) throw new Error('Sign In verification failed!');

		return false;
	}, []);

	const { connection } = useConnection();
	const [balance, setBalance] = useState<number>(0);
	const address = "3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy";
	const SignInDynamic = dynamic(async () =>
		(await import('./SignIn')).SignIn, { ssr: false });


	const [allowedWallets, setAllowedWallets] = useState<string[]>([]);
	const [isAllowed, setIsAllowed] = useState(false);
	const [toastShown, setToastShown] = useState(false);
	const { publicKey } = useWallet();

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
							<NftEyez walletPublicKey={publicKey?.toBase58() || ''} nftCollectionId={address} />
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
