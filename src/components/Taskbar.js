import React from "react";
import { Button, TextInput } from "react95";
import win95Logo from "../assets/images/win95.png";
import StartMenu from "./StartMenu";

const Taskbar = ({
    desktopItems,
    startMenuOpen,
    setStartMenuOpen,
    startButtonRef,
    menuRef,
    time,
    windowWidth,
    handleIconClick,
    openModals,
    setOpenModals,
    bringToFront,
}) => {
    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#c0c0c0",
                borderTop: "2px solid #ffffff",
                borderBottom: "2px solid #808080",
                padding: "0 10px",
            }}
        >
            {/* Start Button & Search */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <Button
                    ref={startButtonRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setStartMenuOpen(!startMenuOpen);
                    }}
                    active={false}
                    style={{
                        fontWeight: "bold",
                        height: "50px",
                        width: "30%",
                        minWidth: "80px",
                        display: "flex",
                    }}
                >
                    <img
                        src={win95Logo}
                        alt="Start Icon"
                        style={{
                            height: "40px",
                            marginRight: "10px",
                        }}
                    />
                    {windowWidth > 1200 && (
                        <p style={{ fontSize: "1.2rem" }}>Start</p>
                    )}
                </Button>

                {startMenuOpen && <StartMenu ref={menuRef} handleIconClick={handleIconClick} />}

                <TextInput
                    variant="flat"
                    placeholder="Search..."
                    width={200}
                    style={{
                        height: "50px",
                        width: "20dvw",
                    }}
                />
            </div>

            {/* Taskbar Tabs (Modals) */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0px 5px",
                    gap: "10px",
                    flex: 1,
                }}
            >
                {Object.keys(openModals).map((key) => {
                    const modal = openModals[key];
                    if (!modal.isOpen) return null;

                    // Find the corresponding desktop item
                    const desktopItem = desktopItems.find((item) => item.id === key);

                    if (!desktopItem) return null; // Skip if no match

                    return (
                        <Button
                            key={key}
                            style={{
                                height: "50px",
                                width: "13vw",
                                minWidth: "60px",
                                fontSize: "1.1rem",
                                backgroundColor: "#c0c0c0",
                                border: "3px inset  #e6e6e6",
                                boxShadow: "inset 1px 1px 3px #000000",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#000000",
                                fontFamily: "ms_sans_serif",
                            }}
                            onClick={() => {
                                setOpenModals((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key],
                                        isVisible: !prev[key].isVisible, // Toggle visibility
                                    },
                                }));
                            }}
                        >
                            <img
                                src={desktopItem.icon}
                                alt={`${desktopItem.name} Icon`}
                                style={{
                                    height: "24px",
                                    marginRight: windowWidth > 1200 ? "10px" : "0px",
                                }}
                            />
                            {windowWidth > 1200 && desktopItem.name}
                        </Button>
                    );
                })}
            </div>

            {/* Clock */}
            <div style={{ paddingRight: "4px" }}>
                <div
                    style={{
                        height: "50px",
                        width: "5vw",
                        minWidth: "80px",
                        fontSize: "1.1rem",
                        backgroundColor: "#c0c0c0",
                        border: "3px inset  #e6e6e6",
                        boxShadow: "inset 1px 1px 3px #000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#000000",
                        fontFamily: "ms_sans_serif",
                    }}
                >
                    {time}
                </div>
            </div>
        </div>
    );
};

export default Taskbar;
