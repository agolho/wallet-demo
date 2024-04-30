import Head from "next/head";
import Image from "next/image";
import { Nav, Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/styles/Home.module.css";
import React, {useEffect, useState} from "react";

import SpeedyPaws from "@/pages/speedypaws";
import Homepage from "@/pages/homepage";
import KittyKaboom from "@/pages/kittykaboom";
import FlyKitty from "@/pages/flykitty";
import Cubictangle from "@/pages/cubictangle";
import dynamic from "next/dynamic";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {resolveToWalletAddress, getParsedNftAccountsByOwner,} from "@nfteyez/sol-rayz";
import MyAwesomeGallery from "@/pages/nfteyez";

export default function Home() {

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

	const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
		useState(false);
	const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

	const closeAll = () => {
		setIsNetworkSwitchHighlighted(false);
		setIsConnectHighlighted(false);
	};

	const [activeLink, setActiveLink] = useState("Homepage");

	const handleLinkClick = (link:string) => {
		setActiveLink(link);
	};

	const renderPage = () => {
		switch (activeLink) {
			case "Homepage":
				return <Homepage/>;
			case "Speedy Paws":
				return <SpeedyPaws isAllowed={isAllowed} />;
			case "Kitty Kaboom":
				return <KittyKaboom isAllowed={isAllowed}/>;
			case "Fly Kitty!":
				return <FlyKitty isAllowed={isAllowed} />;
			case "Cubic Tangle":
				return <Cubictangle isAllowed={isAllowed} />;
			default:
				return <Homepage/>;
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
				<div
					className={styles.backdrop}
					style={{
						opacity:
							isConnectHighlighted || isNetworkSwitchHighlighted
								? 1
								: 0,
					}}
				/>
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
							<MyAwesomeGallery walletPublicKey={publicKey?.toBase58() || ''} nftCollectionId={address} />

							{/* Sidebar navigation */}
							<div className={"sitelogo"}>
								<a href={"#"} onClick={() => handleLinkClick("Homepage")}>
								<img className={"icon img-fluid"} src="/logosct.png"  alt={"site logo"}></img>
								</a>
							</div>
							<Nav defaultActiveKey="/home" className=" navigation-menu">
								<div className={"menu-wallet-connect"}>

								<Nav.Link className={"nav-link"}>
										<WalletMultiButtonDynamic/>
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
								<Nav.Link className={"nav-link"}  href="#" onClick={() => handleLinkClick("Cubic Tangle")} active={activeLink === "Cubic Tangle"}>
									<img className={"icon img-fluid"}  width={32} height={32} src={"/icons/puzzle.png"}></img>
									<span className={"menu-item-title"}>Cubic Tangle</span>
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

