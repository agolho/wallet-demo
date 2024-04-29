import Head from "next/head";
import Image from "next/image";
import { Nav, Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

import SpeedyPaws from "@/pages/speedypaws";
import Homepage from "@/pages/homepage";
import KittyKaboom from "@/pages/kittykaboom";
import FlyKitty from "@/pages/flykitty";
import Cubictangle from "@/pages/cubictangle";
import dynamic from "next/dynamic";

export default function Home() {

	const WalletMultiButtonDynamic = dynamic(
		async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
		{ ssr: false }
	);

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
				return <SpeedyPaws />;
			case "Kitty Kaboom":
				return <KittyKaboom />;
			case "Fly Kitty!":
				return <FlyKitty />;
			case "Cubic Tangle":
				return <Cubictangle />;
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
						<div className="sidebar">
							{/* Sidebar navigation */}
							<div className={"sitelogo"}>
								<img className={"img-fluid"} src="/logosct.png"  alt={"site logo"}></img>
							</div>
							<Nav defaultActiveKey="/home" className="flex-column">
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Homepage")} active={activeLink === "Homepage"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/home.png"}></img>
									Home

								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Speedy Paws")} active={activeLink === "Speedy Paws"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/car.png"}></img>
									Speedy Paws
								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Kitty Kaboom")} active={activeLink === "Kitty Kaboom"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/bomb.png"}></img>

									Kitty Kaboom
								</Nav.Link>
								<Nav.Link className={"nav-link"} href="#" onClick={() => handleLinkClick("Fly Kitty!")} active={activeLink === "Fly Kitty!"}>
									<img className={"icon img-fluid"} width={32} height={32} src={"/icons/airplane.png"}></img>
									<span>
										Fly Kitty!

									</span>
								</Nav.Link>
								<Nav.Link className={"nav-link"}  href="#" onClick={() => handleLinkClick("Cubic Tangle")} active={activeLink === "Cubic Tangle"}>
									<img className={"icon"}  width={32} height={32} src={"/icons/puzzle.png"}></img>
									Cubic Tangle
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

