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
    onMinimize,
    onMaximizeToggle,
    onMouseDown,
    customStyles = {},
    zIndex,
    isMobile,
    showMenuBar = true,
    showStatusBar = true,
    customMenuBar,
    customStatusBar,
    customTitleBar,
}) => {
    const [modalWidth, setModalWidth] = useState(isMobile ? 300 : 450); // Smaller width for mobile
    const [modalHeight, setModalHeight] = useState(isMobile ? 300 : 450); // Smaller height for mobile
    const [isMaximized, setIsMaximized] = useState(false);
    const modalRef = useRef(null);
    

    useEffect(() => {
        console.log("Modal Width:", modalWidth);
    }, [modalWidth]);
    
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
    
    // Reset modal state when it is closed
    useEffect(() => {
        if (!isVisible) {
            console.log("Modal state reset");
    
            // Set width and height based on whether it's mobile
            setModalWidth(isMobile ? 300 : 450); // Adjusted for smaller size on mobile
            setModalHeight(isMobile ? 300 : 450); // Adjusted for smaller size on mobile
            setIsMaximized(false); // Reset maximization state
    
            // Reset position to center
            if (modalRef.current) {
                if (isMobile) {
                    // Center the modal with fixed offsets for mobile
                    modalRef.current.style.top = `calc(50vh - 150px)`; // Center vertically (150px = 300/2)
                    modalRef.current.style.left = `calc(50vw - 150px)`; // Center horizontally (150px = 300/2)
                } else {
                    // Center the modal for desktop
                    modalRef.current.style.top = `calc(50vh - 225px)`; // Center vertically (225px = 450/2)
                    modalRef.current.style.left = `calc(50vw - 225px)`; // Center horizontally (225px = 450/2)
                }
            }
        }
    }, [isVisible, isMobile]);
    
    


    // Handle resizing
    const startResizing = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isMaximized) return; // Prevent resizing when maximized

        const startX = e.clientX;
        const startY = e.clientY;
        const startW = modalWidth;
        const startH = modalHeight;

        const doResize = (moveEvent) => {
            const newWidth = Math.max(
                300,
                Math.min(window.innerWidth - 40, startW + (moveEvent.clientX - startX))
            ); // Minimum width of 300, maximum with padding
            const newHeight = Math.max(
                200,
                Math.min(window.innerHeight - 40, startH + (moveEvent.clientY - startY))
            ); // Minimum height of 200, maximum with padding

            setModalWidth(newWidth);
            setModalHeight(newHeight);
        };

        const stopResizing = () => {
            window.removeEventListener("mousemove", doResize);
            window.removeEventListener("mouseup", stopResizing);
        };

        window.addEventListener("mousemove", doResize);
        window.addEventListener("mouseup", stopResizing);
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

    const handleMaximizeToggle = () => {
        const toggledMaximized = !isMaximized;
        setIsMaximized(toggledMaximized);

        if (onMaximizeToggle) {
            onMaximizeToggle(toggledMaximized);
        }

        if (toggledMaximized) {
            setModalWidth(window.innerWidth - 20); // Max width with padding
            setModalHeight(window.innerHeight - 20); // Max height with padding
            if (modalRef.current) {
                modalRef.current.style.top = "10px";
                modalRef.current.style.left = "10px";
            }
        } else {
            setModalWidth(450); // Default width
            setModalHeight(450); // Default height
            if (modalRef.current) {
                modalRef.current.style.top = "calc(50vh - 225px)"; // Center vertically
                modalRef.current.style.left = "calc(50vw - 225px)"; // Center horizontally
            }
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={modalRef}
            style={{
                position: "absolute",
                
                top: isMaximized ? "10px" : "calc(50vh - 225px)", // 450px height / 2
                left: isMaximized ? "10px" : "calc(50vw - 225px)", // 450px width / 2
                width: `${modalWidth}px`,
                height: `${isMaximized ? `calc(100vh - 20px)` : `${modalHeight}px`}`,
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
                    cursor: "move",
                    ...customStyles.titleBar,
                }}
            >
                {customTitleBar ? customTitleBar : <span>{title}</span>}
                <div style={{ display: "flex", gap: "5px" }}>
                    {/* Minimize Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onMinimize) onMinimize(); // Call the minimize handler
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            lineHeight: "14px",
                            cursor: "pointer",
                        }}
                        title="Minimize"
                    >
                        &#x2212;
                    </button>

                    {/* Maximize Button */}
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
                            lineHeight: "14px",
                            cursor: "pointer",
                        }}
                        title={isMaximized ? "Restore" : "Maximize"}
                    >
                        &#10066;
                    </button>

                    {/* Close Button */}
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
                            cursor: "pointer",
                        }}
                        title="Close"
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
                        display: "flex",
                        userSelect: "none",
                        ...customStyles.menuBar,
                    }}
                >
                    {customMenuBar ? customMenuBar : (
                        <>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>File</span>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>Edit</span>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>Search</span>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>Help</span>
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

            {!isMaximized && (
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
            )}
        </div>
    );
};
export default ModalWindow;