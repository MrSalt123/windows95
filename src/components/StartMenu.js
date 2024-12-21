import React from "react";
import { MenuList, MenuListItem } from "react95";
import xIco from "../assets/images/x-ico.png";
import teleIco from "../assets/images/tele-ico.png";
import consoleIcon from "../assets/images/console_prompt-0.png";
import pumpIco from "../assets/images/pump-ico.png";

const StartMenu = React.forwardRef(({ handleIconClick }, ref) => (
    <MenuList
        ref={ref}
        style={{
            position: "absolute",
            width: "20%",
            height: "215px",
            minWidth: "250px",
            bottom: "60px",
            left: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
        }}
    >
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
                backgroundColor: "#008080",
                color: "#c0c0c0",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: "1.9rem",
                fontWeight: "bold",
                textAlign: "center",
                height: "200px",
            }}
        >
            <p>Windows</p>
            <p style={{ color: "white" }}>95</p>
        </div>

        <div
            style={{
                flex: "1",
                backgroundColor: "#C1C1C1",
            }}
        >
            <MenuListItem
                style={{ height: "50px", fontSize: "1.4rem" }}
                onClick={() => window.open("https://x.com/windows95cto", "_blank")}
            >
                <img
                    src={xIco}
                    style={{
                        position: "absolute",
                        width: "20px",
                        left: "15px",
                    }}
                    alt="X Icon"
                />
                <p style={{ transform: "translateX(50px)" }}>X</p>
            </MenuListItem>

            <MenuListItem
                style={{ height: "50px", fontSize: "1.4rem" }}
                onClick={() => window.open("https://t.me/windows95ctosol", "_blank")}
            >
                <img
                    src={teleIco}
                    style={{
                        position: "absolute",
                        width: "30px",
                    }}
                    alt="Telegram Icon"
                />
                <p style={{ transform: "translateX(50px)" }}>Telegram</p>
            </MenuListItem>

            <MenuListItem
                style={{ height: "50px", fontSize: "1.4rem" }}
                onClick={() => handleIconClick("chart")}
            >
                <img
                    src={consoleIcon}
                    style={{
                        position: "absolute",
                        width: "20px",
                        left: "15px",
                    }}
                    alt="Console Icon"
                />
                <p style={{ transform: "translateX(50px)" }}>Chart</p>
            </MenuListItem>

            <MenuListItem
                style={{ height: "50px", fontSize: "1.4rem" }}
                onClick={() => window.open("https://pump.fun/coin/G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump", "_blank")}
            >
                <img
                    src={pumpIco}
                    style={{
                        position: "absolute",
                        width: "25px",
                        left: "15px",
                    }}
                    alt="Pump Icon"
                />
                <p style={{ transform: "translateX(50px)" }}>PumpFun</p>
            </MenuListItem>
        </div>
    </MenuList>
));

export default StartMenu;