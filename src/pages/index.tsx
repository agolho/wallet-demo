import styles from "@/styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import { Nav, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";

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

export default function Home() {
	const router = useRouter();

	const WalletMultiButtonDynamic = dynamic(
		async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
		{ ssr: false }
	);

	const { connection } = useConnection();
	const [balance, setBalance] = useState<number>(0);
	const address = "3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy";

	const [allowedWallets, setAllowedWallets] = useState<string[]>([]);
	const [isAllowed, setIsAllowed] = useState(false);
	const { publicKey } = useWallet();

	useEffect(() => {
		fetch("/allowlist.txt")
			.then(response => response.text())
			.then(data => {
				const keys = data.split("\n").map(key => key.trim()).filter(Boolean); // Filter out empty lines
				setAllowedWallets(keys);
			})
			.catch(error => console.error("Error fetching allowed wallets:", error));
	}, []);

	useEffect(() => {
		setIsAllowed(allowedWallets.includes(publicKey?.toBase58() || ""));
	}, [publicKey, allowedWallets]);

	const [unityInstance, setUnityInstance] = useState<any>(null);

	let globalUnityInstance = null;
	// Function to handle Unity instance cleanup
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

	return (
		<>
			<Head>
				<title>SCT Game HUB</title>
				<meta
					name="Official Game HUB of StrayCatTribe"
					content="Powered by On Off Games"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<div className={styles.header}>
					<div></div>
					<div className={styles.buttons}>
						<WalletMultiButtonDynamic />
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
										<WalletMultiButtonDynamic />
									</Nav.Link>
								</div>
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
							</Nav>
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
