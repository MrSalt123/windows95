/***************************************************************************
 *                           MODAL COMPONENT
 * Reusable modal window that can show different content, menu bars, and 
 * status bars. Supports dragging, resizing, and custom styling.
 ***************************************************************************/

import React, { useState, useEffect, useRef } from "react";

const ModalWindow = ({
    title,
    icon,
    content,
    isOpen,
    isVisible,
    onClose,
    onMinimize,
    onMaximizeToggle,
    onMouseDown,
    customStyles = {},
    zIndex,
    showMenuBar,
    showStatusBar,
    customMenuBar,
    customStatusBar,
    customTitleBar,
}) => {
    const [modalWidth, setModalWidth] = useState(450);
    const [modalHeight, setModalHeight] = useState(450);
    const [isMaximized, setIsMaximized] = useState(false);
    const modalRef = useRef(null);

    // Handle Escape key to close modal
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Handle resizing
    const startResizing = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startW = modalWidth;
        const startH = modalHeight;

        const doDrag = (moveEvent) => {
            const newWidth = Math.max(300, startW + (moveEvent.clientX - startX)); // Minimum width
            const newHeight = Math.max(200, startH + (moveEvent.clientY - startY)); // Minimum height
            setModalWidth(newWidth);
            setModalHeight(newHeight);
        };

        const stopDrag = () => {
            window.removeEventListener("mousemove", doDrag);
            window.removeEventListener("mouseup", stopDrag);
        };

        window.addEventListener("mousemove", doDrag);
        window.addEventListener("mouseup", stopDrag);
    };

    // Handle dragging by title bar
    const handleMouseDown = (e) => {
        const modal = modalRef.current;

        if (typeof onMouseDown === "function") {
            onMouseDown();
        }

        const offsetX = e.clientX - modal.getBoundingClientRect().left;
        const offsetY = e.clientY - modal.getBoundingClientRect().top;

        const handleMouseMove = (moveEvent) => {
            modal.style.left = `${moveEvent.clientX - offsetX}px`;
            modal.style.top = `${moveEvent.clientY - offsetY}px`;
        };

        const stopDragging = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", stopDragging);
        };

        if (e.target.closest(".modal-titlebar")) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", stopDragging);
        }
    };

    // Handle maximize toggle
    const handleMaximizeToggle = () => {
        const toggledMaximized = !isMaximized;
        setIsMaximized(toggledMaximized);

        if (onMaximizeToggle) {
            onMaximizeToggle(toggledMaximized);
        }

        if (toggledMaximized) {
            setModalWidth(window.innerWidth - 20);
            setModalHeight(window.innerHeight - 20);
        } else {
            setModalWidth(450);
            setModalHeight(450);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={modalRef}
            style={{
                position: "absolute",
                top: isMaximized ? "10px" : "calc(50vh - 250px)",
                left: isMaximized ? "10px" : "calc(50vw - 250px)",
                width: `${modalWidth}px`,
                height: `${modalHeight}px`,
                backgroundColor: "#fff",
                border: "2px solid black",
                display: isVisible ? "flex" : "none",
                flexDirection: "column",
                zIndex: zIndex,
                ...customStyles.container,
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                className="modal-titlebar"
                style={{
                    backgroundColor: "#000080",
                    color: "white",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    fontSize: "14px",
                    userSelect: "none",
                    cursor: isMaximized ? "default" : "move",
                    ...customStyles.titleBar,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {icon && <img src={icon} alt={`${title} Icon`} style={{ height: "20px", width: "20px" }} />}
                    {customTitleBar ? customTitleBar : <span>{title}</span>}
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onMinimize) onMinimize();
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                        }}
                        className="pointer"
                    >
                        &#x2212;
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMaximizeToggle();
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                        }}
                        className="pointer"
                    >
                        &#10066;
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                        }}
                        className="pointer"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {showMenuBar && (
                <div
                    style={{
                        backgroundColor: "#c0c0c0",
                        borderBottom: "1px solid #808080",
                        padding: "5px 10px",
                        fontSize: "12px",
                        ...customStyles.menuBar,
                    }}
                >
                    {customMenuBar ? customMenuBar : (
                        <>
                            <span style={{ marginRight: "15px" }} className="pointer">File</span>
                            <span style={{ marginRight: "15px" }} className="pointer">Edit</span>
                            <span style={{ marginRight: "15px" }} className="pointer">Search</span>
                            <span style={{ marginRight: "15px" }} className="pointer">Help</span>
                        </>
                    )}
                </div>
            )}

            <div
                style={{
                    flex: 1,
                    overflow: "auto",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                    color: "#000",
                    display: "flex",
                    flexDirection: "column",
                    ...customStyles.main,
                }}
            >
                {content}
            </div>

            {showStatusBar && (
                <div
                    style={{
                        backgroundColor: "#c0c0c0",
                        borderTop: "1px solid #808080",
                        height: "25px",
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "black",
                        ...customStyles.statusBar,
                    }}
                >
                    {customStatusBar ? customStatusBar : (
                        <>
                            <span>Ln 1, Col 1</span>
                            <span>100%</span>
                        </>
                    )}
                </div>
            )}

            <div
                onMouseDown={startResizing}
                style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#c0c0c0",
                    borderTop: "1px solid #808080",
                    borderLeft: "1px solid #808080",
                    cursor: "nwse-resize",
                    alignSelf: "flex-end",
                    userSelect: "none",
                    ...customStyles.resizer,
                }}
            />
        </div>
    );
};

export default ModalWindow;
