/***************************************************************************
 *                           START MENU COMPONENT
 * Reusable start menu with various social links and actions.
 ***************************************************************************/

import React from "react";
import { MenuList, MenuListItem } from "react95";
import xIco from "../assets/images/x-ico.png";
import teleIco from "../assets/images/tele-ico.png";
import pumpIco from "../assets/images/pump-ico.png";
import discord from "../assets/images/discord_ico.png";
// Import TikTok icon placeholder (replace the path with the actual image later)
import tiktokIco from "../assets/images/tiktok_ico.png"; // TODO: Add TikTok icon image

const StartMenu = React.forwardRef(({ handleIconClick }, ref) => (
    <MenuList
        ref={ref}
        style={{
            position: "absolute",
            width: "20%",
            height: "35dvh",
            minHeight: "200px",
            minWidth: "250px",
            bottom: "100%",
            left: "0",
            display: "flex",
        }}
    >
        {/* Sidebar with "Windows 95" branding */}
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "13%",
                backgroundColor: "#008080",
                color: "#c0c0c0",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                height: "100%",
            }}
        >
            <p>Windows</p>
            <p style={{ color: "white" }}>95</p>
        </div>

        {/* Menu Items Container */}
        <div
            style={{
                flex: "1",
                backgroundColor: "#C1C1C1",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* X.com Item */}
            <MenuListItem
                style={{ height: "20%", fontSize: "1.4rem", position: "relative" }}
                onClick={() => window.open("https://x.com/windows95cto", "_blank")}
            >
                <img
                    src={xIco}
                    style={{
                        position: "absolute",
                        width: "20px",
                        left: "22px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="X Icon"
                />
                <p style={{ marginLeft: "50px" }}>X</p>
            </MenuListItem>

            {/* Telegram Item */}
            <MenuListItem
                style={{ height: "20%", fontSize: "1.4rem", position: "relative" }}
                onClick={() => window.open("https://t.me/Windows95Portal", "_blank")}
            >
                <img
                    src={teleIco}
                    style={{
                        position: "absolute",
                        width: "30px",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Telegram Icon"
                />
                <p style={{ marginLeft: "50px" }}>Telegram</p>
            </MenuListItem>

            {/* Discord Item */}
            <MenuListItem
                onClick={() => window.open("https://discord.com/invite/ke75Qvv2yP", "_blank")}
                style={{ height: "20%", fontSize: "1.4rem", position: "relative" }}
            >
                <img
                    src={discord}
                    style={{
                        position: "absolute",
                        width: "27px",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Discord Icon"
                />
                <p style={{ marginLeft: "50px" }}>Discord</p>
            </MenuListItem>

            {/* PumpFun Item */}
            <MenuListItem
                style={{ height: "20%", fontSize: "1.4rem", position: "relative" }}
                onClick={() => window.open("https://pump.fun/coin/G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump", "_blank")}
            >
                <img
                    src={pumpIco}
                    style={{
                        position: "absolute",
                        width: "30px",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Pump Icon"
                />
                <p style={{ marginLeft: "50px" }}>PumpFun</p>
            </MenuListItem>

            {/* TikTok Item */}
            <MenuListItem
                style={{ height: "20%", fontSize: "1.4rem", position: "relative" }}
                onClick={() => window.open("https://www.tiktok.com/@windows95onsol", "_blank")} // Replace with your TikTok profile URL
            >
                <img
                    src={tiktokIco}
                    style={{
                        position: "absolute",
                        width: "30px",
                        left: "13px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="TikTok Icon"
                />
                <p style={{ marginLeft: "50px" }}>TikTok</p>
            </MenuListItem>
        </div>
    </MenuList>
));

export default StartMenu;
