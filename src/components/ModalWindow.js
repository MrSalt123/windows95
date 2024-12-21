/***************************************************************************
 *                           MODAL COMPONENT
 * Reusable modal window that can show different content, menu bars, and 
 * status bars. Supports dragging, resizing, and custom styling.
 ***************************************************************************/


import React, { useState, useEffect, useRef } from "react";

const ModalWindow = ({
    title,
    content,
    isOpen,
    isVisible,
    onClose,
    customStyles = {},
    showMenuBar = true,
    showStatusBar = true,
    customMenuBar,
    customStatusBar,
    customTitleBar,
}) => {
    const [modalWidth, setModalWidth] = useState(450);
    const [modalHeight, setModalHeight] = useState(450);
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
            const newWidth = Math.min(
                window.innerWidth,
                startW + (moveEvent.clientX - startX)
            );
            const newHeight = Math.min(
                window.innerHeight,
                startH + (moveEvent.clientY - startY)
            );

            setModalWidth(Math.max(newWidth, 300)); // Minimum width of 300
            setModalHeight(Math.max(newHeight, 200)); // Minimum height of 200
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

    const mainAreaStyles = {
        flex: 1,
        overflow: "auto",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        ...customStyles.main,
    };

    return (
        <div
            ref={modalRef}
            style={{
                position: "fixed",
                top: "calc(50vh - 250px)",
                left: "calc(50vw - 250px)",
                width: `${modalWidth}px`,
                height: `${modalHeight}px`,
                backgroundColor: "#fff",
                border: "2px solid black",
                zIndex: 1000,
                display: isVisible ? "flex" : "none",
                flexDirection: "column",
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
                    cursor: "move",
                    ...customStyles.titleBar,
                }}
            >
                {customTitleBar ? customTitleBar : <span>{title}</span>}
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
                        lineHeight: "14px",
                    }}
                    className="pointer"
                >
                    ✕
                </button>
            </div>

            {showMenuBar && (
                <div
                    style={{
                        backgroundColor: "#c0c0c0",
                        borderBottom: "1px solid #808080",
                        padding: "5px 10px",
                        fontSize: "12px",
                        display: "flex",
                        userSelect: "none",
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

            <div style={mainAreaStyles}>{content}</div>

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
                        userSelect: "none",
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
            ></div>
        </div>
    );
};

export default ModalWindow;